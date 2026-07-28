"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAdminAuth, AdminRole } from "@/context/AdminAuthContext";
import { AdminAccount } from "@/app/api/admin/users/route";
import {
  ShieldCheck,
  UserPlus,
  Trash2,
  AlertTriangle,
  Users,
  Search,
  CheckCircle2,
  XCircle,
  Lock,
  ArrowLeft,
  X,
  UserCheck,
  RefreshCw,
  KeyRound,
  Mail,
  User as UserIcon,
} from "lucide-react";

export default function ManageAdminsPage() {
  const { adminUser, role } = useAdminAuth();
  const isSuperAdmin = role === "Super Admin" || role === "Owner";

  const [admins, setAdmins] = useState<AdminAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("ALL");

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Staff" as AdminRole,
  });

  // Modal State
  const [adminToRevoke, setAdminToRevoke] = useState<AdminAccount | null>(null);
  const [isRevoking, setIsRevoking] = useState(false);

  // Notification State
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const showNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  // Fetch Admins List
  const fetchAdmins = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/admin/users?requesterRole=${encodeURIComponent(role || "")}`, {
        headers: {
          "x-admin-role": role || "",
          "x-admin-email": adminUser?.email || "",
        },
      });
      const data = await res.json();
      if (data.success) {
        setAdmins(data.admins || []);
      } else {
        showNotification("error", data.error || "Failed to load admin users.");
      }
    } catch (err) {
      console.error("Fetch admins error:", err);
      showNotification("error", "Error connecting to server. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isSuperAdmin) {
      fetchAdmins();
    }
  }, [isSuperAdmin, role]);

  // Handle Form Submission for Adding Admin
  const handleAddAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
      showNotification("error", "Please fill in all required fields (Name, Email, and Password).");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-role": role || "",
          "x-admin-email": adminUser?.email || "",
        },
        body: JSON.stringify({
          ...formData,
          requesterRole: role,
        }),
      });

      const data = await res.json();
      if (data.success) {
        showNotification("success", data.message || "New admin created successfully!");
        setFormData({ name: "", email: "", password: "", role: "Staff" });
        fetchAdmins();
      } else {
        showNotification("error", data.error || "Failed to create admin user.");
      }
    } catch (err) {
      console.error("Create admin error:", err);
      showNotification("error", "Network error occurred while creating admin account.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Revoke Admin Access
  const handleConfirmRevoke = async () => {
    if (!adminToRevoke) return;

    setIsRevoking(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-admin-role": role || "",
          "x-admin-email": adminUser?.email || "",
        },
        body: JSON.stringify({
          id: adminToRevoke.id,
          email: adminToRevoke.email,
          requesterRole: role,
          requesterEmail: adminUser?.email,
        }),
      });

      const data = await res.json();
      if (data.success) {
        showNotification("success", `Admin access for '${adminToRevoke.name}' has been revoked.`);
        setAdminToRevoke(null);
        fetchAdmins();
      } else {
        showNotification("error", data.error || "Could not revoke admin access.");
      }
    } catch (err) {
      console.error("Revoke admin error:", err);
      showNotification("error", "Failed to revoke admin access due to network error.");
    } finally {
      setIsRevoking(false);
    }
  };

  // RBAC Access Guard: If not Super Admin or Owner
  if (!isSuperAdmin) {
    return (
      <div className="max-w-3xl mx-auto my-12 p-8 bg-white border border-red-200 rounded-xs shadow-md space-y-6 text-center animate-fade-in">
        <div className="w-16 h-16 bg-red-100 text-red-700 rounded-full flex items-center justify-center mx-auto">
          <Lock size={32} />
        </div>
        <div className="space-y-2">
          <h1 className="font-serif text-2xl font-bold text-stone-900 uppercase tracking-wide">
            Access Restricted: Super Admin Privileges Required
          </h1>
          <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
            You are logged in as <strong className="text-stone-900">{adminUser?.name || "Staff Member"}</strong> ({role}). 
            Only Super Admin accounts have permission to create, manage, or revoke access for Atelier administrators.
          </p>
        </div>
        <Link
          href="/admin"
          className="inline-flex items-center space-x-2 bg-stone-900 hover:bg-amber-800 text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-xs transition-colors shadow-xs"
        >
          <ArrowLeft size={16} />
          <span>Return to Dashboard</span>
        </Link>
      </div>
    );
  }

  // Filtered list calculation
  const filteredAdmins = admins.filter((adm) => {
    const matchesSearch =
      adm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      adm.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      adm.role.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = roleFilter === "ALL" || adm.role.toUpperCase() === roleFilter.toUpperCase();

    return matchesSearch && matchesRole;
  });

  const superAdminCount = admins.filter((a) => a.role === "Super Admin" || a.role === "Owner").length;
  const staffCount = admins.filter((a) => a.role === "Staff").length;

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Toast / Notification Banner */}
      {notification && (
        <div
          className={`p-4 rounded-xs border text-xs font-semibold uppercase tracking-wider flex items-center justify-between shadow-md animate-fade-in ${
            notification.type === "success"
              ? "bg-emerald-950 text-emerald-300 border-emerald-800"
              : "bg-red-950 text-red-300 border-red-800"
          }`}
        >
          <div className="flex items-center space-x-3">
            {notification.type === "success" ? (
              <CheckCircle2 size={20} className="text-emerald-400 shrink-0" />
            ) : (
              <XCircle size={20} className="text-red-400 shrink-0" />
            )}
            <span>{notification.message}</span>
          </div>
          <button
            onClick={() => setNotification(null)}
            className="p-1 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between bg-stone-950 text-white p-6 sm:p-8 rounded-xs shadow-lg gap-6 border border-stone-800">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-amber-400 font-extrabold block mb-1">
            SUPER ADMIN CONTROL CENTER
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
            Manage Atelier Admins & Access
          </h1>
          <p className="text-xs text-stone-400 mt-1 max-w-xl">
            Create, monitor, and revoke administrative privileges for Fashion Galleria. Role-Based Access Control (RBAC) enforced.
          </p>
        </div>

        <button
          onClick={fetchAdmins}
          disabled={isLoading}
          className="inline-flex items-center space-x-2 bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 hover:text-white text-xs uppercase tracking-widest px-4 py-2.5 font-bold rounded-xs transition-colors shrink-0"
        >
          <RefreshCw size={14} className={isLoading ? "animate-spin text-amber-400" : ""} />
          <span>Refresh List</span>
        </button>
      </div>

      {/* 3 Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 border border-stone-200 shadow-xs rounded-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
              Total Admin Accounts
            </span>
            <span className="font-sans text-2xl font-extrabold text-stone-900 mt-1 block">
              {admins.length}
            </span>
          </div>
          <div className="p-3 bg-amber-50 text-amber-800 rounded-full">
            <Users size={24} />
          </div>
        </div>

        <div className="bg-white p-5 border border-stone-200 shadow-xs rounded-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
              Super Admins / Owners
            </span>
            <span className="font-sans text-2xl font-extrabold text-stone-900 mt-1 block">
              {superAdminCount}
            </span>
          </div>
          <div className="p-3 bg-amber-100 text-amber-900 rounded-full">
            <ShieldCheck size={24} />
          </div>
        </div>

        <div className="bg-white p-5 border border-stone-200 shadow-xs rounded-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
              Staff Members
            </span>
            <span className="font-sans text-2xl font-extrabold text-stone-900 mt-1 block">
              {staffCount}
            </span>
          </div>
          <div className="p-3 bg-sky-50 text-sky-700 rounded-full">
            <UserCheck size={24} />
          </div>
        </div>
      </div>

      {/* Section 1: Add New Admin Form */}
      <div className="bg-white border border-stone-200 rounded-xs shadow-sm overflow-hidden">
        <div className="bg-stone-900 px-6 py-4 border-b border-stone-800 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <UserPlus size={18} className="text-amber-400" />
            <h2 className="font-serif text-sm font-bold uppercase tracking-wider">
              Add New Admin User
            </h2>
          </div>
          <span className="text-[10px] uppercase tracking-widest text-stone-400 bg-stone-950 px-2.5 py-1 rounded-xs border border-stone-800">
            RBAC Assignment
          </span>
        </div>

        <form onSubmit={handleAddAdminSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Field 1: Name */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <UserIcon size={16} className="absolute left-3 top-3 text-stone-400" />
                <input
                  type="text"
                  placeholder="e.g. Nimali Perera"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full text-xs pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xs focus:bg-white focus:outline-none focus:border-amber-800 font-medium"
                />
              </div>
            </div>

            {/* Field 2: Email */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-3 text-stone-400" />
                <input
                  type="email"
                  placeholder="e.g. nimali@fashiongalleria.lk"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full text-xs pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xs focus:bg-white focus:outline-none focus:border-amber-800 font-medium"
                />
              </div>
            </div>

            {/* Field 3: Password */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700">
                Initial Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <KeyRound size={16} className="absolute left-3 top-3 text-stone-400" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="w-full text-xs pl-9 pr-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xs focus:bg-white focus:outline-none focus:border-amber-800 font-medium"
                />
              </div>
            </div>

            {/* Field 4: Role Selection */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-700">
                Access Role <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value as AdminRole })}
                className="w-full text-xs px-3 py-2.5 bg-stone-50 border border-stone-300 rounded-xs focus:bg-white focus:outline-none focus:border-amber-800 font-bold uppercase tracking-wider"
              >
                <option value="Staff">Staff (Fulfillment Only)</option>
                <option value="Owner">Owner (Full Operations)</option>
                <option value="Super Admin">Super Admin (User Control)</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-2 border-t border-stone-100">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-amber-700 hover:bg-amber-800 text-white text-xs uppercase tracking-widest px-6 py-3 font-bold flex items-center space-x-2 transition-colors rounded-xs shadow-md disabled:opacity-50"
            >
              {isSubmitting ? (
                <RefreshCw size={16} className="animate-spin" />
              ) : (
                <UserPlus size={16} />
              )}
              <span>Create &amp; Assign Admin</span>
            </button>
          </div>
        </form>
      </div>

      {/* Section 2: List View of Existing Admins */}
      <div className="bg-white border border-stone-200 rounded-xs shadow-sm overflow-hidden space-y-4">
        {/* Header & Controls */}
        <div className="p-4 sm:p-6 border-b border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="font-serif text-lg font-bold text-stone-900 uppercase tracking-tight">
              Existing Admin Accounts ({filteredAdmins.length})
            </h2>
            <p className="text-xs text-stone-500">
              Active profiles authorized to log in to the Atelier System.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search size={16} className="absolute left-3 top-3 text-stone-400" />
              <input
                type="text"
                placeholder="Search by name, email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs pl-9 pr-3 py-2 bg-stone-50 border border-stone-300 rounded-xs focus:outline-none focus:border-amber-800"
              />
            </div>

            {/* Role Filter */}
            <div className="flex items-center space-x-1 bg-stone-100 p-1 rounded-xs border border-stone-200 text-[11px] font-bold uppercase tracking-wider">
              {["ALL", "SUPER ADMIN", "OWNER", "STAFF"].map((r) => (
                <button
                  key={r}
                  onClick={() => setRoleFilter(r)}
                  className={`px-2.5 py-1 rounded-xs transition-colors ${
                    roleFilter === r
                      ? "bg-stone-900 text-white shadow-xs"
                      : "text-stone-600 hover:text-black"
                  }`}
                >
                  {r === "SUPER ADMIN" ? "Super" : r}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table / List */}
        {isLoading ? (
          <div className="p-12 text-center text-stone-500 space-y-3">
            <RefreshCw size={24} className="animate-spin mx-auto text-amber-700" />
            <p className="text-xs font-semibold uppercase tracking-wider">Loading Admin Profiles...</p>
          </div>
        ) : filteredAdmins.length === 0 ? (
          <div className="p-12 text-center space-y-2 text-stone-500">
            <Users size={32} className="mx-auto text-stone-300" />
            <p className="text-sm font-semibold uppercase">No matching admin profiles found</p>
            <p className="text-xs text-stone-400">Try adjusting your search query or role filter.</p>
          </div>
        ) : (
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-stone-100 text-stone-700 text-[10px] uppercase tracking-widest font-extrabold border-b border-stone-200">
                  <th className="py-3 px-6">Admin Profile</th>
                  <th className="py-3 px-4">Role Permission</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Created Date</th>
                  <th className="py-3 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 text-xs">
                {filteredAdmins.map((adm) => {
                  const isCurrentSession =
                    adm.email.toLowerCase() === (adminUser?.email || "").toLowerCase();

                  return (
                    <tr key={adm.id} className="hover:bg-stone-50/80 transition-colors">
                      {/* Name & Email */}
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-9 h-9 rounded-full bg-stone-900 text-amber-400 font-bold flex items-center justify-center text-xs uppercase shrink-0 border border-stone-800">
                            {adm.name.substring(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <span className="font-bold text-stone-900 block">{adm.name}</span>
                            <span className="text-stone-500 text-[11px] block">{adm.email}</span>
                          </div>
                        </div>
                      </td>

                      {/* Role Badge */}
                      <td className="py-4 px-4">
                        {adm.role === "Super Admin" ? (
                          <span className="inline-flex items-center space-x-1.5 bg-amber-100 text-amber-900 border border-amber-300 px-2.5 py-1 rounded-xs text-[10px] font-extrabold uppercase tracking-wider">
                            <ShieldCheck size={13} className="text-amber-700 shrink-0" />
                            <span>Super Admin</span>
                          </span>
                        ) : adm.role === "Owner" ? (
                          <span className="inline-flex items-center space-x-1.5 bg-purple-100 text-purple-900 border border-purple-300 px-2.5 py-1 rounded-xs text-[10px] font-bold uppercase tracking-wider">
                            <ShieldCheck size={13} className="text-purple-700 shrink-0" />
                            <span>Owner</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center space-x-1.5 bg-sky-100 text-sky-900 border border-sky-300 px-2.5 py-1 rounded-xs text-[10px] font-semibold uppercase tracking-wider">
                            <UserCheck size={13} className="text-sky-700 shrink-0" />
                            <span>Staff Member</span>
                          </span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center space-x-1 text-emerald-700 font-bold text-[11px]">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span>Active</span>
                        </span>
                      </td>

                      {/* Created Date */}
                      <td className="py-4 px-4 text-stone-500 font-medium">
                        {adm.createdAt || "2026-01-01"}
                      </td>

                      {/* Action Button */}
                      <td className="py-4 px-6 text-right">
                        {isCurrentSession ? (
                          <span className="inline-block bg-stone-100 text-stone-500 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-xs border border-stone-200">
                            Current Session
                          </span>
                        ) : (
                          <button
                            onClick={() => setAdminToRevoke(adm)}
                            className="inline-flex items-center space-x-1.5 bg-red-50 hover:bg-red-600 text-red-700 hover:text-white px-3 py-1.5 rounded-xs text-xs font-bold uppercase tracking-wider transition-all border border-red-200"
                            title="Revoke Admin Access"
                          >
                            <Trash2 size={14} />
                            <span>Revoke Access</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Confirmation Modal for Revoking Admin Access */}
      {adminToRevoke && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border border-stone-300 rounded-xs shadow-2xl max-w-md w-full p-6 space-y-6 animate-scale-up">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-700 flex items-center justify-center shrink-0">
                <AlertTriangle size={24} />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-lg font-bold text-stone-900 uppercase tracking-tight">
                  Revoke Admin Privileges?
                </h3>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Are you sure you want to revoke administrative access for{" "}
                  <strong className="text-stone-900">{adminToRevoke.name}</strong> ({adminToRevoke.email})?
                  This user will immediately be barred from logging in.
                </p>
              </div>
            </div>

            <div className="bg-stone-50 border border-stone-200 p-3 rounded-xs text-[11px] text-stone-600 space-y-1">
              <div>Role to be Revoked: <strong className="text-stone-900">{adminToRevoke.role}</strong></div>
              <div>Account ID: <code className="text-amber-800">{adminToRevoke.id}</code></div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setAdminToRevoke(null)}
                disabled={isRevoking}
                className="px-4 py-2.5 bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-bold uppercase tracking-wider rounded-xs transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmRevoke}
                disabled={isRevoking}
                className="px-5 py-2.5 bg-red-700 hover:bg-red-800 text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors flex items-center space-x-2 shadow-xs disabled:opacity-50"
              >
                {isRevoking ? (
                  <RefreshCw size={14} className="animate-spin" />
                ) : (
                  <Trash2 size={14} />
                )}
                <span>Confirm Revoke Access</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

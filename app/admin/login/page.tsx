"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAdminAuth, AdminRole } from "@/context/AdminAuthContext";
import { Lock, ShieldCheck, UserCheck, ArrowRight, Sparkles, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAdminAuth();

  const [selectedRole, setSelectedRole] = useState<AdminRole>("Super Admin");
  const [email, setEmail] = useState("superadmin@fashiongalleria.lk");
  const [password, setPassword] = useState("••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleToggle = (role: AdminRole) => {
    setSelectedRole(role);
    if (role === "Super Admin") {
      setEmail("superadmin@fashiongalleria.lk");
    } else if (role === "Owner") {
      setEmail("owner@fashiongalleria.lk");
    } else {
      setEmail("staff@fashiongalleria.lk");
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      login(email, selectedRole);
      setIsLoading(false);
      router.push("/admin");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-stone-900 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 selection:bg-amber-500 selection:text-black">
      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-2">
        <Link href="/" className="inline-block group">
          <span className="font-serif text-2xl sm:text-3xl font-bold tracking-[0.25em] text-white uppercase block">
            Fashion Galleria
          </span>
          <span className="text-[10px] tracking-[0.35em] text-amber-400 uppercase font-semibold block mt-0.5">
            ATELIER MANAGEMENT SYSTEM
          </span>
        </Link>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-stone-950 border border-stone-800 p-8 shadow-2xl rounded-xs space-y-6">
          {/* Role Toggle Selector */}
          <div className="space-y-2">
            <label className="block text-[11px] font-bold uppercase tracking-widest text-stone-400 text-center">
              Select Access Role
            </label>
            <div className="grid grid-cols-3 gap-1 bg-stone-900 p-1 rounded-xs border border-stone-800">
              <button
                type="button"
                onClick={() => handleRoleToggle("Super Admin")}
                className={`py-2 text-[11px] uppercase tracking-wider font-bold rounded-xs transition-all ${
                  selectedRole === "Super Admin"
                    ? "bg-amber-700 text-white shadow-xs"
                    : "text-stone-400 hover:text-white"
                }`}
              >
                Super Admin
              </button>
              <button
                type="button"
                onClick={() => handleRoleToggle("Owner")}
                className={`py-2 text-[11px] uppercase tracking-wider font-bold rounded-xs transition-all ${
                  selectedRole === "Owner"
                    ? "bg-amber-800 text-white shadow-xs"
                    : "text-stone-400 hover:text-white"
                }`}
              >
                Owner
              </button>
              <button
                type="button"
                onClick={() => handleRoleToggle("Staff")}
                className={`py-2 text-[11px] uppercase tracking-wider font-bold rounded-xs transition-all ${
                  selectedRole === "Staff"
                    ? "bg-stone-800 text-white shadow-xs border border-stone-700"
                    : "text-stone-400 hover:text-white"
                }`}
              >
                Staff
              </button>
            </div>
          </div>

          {/* Role Access Callout */}
          <div className="bg-stone-900/80 border border-stone-800 p-3 rounded-xs text-[11px] text-stone-400">
            {selectedRole === "Super Admin" ? (
              <div className="flex items-center space-x-2 text-amber-400 font-semibold">
                <ShieldCheck size={16} className="shrink-0" />
                <span>Super Admin Access: Full system permissions &amp; Admin User Management.</span>
              </div>
            ) : selectedRole === "Owner" ? (
              <div className="flex items-center space-x-2 text-amber-400/90 font-semibold">
                <ShieldCheck size={16} className="shrink-0" />
                <span>Full Owner Access: Financial metrics, order processing, and inventory CRUD.</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2 text-sky-400 font-semibold">
                <UserCheck size={16} className="shrink-0" />
                <span>Restricted Staff Access: Order fulfillment and stock view (revenue metrics hidden).</span>
              </div>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-stone-300 mb-1.5">
                Admin Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs p-3 bg-stone-900 border border-stone-800 text-white rounded-xs focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-stone-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full text-xs p-3 pr-10 bg-stone-900 border border-stone-800 text-white rounded-xs focus:outline-none focus:border-amber-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-amber-400 transition-colors p-1 focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 hover:from-amber-800 hover:to-stone-900 text-white text-xs uppercase tracking-[0.2em] font-extrabold transition-all shadow-md flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <Sparkles size={16} className="animate-spin" />
                  <span>AUTHENTICATING...</span>
                </>
              ) : (
                <>
                  <Lock size={15} />
                  <span>SIGN IN TO ADMIN PANEL ({selectedRole})</span>
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          {/* Return to Storefront Link */}
          <div className="text-center pt-2 border-t border-stone-900">
            <Link
              href="/"
              className="text-[11px] text-stone-500 hover:text-amber-400 uppercase tracking-wider font-bold transition-colors"
            >
              ← Back to Main Storefront
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

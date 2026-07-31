"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  User,
  Package,
  MapPin,
  Phone,
  Mail,
  Search,
  ChevronRight,
  Clock,
  CheckCircle2,
  Truck,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  ShoppingBag,
  ExternalLink,
} from "lucide-react";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  district: string;
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"orders" | "details">("orders");
  const [orderQuery, setOrderQuery] = useState("");
  const [profile, setProfile] = useState<UserProfile>({
    name: "Customer Profile",
    email: "",
    phone: "",
    address: "",
    city: "Colombo",
    district: "Colombo",
  });

  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Load profile from localStorage if previous checkout details were saved
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("fg_user_profile");
      if (savedUser) {
        setProfile(JSON.parse(savedUser));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSearchOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderQuery.trim()) return;
    const cleanId = orderQuery.trim().toUpperCase();
    window.location.href = `/orders/${cleanId}`;
  };

  return (
    <div className="bg-stone-50 min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs uppercase tracking-wider text-stone-500">
          <Link href="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <ChevronRight size={12} />
          <span className="font-bold text-stone-900">Customer Account & Orders</span>
        </div>

        {/* Customer Header Banner */}
        <div className="bg-stone-950 text-white rounded-xs p-6 sm:p-8 shadow-xl border border-stone-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-amber-800 text-amber-200 flex items-center justify-center font-serif text-2xl font-bold border-2 border-amber-600/50 shrink-0">
              {profile.name ? profile.name.charAt(0).toUpperCase() : <User size={28} />}
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-amber-400 font-extrabold block">
                CEYLON ATELIER CUSTOMER
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white mt-0.5">
                {profile.name || "Welcome Back"}
              </h1>
              <p className="text-xs text-stone-400 mt-1 flex items-center space-x-2">
                <span>{profile.phone || "Doorstep Express COD Delivery Account"}</span>
                {profile.city && (
                  <>
                    <span>•</span>
                    <span className="text-stone-300 font-medium">{profile.city}, Sri Lanka</span>
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/track-order"
              className="inline-flex items-center space-x-2 bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold uppercase tracking-widest px-5 py-3 rounded-xs transition-colors shadow-sm"
            >
              <Truck size={16} />
              <span>LIVE ORDER TRACKER</span>
            </Link>
          </div>
        </div>

        {/* Quick Order Lookup Banner */}
        <div className="bg-white p-5 border border-stone-200 shadow-xs rounded-xs">
          <form onSubmit={handleSearchOrder} className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search size={18} className="absolute left-3.5 top-3 text-stone-400" />
              <input
                type="text"
                placeholder="Enter Order Reference (e.g. FG-849201 or Order ID)..."
                value={orderQuery}
                onChange={(e) => setOrderQuery(e.target.value)}
                className="w-full text-xs font-semibold uppercase tracking-wider pl-10 pr-4 py-3 border border-stone-300 rounded-xs focus:outline-none focus:border-amber-800 bg-stone-50"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto bg-stone-900 hover:bg-amber-800 text-white text-xs uppercase tracking-widest font-bold px-6 py-3 transition-colors shrink-0 flex items-center justify-center space-x-2"
            >
              <span>LOOKUP ORDER</span>
              <ArrowRight size={14} />
            </button>
          </form>
        </div>

        {/* Main Content Tabs */}
        <div className="bg-white border border-stone-200 shadow-sm rounded-xs">
          {/* Tab Navigation */}
          <div className="flex border-b border-stone-200 text-xs font-bold uppercase tracking-widest">
            <button
              onClick={() => setActiveTab("orders")}
              className={`px-6 py-4 transition-colors flex items-center space-x-2 border-b-2 ${
                activeTab === "orders"
                  ? "border-amber-800 text-amber-800 font-extrabold bg-amber-50/50"
                  : "border-transparent text-stone-600 hover:text-stone-900"
              }`}
            >
              <Package size={16} />
              <span>My Orders & Delivery History</span>
            </button>
            <button
              onClick={() => setActiveTab("details")}
              className={`px-6 py-4 transition-colors flex items-center space-x-2 border-b-2 ${
                activeTab === "details"
                  ? "border-amber-800 text-amber-800 font-extrabold bg-amber-50/50"
                  : "border-transparent text-stone-600 hover:text-stone-900"
              }`}
            >
              <User size={16} />
              <span>Account Information</span>
            </button>
          </div>

          {/* Tab Body */}
          <div className="p-6 sm:p-8">
            {activeTab === "orders" ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-stone-900">
                    Recent Orders Overview
                  </h3>
                  <Link href="/track-order" className="text-xs text-amber-800 hover:underline font-bold uppercase">
                    Track Specific Order →
                  </Link>
                </div>

                <div className="bg-stone-50 border border-stone-200 p-6 text-center space-y-4 rounded-xs">
                  <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center mx-auto">
                    <Package size={24} />
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-bold uppercase text-stone-900">
                      Real-Time Order Tracking Active
                    </h4>
                    <p className="text-xs text-stone-600 max-w-md mx-auto mt-1">
                      Enter your Order Reference Number (e.g. <strong className="font-mono text-stone-900 font-bold">FG-123456</strong>) above or click Live Order Tracker to view fulfillment logs and courier updates.
                    </p>
                  </div>
                  <div className="pt-2">
                    <Link
                      href="/track-order"
                      className="inline-flex items-center space-x-2 bg-stone-900 text-white text-xs uppercase tracking-widest px-6 py-3 font-bold hover:bg-amber-800 transition-colors"
                    >
                      <Truck size={14} />
                      <span>Open Real-Time Tracker</span>
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-stone-900 border-b border-stone-100 pb-3">
                  Saved Contact & Shipping Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-stone-700">
                  <div className="space-y-3 bg-stone-50 p-4 border border-stone-200 rounded-xs">
                    <span className="font-bold uppercase tracking-wider text-stone-900 block border-b border-stone-200 pb-2">
                      Personal Details
                    </span>
                    <div className="space-y-2">
                      <div>
                        <span className="text-[10px] text-stone-500 uppercase block font-bold">Full Name</span>
                        <p className="font-serif text-sm font-bold text-stone-900">{profile.name || "Customer"}</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-stone-500 uppercase block font-bold">Primary Phone</span>
                        <p className="font-mono text-stone-900 font-semibold">{profile.phone || "Not provided"}</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-stone-500 uppercase block font-bold">Email Address</span>
                        <p className="text-stone-900 font-medium">{profile.email || "Not provided"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 bg-stone-50 p-4 border border-stone-200 rounded-xs">
                    <span className="font-bold uppercase tracking-wider text-stone-900 block border-b border-stone-200 pb-2">
                      Primary Delivery Address
                    </span>
                    <div className="space-y-2">
                      <div>
                        <span className="text-[10px] text-stone-500 uppercase block font-bold">Street Address</span>
                        <p className="text-stone-900 font-medium">{profile.address || "Will be saved automatically during checkout."}</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-stone-500 uppercase block font-bold">City & District</span>
                        <p className="text-stone-900 font-medium">
                          {profile.city ? `${profile.city}, ${profile.district} District` : "Sri Lanka"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 p-4 rounded-xs flex items-center space-x-3 text-xs text-amber-900">
                  <ShieldCheck size={20} className="text-amber-800 shrink-0" />
                  <p>
                    Your details are securely saved locally for convenient one-click Cash on Delivery (COD) express checkout in Sri Lanka.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

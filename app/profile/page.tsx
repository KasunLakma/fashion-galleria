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
  LogOut,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import OrderTrackerView from "@/components/shop/OrderTrackerView";

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
  const [customerEmail, setCustomerEmail] = useState<string>("");
  const [loginEmailInput, setLoginEmailInput] = useState<string>("");
  const [loginError, setLoginError] = useState<string | null>(null);

  const [profile, setProfile] = useState<UserProfile>({
    name: "Customer Account",
    email: "",
    phone: "",
    address: "",
    city: "Colombo",
    district: "Colombo",
  });

  const [customerOrders, setCustomerOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState<boolean>(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  // Load saved session on initial mount
  useEffect(() => {
    try {
      const savedEmail = localStorage.getItem("fg_customer_email");
      const savedUser = localStorage.getItem("fg_user_profile");

      let activeEm = savedEmail ? savedEmail.trim() : "";

      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        setProfile(parsed);
        if (!activeEm && parsed.email) {
          activeEm = parsed.email.trim();
        }
      }

      if (activeEm && activeEm.includes("@")) {
        setCustomerEmail(activeEm);
        setLoginEmailInput(activeEm);
        fetchOrdersForEmail(activeEm);
      }
    } catch {
      // ignore
    }
  }, []);

  const fetchOrdersForEmail = async (emailStr: string) => {
    const clean = emailStr.trim().toLowerCase();
    if (!clean || !clean.includes("@")) return;

    setLoadingOrders(true);
    try {
      const res = await fetch(`/api/orders/${encodeURIComponent(clean)}`);
      const data = await res.json();

      if (data.success && Array.isArray(data.orders)) {
        setCustomerOrders(data.orders);

        // Auto-extract customer details from recent order if profile is empty
        if (data.orders.length > 0) {
          const latest = data.orders[0];
          setProfile((prev) => ({
            name: latest.customerName || prev.name || "Customer Account",
            email: clean,
            phone: latest.primaryPhone || prev.phone || "",
            address: latest.address || prev.address || "",
            city: latest.city || prev.city || "Colombo",
            district: latest.district || prev.district || "Colombo",
          }));
        }
      } else {
        setCustomerOrders([]);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    const cleanInput = loginEmailInput.trim().toLowerCase();

    if (!cleanInput || !cleanInput.includes("@")) {
      setLoginError("Please enter a valid registered email address.");
      return;
    }

    // Save session locally
    try {
      localStorage.setItem("fg_customer_email", cleanInput);
      const savedProf = localStorage.getItem("fg_user_profile");
      const profObj = savedProf ? JSON.parse(savedProf) : {};
      localStorage.setItem(
        "fg_user_profile",
        JSON.stringify({ ...profObj, email: cleanInput })
      );
    } catch {
      // ignore
    }

    setCustomerEmail(cleanInput);
    fetchOrdersForEmail(cleanInput);
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("fg_customer_email");
    } catch {
      // ignore
    }
    setCustomerEmail("");
    setCustomerOrders([]);
    setLoginEmailInput("");
    setSelectedOrderId(null);
  };

  // 1. Expand Specific Order Tracker View
  if (selectedOrderId) {
    return (
      <div>
        <div className="bg-stone-900 text-white py-3 px-4 text-center text-xs border-b border-stone-800 flex items-center justify-center space-x-3">
          <button
            onClick={() => setSelectedOrderId(null)}
            className="inline-flex items-center space-x-1 text-amber-400 hover:text-white font-bold uppercase"
          >
            <ArrowLeft size={14} />
            <span>Back to My Orders Dashboard</span>
          </button>
          <span>•</span>
          <span>Tracking Order Reference: <strong className="font-mono text-white font-bold">{selectedOrderId}</strong></span>
        </div>
        <OrderTrackerView orderId={selectedOrderId} />
      </div>
    );
  }

  // 2. Streamlined Customer Portal Login (If Not Logged In)
  if (!customerEmail) {
    return (
      <div className="bg-stone-50 min-h-screen py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto space-y-8 animate-fade-in">
          {/* Navigation Breadcrumb */}
          <div className="flex items-center space-x-2 text-xs uppercase tracking-wider text-stone-500 justify-center">
            <Link href="/" className="hover:text-black transition-colors">
              Home
            </Link>
            <ChevronRight size={12} />
            <span className="font-bold text-stone-900">Customer Portal Login</span>
          </div>

          {/* Login Card */}
          <div className="bg-white border border-stone-200 shadow-xl rounded-xs p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-3 pb-6 border-b border-stone-200">
              <div className="w-16 h-16 bg-stone-900 text-amber-400 rounded-full flex items-center justify-center mx-auto mb-2 border-2 border-stone-800 shadow-md">
                <User size={30} />
              </div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-amber-800 font-extrabold block">
                CEYLON ATELIER
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold uppercase tracking-tight text-stone-900">
                Customer Portal Login
              </h1>
              <p className="text-xs text-stone-600 leading-relaxed">
                Enter your registered email address to access your complete order history, courier delivery logs, and address profile.
              </p>
            </div>

            {/* Email Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-stone-900 mb-2">
                  REGISTERED EMAIL ADDRESS <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3.5 top-3.5 text-stone-400" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address (e.g. dinuka@example.com)..."
                    value={loginEmailInput}
                    onChange={(e) => setLoginEmailInput(e.target.value)}
                    className="w-full text-xs font-semibold uppercase tracking-wider pl-10 pr-4 py-3.5 border border-stone-300 rounded-xs focus:outline-none focus:border-amber-800 bg-white shadow-xs"
                  />
                </div>
              </div>

              {loginError && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-xs flex items-center space-x-2">
                  <AlertCircle size={16} className="shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-800 via-stone-900 to-black hover:from-amber-900 hover:to-black text-white text-xs uppercase tracking-[0.2em] font-extrabold py-4 px-4 transition-all shadow-md flex items-center justify-center space-x-2"
              >
                <span>VIEW MY ORDERS</span>
                <ArrowRight size={16} />
              </button>
            </form>

            <div className="pt-4 border-t border-stone-200 text-center space-y-2">
              <span className="text-[11px] text-stone-500 block">
                Have an Order Reference Number instead?
              </span>
              <Link
                href="/track-order"
                className="text-xs uppercase font-bold tracking-wider text-amber-800 hover:text-black underline block"
              >
                Track via Order Reference →
              </Link>
            </div>
          </div>

          <div className="bg-stone-100 p-4 border border-stone-200 text-center text-xs text-stone-600 rounded-xs space-y-1">
            <div className="flex items-center justify-center space-x-1.5 font-bold text-stone-900">
              <ShieldCheck size={16} className="text-emerald-700" />
              <span>Passwordless Instant Access</span>
            </div>
            <p className="text-[11px]">
              Doorstep Cash on Delivery (COD) islandwide support for all Sri Lankan customers.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 3. Logged-In Customer Dashboard & Order History View
  return (
    <div className="bg-stone-50 min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between text-xs uppercase tracking-wider text-stone-500">
          <div className="flex items-center space-x-2">
            <Link href="/" className="hover:text-black transition-colors">
              Home
            </Link>
            <ChevronRight size={12} />
            <span className="font-bold text-stone-900">Customer Account & Orders</span>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center space-x-1.5 text-stone-600 hover:text-red-700 font-bold uppercase transition-colors"
          >
            <LogOut size={14} />
            <span>Logout / Switch Email</span>
          </button>
        </div>

        {/* Customer Header Banner */}
        <div className="bg-stone-950 text-white rounded-xs p-6 sm:p-8 shadow-xl border border-stone-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-amber-800 text-amber-200 flex items-center justify-center font-serif text-2xl font-bold border-2 border-amber-600/50 shrink-0 shadow-md">
              {profile.name ? profile.name.charAt(0).toUpperCase() : <User size={28} />}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] uppercase tracking-[0.3em] text-amber-400 font-extrabold block">
                  CEYLON ATELIER CUSTOMER
                </span>
                <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[9px] font-bold px-2 py-0.2 rounded uppercase">
                  ACTIVE SESSION
                </span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white mt-0.5">
                {profile.name || "Customer Account"}
              </h1>
              <p className="text-xs text-stone-400 mt-1 flex flex-wrap items-center gap-2">
                <span className="text-amber-300 font-semibold">{customerEmail}</span>
                {profile.phone && (
                  <>
                    <span>•</span>
                    <span>{profile.phone}</span>
                  </>
                )}
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
            <button
              onClick={handleLogout}
              className="inline-flex items-center space-x-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-xs transition-colors border border-stone-700"
            >
              <LogOut size={14} />
              <span>Switch Email</span>
            </button>
            <Link
              href="/track-order"
              className="inline-flex items-center space-x-2 bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-xs transition-colors shadow-sm"
            >
              <Truck size={15} />
              <span>LIVE TRACKER</span>
            </Link>
          </div>
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
              <span>My Orders History {customerOrders.length > 0 ? `(${customerOrders.length})` : "(0)"}</span>
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
              <span>Customer Profile Details</span>
            </button>
          </div>

          {/* Tab Body */}
          <div className="p-6 sm:p-8">
            {activeTab === "orders" ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                  <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-stone-900">
                    Complete Order History for {customerEmail}
                  </h3>
                  <button
                    onClick={() => fetchOrdersForEmail(customerEmail)}
                    disabled={loadingOrders}
                    className="text-xs text-amber-800 hover:underline font-bold uppercase flex items-center space-x-1"
                  >
                    <RefreshCw size={12} className={loadingOrders ? "animate-spin" : ""} />
                    <span>Refresh Orders</span>
                  </button>
                </div>

                {loadingOrders ? (
                  <div className="py-12 text-center text-xs text-stone-500 font-bold uppercase tracking-widest flex items-center justify-center space-x-2">
                    <RefreshCw size={18} className="animate-spin text-amber-800" />
                    <span>Retrieving Your Orders from Database...</span>
                  </div>
                ) : customerOrders.length > 0 ? (
                  <div className="space-y-4">
                    {customerOrders.map((order) => {
                      const isDelivered = order.status === "Delivered" || order.status === "Completed";
                      const isCancelled = order.status.toLowerCase() === "cancelled";

                      return (
                        <div
                          key={order.id}
                          className="border border-stone-200 rounded-xs p-5 hover:border-amber-800 transition-all bg-stone-50 hover:bg-white shadow-xs space-y-4"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-3">
                            <div>
                              <div className="flex items-center space-x-2">
                                <strong className="font-serif text-lg font-bold text-stone-900">
                                  #{order.orderNumber}
                                </strong>
                                <span
                                  className={`text-[9px] uppercase font-extrabold px-2 py-0.5 rounded border ${
                                    isCancelled
                                      ? "bg-red-100 text-red-900 border-red-300"
                                      : isDelivered
                                      ? "bg-emerald-100 text-emerald-900 border-emerald-300"
                                      : "bg-amber-100 text-amber-900 border-amber-300"
                                  }`}
                                >
                                  {order.status}
                                </span>
                              </div>
                              <span className="text-xs text-stone-500 block mt-0.5">
                                Placed on {new Date(order.createdAt).toLocaleString("en-LK", { dateStyle: "medium", timeStyle: "short" })}
                              </span>
                            </div>

                            <div className="text-left sm:text-right">
                              <span className="text-[10px] text-stone-500 uppercase tracking-widest block font-bold">
                                Grand Total ({order.paymentMethod || "COD"})
                              </span>
                              <span className="font-serif text-lg font-extrabold text-amber-800">
                                LKR {order.grandTotal.toLocaleString()}
                              </span>
                            </div>
                          </div>

                          {/* Purchased Items Thumbnail Row */}
                          <div className="flex flex-wrap items-center gap-3">
                            {order.items?.map((item: any) => (
                              <div key={item.id} className="flex items-center space-x-2 bg-white border border-stone-200 p-1.5 rounded-xs text-xs">
                                {item.image ? (
                                  /* eslint-disable-next-line @next/next/no-img-element */
                                  <img src={item.image} alt={item.title} className="w-8 h-10 object-cover rounded-xs border shrink-0" />
                                ) : (
                                  <Package size={16} className="text-stone-400 shrink-0" />
                                )}
                                <div className="text-[11px]">
                                  <p className="font-bold text-stone-900 max-w-[140px] truncate">{item.title}</p>
                                  <p className="text-stone-500">Qty: {item.quantity} | Size: {item.size}</p>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="pt-2 flex items-center justify-between">
                            <span className="text-[11px] text-stone-500">
                              Recipient: <strong className="text-stone-800">{order.customerName}</strong> ({order.city})
                            </span>
                            <button
                              onClick={() => setSelectedOrderId(order.orderNumber)}
                              className="inline-flex items-center space-x-2 bg-stone-900 hover:bg-amber-800 text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xs transition-colors"
                            >
                              <span>VIEW LIVE TRACKING & DETAILS</span>
                              <ArrowRight size={14} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="bg-stone-50 border border-stone-200 p-8 text-center space-y-4 rounded-xs">
                    <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center mx-auto">
                      <Package size={24} />
                    </div>
                    <div>
                      <h4 className="font-serif text-base font-bold uppercase text-stone-900">
                        No Active Orders Found for {customerEmail}
                      </h4>
                      <p className="text-xs text-stone-600 max-w-md mx-auto mt-1">
                        If you recently placed an order using a different email address or cash on delivery account, you can switch email or search by Order Reference.
                      </p>
                    </div>
                    <div className="pt-2 flex flex-wrap justify-center gap-3">
                      <Link
                        href="/shop"
                        className="inline-flex items-center space-x-2 bg-stone-900 text-white text-xs uppercase tracking-widest px-6 py-3 font-bold hover:bg-amber-800 transition-colors"
                      >
                        <ShoppingBag size={14} />
                        <span>Explore Shop Collection</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="inline-flex items-center space-x-2 bg-white border border-stone-300 text-stone-800 text-xs uppercase tracking-widest px-6 py-3 font-bold hover:border-black transition-colors"
                      >
                        <LogOut size={14} />
                        <span>Try Different Email</span>
                      </button>
                    </div>
                  </div>
                )}
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
                        <span className="text-[10px] text-stone-500 uppercase block font-bold">Account Holder Name</span>
                        <p className="font-serif text-sm font-bold text-stone-900">{profile.name || "Customer"}</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-stone-500 uppercase block font-bold">Registered Email</span>
                        <p className="text-stone-900 font-semibold">{customerEmail}</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-stone-500 uppercase block font-bold">Primary Phone</span>
                        <p className="font-mono text-stone-900 font-semibold">{profile.phone || "Not provided"}</p>
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
                    Your contact information is automatically updated whenever you place a Cash on Delivery (COD) order.
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

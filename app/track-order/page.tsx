"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Search,
  Truck,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  RefreshCw,
  Package,
  Calendar,
  CreditCard,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Mail,
  User,
  ArrowLeft,
} from "lucide-react";
import OrderTrackerView from "@/components/shop/OrderTrackerView";

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("id") || searchParams.get("email") || "";
  const [inputQuery, setInputQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Results state
  const [singleOrder, setSingleOrder] = useState<any | null>(null);
  const [emailOrders, setEmailOrders] = useState<any[] | null>(null);
  const [activeEmail, setActiveEmail] = useState<string | null>(null);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const performLookup = async (query: string) => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    setSingleOrder(null);
    setEmailOrders(null);

    const cleanQuery = query.trim();

    try {
      const res = await fetch(`/api/orders/${encodeURIComponent(cleanQuery)}`);
      const data = await res.json();

      if (!data.success) {
        setError(data.error || "No matching orders found.");
        setLoading(false);
        return;
      }

      if (data.type === "email" && Array.isArray(data.orders)) {
        setEmailOrders(data.orders);
        setActiveEmail(data.email || cleanQuery);

        // Store customer email in localStorage for persistent profile session
        try {
          localStorage.setItem("fg_customer_email", data.email || cleanQuery);
          const savedProf = localStorage.getItem("fg_user_profile");
          const profObj = savedProf ? JSON.parse(savedProf) : {};
          localStorage.setItem(
            "fg_user_profile",
            JSON.stringify({ ...profObj, email: data.email || cleanQuery })
          );
        } catch {
          // ignore
        }
      } else if (data.order) {
        setSingleOrder(data.order);
        if (data.order.email) {
          try {
            localStorage.setItem("fg_customer_email", data.order.email);
          } catch {
            // ignore
          }
        }
      } else {
        setError("No matching order or email records found.");
      }
    } catch (err) {
      console.error("Lookup error:", err);
      setError("Failed to fetch tracking data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery) {
      performLookup(initialQuery);
    }
  }, [initialQuery]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performLookup(inputQuery);
  };

  // View single order view inside email search or direct search
  if (expandedOrderId) {
    return (
      <div>
        <div className="bg-stone-900 text-white py-3 px-4 text-center text-xs border-b border-stone-800 flex items-center justify-center space-x-3">
          <button
            onClick={() => setExpandedOrderId(null)}
            className="inline-flex items-center space-x-1 text-amber-400 hover:text-white font-bold uppercase"
          >
            <ArrowLeft size={14} />
            <span>Back to All Orders List</span>
          </button>
          <span>•</span>
          <span>Order Reference: <strong className="font-mono text-white font-bold">{expandedOrderId}</strong></span>
        </div>
        <OrderTrackerView orderId={expandedOrderId} />
      </div>
    );
  }

  if (singleOrder) {
    return (
      <div>
        <div className="bg-stone-900 text-white py-3 px-4 text-center text-xs border-b border-stone-800 flex items-center justify-center space-x-2">
          <span>Tracking Order Reference: <strong className="font-mono text-amber-400 font-bold">{singleOrder.orderNumber}</strong></span>
          <button
            onClick={() => {
              setSingleOrder(null);
              setInputQuery("");
            }}
            className="text-[10px] text-stone-400 hover:text-white underline font-bold uppercase ml-2"
          >
            Track Different Order / Email
          </button>
        </div>
        <OrderTrackerView orderId={singleOrder.orderNumber} />
      </div>
    );
  }

  return (
    <div className="bg-stone-50 min-h-screen py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between text-xs uppercase tracking-wider text-stone-500">
          <div className="flex items-center space-x-2">
            <Link href="/" className="hover:text-black transition-colors">
              Home
            </Link>
            <ChevronRight size={12} />
            <span className="font-bold text-stone-900">Order Tracking & Delivery Status</span>
          </div>

          <Link href="/profile" className="flex items-center space-x-1 text-amber-800 hover:text-black font-bold">
            <User size={14} />
            <span>My Account Dashboard</span>
          </Link>
        </div>

        {/* Title & Lookup Card */}
        <div className="bg-white border border-stone-200 shadow-xl rounded-xs p-6 sm:p-10 space-y-6">
          <div className="text-center space-y-3 pb-6 border-b border-stone-200">
            <div className="w-16 h-16 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center mx-auto mb-2">
              <Truck size={32} />
            </div>
            <span className="text-xs uppercase tracking-[0.3em] text-amber-800 font-extrabold block">
              SRI LANKA EXPRESS DELIVERY
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold uppercase tracking-tight text-stone-900">
              Track Your Order Status
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto leading-relaxed">
              Enter your <strong className="text-stone-900">Order Reference Number</strong> (e.g. <span className="font-mono font-bold text-amber-800">FG-849201</span>) OR your <strong className="text-stone-900">Registered Email Address</strong> to view live fulfillment updates and courier progress.
            </p>
          </div>

          {/* Lookup Form */}
          <form onSubmit={handleFormSubmit} className="space-y-4 pt-2 max-w-xl mx-auto">
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-stone-900 mb-2">
                ORDER REFERENCE OR EMAIL ADDRESS <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <Search size={20} className="absolute left-4 top-3.5 text-stone-400" />
                <input
                  type="text"
                  required
                  placeholder="Enter Order Reference (e.g. FG-849201) OR Email Address..."
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  className="w-full text-sm font-semibold uppercase tracking-wider pl-12 pr-4 py-3.5 border border-stone-300 rounded-xs focus:outline-none focus:border-amber-800 bg-white shadow-xs"
                />
              </div>
              <p className="text-[11px] text-stone-500 mt-1.5 flex items-center justify-between">
                <span>Tip: Searching by Email displays all past & current orders.</span>
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-800 via-stone-900 to-black hover:from-amber-900 hover:to-black text-white text-xs uppercase tracking-[0.2em] font-extrabold py-4 px-6 transition-all shadow-md flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <RefreshCw size={16} className="animate-spin text-amber-400" />
                  <span>SEARCHING ORDERS...</span>
                </>
              ) : (
                <>
                  <span>SEARCH & TRACK</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 text-xs p-4 rounded-xs flex items-center space-x-2 max-w-xl mx-auto">
              <AlertCircle size={18} className="text-red-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Email Search Multi-Order List Results */}
        {emailOrders && emailOrders.length > 0 && (
          <div className="bg-white border border-stone-200 shadow-xl rounded-xs p-6 sm:p-8 space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-200 pb-4 gap-2">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-amber-800 font-extrabold block">
                  CUSTOMER ORDER HISTORY
                </span>
                <h2 className="font-serif text-xl sm:text-2xl font-bold uppercase tracking-tight text-stone-900">
                  Orders for {activeEmail} ({emailOrders.length})
                </h2>
              </div>
              <button
                onClick={() => {
                  setEmailOrders(null);
                  setActiveEmail(null);
                  setInputQuery("");
                }}
                className="text-xs text-stone-500 hover:text-black font-semibold uppercase underline"
              >
                Clear Search Results
              </button>
            </div>

            <div className="space-y-4">
              {emailOrders.map((order) => {
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
                          Placed on {new Date(order.createdAt).toLocaleString("en-LK", { dateStyle: "medium" })}
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
                            <img src={item.image} alt={item.title} className="w-8 h-10 object-cover rounded-xs border" />
                          ) : (
                            <Package size={16} className="text-stone-400" />
                          )}
                          <div className="text-[11px]">
                            <p className="font-bold text-stone-900 max-w-[120px] truncate">{item.title}</p>
                            <p className="text-stone-500">Qty: {item.quantity} | Size: {item.size}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* View Details Button */}
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => setExpandedOrderId(order.orderNumber)}
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
          </div>
        )}

        {/* Informational Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-700">
          <div className="bg-white p-5 border border-stone-200 rounded-xs space-y-2">
            <div className="flex items-center space-x-2 font-bold text-stone-900 uppercase">
              <Truck size={18} className="text-amber-800" />
              <span>Colombo & Outstation Delivery</span>
            </div>
            <p className="text-stone-600 leading-relaxed">
              • <strong>Colombo & Suburbs:</strong> Delivered within 24 - 48 Hours.
              <br />
              • <strong>Outstation Districts:</strong> Delivered within 2 - 3 Working Days.
            </p>
          </div>

          <div className="bg-white p-5 border border-stone-200 rounded-xs space-y-2">
            <div className="flex items-center space-x-2 font-bold text-stone-900 uppercase">
              <ShieldCheck size={18} className="text-emerald-700" />
              <span>Cash on Delivery (COD)</span>
            </div>
            <p className="text-stone-600 leading-relaxed">
              Prepare exact cash for the courier agent upon arrival. You can inspect your luxury items before making payment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-stone-50 min-h-screen py-16 flex justify-center items-center text-xs font-bold uppercase tracking-widest text-stone-600">
          <RefreshCw size={24} className="animate-spin text-amber-800 mr-2" />
          <span>Loading Order Tracking...</span>
        </div>
      }
    >
      <TrackOrderContent />
    </Suspense>
  );
}

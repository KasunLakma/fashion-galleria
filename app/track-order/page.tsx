"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, Truck, ArrowRight, ShieldCheck, ChevronRight, RefreshCw } from "lucide-react";
import OrderTrackerView from "@/components/shop/OrderTrackerView";

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialOrderId = searchParams.get("id") || "";
  const [inputQuery, setInputQuery] = useState(initialOrderId);
  const [activeOrderId, setActiveOrderId] = useState(initialOrderId);

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;
    const cleanId = inputQuery.trim();
    setActiveOrderId(cleanId);
  };

  if (activeOrderId) {
    return (
      <div>
        <div className="bg-stone-900 text-white py-3 px-4 text-center text-xs border-b border-stone-800 flex items-center justify-center space-x-2">
          <span>Tracking Order Reference: <strong className="font-mono text-amber-400 font-bold">{activeOrderId}</strong></span>
          <button
            onClick={() => {
              setActiveOrderId("");
              setInputQuery("");
            }}
            className="text-[10px] text-stone-400 hover:text-white underline font-bold uppercase ml-2"
          >
            Track Different Order
          </button>
        </div>
        <OrderTrackerView orderId={activeOrderId} />
      </div>
    );
  }

  return (
    <div className="bg-stone-50 min-h-screen py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs uppercase tracking-wider text-stone-500">
          <Link href="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <ChevronRight size={12} />
          <span className="font-bold text-stone-900">Order Tracking & Delivery Status</span>
        </div>

        {/* Title Header Card */}
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
            <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
              Enter your Order Reference Number (e.g. <strong className="font-mono text-stone-900 font-bold">FG-849201</strong>) to view real-time courier fulfillment status and delivery progression.
            </p>
          </div>

          {/* Lookup Form */}
          <form onSubmit={handleLookup} className="space-y-4 pt-2 max-w-xl mx-auto">
            <div>
              <label className="block text-xs uppercase tracking-wider font-bold text-stone-900 mb-2">
                Order Reference Number <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <Search size={20} className="absolute left-4 top-3.5 text-stone-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. FG-849201 or Order ID"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  className="w-full text-sm font-semibold uppercase tracking-wider pl-12 pr-4 py-3.5 border border-stone-300 rounded-xs focus:outline-none focus:border-amber-800 bg-white shadow-xs"
                />
              </div>
              <p className="text-[11px] text-stone-500 mt-1.5">
                Your order reference number was provided on your post-checkout receipt and confirmation SMS/email.
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-amber-800 via-stone-900 to-black hover:from-amber-900 hover:to-black text-white text-xs uppercase tracking-[0.2em] font-extrabold py-4 px-6 transition-all shadow-md flex items-center justify-center space-x-2"
            >
              <span>TRACK MY PACKAGE</span>
              <ArrowRight size={16} />
            </button>
          </form>
        </div>

        {/* Informational Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-700">
          <div className="bg-white p-5 border border-stone-200 rounded-xs space-y-2">
            <div className="flex items-center space-x-2 font-bold text-stone-900 uppercase">
              <Truck size={18} className="text-amber-800" />
              <span>Colombo & Outstation Timelines</span>
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

"use client";

import { use, useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, Truck, ShieldCheck, ShoppingBag, ArrowRight } from "lucide-react";
import { trackPurchase } from "@/components/analytics/Pixels";

export default function OrderSuccessPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const orderId = resolvedParams.id;

  useEffect(() => {
    // Fire social tracking purchase pixel
    trackPurchase(orderId, 11490, 1);
  }, [orderId]);

  return (
    <div className="bg-stone-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white border border-stone-200 shadow-xl rounded-xs p-6 sm:p-10 space-y-8 animate-fade-in">
        {/* Header */}
        <div className="text-center space-y-3 pb-6 border-b border-stone-200">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-2 animate-bounce">
            <CheckCircle2 size={36} />
          </div>
          <span className="text-xs uppercase tracking-[0.3em] text-emerald-800 font-extrabold block">
            ORDER CONFIRMED (CASH ON DELIVERY)
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold uppercase tracking-tight text-stone-900">
            Order #{orderId} Received!
          </h1>
          <p className="text-xs text-stone-600">
            Thank you for shopping with Fashion Galleria Sri Lanka. Your order is being packed at our Colombo atelier.
          </p>
        </div>

        {/* Delivery Timeline Banner */}
        <div className="bg-amber-50 border border-amber-200 p-5 rounded-xs text-xs text-stone-800 space-y-2">
          <div className="flex items-center space-x-2 text-amber-900 font-bold uppercase tracking-wider">
            <Truck size={18} />
            <span>Islandwide Cash on Delivery Scheduled</span>
          </div>
          <p className="text-stone-600">
            Our courier partner will deliver your package directly to your doorstep. Please have exact cash ready for the delivery agent.
          </p>
          <div className="pt-2 border-t border-amber-200/60 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-semibold text-amber-800">
            <span>📦 Colombo & Suburbs: 24 - 48 Hours</span>
            <span>📦 Outstation Islandwide: 2 - 3 Days</span>
          </div>
        </div>

        {/* Guarantees */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-700">
          <div className="bg-stone-50 p-4 border border-stone-200 rounded-xs space-y-1">
            <strong className="block text-stone-900 font-bold uppercase tracking-wider text-[11px] flex items-center space-x-1">
              <ShieldCheck size={14} className="text-emerald-700" />
              <span>7-Day Size Exchange</span>
            </strong>
            <p className="text-[11px] text-stone-500">
              Need a size swap? Our courier will pick up and exchange your item door-to-door.
            </p>
          </div>

          <div className="bg-stone-50 p-4 border border-stone-200 rounded-xs space-y-1">
            <strong className="block text-stone-900 font-bold uppercase tracking-wider text-[11px] flex items-center space-x-1">
              <ShoppingBag size={14} className="text-amber-800" />
              <span>Customer Care Support</span>
            </strong>
            <p className="text-[11px] text-stone-500">
              Questions about your delivery? Call us at +94 11 700 8000 or WhatsApp support.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center space-x-2 w-full bg-black text-white py-4 text-xs uppercase tracking-[0.2em] font-bold hover:bg-amber-800 transition-colors shadow-md"
          >
            <span>Continue Shopping Atelier Collection</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}

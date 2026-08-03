"use client";

import Link from "next/link";
import {
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  PackageCheck,
  ShieldCheck,
  PhoneCall,
  Clock,
  ArrowRight,
  HelpCircle,
} from "lucide-react";

export default function ReturnsPage() {
  return (
    <div className="bg-white min-h-screen font-sans selection:bg-amber-100 selection:text-amber-900">
      {/* Header Banner */}
      <section className="bg-stone-950 text-white py-16 sm:py-20 border-b border-stone-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <span className="inline-flex items-center space-x-2 text-amber-400 text-xs tracking-[0.3em] uppercase font-bold bg-amber-950/60 border border-amber-800/60 px-3.5 py-1 rounded-full">
            <RotateCcw size={14} />
            <span>HASSLE-FREE GUARANTEE</span>
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase">
            Returns & Exchanges Policy
          </h1>

          <p className="text-stone-300 text-xs sm:text-sm max-w-xl mx-auto font-light leading-relaxed">
            We want you to love your Fashion Galleria pieces. If a size or fit isn&apos;t perfect, we offer seamless 7-day door-to-door courier exchanges across Sri Lanka.
          </p>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-12 sm:py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* 3 Step Exchange Process Cards */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-amber-800 text-xs font-bold uppercase tracking-[0.3em] block">
              SIMPLE 3-STEP FLOW
            </span>
            <h2 className="font-serif text-2xl font-bold uppercase text-stone-900 mt-1">
              How To Initiate An Exchange
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-stone-50 p-6 border border-stone-200 rounded-xs space-y-3 relative">
              <span className="w-8 h-8 bg-amber-800 text-white text-xs font-bold flex items-center justify-center rounded-full">
                1
              </span>
              <h3 className="font-serif text-sm font-bold uppercase text-stone-900">
                Notify Customer Support
              </h3>
              <p className="text-stone-600 text-xs leading-relaxed">
                Contact our Colombo Hotline or WhatsApp support at <strong className="text-stone-900">+94 77 123 4567</strong> within 7 days of receiving your order with your Order ID.
              </p>
            </div>

            <div className="bg-stone-50 p-6 border border-stone-200 rounded-xs space-y-3 relative">
              <span className="w-8 h-8 bg-amber-800 text-white text-xs font-bold flex items-center justify-center rounded-full">
                2
              </span>
              <h3 className="font-serif text-sm font-bold uppercase text-stone-900">
                Doorstep Courier Pick-Up
              </h3>
              <p className="text-stone-600 text-xs leading-relaxed">
                Our courier agent will pick up the item directly from your address and hand over your replacement size/garment in a single smooth visit.
              </p>
            </div>

            <div className="bg-stone-50 p-6 border border-stone-200 rounded-xs space-y-3 relative">
              <span className="w-8 h-8 bg-amber-800 text-white text-xs font-bold flex items-center justify-center rounded-full">
                3
              </span>
              <h3 className="font-serif text-sm font-bold uppercase text-stone-900">
                Quality Check & Confirmation
              </h3>
              <p className="text-stone-600 text-xs leading-relaxed">
                Once inspected by our atelier team, your exchange request is completed. If an item is out of stock, store credit or direct bank refund is issued.
              </p>
            </div>
          </div>
        </div>

        {/* Guidelines & Item Conditions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 sm:p-8 border border-stone-200 rounded-xs space-y-4 shadow-xs">
            <div className="flex items-center space-x-2 text-emerald-700 font-bold uppercase text-sm border-b border-stone-200 pb-3">
              <CheckCircle2 size={18} />
              <span>Eligible Item Conditions</span>
            </div>
            <ul className="space-y-3 text-xs text-stone-700">
              <li className="flex items-start space-x-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Items must be returned within <strong>7 days</strong> of delivery date.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Garments must be unworn, unwashed, unaltered, and free of makeup or perfume stains.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Original Fashion Galleria garment tags and security ribbons must remain attached.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Items must be returned in their original luxury protective polybag or box.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 sm:p-8 border border-stone-200 rounded-xs space-y-4 shadow-xs">
            <div className="flex items-center space-x-2 text-amber-800 font-bold uppercase text-sm border-b border-stone-200 pb-3">
              <AlertTriangle size={18} />
              <span>Non-Returnable Items & Exceptions</span>
            </div>
            <ul className="space-y-3 text-xs text-stone-700">
              <li className="flex items-start space-x-2">
                <span className="text-amber-700 font-bold">✕</span>
                <span>Final Clearance items discounted at 50% or more (size exchange subject to availability).</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-amber-700 font-bold">✕</span>
                <span>Intimate apparel, innerwear bodysuits, or custom tailored garments.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-amber-700 font-bold">✕</span>
                <span>Items missing original tags or showing signs of wear/washing.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-amber-700 font-bold">✕</span>
                <span>Return requests submitted after the 7-day post-delivery window.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Refund & Exchange Fees */}
        <div className="bg-stone-900 text-white p-6 sm:p-8 rounded-xs space-y-4">
          <h3 className="font-serif text-lg font-bold uppercase tracking-wider text-amber-400">
            Exchange Shipping & Refund Handling
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-stone-300">
            <div className="space-y-1.5">
              <strong className="text-white block font-bold uppercase">Size or Style Exchange Fee</strong>
              <p>
                If exchanging for a different size or color, a standard islandwide courier exchange fee of <strong>LKR 450</strong> applies. If the exchange is due to a rare manufacturing defect, Fashion Galleria covers all courier costs.
              </p>
            </div>

            <div className="space-y-1.5">
              <strong className="text-white block font-bold uppercase">Refund Method</strong>
              <p>
                Approved refunds are processed back via online bank transfer to your Sri Lankan bank account or credited as Fashion Galleria store credit vouchers within 3-5 business days.
              </p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center bg-amber-50 border border-amber-200 p-8 rounded-xs space-y-4">
          <h3 className="font-serif text-lg font-bold uppercase text-stone-900">
            Need Help With An Active Order?
          </h3>
          <p className="text-xs text-stone-600 max-w-md mx-auto">
            Our Colombo Customer Care team is available Monday to Saturday, 9:00 AM - 6:00 PM to assist with your return or exchange.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <a
              href="https://wa.me/94771234567"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-xs transition-colors inline-flex items-center space-x-2"
            >
              <PhoneCall size={16} />
              <span>WhatsApp Exchange Support</span>
            </a>
            <Link
              href="/track-order"
              className="bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-xs transition-colors inline-flex items-center space-x-2"
            >
              <PackageCheck size={16} />
              <span>Track Order Status</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import Link from "next/link";
import {
  Banknote,
  MapPin,
  PhoneCall,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Clock,
  HelpCircle,
  ArrowRight,
  PackageCheck,
} from "lucide-react";

export default function CODInfoPage() {
  const districts = [
    "Colombo 01-15",
    "Gampaha",
    "Kalutara",
    "Kandy",
    "Galle",
    "Matara",
    "Kurunegala",
    "Jaffna",
    "Trincomalee",
    "Batticaloa",
    "Ratnapura",
    "Badulla",
    "Nuwara Eliya",
    "Anuradhapura",
    "All 25 Sri Lanka Districts",
  ];

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-amber-100 selection:text-amber-900">
      {/* Top Banner */}
      <section className="bg-stone-950 text-white py-16 sm:py-20 border-b border-stone-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <span className="inline-flex items-center space-x-2 text-amber-400 text-xs tracking-[0.3em] uppercase font-bold bg-amber-950/60 border border-amber-800/60 px-3.5 py-1 rounded-full">
            <Banknote size={14} />
            <span>SRI LANKA DOORSTEP PAYMENT</span>
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase">
            Cash on Delivery (COD) Info
          </h1>

          <p className="text-stone-300 text-xs sm:text-sm max-w-xl mx-auto font-light leading-relaxed">
            Enjoy 100% risk-free shopping with islandwide doorstep payment. Pay in cash directly to our trusted courier agent upon receiving your luxury package.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* 3 Core COD Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 border border-stone-200 shadow-xs rounded-xs space-y-3">
            <div className="w-10 h-10 bg-amber-100 text-amber-900 rounded-full flex items-center justify-center font-bold">
              <PhoneCall size={20} />
            </div>
            <h3 className="font-serif text-sm font-bold uppercase text-stone-900">
              1. Phone / WhatsApp Verification
            </h3>
            <p className="text-stone-600 text-xs leading-relaxed">
              Once you place a COD order, our dispatch team verifies your address and contact number via call or SMS/WhatsApp before hand-off.
            </p>
          </div>

          <div className="bg-white p-6 border border-stone-200 shadow-xs rounded-xs space-y-3">
            <div className="w-10 h-10 bg-amber-100 text-amber-900 rounded-full flex items-center justify-center font-bold">
              <Truck size={20} />
            </div>
            <h3 className="font-serif text-sm font-bold uppercase text-stone-900">
              2. Fast Islandwide Dispatch
            </h3>
            <p className="text-stone-600 text-xs leading-relaxed">
              Your parcel is packed with luxury protective boxing and handed to our logistics partners (Pronto, Prompt, or Grasshoppers).
            </p>
          </div>

          <div className="bg-white p-6 border border-stone-200 shadow-xs rounded-xs space-y-3">
            <div className="w-10 h-10 bg-amber-100 text-amber-900 rounded-full flex items-center justify-center font-bold">
              <Banknote size={20} />
            </div>
            <h3 className="font-serif text-sm font-bold uppercase text-stone-900">
              3. Doorstep Payment & Receipt
            </h3>
            <p className="text-stone-600 text-xs leading-relaxed">
              Inspect your sealed package upon arrival, pay the exact order amount in LKR to the rider, and receive your printed tax invoice.
            </p>
          </div>
        </div>

        {/* District Coverage Box */}
        <div className="bg-stone-50 border border-stone-200 p-8 rounded-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
            <div>
              <span className="text-amber-800 text-xs font-bold uppercase tracking-[0.2em] block">
                NATIONWIDE COVERAGE
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold uppercase text-stone-900">
                100% Sri Lanka Delivery Coverage
              </h2>
            </div>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-extrabold px-3 py-1 rounded-full uppercase shrink-0">
              25 Districts Covered
            </span>
          </div>

          <p className="text-xs text-stone-600 leading-relaxed">
            Whether you reside in major commercial hubs or regional outstations, our courier network delivers straight to your doorstep:
          </p>

          <div className="flex flex-wrap gap-2">
            {districts.map((d, idx) => (
              <span
                key={idx}
                className="bg-white border border-stone-200 text-stone-800 text-xs font-semibold px-3 py-1.5 rounded-xs flex items-center space-x-1.5 shadow-2xs"
              >
                <MapPin size={12} className="text-amber-700" />
                <span>{d}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Terms & Important Guidelines */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 sm:p-8 border border-stone-200 rounded-xs space-y-4 shadow-xs">
            <h3 className="font-serif text-base font-bold uppercase text-stone-900 border-b border-stone-200 pb-3 flex items-center space-x-2">
              <CheckCircle2 size={18} className="text-emerald-700" />
              <span>COD Payment Rules</span>
            </h3>
            <ul className="space-y-3 text-xs text-stone-700">
              <li className="flex items-start space-x-2">
                <span className="text-amber-700 font-bold">•</span>
                <span>Payments must be made in Sri Lankan Rupees (LKR) cash directly to the courier agent.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-amber-700 font-bold">•</span>
                <span>Exact cash amounts are recommended for smooth and fast doorstep hand-offs.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-amber-700 font-bold">•</span>
                <span>Free delivery applies automatically to all COD orders over LKR 15,000.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 sm:p-8 border border-stone-200 rounded-xs space-y-4 shadow-xs">
            <h3 className="font-serif text-base font-bold uppercase text-stone-900 border-b border-stone-200 pb-3 flex items-center space-x-2">
              <ShieldCheck size={18} className="text-amber-800" />
              <span>Order Verification Policy</span>
            </h3>
            <ul className="space-y-3 text-xs text-stone-700">
              <li className="flex items-start space-x-2">
                <span className="text-amber-700 font-bold">•</span>
                <span>To prevent delivery failures, our team calls or texts to confirm your order before dispatch.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-amber-700 font-bold">•</span>
                <span>Unconfirmed COD orders may be temporarily paused until contact is established.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-amber-700 font-bold">•</span>
                <span>You can track your parcel anytime at `/track-order`.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="text-center bg-stone-900 text-white p-8 rounded-xs space-y-4">
          <h3 className="font-serif text-xl font-bold uppercase text-amber-400">
            Ready to Shop Luxury Workwear & Dresses?
          </h3>
          <p className="text-xs text-stone-300 max-w-md mx-auto">
            Explore our latest arrivals with full Cash on Delivery peace of mind.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              href="/shop"
              className="bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-xs transition-colors inline-flex items-center space-x-2 shadow-md"
            >
              <span>Browse Catalog</span>
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/returns"
              className="bg-stone-800 hover:bg-stone-700 text-white text-xs font-bold uppercase tracking-widest px-6 py-3.5 rounded-xs transition-colors border border-stone-700"
            >
              View 7-Day Return Policy
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

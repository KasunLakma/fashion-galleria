"use client";

import Link from "next/link";
import {
  Sparkles,
  ShieldCheck,
  MapPin,
  Truck,
  Heart,
  Award,
  Scissors,
  Feather,
  ArrowRight,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen font-sans selection:bg-amber-100 selection:text-amber-900">
      {/* Hero Section */}
      <section className="relative bg-stone-950 text-white py-24 sm:py-32 overflow-hidden border-b border-stone-800">
        {/* Subtle Decorative Background Glow */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10 space-y-6">
          <span className="inline-flex items-center space-x-2 text-amber-400 text-xs tracking-[0.35em] uppercase font-bold bg-amber-950/60 border border-amber-800/60 px-4 py-1.5 rounded-full">
            <Sparkles size={14} />
            <span>ESTABLISHED IN COLOMBO • SRI LANKA</span>
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white uppercase leading-tight">
            The Heritage of <span className="text-amber-400 italic font-normal">Fashion Galleria</span>
          </h1>

          <p className="text-stone-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Crafting timeless, contemporary silhouettes for the modern Sri Lankan lifestyle.
            Elevated workwear, resort luxury, and bespoke tailoring designed to empower everyday elegance.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link
              href="/shop"
              className="bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold tracking-[0.2em] uppercase px-8 py-4 transition-all shadow-md hover:shadow-xl inline-flex items-center space-x-2 rounded-xs"
            >
              <span>Explore Collection</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6">
            <span className="text-amber-800 text-xs font-bold uppercase tracking-[0.3em] block">
              OUR ATELIER PHILOSOPHY
            </span>

            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-stone-900 uppercase leading-snug">
              Where European Luxury Meets Sri Lankan Artisanry
            </h2>

            <p className="text-stone-600 text-sm leading-relaxed">
              Founded with a passion for high-grade textiles and flawless fits, Fashion Galleria has grown into one of Sri Lanka&apos;s premier fashion houses. We believe luxury clothing should not be restricted to special occasions—it should define your everyday confidence.
            </p>

            <p className="text-stone-600 text-sm leading-relaxed">
              Every garment is meticulously prototyped at our flagship atelier in Colombo 07. We select Italian linen blends, structured cotton satins, and breathable crepe fabrics engineered specifically for tropical climates without compromising structural elegance.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-stone-200">
              <div>
                <span className="font-serif text-3xl font-bold text-amber-800 block">100%</span>
                <span className="text-xs text-stone-500 uppercase tracking-wider font-semibold">
                  Hand-Finished Details
                </span>
              </div>
              <div>
                <span className="font-serif text-3xl font-bold text-amber-800 block">25+</span>
                <span className="text-xs text-stone-500 uppercase tracking-wider font-semibold">
                  Districts COD Coverage
                </span>
              </div>
            </div>
          </div>

          {/* Visual Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80"
              alt="Fashion Galleria Atelier Craftsmanship"
              className="w-full h-72 sm:h-80 object-cover rounded-xs border border-stone-200 shadow-sm"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80"
              alt="Luxury Workwear Styling"
              className="w-full h-72 sm:h-80 object-cover rounded-xs border border-stone-200 shadow-sm mt-8"
            />
          </div>
        </div>
      </section>

      {/* 4 Brand Pillars */}
      <section className="bg-stone-50 py-16 sm:py-24 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-amber-800 text-xs font-bold uppercase tracking-[0.3em] block">
              OUR CORE VALUES
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-stone-900 uppercase">
              Built On Excellence & Trust
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm">
              We hold our products and customer service to the highest standards across Sri Lanka.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 border border-stone-200 shadow-xs text-center space-y-4 rounded-xs">
              <div className="w-12 h-12 bg-amber-50 text-amber-800 rounded-full flex items-center justify-center mx-auto border border-amber-200">
                <Scissors size={24} />
              </div>
              <h3 className="font-serif text-base font-bold uppercase text-stone-900">
                Master Tailoring
              </h3>
              <p className="text-stone-600 text-xs leading-relaxed">
                Expert pattern-making and reinforced stitching ensure perfect silhouettes and durable wearability.
              </p>
            </div>

            <div className="bg-white p-8 border border-stone-200 shadow-xs text-center space-y-4 rounded-xs">
              <div className="w-12 h-12 bg-amber-50 text-amber-800 rounded-full flex items-center justify-center mx-auto border border-amber-200">
                <Feather size={24} />
              </div>
              <h3 className="font-serif text-base font-bold uppercase text-stone-900">
                Premium Fabrics
              </h3>
              <p className="text-stone-600 text-xs leading-relaxed">
                Breathable Italian linens, soft viscose silks, and wrinkle-resistant workwear satins.
              </p>
            </div>

            <div className="bg-white p-8 border border-stone-200 shadow-xs text-center space-y-4 rounded-xs">
              <div className="w-12 h-12 bg-amber-50 text-amber-800 rounded-full flex items-center justify-center mx-auto border border-amber-200">
                <Truck size={24} />
              </div>
              <h3 className="font-serif text-base font-bold uppercase text-stone-900">
                Islandwide COD
              </h3>
              <p className="text-stone-600 text-xs leading-relaxed">
                100% Cash on Delivery across all 25 Sri Lankan districts with fast 24-48h dispatch.
              </p>
            </div>

            <div className="bg-white p-8 border border-stone-200 shadow-xs text-center space-y-4 rounded-xs">
              <div className="w-12 h-12 bg-amber-50 text-amber-800 rounded-full flex items-center justify-center mx-auto border border-amber-200">
                <ShieldCheck size={24} />
              </div>
              <h3 className="font-serif text-base font-bold uppercase text-stone-900">
                7-Day Exchanges
              </h3>
              <p className="text-stone-600 text-xs leading-relaxed">
                Doorstep exchange support for size and color adjustments so you shop with absolute confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Flagship Store Invitation */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900 text-white p-8 sm:p-12 rounded-xs shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-[0.3em] block">
              VISIT OUR BOUTIQUES
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold uppercase text-white">
              Experience Fashion Galleria In Person
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
              Visit our luxury boutiques in Colombo 07 and One Galle Face Mall to experience personal styling consultations and exclusive boutique-only collections.
            </p>
            <div className="pt-2 text-xs text-stone-400 space-y-1">
              <p className="flex items-center space-x-2">
                <MapPin size={16} className="text-amber-400 shrink-0" />
                <span>No. 45, Ward Place, Colombo 07 | Level 2, One Galle Face Mall</span>
              </p>
            </div>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Link
              href="/shop"
              className="bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold uppercase tracking-widest px-6 py-3.5 text-center transition-colors rounded-xs shadow-xs"
            >
              Shop Online Now
            </Link>
            <Link
              href="/cod-info"
              className="bg-stone-800 hover:bg-stone-700 text-white text-xs font-bold uppercase tracking-widest px-6 py-3.5 text-center transition-colors rounded-xs border border-stone-700"
            >
              COD & Delivery Info
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import { ArrowRight, Sparkles } from "lucide-react";

export default function HeroBanner() {
  return (
    <section className="relative min-h-[75vh] md:min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center bg-stone-950 text-white overflow-hidden">
      {/* Background Image Layer with subtle scale effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-65 scale-105 transition-transform duration-1000"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80')`,
        }}
      />
      
      {/* Dark Luxury Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />

      {/* Hero Content Overlay */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center space-y-6 md:space-y-8 py-16">
        {/* Season Pill Badge */}
        <div className="inline-flex items-center space-x-2 bg-black/50 backdrop-blur-md px-4 py-1.5 border border-amber-500/30 rounded-full shadow-lg">
          <Sparkles size={14} className="text-amber-400 animate-pulse" />
          <span className="text-amber-300 text-[10px] sm:text-xs font-semibold tracking-[0.3em] uppercase">
            NEW COLLECTION &apos;26 • SRI LANKA
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] uppercase">
          ELEVATE YOUR STYLE
        </h1>

        {/* Subtitle */}
        <p className="text-stone-300 text-sm sm:text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed tracking-wide">
          Discover the latest fashion apparel curated for you. Timeless tailoring, modern silhouettes, and island-inspired luxury.
        </p>

        {/* Prominent CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 max-w-md mx-auto">
          <a
            href="/shop"
            className="w-full sm:w-auto flex-1 bg-white text-black hover:bg-amber-600 hover:text-white transition-all duration-300 text-xs font-bold uppercase tracking-[0.2em] px-8 py-4 flex items-center justify-center space-x-2 shadow-lg hover:shadow-2xl group"
          >
            <span>SHOP ATELIER</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="/shop"
            className="w-full sm:w-auto flex-1 bg-transparent border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 text-xs font-bold uppercase tracking-[0.2em] px-8 py-4 flex items-center justify-center space-x-2 group"
          >
            <span>NEW ARRIVALS</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}

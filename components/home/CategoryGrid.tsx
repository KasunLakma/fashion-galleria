"use client";

import { CATEGORIES_DATA } from "@/data/mockData";
import { ArrowUpRight } from "lucide-react";

export default function CategoryGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12 space-y-2">
        <span className="text-xs uppercase tracking-[0.3em] text-amber-700 font-semibold block">
          CURATED SELECTIONS
        </span>
        <h2 className="font-serif text-2xl sm:text-4xl font-bold uppercase text-gray-900 tracking-wide">
          SHOP BY CATEGORY
        </h2>
        <div className="w-12 h-0.5 bg-black mx-auto mt-3" />
      </div>

      {/* Grid Layout: 2 cols on mobile, 4 cols on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {CATEGORIES_DATA.map((category) => (
          <a
            key={category.id}
            href={category.link}
            className="group relative h-[380px] sm:h-[420px] bg-stone-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-end"
          >
            {/* Background Image with Hover Scale */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={category.image}
              alt={category.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
            />
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent group-hover:from-black/90 transition-colors duration-300" />

            {/* Top Right Arrow Icon */}
            <div className="absolute top-4 right-4 z-10 w-9 h-9 bg-white/90 backdrop-blur-xs text-black rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-md">
              <ArrowUpRight size={18} />
            </div>

            {/* Bottom Content Container */}
            <div className="relative z-10 p-6 text-white space-y-1.5">
              <span className="text-[10px] uppercase tracking-widest text-amber-400 font-semibold block">
                {category.itemCount}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold uppercase tracking-wider leading-tight">
                {category.title}
              </h3>
              
              <div className="pt-2 flex items-center text-xs font-semibold uppercase tracking-widest text-stone-300 group-hover:text-white transition-colors">
                <span className="border-b border-white/40 pb-0.5 group-hover:border-white">
                  EXPLORE CATEGORY
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

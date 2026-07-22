"use client";

import { useEffect, useRef } from "react";
import { Search, X, TrendingUp, ArrowRight } from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const trendingSearches = [
  "Workwear Dresses",
  "Linen Shirts & Tops",
  "Printed Maxi Dresses",
  "Satin Evening Tops",
  "High-Waist Trousers",
  "Casual Jumpsuits",
];

const popularCategories = [
  { name: "New Arrivals", tag: "NEW" },
  { name: "Workwear Essentials", tag: "HOT" },
  { name: "Dresses & Jumpsuits", tag: "" },
  { name: "Men's Smart Casual", tag: "" },
  { name: "Clearance Sale", tag: "UP TO 50% OFF" },
];

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/60 backdrop-blur-sm animate-fade-in">
      {/* Search Header Container */}
      <div className="bg-white border-b border-gray-200 px-4 py-6 md:px-8 animate-slide-down shadow-lg">
        <div className="max-w-4xl mx-auto">
          {/* Top row with close button */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase tracking-widest font-semibold text-gray-500">
              SEARCH FASHION GALLERIA
            </span>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-black transition-colors rounded-full hover:bg-gray-100"
              aria-label="Close search modal"
            >
              <X size={20} />
            </button>
          </div>

          {/* Search Bar Input */}
          <div className="relative flex items-center border-b-2 border-black pb-2">
            <Search size={24} className="text-gray-400 mr-3" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search by dress, color, fabric, category..."
              className="w-full text-lg md:text-2xl font-serif text-black placeholder-gray-400 focus:outline-none bg-transparent"
            />
            <button className="hidden sm:flex items-center space-x-1 bg-black text-white text-xs uppercase tracking-widest px-4 py-2 hover:bg-gray-800 transition-colors font-medium">
              <span>Search</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Trending Searches */}
          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-center text-xs uppercase tracking-wider text-gray-400 font-semibold mb-3">
              <TrendingUp size={14} className="mr-1 text-amber-600" />
              <span>TRENDING SEARCHES IN SRI LANKA</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {trendingSearches.map((term, i) => (
                <button
                  key={i}
                  onClick={onClose}
                  className="px-3.5 py-1.5 bg-gray-100 hover:bg-black hover:text-white transition-all text-xs font-medium rounded-full text-gray-800"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          {/* Popular Categories */}
          <div className="mt-6">
            <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold block mb-3">
              POPULAR CATEGORIES
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {popularCategories.map((cat, i) => (
                <button
                  key={i}
                  onClick={onClose}
                  className="flex items-center justify-between p-3 border border-gray-200 hover:border-black transition-colors text-left text-sm"
                >
                  <span className="font-medium text-gray-900">{cat.name}</span>
                  {cat.tag && (
                    <span className="text-[10px] uppercase font-bold tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                      {cat.tag}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Click outside backdrop area */}
      <div className="flex-1" onClick={onClose} />
    </div>
  );
}

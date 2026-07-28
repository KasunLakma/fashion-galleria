"use client";

import { ArrowUpDown } from "lucide-react";

export type SortOption = "featured" | "price-low" | "price-high" | "newest" | "rating";

interface SortDropdownProps {
  value: SortOption;
  onChange: (sort: SortOption) => void;
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <div className="flex items-center space-x-2">
      <ArrowUpDown size={14} className="text-gray-500" />
      <span className="text-xs uppercase tracking-wider font-semibold text-gray-500 hidden sm:inline">
        Sort By:
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="bg-white border border-stone-300 text-xs font-semibold text-stone-900 py-1.5 px-3 rounded-xs focus:outline-none focus:border-amber-700 cursor-pointer uppercase tracking-wider"
      >
        <option value="featured">Featured Collection</option>
        <option value="newest">Newest Arrivals</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="rating">Highest Rated</option>
      </select>
    </div>
  );
}

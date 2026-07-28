"use client";

import { X, SlidersHorizontal, RotateCcw } from "lucide-react";

export interface FilterState {
  categories: string[];
  sizes: string[];
  colors: string[];
  maxPrice: number;
}

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onClearFilters: () => void;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
  totalResults: number;
}

const CATEGORY_OPTIONS = [
  "Dresses",
  "Tops & Shirts",
  "Trousers & Pants",
  "Accessories",
];

const SIZE_OPTIONS = ["XS", "S", "M", "L", "XL", "XXL", "One Size"];

const COLOR_OPTIONS = [
  { name: "Emerald Green", hex: "#046307", bgClass: "bg-emerald-800" },
  { name: "Midnight Black", hex: "#000000", bgClass: "bg-black" },
  { name: "Off White", hex: "#FAFAFA", bgClass: "bg-stone-100 border border-stone-300" },
  { name: "Navy Blue", hex: "#0A192F", bgClass: "bg-blue-950" },
  { name: "Champagne Gold", hex: "#D4AF37", bgClass: "bg-amber-500" },
  { name: "Terracotta", hex: "#E07A5F", bgClass: "bg-amber-800" },
  { name: "Ruby Red", hex: "#9B111E", bgClass: "bg-red-800" },
];

export default function FilterSidebar({
  filters,
  onFilterChange,
  onClearFilters,
  isMobileOpen = false,
  onMobileClose,
  totalResults,
}: FilterSidebarProps) {
  const toggleCategory = (cat: string) => {
    const nextCategories = filters.categories.includes(cat)
      ? filters.categories.filter((c) => c !== cat)
      : [...filters.categories, cat];
    onFilterChange({ ...filters, categories: nextCategories });
  };

  const toggleSize = (sz: string) => {
    const nextSizes = filters.sizes.includes(sz)
      ? filters.sizes.filter((s) => s !== sz)
      : [...filters.sizes, sz];
    onFilterChange({ ...filters, sizes: nextSizes });
  };

  const toggleColor = (colName: string) => {
    const nextColors = filters.colors.includes(colName)
      ? filters.colors.filter((c) => c !== colName)
      : [...filters.colors, colName];
    onFilterChange({ ...filters, colors: nextColors });
  };

  const handlePriceChange = (val: number) => {
    onFilterChange({ ...filters, maxPrice: val });
  };

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.sizes.length > 0 ||
    filters.colors.length > 0 ||
    filters.maxPrice < 25000;

  const content = (
    <div className="space-y-8">
      {/* Header & Reset */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-4">
        <div className="flex items-center space-x-2">
          <SlidersHorizontal size={18} className="text-amber-800" />
          <h3 className="font-serif text-sm uppercase tracking-widest font-bold text-gray-900">
            Refine Selection
          </h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center space-x-1 text-xs text-amber-800 hover:text-black font-semibold transition-colors uppercase tracking-wider"
          >
            <RotateCcw size={12} />
            <span>Reset All</span>
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div className="space-y-3">
        <h4 className="text-xs uppercase tracking-widest font-bold text-gray-900">
          Category
        </h4>
        <div className="space-y-2">
          {CATEGORY_OPTIONS.map((cat) => {
            const isChecked = filters.categories.includes(cat);
            return (
              <label
                key={cat}
                className="flex items-center space-x-2.5 cursor-pointer text-xs text-stone-700 hover:text-black transition-colors"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleCategory(cat)}
                  className="rounded-xs border-stone-300 text-amber-700 focus:ring-amber-500 w-4 h-4"
                />
                <span className={isChecked ? "font-bold text-black" : ""}>
                  {cat}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Size Filter */}
      <div className="space-y-3 border-t border-stone-100 pt-6">
        <h4 className="text-xs uppercase tracking-widest font-bold text-gray-900">
          Size
        </h4>
        <div className="flex flex-wrap gap-2">
          {SIZE_OPTIONS.map((sz) => {
            const isSelected = filters.sizes.includes(sz);
            return (
              <button
                key={sz}
                onClick={() => toggleSize(sz)}
                className={`text-xs font-bold px-3 py-1.5 rounded-xs border transition-all uppercase ${
                  isSelected
                    ? "bg-black text-white border-black"
                    : "bg-white text-stone-700 border-stone-300 hover:border-black"
                }`}
              >
                {sz}
              </button>
            );
          })}
        </div>
      </div>

      {/* Color Filter */}
      <div className="space-y-3 border-t border-stone-100 pt-6">
        <h4 className="text-xs uppercase tracking-widest font-bold text-gray-900">
          Color Palette
        </h4>
        <div className="flex flex-wrap gap-2.5">
          {COLOR_OPTIONS.map((col) => {
            const isSelected = filters.colors.includes(col.name);
            return (
              <button
                key={col.name}
                onClick={() => toggleColor(col.name)}
                title={col.name}
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-all p-0.5 ${
                  isSelected ? "ring-2 ring-amber-700 ring-offset-2 scale-110" : "hover:scale-105"
                }`}
              >
                <span className={`w-full h-full rounded-full ${col.bgClass}`} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-3 border-t border-stone-100 pt-6">
        <div className="flex items-center justify-between">
          <h4 className="text-xs uppercase tracking-widest font-bold text-gray-900">
            Price Range
          </h4>
          <span className="text-xs font-bold text-amber-800">
            Up to LKR {filters.maxPrice.toLocaleString()}
          </span>
        </div>
        <input
          type="range"
          min="3000"
          max="25000"
          step="500"
          value={filters.maxPrice}
          onChange={(e) => handlePriceChange(Number(e.target.value))}
          className="w-full accent-amber-800 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-gray-400 font-semibold uppercase">
          <span>LKR 3,000</span>
          <span>LKR 25,000</span>
        </div>
      </div>
    </div>
  );

  // Desktop Sidebar
  return (
    <>
      <aside className="hidden lg:block w-64 shrink-0 pr-8">
        {content}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={onMobileClose}
          />
          <div className="fixed inset-y-0 left-0 max-w-full flex">
            <div className="w-screen max-w-xs bg-white shadow-2xl flex flex-col">
              <div className="p-4 bg-black text-white flex items-center justify-between">
                <span className="font-serif text-sm tracking-widest font-bold uppercase">
                  Filters ({totalResults} Products)
                </span>
                <button
                  onClick={onMobileClose}
                  className="p-1 hover:bg-stone-800 rounded transition-colors text-stone-300 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 flex-1 overflow-y-auto custom-scrollbar">
                {content}
              </div>
              <div className="p-4 border-t border-stone-200 bg-stone-50">
                <button
                  onClick={onMobileClose}
                  className="w-full bg-black text-white py-3 text-xs uppercase tracking-widest font-bold hover:bg-amber-700 transition-colors"
                >
                  Apply Filters ({totalResults})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

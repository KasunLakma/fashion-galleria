"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { PRODUCTS_DATA, Product } from "@/data/mockData";
import FilterSidebar, { FilterState } from "@/components/shop/FilterSidebar";
import SortDropdown, { SortOption } from "@/components/shop/SortDropdown";
import ShopProductGrid from "@/components/shop/ShopProductGrid";
import { Filter, ChevronRight, Sparkles } from "lucide-react";

function ShopContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const filterParam = searchParams.get("filter");

  const [productsList, setProductsList] = useState<Product[]>(PRODUCTS_DATA);
  const [filters, setFilters] = useState<FilterState>({
    categories: categoryParam ? [categoryParam] : [],
    sizes: [],
    colors: [],
    maxPrice: 25000,
  });

  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Fetch products dynamically from database API endpoint
  useEffect(() => {
    fetch("/api/products", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.products) && data.products.length > 0) {
          setProductsList(data.products);
        }
      })
      .catch((err) => console.warn("Shop page fetch products error:", err));
  }, []);

  // Sync filters when searchParams URL changes
  useEffect(() => {
    if (categoryParam) {
      setFilters((prev) => ({ ...prev, categories: [categoryParam] }));
    } else {
      setFilters((prev) => ({ ...prev, categories: [] }));
    }
  }, [categoryParam]);

  const handleClearFilters = () => {
    setFilters({
      categories: [],
      sizes: [],
      colors: [],
      maxPrice: 25000,
    });
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...productsList];

    // Filter by Special URL Param (e.g. ?filter=new-arrivals or ?filter=sale)
    if (filterParam === "new-arrivals") {
      result = result.filter((p) => p.isNewArrival);
    } else if (filterParam === "sale") {
      result = result.filter((p) => p.tag.includes("%") || p.tag.includes("OFF") || p.tag.includes("SALE"));
    }

    // Filter by Category
    if (filters.categories.length > 0) {
      result = result.filter((p) =>
        filters.categories.some(
          (cat) => p.category.toLowerCase().includes(cat.toLowerCase()) || cat.toLowerCase().includes(p.category.toLowerCase())
        )
      );
    }

    // Filter by Size
    if (filters.sizes.length > 0) {
      result = result.filter((p) =>
        p.sizes.some((sz) => filters.sizes.includes(sz))
      );
    }

    // Filter by Color
    if (filters.colors.length > 0) {
      result = result.filter(
        (p) =>
          p.colors &&
          p.colors.some((c) => filters.colors.includes(c.name))
      );
    }

    // Filter by Price Range
    result = result.filter((p) => p.discountedPrice <= filters.maxPrice);

    // Sorting
    if (sortBy === "price-low") {
      result.sort((a, b) => a.discountedPrice - b.discountedPrice);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.discountedPrice - a.discountedPrice);
    } else if (sortBy === "newest") {
      result.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [filters, sortBy, filterParam]);

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumbs Banner Header */}
      <div className="bg-stone-100 border-b border-stone-200 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center space-x-2 text-xs uppercase tracking-wider text-stone-500 mb-3">
            <Link href="/" className="hover:text-black transition-colors">
              Home
            </Link>
            <ChevronRight size={12} />
            <span className="font-bold text-black">Shop Collection</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-amber-800 block mb-1">
                COLOMBO DESIGNER ATELIER
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-gray-900">
                {filters.categories.length === 1 ? filters.categories[0] : "All Products"}
              </h1>
            </div>
            <p className="text-xs text-stone-600 max-w-md">
              Discover Sri Lanka&apos;s premier luxury apparel. High-res craftsmanship, pure Italian linens, and tailored workwear delivered islandwide with Cash on Delivery.
            </p>
          </div>
        </div>
      </div>

      {/* Main Layout Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Control Bar: Mobile Filter Button & Desktop Results Count + Sort */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-stone-200">
          <div className="flex items-center space-x-4">
            {/* Mobile Filter Drawer Trigger */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center space-x-2 border border-stone-300 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-stone-900 hover:border-black transition-colors"
            >
              <Filter size={16} className="text-amber-800" />
              <span>Filters</span>
              {(filters.categories.length > 0 ||
                filters.sizes.length > 0 ||
                filters.colors.length > 0) && (
                <span className="w-2 h-2 rounded-full bg-amber-700 animate-pulse" />
              )}
            </button>

            <span className="text-xs text-stone-500 font-medium">
              Showing <strong className="text-stone-900 font-bold">{filteredProducts.length}</strong> of{" "}
              {productsList.length} items
            </span>
          </div>

          {/* Sort Dropdown */}
          <SortDropdown value={sortBy} onChange={setSortBy} />
        </div>

        {/* Active Filter Tags Bar */}
        {(filters.categories.length > 0 ||
          filters.sizes.length > 0 ||
          filters.colors.length > 0 ||
          filters.maxPrice < 25000) && (
          <div className="flex flex-wrap items-center gap-2 mb-6 bg-stone-50 p-3 rounded-xs border border-stone-200 text-xs">
            <span className="text-stone-500 font-semibold uppercase tracking-wider text-[10px]">
              Active Filters:
            </span>
            {filters.categories.map((cat) => (
              <span
                key={cat}
                className="bg-white border border-stone-300 text-stone-900 font-bold px-2.5 py-1 rounded-xs flex items-center space-x-1 uppercase text-[11px]"
              >
                <span>Cat: {cat}</span>
              </span>
            ))}
            {filters.sizes.map((sz) => (
              <span
                key={sz}
                className="bg-white border border-stone-300 text-stone-900 font-bold px-2.5 py-1 rounded-xs flex items-center space-x-1 uppercase text-[11px]"
              >
                <span>Size: {sz}</span>
              </span>
            ))}
            {filters.colors.map((col) => (
              <span
                key={col}
                className="bg-white border border-stone-300 text-stone-900 font-bold px-2.5 py-1 rounded-xs flex items-center space-x-1 uppercase text-[11px]"
              >
                <span>Color: {col}</span>
              </span>
            ))}
            {filters.maxPrice < 25000 && (
              <span className="bg-white border border-stone-300 text-stone-900 font-bold px-2.5 py-1 rounded-xs flex items-center space-x-1 uppercase text-[11px]">
                <span>Under LKR {filters.maxPrice.toLocaleString()}</span>
              </span>
            )}
            <button
              onClick={handleClearFilters}
              className="text-amber-800 underline font-bold uppercase tracking-wider text-[11px] ml-auto hover:text-black"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Sidebar + Product Grid Layout */}
        <div className="flex">
          <FilterSidebar
            filters={filters}
            onFilterChange={setFilters}
            onClearFilters={handleClearFilters}
            isMobileOpen={isMobileFilterOpen}
            onMobileClose={() => setIsMobileFilterOpen(false)}
            totalResults={filteredProducts.length}
          />

          <main className="flex-1">
            <ShopProductGrid
              products={filteredProducts}
              onResetFilters={handleClearFilters}
            />
          </main>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex items-center space-x-3 text-amber-800">
          <Sparkles className="animate-spin" size={24} />
          <span className="font-serif text-sm tracking-widest font-bold uppercase">
            Loading Fashion Galleria Collection...
          </span>
        </div>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}

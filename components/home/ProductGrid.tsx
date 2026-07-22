"use client";

import { useState } from "react";
import { PRODUCTS_DATA, Product } from "@/data/mockData";
import { Heart, ShoppingBag, Check, Star } from "lucide-react";

export default function ProductGrid() {
  const [activeTab, setActiveTab] = useState<string>("ALL");
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);
  const [selectedSizeMap, setSelectedSizeMap] = useState<Record<string, string>>({});

  const filterProducts = () => {
    if (activeTab === "NEW") return PRODUCTS_DATA.filter((p) => p.isNewArrival);
    if (activeTab === "BESTSELLERS") return PRODUCTS_DATA.filter((p) => p.isBestseller);
    if (activeTab === "WORKWEAR") return PRODUCTS_DATA.filter((p) => p.category === "Tops & Shirts" || p.category === "Trousers & Pants");
    return PRODUCTS_DATA;
  };

  const filteredProducts = filterProducts();

  const toggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleQuickAdd = (product: Product) => {
    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId(null);
    }, 2000);
  };

  const handleSelectSize = (productId: string, size: string) => {
    setSelectedSizeMap((prev) => ({ ...prev, [productId]: size }));
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-stone-200 gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-amber-700 font-semibold block">
            MUST-HAVE STYLES
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold uppercase text-gray-900">
            TRENDING NOW
          </h2>
        </div>

        {/* Interactive Filter Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto custom-scrollbar pb-1 text-xs uppercase tracking-wider font-semibold">
          {[
            { id: "ALL", label: "All Trending" },
            { id: "NEW", label: "New Arrivals" },
            { id: "BESTSELLERS", label: "Bestsellers" },
            { id: "WORKWEAR", label: "Workwear Luxe" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 whitespace-nowrap transition-all duration-200 border-b-2 ${
                activeTab === tab.id
                  ? "border-black text-black font-bold"
                  : "border-transparent text-gray-500 hover:text-black"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product Cards Responsive Grid: 2 cols on mobile, 4 cols on desktop */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {filteredProducts.map((product) => {
          const isWishlisted = wishlist.includes(product.id);
          const isJustAdded = addedProductId === product.id;
          const selectedSize = selectedSizeMap[product.id] || product.sizes[0];

          return (
            <div key={product.id} className="group flex flex-col bg-white">
              {/* Image Container with Hover Swap Effect */}
              <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden mb-3 group/img rounded-xs border border-stone-200">
                {/* Primary Image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.primaryImage}
                  alt={product.name}
                  className="w-full h-full object-cover transition-opacity duration-500 group-hover/img:opacity-0"
                />

                {/* Secondary Image (Hover Swap) */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.hoverImage}
                  alt={`${product.name} - detail view`}
                  className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover/img:opacity-100 scale-105 group-hover/img:scale-100 transition-transform"
                />

                {/* Tag Badge */}
                {product.tag && (
                  <span
                    className={`absolute top-2.5 left-2.5 text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 border ${product.tagColor}`}
                  >
                    {product.tag}
                  </span>
                )}

                {/* Wishlist Toggle Button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-xs transition-all shadow-xs ${
                    isWishlisted
                      ? "bg-red-600 text-white"
                      : "bg-white/80 text-gray-700 hover:bg-black hover:text-white"
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart size={15} className={isWishlisted ? "fill-current" : ""} />
                </button>

                {/* Hover Quick Size Selector Bar & Add to Bag CTA */}
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex flex-col justify-end space-y-2">
                  {/* Size Options Pills */}
                  {product.sizes.length > 1 && (
                    <div className="flex items-center justify-center space-x-1 overflow-x-auto py-1">
                      {product.sizes.map((sz) => (
                        <button
                          key={sz}
                          onClick={() => handleSelectSize(product.id, sz)}
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase transition-colors ${
                            selectedSize === sz
                              ? "bg-white text-black font-extrabold"
                              : "bg-black/60 text-white hover:bg-white/40"
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Add to Bag Button */}
                  <button
                    onClick={() => handleQuickAdd(product)}
                    className={`w-full text-xs uppercase tracking-widest font-semibold py-2.5 px-3 transition-colors flex items-center justify-center space-x-2 ${
                      isJustAdded
                        ? "bg-emerald-700 text-white"
                        : "bg-white text-black hover:bg-amber-600 hover:text-white"
                    }`}
                  >
                    {isJustAdded ? (
                      <>
                        <Check size={14} />
                        <span>ADDED ({selectedSize})</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={14} />
                        <span>ADD TO BAG ({selectedSize})</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Product Meta Info */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] text-gray-500">
                  <span className="uppercase font-medium tracking-wider">{product.category}</span>
                  <div className="flex items-center space-x-1 text-amber-600">
                    <Star size={12} className="fill-current" />
                    <span className="font-bold text-gray-800">{product.rating}</span>
                    <span className="text-[10px] text-gray-400">({product.reviewCount})</span>
                  </div>
                </div>

                <h3 className="font-serif text-xs sm:text-sm font-semibold text-gray-900 group-hover:text-amber-800 transition-colors line-clamp-1">
                  {product.name}
                </h3>

                {/* Price Display */}
                <div className="flex items-center space-x-2 pt-0.5">
                  <span className="text-xs sm:text-sm font-bold text-gray-900">
                    LKR {product.discountedPrice.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-gray-400 line-through">
                    LKR {product.originalPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

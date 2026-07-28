"use client";

import { useState } from "react";
import Link from "next/link";
import { Product } from "@/data/mockData";
import { Heart, ShoppingBag, Check, Star, RefreshCw } from "lucide-react";

interface ShopProductGridProps {
  products: Product[];
  onResetFilters?: () => void;
}

export default function ShopProductGrid({ products, onResetFilters }: ShopProductGridProps) {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);
  const [selectedSizeMap, setSelectedSizeMap] = useState<Record<string, string>>({});

  const toggleWishlist = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId(null);
    }, 2000);
  };

  const handleSelectSize = (e: React.MouseEvent, productId: string, size: string) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedSizeMap((prev) => ({ ...prev, [productId]: size }));
  };

  if (products.length === 0) {
    return (
      <div className="py-20 text-center bg-stone-50 border border-dashed border-stone-300 rounded-xs my-8 p-8">
        <h3 className="font-serif text-xl font-bold uppercase tracking-wider text-stone-800 mb-2">
          No Products Match Your Criteria
        </h3>
        <p className="text-xs text-stone-600 mb-6 max-w-md mx-auto">
          Try expanding your price range or clearing specific size/color filters to explore the rest of our luxury collection.
        </p>
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="inline-flex items-center space-x-2 bg-black text-white px-6 py-3 text-xs uppercase tracking-widest font-bold hover:bg-amber-700 transition-colors"
          >
            <RefreshCw size={14} />
            <span>Reset All Filters</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {products.map((product) => {
        const isWishlisted = wishlist.includes(product.id);
        const isJustAdded = addedProductId === product.id;
        const selectedSize = selectedSizeMap[product.id] || product.sizes[0];

        return (
          <div key={product.id} className="group flex flex-col bg-white">
            {/* Image Container with Link to PDP */}
            <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden mb-3 group/img rounded-xs border border-stone-200">
              <Link href={`/shop/${product.id}`} className="block w-full h-full">
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
              </Link>

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
                onClick={(e) => toggleWishlist(e, product.id)}
                className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-xs transition-all shadow-xs z-10 ${
                  isWishlisted
                    ? "bg-red-600 text-white"
                    : "bg-white/80 text-gray-700 hover:bg-black hover:text-white"
                }`}
                aria-label="Wishlist"
              >
                <Heart size={15} className={isWishlisted ? "fill-current" : ""} />
              </button>

              {/* Hover Quick Size Selector Bar & Add to Bag CTA */}
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex flex-col justify-end space-y-2 z-10">
                {/* Size Options Pills */}
                {product.sizes.length > 1 && (
                  <div className="flex items-center justify-center space-x-1 overflow-x-auto py-1 custom-scrollbar">
                    {product.sizes.map((sz) => {
                      const isOutOfStock = product.outOfStockSizes?.includes(sz);
                      return (
                        <button
                          key={sz}
                          disabled={isOutOfStock}
                          onClick={(e) => handleSelectSize(e, product.id, sz)}
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase transition-colors ${
                            isOutOfStock
                              ? "bg-black/30 text-stone-400 line-through cursor-not-allowed"
                              : selectedSize === sz
                              ? "bg-white text-black font-extrabold"
                              : "bg-black/60 text-white hover:bg-white/40"
                          }`}
                        >
                          {sz}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Add to Bag Button */}
                <button
                  onClick={(e) => handleQuickAdd(e, product)}
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

              <Link href={`/shop/${product.id}`} className="block">
                <h3 className="font-serif text-xs sm:text-sm font-semibold text-gray-900 group-hover:text-amber-800 transition-colors line-clamp-1">
                  {product.name}
                </h3>
              </Link>

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
  );
}

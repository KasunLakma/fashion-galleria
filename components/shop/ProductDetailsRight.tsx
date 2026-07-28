"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Product } from "@/data/mockData";
import { useCart } from "@/context/CartContext";
import {
  Star,
  Plus,
  Minus,
  ShoppingBag,
  Zap,
  Truck,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Ruler,
  Check,
  Heart,
} from "lucide-react";
import SizeGuideModal from "./SizeGuideModal";

interface ProductDetailsRightProps {
  product: Product;
}

export default function ProductDetailsRight({ product }: ProductDetailsRightProps) {
  const router = useRouter();
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState<string>(
    product.sizes.find((s) => !product.outOfStockSizes?.includes(s)) || product.sizes[0]
  );

  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors && product.colors.length > 0 ? product.colors[0].name : ""
  );

  const [quantity, setQuantity] = useState<number>(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddedToBag, setIsAddedToBag] = useState(false);

  // Accordion state
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    description: true,
    fabric: false,
    shipping: false,
  });

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleAddToBag = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setIsAddedToBag(true);
    setTimeout(() => {
      setIsAddedToBag(false);
    }, 2500);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    router.push("/checkout");
  };


  const discountPercent = Math.round(
    ((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100
  );

  return (
    <div className="space-y-6">
      {/* Category & Title */}
      <div>
        <span className="text-xs uppercase tracking-[0.25em] font-semibold text-amber-800 block mb-1">
          {product.category}
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-stone-900 leading-tight">
          {product.name}
        </h1>

        {/* Rating & Reviews */}
        <div className="flex items-center space-x-3 mt-2.5">
          <div className="flex items-center space-x-1 text-amber-500">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={i < Math.floor(product.rating) ? "fill-current text-amber-500" : "text-stone-300"}
              />
            ))}
          </div>
          <span className="text-xs font-bold text-stone-800">{product.rating} / 5.0</span>
          <span className="text-xs text-stone-400">|</span>
          <a href="#reviews" className="text-xs text-stone-600 underline hover:text-black font-medium">
            {product.reviewCount} Verified Buyer Reviews
          </a>
        </div>
      </div>

      {/* Price Display */}
      <div className="flex items-baseline space-x-3 border-y border-stone-200 py-4">
        <span className="font-sans text-2xl sm:text-3xl font-extrabold text-stone-900">
          LKR {product.discountedPrice.toLocaleString()}
        </span>
        <span className="font-sans text-base text-stone-400 line-through font-medium">
          LKR {product.originalPrice.toLocaleString()}
        </span>
        {discountPercent > 0 && (
          <span className="bg-red-100 text-red-800 border border-red-200 text-xs font-extrabold px-2.5 py-0.5 uppercase tracking-wider">
            SAVE {discountPercent}%
          </span>
        )}
      </div>

      {/* Color Selection Swatches (if available) */}
      {product.colors && product.colors.length > 0 && (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="uppercase tracking-widest font-bold text-stone-900">
              Color: <span className="font-normal text-stone-600">{selectedColor}</span>
            </span>
          </div>
          <div className="flex items-center space-x-3">
            {product.colors.map((col) => {
              const isSelected = selectedColor === col.name;
              return (
                <button
                  key={col.name}
                  onClick={() => setSelectedColor(col.name)}
                  title={col.name}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all p-0.5 ${
                    isSelected ? "ring-2 ring-amber-800 ring-offset-2 scale-110" : "hover:scale-105"
                  }`}
                >
                  <span className={`w-full h-full rounded-full ${col.bgClass}`} />
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Size Selection Pills */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="uppercase tracking-widest font-bold text-stone-900">
            Select Size: <span className="font-normal text-stone-600">{selectedSize}</span>
          </span>
          <button
            onClick={() => setIsSizeGuideOpen(true)}
            className="flex items-center space-x-1 text-amber-800 hover:text-black font-semibold uppercase tracking-wider text-[11px] transition-colors"
          >
            <Ruler size={14} />
            <span>Size Guide</span>
          </button>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {product.sizes.map((sz) => {
            const isOutOfStock = product.outOfStockSizes?.includes(sz);
            const isSelected = selectedSize === sz;

            return (
              <button
                key={sz}
                disabled={isOutOfStock}
                onClick={() => setSelectedSize(sz)}
                className={`relative px-4 py-2 text-xs font-bold uppercase tracking-wider border transition-all ${
                  isOutOfStock
                    ? "border-stone-200 bg-stone-100 text-stone-400 line-through cursor-not-allowed opacity-60"
                    : isSelected
                    ? "border-black bg-black text-white shadow-xs scale-105"
                    : "border-stone-300 bg-white text-stone-800 hover:border-stone-900"
                }`}
              >
                {sz}
                {isOutOfStock && (
                  <span className="block text-[8px] font-normal text-red-700 tracking-tight">
                    Out of Stock
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Quantity Selector & Action Buttons */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center space-x-4">
          {/* Quantity Controls */}
          <div className="flex items-center border border-stone-300 rounded-xs bg-white h-12">
            <button
              onClick={() => handleQuantityChange(-1)}
              className="p-3 text-stone-600 hover:text-black transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </button>
            <span className="w-10 text-center font-bold text-sm text-stone-900">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(1)}
              className="p-3 text-stone-600 hover:text-black transition-colors"
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </button>
          </div>

          {/* Add to Wishlist Button */}
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className={`p-3.5 border border-stone-300 rounded-xs transition-colors h-12 flex items-center justify-center ${
              isWishlisted
                ? "bg-red-600 text-white border-red-600"
                : "bg-white text-stone-700 hover:border-black hover:text-black"
            }`}
            aria-label="Add to Wishlist"
          >
            <Heart size={20} className={isWishlisted ? "fill-current" : ""} />
          </button>
        </div>

        {/* Primary & Secondary Action CTAs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {/* Secondary CTA: Add to Bag */}
          <button
            onClick={handleAddToBag}
            className={`w-full py-4 px-6 text-xs uppercase tracking-[0.2em] font-extrabold border transition-all flex items-center justify-center space-x-2 ${
              isAddedToBag
                ? "bg-emerald-800 text-white border-emerald-800"
                : "bg-white text-stone-900 border-stone-900 hover:bg-stone-900 hover:text-white"
            }`}
          >
            {isAddedToBag ? (
              <>
                <Check size={16} />
                <span>ADDED TO BAG</span>
              </>
            ) : (
              <>
                <ShoppingBag size={16} />
                <span>ADD TO BAG</span>
              </>
            )}
          </button>

          {/* Primary CTA: Buy It Now / COD Checkout */}
          <button
            onClick={handleBuyNow}
            className="w-full py-4 px-6 text-xs uppercase tracking-[0.2em] font-extrabold bg-gradient-to-r from-amber-700 via-amber-800 to-stone-900 text-white hover:from-amber-800 hover:to-black transition-all flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
          >
            <Zap size={16} className="text-amber-300 animate-bounce" />
            <span>BUY NOW (COD CHECKOUT)</span>
          </button>
        </div>
      </div>

      {/* Trust Callout Box */}
      <div className="bg-stone-50 border border-stone-200 p-4 rounded-xs grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-700">
        <div className="flex items-center space-x-2.5">
          <Truck size={18} className="text-amber-800 shrink-0" />
          <div>
            <strong className="block text-stone-900 font-bold uppercase tracking-wider text-[11px]">
              Cash on Delivery (COD)
            </strong>
            <span className="text-[10px] text-stone-500">Pay cash upon door delivery</span>
          </div>
        </div>
        <div className="flex items-center space-x-2.5">
          <ShieldCheck size={18} className="text-amber-800 shrink-0" />
          <div>
            <strong className="block text-stone-900 font-bold uppercase tracking-wider text-[11px]">
              7-Day Islandwide Exchange
            </strong>
            <span className="text-[10px] text-stone-500">Free courier size swap</span>
          </div>
        </div>
      </div>

      {/* Accordion Dropdowns */}
      <div className="border-t border-stone-200 pt-4 space-y-3">
        {/* 1. Product Description Accordion */}
        <div className="border-b border-stone-200 pb-3">
          <button
            onClick={() => toggleAccordion("description")}
            className="w-full flex items-center justify-between py-2 text-left font-serif text-sm font-bold uppercase tracking-wider text-stone-900 hover:text-amber-800 transition-colors"
          >
            <span>Product Description</span>
            {openAccordions.description ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {openAccordions.description && (
            <div className="pt-2 text-xs text-stone-600 leading-relaxed animate-fade-in">
              <p>{product.description}</p>
            </div>
          )}
        </div>

        {/* 2. Fabric & Care Accordion */}
        <div className="border-b border-stone-200 pb-3">
          <button
            onClick={() => toggleAccordion("fabric")}
            className="w-full flex items-center justify-between py-2 text-left font-serif text-sm font-bold uppercase tracking-wider text-stone-900 hover:text-amber-800 transition-colors"
          >
            <span>Fabric & Garment Care</span>
            {openAccordions.fabric ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {openAccordions.fabric && (
            <div className="pt-2 text-xs text-stone-600 leading-relaxed animate-fade-in">
              <ul className="list-disc pl-4 space-y-1">
                {product.fabricCare?.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* 3. Shipping & Returns Accordion */}
        <div className="border-b border-stone-200 pb-3">
          <button
            onClick={() => toggleAccordion("shipping")}
            className="w-full flex items-center justify-between py-2 text-left font-serif text-sm font-bold uppercase tracking-wider text-stone-900 hover:text-amber-800 transition-colors"
          >
            <span>Shipping & Returns Policy</span>
            {openAccordions.shipping ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {openAccordions.shipping && (
            <div className="pt-2 text-xs text-stone-600 leading-relaxed space-y-2 animate-fade-in">
              <p>{product.shippingReturns}</p>
              <p className="font-semibold text-stone-800 text-[11px]">
                📦 Colombo & Suburbs: Delivered within 24-48 Hours.
                <br />
                📦 Outstation Islandwide: Delivered within 2-3 Working Days.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        category={product.category}
      />
    </div>
  );
}

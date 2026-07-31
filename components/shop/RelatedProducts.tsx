"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PRODUCTS_DATA, Product } from "@/data/mockData";
import { Star, ArrowRight } from "lucide-react";

interface RelatedProductsProps {
  currentProductId: string;
  category: string;
}

export default function RelatedProducts({ currentProductId, category }: RelatedProductsProps) {
  const [productsList, setProductsList] = useState<Product[]>(PRODUCTS_DATA);

  useEffect(() => {
    fetch("/api/products", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.products) && data.products.length > 0) {
          setProductsList(data.products);
        }
      })
      .catch((err) => console.warn("RelatedProducts fetch products error:", err));
  }, []);

  // Find related products by category or bestsellers excluding current product
  let related = productsList.filter(
    (p) => p.id !== currentProductId && p.category.toLowerCase().includes(category.toLowerCase())
  );

  if (related.length < 4) {
    const additional = productsList.filter(
      (p) => p.id !== currentProductId && !related.some((r) => r.id === p.id)
    );
    related = [...related, ...additional].slice(0, 4);
  } else {
    related = related.slice(0, 4);
  }

  return (
    <section className="mt-16 sm:mt-24 border-t border-stone-200 pt-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-amber-800 font-semibold block">
            COMPLETE THE LOOK
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold uppercase text-gray-900">
            YOU MAY ALSO LIKE
          </h2>
        </div>
        <Link
          href="/shop"
          className="hidden sm:flex items-center space-x-1 text-xs font-bold uppercase tracking-wider text-amber-800 hover:text-black transition-colors"
        >
          <span>View Entire Shop</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {related.map((prod) => (
          <Link key={prod.id} href={`/shop/${prod.id}`} className="group flex flex-col bg-white">
            <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden mb-3 rounded-xs border border-stone-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={prod.primaryImage}
                alt={prod.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {prod.tag && (
                <span
                  className={`absolute top-2.5 left-2.5 text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 border ${prod.tagColor}`}
                >
                  {prod.tag}
                </span>
              )}
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px] text-stone-500">
                <span className="uppercase font-medium tracking-wider">{prod.category}</span>
                <div className="flex items-center space-x-1 text-amber-600">
                  <Star size={12} className="fill-current" />
                  <span className="font-bold text-stone-800">{prod.rating}</span>
                </div>
              </div>

              <h3 className="font-serif text-xs sm:text-sm font-semibold text-stone-900 group-hover:text-amber-800 transition-colors line-clamp-1">
                {prod.name}
              </h3>

              <div className="flex items-center space-x-2 pt-0.5">
                <span className="text-xs sm:text-sm font-bold text-stone-900">
                  LKR {prod.discountedPrice.toLocaleString()}
                </span>
                <span className="text-[11px] text-stone-400 line-through">
                  LKR {prod.originalPrice.toLocaleString()}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

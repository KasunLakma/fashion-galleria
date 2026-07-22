"use client";

import { REVIEWS_DATA } from "@/data/mockData";
import { Star, CheckCircle, Quote } from "lucide-react";

export default function CustomerReviews() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12 space-y-2">
        <span className="text-xs uppercase tracking-[0.3em] text-amber-700 font-semibold block">
          LOVED BY SRI LANKAN FASHION ENTHUSIASTS
        </span>
        <h2 className="font-serif text-2xl sm:text-4xl font-bold uppercase text-gray-900 tracking-wide">
          CUSTOMER REVIEWS
        </h2>
        <div className="flex items-center justify-center space-x-1 pt-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={18} className="fill-amber-500 text-amber-500" />
          ))}
          <span className="text-xs font-bold text-gray-900 ml-2">4.9 / 5.0 (500+ Verified Buyers)</span>
        </div>
      </div>

      {/* Grid of 4 clean customer review cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {REVIEWS_DATA.map((review) => (
          <div
            key={review.id}
            className="bg-white border border-stone-200 p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow relative group"
          >
            <Quote size={28} className="text-stone-200 absolute top-4 right-4 pointer-events-none group-hover:text-amber-200 transition-colors" />

            <div className="space-y-3 relative z-10">
              {/* Star Rating */}
              <div className="flex items-center space-x-1">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={14} className="fill-amber-500 text-amber-500" />
                ))}
              </div>

              {/* Review Title */}
              <h3 className="font-serif text-sm font-bold text-gray-900 leading-snug">
                &ldquo;{review.title}&rdquo;
              </h3>

              {/* Review Comment */}
              <p className="text-xs text-stone-600 leading-relaxed font-light italic">
                {review.comment}
              </p>
            </div>

            {/* Buyer Info Footer */}
            <div className="pt-4 mt-4 border-t border-stone-100 flex flex-col space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-900">{review.author}</span>
                {review.verifiedBuyer && (
                  <span className="inline-flex items-center space-x-1 text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
                    <CheckCircle size={10} />
                    <span>Verified</span>
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between text-[11px] text-stone-400">
                <span>🇱🇰 {review.location}</span>
                <span>{review.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const announcements = [
  "ISLANDWIDE CASH ON DELIVERY AVAILABLE",
  "FREE EXPRESS SHIPPING ON ORDERS OVER LKR 15,000",
  "THE WORKWEAR '26 COLLECTION IS NOW LIVE",
  "EASY 7-DAY RETURNS & EXCHANGES NATIONWIDE",
];

export default function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + announcements.length) % announcements.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % announcements.length);
  };

  return (
    <div className="bg-black text-white text-[11px] sm:text-xs tracking-widest uppercase py-2 px-4 relative z-40 font-medium">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left item (desktop view) */}
        <div className="hidden md:flex items-center space-x-4 text-gray-400">
          <span>🇱🇰 SRI LANKA</span>
          <span>•</span>
          <span className="hover:text-white transition-colors cursor-pointer">STORES: COLOMBO | KANDY</span>
        </div>

        {/* Center message ticker */}
        <div className="flex-1 flex items-center justify-center space-x-3 text-center">
          <button 
            onClick={handlePrev}
            aria-label="Previous Announcement"
            className="p-0.5 hover:text-gray-300 transition-colors"
          >
            <ChevronLeft size={14} />
          </button>
          
          <span className="transition-all duration-300 min-h-[16px] inline-block font-semibold">
            {announcements[currentIndex]}
          </span>

          <button 
            onClick={handleNext}
            aria-label="Next Announcement"
            className="p-0.5 hover:text-gray-300 transition-colors"
          >
            <ChevronRight size={14} />
          </button>
        </div>

        {/* Right items (desktop view) */}
        <div className="hidden md:flex items-center space-x-4 text-gray-400">
          <a href="tel:+94112345678" className="hover:text-white transition-colors">
            CARE: +94 11 700 8000
          </a>
          <span>•</span>
          <a href="#newsletter" className="hover:text-white transition-colors">
            GET 10% OFF
          </a>
        </div>
      </div>
    </div>
  );
}

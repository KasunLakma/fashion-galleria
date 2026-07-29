"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight, ChevronDown, MapPin, Phone } from "lucide-react";

const announcements = [
  "ISLANDWIDE DELIVERY AVAILABLE • CASH ON DELIVERY",
  "FREE EXPRESS SHIPPING ON ORDERS OVER LKR 15,000",
  "NEW WORKWEAR '26 COLLECTION NOW LIVE",
  "EASY 7-DAY RETURNS & EXCHANGES NATIONWIDE",
];

export default function AnnouncementBar() {
  const pathname = usePathname();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (pathname?.startsWith("/admin")) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [pathname]);

  // Early returns placed AFTER all Hook declarations
  if (pathname?.startsWith("/admin") || !announcements || announcements.length === 0) {
    return null;
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + announcements.length) % announcements.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % announcements.length);
  };

  return (
    <div className="bg-stone-950 text-stone-300 text-[11px] tracking-widest uppercase py-2 px-4 relative z-40 font-medium border-b border-stone-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left: Simplified STORES dropdown */}
        <div className="hidden md:flex items-center space-x-2 text-stone-400">
          <div className="relative group cursor-pointer flex items-center space-x-1.5 hover:text-white transition-colors">
            <MapPin size={13} strokeWidth={1.5} className="text-amber-400" />
            <span className="font-semibold text-stone-200">STORES</span>
            <ChevronDown size={12} strokeWidth={1.5} className="group-hover:rotate-180 transition-transform duration-200" />
            
            {/* STORES Dropdown */}
            <div className="absolute left-0 top-full mt-2 hidden group-hover:block bg-stone-900 text-white text-[11px] p-3 rounded-xs shadow-xl border border-stone-800 w-52 z-50 normal-case tracking-normal animate-fade-in">
              <div className="font-bold text-amber-400 uppercase text-[10px] tracking-wider mb-2 border-b border-stone-800 pb-1">
                Boutique Locations
              </div>
              <div className="py-1">
                <span className="font-semibold block text-white">Colombo Flagship Store</span>
                <span className="text-stone-400 text-[10px]">123 Galle Road, Colombo 03</span>
              </div>
              <div className="pt-2 border-t border-stone-800/60 mt-1">
                <span className="font-semibold block text-white">Kandy Atelier</span>
                <span className="text-stone-400 text-[10px]">45 Peradeniya Road, Kandy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center: Simplified message ticker */}
        <div className="flex-1 flex items-center justify-center space-x-2 text-center">
          <button 
            onClick={handlePrev}
            aria-label="Previous Announcement"
            className="p-0.5 hover:text-white transition-colors"
          >
            <ChevronLeft size={13} strokeWidth={1.5} />
          </button>
          
          <span className="transition-all duration-300 min-h-[16px] inline-block font-semibold text-stone-200 text-[11px]">
            {announcements[currentIndex]}
          </span>

          <button 
            onClick={handleNext}
            aria-label="Next Announcement"
            className="p-0.5 hover:text-white transition-colors"
          >
            <ChevronRight size={13} strokeWidth={1.5} />
          </button>
        </div>

        {/* Right: Simplified Contact Method without +94 */}
        <div className="hidden md:flex items-center space-x-4 text-stone-400">
          <a href="tel:0117008000" className="flex items-center space-x-1.5 hover:text-white transition-colors">
            <Phone size={13} strokeWidth={1.5} className="text-amber-400" />
            <span>CARE: 011 700 8000</span>
          </a>
        </div>

      </div>
    </div>
  );
}

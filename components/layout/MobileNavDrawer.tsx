"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, ChevronDown, ChevronRight, Search, MapPin, Phone } from "lucide-react";

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
}

const navSections = [
  {
    title: "WOMEN'S COLLECTION",
    badge: "",
    subItems: ["All Apparel", "Dresses & Jumpsuits", "Workwear Blouses", "Trousers & Skirts", "Accessories & Bags"],
  },
  {
    title: "NEW ARRIVALS",
    badge: "NEW",
    subItems: ["Resort '26 Atelier", "Workwear Luxe", "Weekend Linen Edit"],
  },
  {
    title: "CLEARANCE SALE",
    badge: "SALE",
    isSale: true,
    subItems: ["Up to 50% Off Dresses", "Up to 50% Off Workwear"],
  },
];

export default function MobileNavDrawer({ isOpen, onClose, onOpenSearch }: MobileNavDrawerProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>("WOMEN");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleSection = (title: string) => {
    setExpandedSection((prev) => (prev === title ? null : title));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex pr-10">
        <div className="w-screen max-w-xs sm:max-w-sm bg-white shadow-2xl flex flex-col animate-slide-left">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-black text-white">
            <div>
              <span className="font-serif text-lg tracking-widest font-bold block">
                FASHION GALLERIA
              </span>
              <span className="text-[10px] text-amber-400 tracking-wider uppercase block">
                COLOMBO • SRI LANKA
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-300 hover:text-white transition-colors rounded-full hover:bg-gray-800"
              aria-label="Close navigation drawer"
            >
              <X size={22} />
            </button>
          </div>

          {/* Quick Search Button inside Mobile Drawer */}
          <div className="p-3 bg-gray-50 border-b border-gray-200">
            <button
              onClick={() => {
                onClose();
                onOpenSearch();
              }}
              className="w-full flex items-center space-x-2 bg-white border border-gray-300 py-2.5 px-3 rounded text-left text-xs text-gray-500 hover:border-black transition-colors"
            >
              <Search size={16} className="text-gray-400" />
              <span>Search products, categories...</span>
            </button>
          </div>

          {/* Nav Links Accordion List */}
          <div className="flex-1 overflow-y-auto custom-scrollbar divide-y divide-gray-100">
            {navSections.map((section) => {
              const isExpanded = expandedSection === section.title;

              return (
                <div key={section.title} className="bg-white">
                  <button
                    onClick={() => toggleSection(section.title)}
                    className="w-full flex items-center justify-between p-4 text-left font-serif text-sm tracking-wider font-semibold hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      <span className={section.isSale ? "text-red-700 font-bold" : "text-gray-900"}>
                        {section.title}
                      </span>
                      {section.badge && (
                        <span className={`text-[9px] uppercase font-extrabold px-1.5 py-0.5 rounded tracking-widest ${
                          section.isSale ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-800"
                        }`}>
                          {section.badge}
                        </span>
                      )}
                    </div>
                    {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                  </button>

                  {isExpanded && (
                    <div className="bg-stone-50 px-6 py-2 space-y-2 border-t border-gray-100">
                      {section.subItems.map((sub, idx) => (
                        <Link
                          key={idx}
                          href="/shop"
                          onClick={onClose}
                          className="block text-xs text-stone-700 hover:text-black hover:font-semibold py-1 transition-colors"
                        >
                          {sub}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* General links */}
            <div className="p-4 space-y-3 bg-white">
              <a href="#" className="flex items-center space-x-2 text-xs font-semibold text-stone-800 uppercase tracking-wider">
                <MapPin size={16} className="text-amber-700" />
                <span>STORE LOCATOR (COLOMBO & KANDY)</span>
              </a>
              <a href="#" className="flex items-center space-x-2 text-xs font-semibold text-stone-800 uppercase tracking-wider">
                <Phone size={16} className="text-amber-700" />
                <span>CUSTOMER CARE: 011 700 8000</span>
              </a>
            </div>
          </div>

          {/* Footer inside mobile menu */}
          <div className="p-4 border-t border-gray-200 bg-stone-100 text-xs text-gray-600 space-y-3">
            <div className="flex items-center justify-between text-[11px] uppercase tracking-wider font-semibold text-gray-700">
              <span>CURRENCY: 🇱🇰 LKR (RS.)</span>
              <span className="text-amber-700">COD AVAILABLE</span>
            </div>

            <div className="flex justify-center space-x-4 pt-1 text-gray-700">
              <a href="#" aria-label="Instagram" className="p-1.5 hover:text-black">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" aria-label="Facebook" className="p-1.5 hover:text-black">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Menu, Search, User, Heart, ShoppingBag } from "lucide-react";
import MobileNavDrawer from "./MobileNavDrawer";
import CartDrawer from "./CartDrawer";
import SearchModal from "./SearchModal";

export default function Header() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Cart item count (mock count = 1 for initial preview)
  const cartCount = 1;
  const wishlistCount = 0;

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Left: Hamburger (Mobile) & Desktop Navigation Links */}
            <div className="flex items-center space-x-6">
              <button
                onClick={() => setIsMobileNavOpen(true)}
                className="lg:hidden p-2 text-gray-800 hover:text-black transition-colors"
                aria-label="Open Mobile Menu"
              >
                <Menu size={24} />
              </button>

              {/* Desktop Nav Links */}
              <nav className="hidden lg:flex items-center space-x-8 text-xs font-semibold tracking-widest uppercase">
                <a
                  href="#women"
                  className="text-gray-900 hover:text-amber-700 transition-colors py-2 relative group"
                >
                  <span>Women</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-700 transition-all duration-300 group-hover:w-full" />
                </a>

                <a
                  href="#men"
                  className="text-gray-900 hover:text-amber-700 transition-colors py-2 relative group"
                >
                  <span>Men</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-700 transition-all duration-300 group-hover:w-full" />
                </a>

                <a
                  href="#new-arrivals"
                  className="text-gray-900 hover:text-amber-700 transition-colors py-2 relative group flex items-center space-x-1"
                >
                  <span>New Arrivals</span>
                  <span className="bg-amber-100 text-amber-800 text-[9px] px-1.5 py-0.2 rounded font-extrabold tracking-normal">
                    NEW
                  </span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-700 transition-all duration-300 group-hover:w-full" />
                </a>

                <a
                  href="#sale"
                  className="text-red-700 hover:text-red-800 transition-colors py-2 relative group flex items-center space-x-1 font-bold"
                >
                  <span>Sale</span>
                  <span className="bg-red-100 text-red-700 text-[9px] px-1.5 py-0.2 rounded font-extrabold tracking-normal">
                    %
                  </span>
                </a>
              </nav>
            </div>

            {/* Center: Brand Logo */}
            <div className="flex-1 lg:flex-none text-center">
              <a href="/" className="inline-block group">
                <span className="font-serif text-xl sm:text-2xl md:text-3xl font-bold tracking-[0.2em] text-black uppercase block leading-none">
                  Fashion Galleria
                </span>
                <span className="text-[9px] tracking-[0.35em] text-amber-700 uppercase font-semibold block mt-0.5 group-hover:text-black transition-colors">
                  Sri Lanka
                </span>
              </a>
            </div>

            {/* Right: Icons (Search, Account, Wishlist, Cart) */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Search Icon */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-gray-800 hover:text-black transition-colors"
                aria-label="Search"
              >
                <Search size={22} />
              </button>

              {/* User Account Icon */}
              <a
                href="#account"
                className="hidden sm:block p-2 text-gray-800 hover:text-black transition-colors"
                aria-label="Account"
              >
                <User size={22} />
              </a>

              {/* Wishlist Icon */}
              <a
                href="#wishlist"
                className="hidden sm:block p-2 text-gray-800 hover:text-black transition-colors relative"
                aria-label="Wishlist"
              >
                <Heart size={22} />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {wishlistCount}
                  </span>
                )}
              </a>

              {/* Shopping Bag Drawer Icon */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="p-2 text-gray-800 hover:text-black transition-colors relative"
                aria-label="Shopping Bag"
              >
                <ShoppingBag size={22} />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 bg-amber-700 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Drawers & Modals */}
      <MobileNavDrawer
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}

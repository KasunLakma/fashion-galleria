"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, Heart, ShoppingBag, Home, ChevronDown } from "lucide-react";
import { useCart } from "@/context/CartContext";
import MobileNavDrawer from "./MobileNavDrawer";
import CartDrawer from "./CartDrawer";
import SearchModal from "./SearchModal";

export default function Header() {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin");
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cartCount, openCart } = useCart();

  const wishlistCount = 0;

  if (isAdminPage) {
    return (
      <header className="sticky top-0 z-30 bg-stone-950 border-b border-stone-800 text-white transition-all duration-200 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Admin Brand Logo / Title */}
            <Link href="/admin" className="flex items-center space-x-3 group">
              <div>
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.2em] text-white uppercase block leading-none">
                  Fashion Galleria
                </span>
                <span className="text-[9px] tracking-[0.35em] text-amber-400 uppercase font-extrabold block mt-1">
                  ADMIN CONTROL CENTER
                </span>
              </div>
            </Link>

            {/* Single Prominent HOME Button */}
            <Link
              href="/"
              className="inline-flex items-center space-x-2 bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold tracking-widest uppercase px-4 py-2.5 sm:px-5 sm:py-2.5 rounded-xs transition-all shadow-xs border border-amber-600/50 hover:shadow-md active:scale-[0.98]"
            >
              <Home size={16} />
              <span>HOME</span>
            </Link>
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200 transition-all duration-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            
            {/* Mobile Hamburger (visible on lg:hidden) */}
            <button
              onClick={() => setIsMobileNavOpen(true)}
              className="lg:hidden p-2 text-stone-800 hover:text-black transition-colors"
              aria-label="Open Mobile Menu"
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>

            {/* Mobile Center Brand Logo */}
            <div className="lg:hidden flex-1 text-center">
              <Link href="/" className="inline-block">
                <span className="font-serif text-xl font-semibold tracking-[0.2em] text-stone-900 uppercase leading-none block">
                  Fashion Galleria
                </span>
                <span className="text-[8px] tracking-[0.3em] text-amber-700 uppercase font-medium block mt-0.5">
                  Sri Lanka
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Layout: Simplified Categories on Left/Center */}
            <nav className="hidden lg:flex items-center space-x-7 text-xs font-medium tracking-[0.16em] uppercase text-stone-800">
              
              {/* Direct Link: HOME */}
              <Link
                href="/"
                className="hover:text-amber-700 transition-colors py-2 relative group font-medium text-[11px]"
              >
                <span>HOME</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-700 transition-all duration-300 group-hover:w-full" />
              </Link>

              {/* Direct Link: SHOP ALL */}
              <Link
                href="/shop"
                className="hover:text-amber-700 transition-colors py-2 relative group font-medium text-[11px]"
              >
                <span>SHOP ALL</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-700 transition-all duration-300 group-hover:w-full" />
              </Link>

              {/* Consolidated Multi-Column Mega-Menu: CATEGORIES (Hover Triggered) */}
              <div className="relative group/megamenu py-6">
                <button className="flex items-center space-x-1 hover:text-amber-700 transition-colors font-medium text-[11px]">
                  <span>CATEGORIES</span>
                  <ChevronDown size={14} strokeWidth={1.5} className="group-hover/megamenu:rotate-180 transition-transform duration-200 text-stone-500" />
                </button>

                {/* Multi-Column Mega Menu Container */}
                <div className="absolute left-0 top-full hidden group-hover/megamenu:block w-[620px] bg-white border border-stone-200 shadow-2xl rounded-xs p-6 z-50 animate-fade-in normal-case tracking-normal">
                  <div className="grid grid-cols-3 gap-6 text-left">
                    
                    {/* Column 1: Product Categories */}
                    <div className="space-y-3">
                      <h4 className="font-serif text-xs font-bold text-stone-900 uppercase tracking-widest border-b border-stone-100 pb-2">
                        Product Categories
                      </h4>
                      <ul className="space-y-2 text-xs text-stone-600 font-medium">
                        <li>
                          <Link href="/shop?category=Dresses" className="hover:text-amber-700 transition-colors block py-0.5">
                            Dresses &amp; Evening Wear
                          </Link>
                        </li>
                        <li>
                          <Link href="/shop?category=Tops%20%26%20Shirts" className="hover:text-amber-700 transition-colors block py-0.5">
                            Tops &amp; Blouses
                          </Link>
                        </li>
                        <li>
                          <Link href="/shop?category=Trousers%20%26%20Pants" className="hover:text-amber-700 transition-colors block py-0.5">
                            Trousers &amp; Skirts
                          </Link>
                        </li>
                        <li>
                          <Link href="/shop?category=Workwear" className="hover:text-amber-700 transition-colors block py-0.5">
                            Workwear Suits &amp; Blazers
                          </Link>
                        </li>
                      </ul>
                    </div>

                    {/* Column 2: Curated Collections */}
                    <div className="space-y-3">
                      <h4 className="font-serif text-xs font-bold text-stone-900 uppercase tracking-widest border-b border-stone-100 pb-2">
                        Curated Edits
                      </h4>
                      <ul className="space-y-2 text-xs text-stone-600 font-medium">
                        <li>
                          <Link href="/shop?filter=new-arrivals" className="hover:text-amber-700 transition-colors block py-0.5">
                            Resort '26 Collection
                          </Link>
                        </li>
                        <li>
                          <Link href="/shop?category=Mens%20Linen" className="hover:text-amber-700 transition-colors block py-0.5">
                            Men's Linen Edition
                          </Link>
                        </li>
                        <li>
                          <Link href="/shop?filter=bestseller" className="hover:text-amber-700 transition-colors block py-0.5">
                            Best Sellers
                          </Link>
                        </li>
                        <li>
                          <Link href="/shop?filter=sale" className="hover:text-red-700 transition-colors font-semibold block py-0.5">
                            Clearance Sale (Up to 50% Off)
                          </Link>
                        </li>
                      </ul>
                    </div>

                    {/* Column 3: Visual Card Highlight */}
                    <div className="bg-stone-950 text-white p-4 rounded-xs flex flex-col justify-between space-y-3 border border-stone-800">
                      <div>
                        <span className="text-[9px] uppercase tracking-[0.25em] text-amber-400 font-extrabold block">
                          CEYLON ATELIER
                        </span>
                        <h5 className="font-serif text-sm font-bold tracking-tight text-white mt-1">
                          Crafted Luxury Fashion
                        </h5>
                        <p className="text-[11px] text-stone-400 mt-1 leading-relaxed">
                          Islandwide Express Cash on Delivery.
                        </p>
                      </div>
                      <Link
                        href="/shop"
                        className="inline-flex items-center text-[10px] uppercase font-bold tracking-widest text-amber-400 hover:text-white transition-colors"
                      >
                        <span>Shop Catalog</span>
                        <span className="ml-1">→</span>
                      </Link>
                    </div>

                  </div>
                </div>
              </div>

              {/* Direct Link: NEW ARRIVALS */}
              <Link
                href="/shop?filter=new-arrivals"
                className="hover:text-amber-700 transition-colors py-2 relative group flex items-center space-x-1.5 font-medium text-[11px]"
              >
                <span>NEW ARRIVALS</span>
                <span className="bg-amber-100 text-amber-900 text-[9px] px-1.5 py-0.5 rounded font-extrabold tracking-normal">
                  NEW
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-700 transition-all duration-300 group-hover:w-full" />
              </Link>

              {/* Direct Link: SALE */}
              <Link
                href="/shop?filter=sale"
                className="text-red-700 hover:text-red-800 transition-colors py-2 relative group font-semibold text-[11px]"
              >
                <span>SALE</span>
              </Link>
            </nav>

            {/* RIGHT: Shifted Main Brand Logo & Utility Icons Grouped Together on the Right */}
            <div className="hidden lg:flex items-center space-x-7">
              
              {/* Main Logo Shifted to Right Side of Simplified Categories */}
              <Link href="/" className="inline-block group border-r border-stone-200 pr-7 text-right">
                <span className="font-serif text-xl md:text-2xl font-semibold tracking-[0.2em] text-stone-900 uppercase block leading-none">
                  Fashion Galleria
                </span>
                <span className="text-[8px] tracking-[0.35em] text-amber-700 uppercase font-medium block mt-1">
                  Sri Lanka
                </span>
              </Link>

              {/* Minimalist Utility Line-Icons Group */}
              <div className="flex items-center space-x-3.5 text-stone-800">
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-1.5 hover:text-amber-800 transition-colors"
                  aria-label="Search"
                  title="Search"
                >
                  <Search size={20} strokeWidth={1.5} />
                </button>

                <button
                  onClick={() => {
                    alert("Wishlist feature: Save your favorite Ceylon Atelier items (Coming Soon!)");
                  }}
                  className="p-1.5 hover:text-amber-800 transition-colors relative"
                  aria-label="Wishlist"
                  title="Wishlist"
                >
                  <Heart size={20} strokeWidth={1.5} />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                      {wishlistCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={openCart}
                  className="p-1.5 hover:text-amber-800 transition-colors relative"
                  aria-label="Shopping Bag"
                  title="Shopping Bag"
                >
                  <ShoppingBag size={20} strokeWidth={1.5} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-amber-700 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>

            </div>

            {/* Mobile Utility Icons (visible on small screens) */}
            <div className="lg:hidden flex items-center space-x-3 text-stone-800">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-1 text-stone-800 hover:text-black transition-colors"
                aria-label="Search"
              >
                <Search size={20} strokeWidth={1.5} />
              </button>
              <button
                onClick={openCart}
                className="p-1 text-stone-800 hover:text-black transition-colors relative"
                aria-label="Shopping Bag"
              >
                <ShoppingBag size={20} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-700 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
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

      <CartDrawer />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}


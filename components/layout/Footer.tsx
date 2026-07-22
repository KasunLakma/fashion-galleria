"use client";

import { useState } from "react";
import { Mail, ArrowRight, MapPin, Phone, ShieldCheck, Check } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-black text-white pt-16 pb-8 border-t border-stone-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter Section */}
        <div className="border-b border-stone-800 pb-12 mb-12">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <span className="text-amber-500 text-xs font-semibold tracking-widest uppercase block">
              JOIN THE GALLERIA CLUB
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl tracking-wide font-bold">
              GET 10% OFF YOUR FIRST ORDER
            </h2>
            <p className="text-stone-400 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
              Subscribe to receive exclusive access to new collection drops, private sales, and Sri Lanka fashion trends.
            </p>

            {subscribed ? (
              <div className="inline-flex items-center space-x-2 bg-stone-900 border border-emerald-500 text-emerald-400 px-6 py-3 rounded text-xs font-semibold uppercase tracking-wider">
                <Check size={16} />
                <span>Thank you! You are now subscribed to Fashion Galleria.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex max-w-md mx-auto mt-4">
                <div className="relative flex-1">
                  <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full bg-stone-900 border border-stone-700 focus:border-white text-white text-xs pl-10 pr-4 py-3.5 focus:outline-none transition-colors placeholder-stone-500"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-amber-600 hover:bg-amber-500 text-black text-xs uppercase tracking-widest font-bold px-6 py-3.5 flex items-center justify-center space-x-1 transition-colors shrink-0"
                >
                  <span>JOIN</span>
                  <ArrowRight size={14} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800 text-xs">
          {/* Col 1: Customer Care */}
          <div className="space-y-4">
            <h3 className="font-serif text-sm uppercase tracking-widest font-bold text-white border-b border-stone-800 pb-2">
              Customer Care
            </h3>
            <ul className="space-y-2.5 text-stone-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Islandwide Cash on Delivery Info
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Returns & Exchanges Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Sri Lanka Express Delivery Options
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Size Guide & Measurements
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Frequently Asked Questions (FAQs)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 2: Shop Categories */}
          <div className="space-y-4">
            <h3 className="font-serif text-sm uppercase tracking-widest font-bold text-white border-b border-stone-800 pb-2">
              Collections
            </h3>
            <ul className="space-y-2.5 text-stone-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Women&apos;s Workwear Luxe
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Printed Maxi & Midi Dresses
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Men&apos;s Smart Casual Linen
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Sri Lankan Designer Silk Scarf Series
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors text-amber-400 font-semibold">
                  Clearance Sale - Up to 50% Off
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Sri Lanka Flagship Stores */}
          <div className="space-y-4">
            <h3 className="font-serif text-sm uppercase tracking-widest font-bold text-white border-b border-stone-800 pb-2">
              Flagship Stores
            </h3>
            <ul className="space-y-3 text-stone-400">
              <li className="flex items-start space-x-2">
                <MapPin size={16} className="text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Colombo 07 Flagship Store</strong>
                  <span className="text-[11px] block">No. 45, Ward Place, Colombo 07</span>
                </div>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin size={16} className="text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">One Galle Face Mall</strong>
                  <span className="text-[11px] block">Level 2, Shop 28, Colombo 02</span>
                </div>
              </li>
              <li className="flex items-start space-x-2">
                <Phone size={16} className="text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Hotline & WhatsApp Support</strong>
                  <span className="text-[11px] block">+94 11 700 8000 / +94 77 123 4567</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Col 4: Sri Lankan Trust Badges & Payment */}
          <div className="space-y-4">
            <h3 className="font-serif text-sm uppercase tracking-widest font-bold text-white border-b border-stone-800 pb-2">
              Secure Shopping
            </h3>
            <div className="space-y-2 text-stone-400">
              <div className="flex items-center space-x-2 text-amber-400 font-semibold">
                <ShieldCheck size={18} />
                <span>100% Cash on Delivery Supported</span>
              </div>
              <p className="text-[11px] leading-relaxed text-stone-400">
                Pay conveniently at your doorstep anywhere in Sri Lanka.
              </p>

              <div className="pt-3">
                <span className="text-[10px] uppercase tracking-wider text-stone-500 block mb-2 font-bold">
                  ACCEPTED PAYMENT METHODS & BNPL
                </span>
                <div className="flex flex-wrap gap-1.5 text-[10px] font-bold text-stone-900">
                  <span className="bg-stone-200 px-2 py-1 rounded">CASH ON DELIVERY</span>
                  <span className="bg-stone-200 px-2 py-1 rounded">VISA</span>
                  <span className="bg-stone-200 px-2 py-1 rounded">MASTERCARD</span>
                  <span className="bg-amber-200 px-2 py-1 rounded text-black">KOKO BNPL</span>
                  <span className="bg-amber-200 px-2 py-1 rounded text-black">MINTPAY</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & social icons */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 space-y-4 sm:space-y-0">
          <div>
            © {new Date().getFullYear()} FASHION GALLERIA PVT LTD. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-amber-500 transition-colors flex items-center space-x-1.5">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span>INSTAGRAM</span>
            </a>
            <a href="#" className="hover:text-amber-500 transition-colors flex items-center space-x-1.5">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z"/>
              </svg>
              <span>FACEBOOK</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

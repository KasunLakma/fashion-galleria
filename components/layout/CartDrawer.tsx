"use client";

import { useEffect } from "react";
import { X, ShoppingBag, Truck, ShieldCheck, ArrowRight, Trash2 } from "lucide-react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
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

  // Placeholder mock cart items to showcase luxury drawer experience
  const cartItems = [
    {
      id: "1",
      title: "Victoria Tailored Linen Wrap Dress",
      color: "Emerald Green",
      size: "UK 10 / M",
      price: 8990,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&q=80",
    },
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const freeShippingThreshold = 15000;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-slide-right">
          {/* Header */}
          <div className="p-5 border-b border-gray-200 flex items-center justify-between bg-white">
            <div className="flex items-center space-x-2">
              <ShoppingBag size={20} className="text-black" />
              <h2 className="text-base font-serif tracking-wide font-bold uppercase">
                Shopping Bag ({cartItems.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-black transition-colors rounded-full hover:bg-gray-100"
              aria-label="Close cart drawer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-stone-50 p-4 border-b border-stone-200">
            <div className="flex items-center space-x-2 text-xs font-medium text-stone-800 mb-2">
              <Truck size={16} className="text-amber-700 shrink-0" />
              {remainingForFreeShipping > 0 ? (
                <span>
                  Add <strong className="text-black">LKR {remainingForFreeShipping.toLocaleString()}</strong> more for <strong className="text-amber-800">FREE Islandwide COD Shipping</strong>
                </span>
              ) : (
                <span className="text-emerald-700 font-semibold">
                  🎉 Congratulations! You have unlocked FREE Express Delivery!
                </span>
              )}
            </div>
            <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-amber-700 h-full transition-all duration-500"
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 custom-scrollbar space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-400">
                  <ShoppingBag size={36} />
                </div>
                <h3 className="text-lg font-serif font-semibold text-gray-900 mb-1">Your bag is empty</h3>
                <p className="text-xs text-gray-500 max-w-xs mb-6">
                  Discover our latest luxury Sri Lankan designs and elevate your wardrobe today.
                </p>
                <button
                  onClick={onClose}
                  className="bg-black text-white text-xs uppercase tracking-widest px-6 py-3 font-medium hover:bg-amber-800 transition-colors"
                >
                  Shop New Arrivals
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex space-x-4 border-b border-gray-100 pb-4">
                  <div className="w-20 h-24 bg-gray-100 shrink-0 relative overflow-hidden rounded-xs border border-gray-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs font-semibold text-gray-900 font-serif leading-tight">
                          {item.title}
                        </h4>
                        <button 
                          className="text-gray-400 hover:text-red-600 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        Color: {item.color} | Size: {item.size}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-gray-300 text-xs">
                        <button className="px-2 py-0.5 hover:bg-gray-100">-</button>
                        <span className="px-2 py-0.5 font-medium">{item.quantity}</span>
                        <button className="px-2 py-0.5 hover:bg-gray-100">+</button>
                      </div>

                      <span className="text-xs font-bold text-gray-900">
                        LKR {(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-gray-200 bg-gray-50 space-y-3">
              <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">LKR {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="text-amber-800 font-medium">Calculated at Checkout</span>
                </div>
                <div className="flex items-center space-x-1 text-[11px] text-emerald-700 font-medium pt-1">
                  <ShieldCheck size={14} />
                  <span>Islandwide Cash on Delivery Available</span>
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <button 
                  onClick={onClose}
                  className="w-full bg-black hover:bg-amber-800 text-white text-xs uppercase tracking-widest py-3.5 px-4 font-semibold flex items-center justify-center space-x-2 transition-colors"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={16} />
                </button>

                <button 
                  onClick={onClose}
                  className="w-full border border-black hover:bg-black hover:text-white text-black text-xs uppercase tracking-widest py-2.5 px-4 font-semibold transition-colors"
                >
                  View Full Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import {
  X,
  ShoppingBag,
  Truck,
  ShieldCheck,
  ArrowRight,
  Trash2,
  Tag,
  Check,
  AlertCircle,
  Plus,
  Minus,
} from "lucide-react";

export default function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    subtotal,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    discountAmount,
    total,
  } = useCart();

  const router = useRouter();
  const [promoInput, setPromoInput] = useState("");
  const [promoMessage, setPromoMessage] = useState<{ success: boolean; text: string } | null>(null);

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const freeShippingThreshold = 15000;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    setPromoMessage({ success: res.success, text: res.message });
    if (res.success) {
      setPromoInput("");
    }
  };

  const handleProceedToCheckout = () => {
    closeCart();
    router.push("/checkout");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-slide-right">
          {/* Header */}
          <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-900 text-white">
            <div className="flex items-center space-x-2">
              <ShoppingBag size={20} className="text-amber-400" />
              <h2 className="text-sm font-serif tracking-widest font-bold uppercase">
                Shopping Bag ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 text-stone-300 hover:text-white transition-colors rounded-full hover:bg-stone-800"
              aria-label="Close cart drawer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          {cartItems.length > 0 && (
            <div className="bg-stone-50 p-4 border-b border-stone-200">
              <div className="flex items-center space-x-2 text-xs font-medium text-stone-800 mb-2">
                <Truck size={16} className="text-amber-800 shrink-0" />
                {remainingForFreeShipping > 0 ? (
                  <span>
                    Add <strong className="text-black">LKR {remainingForFreeShipping.toLocaleString()}</strong> more for <strong className="text-amber-800">FREE Express COD Shipping</strong>
                  </span>
                ) : (
                  <span className="text-emerald-800 font-bold">
                    🎉 Congratulations! You unlocked FREE Express Delivery!
                  </span>
                )}
              </div>
              <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-amber-800 h-full transition-all duration-500 rounded-full"
                  style={{ width: `${shippingProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 custom-scrollbar space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mb-4 text-stone-400">
                  <ShoppingBag size={36} />
                </div>
                <h3 className="text-lg font-serif font-bold text-stone-900 mb-1 uppercase tracking-wider">
                  Your bag is empty
                </h3>
                <p className="text-xs text-stone-500 max-w-xs mb-6">
                  Discover our latest luxury Sri Lankan apparel collection and elevate your wardrobe.
                </p>
                <Link
                  href="/shop"
                  onClick={closeCart}
                  className="bg-black text-white text-xs uppercase tracking-widest px-8 py-3.5 font-bold hover:bg-amber-800 transition-colors"
                >
                  Explore Collection
                </Link>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex space-x-4 border-b border-stone-100 pb-4">
                  {/* Image */}
                  <div className="w-20 h-24 bg-stone-100 shrink-0 relative overflow-hidden rounded-xs border border-stone-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs font-bold text-stone-900 font-serif leading-tight">
                          {item.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-stone-400 hover:text-red-700 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-1 uppercase font-medium">
                        {item.color ? `Color: ${item.color} | ` : ""}Size: {item.size}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-stone-300 text-xs rounded-xs bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-2 py-1 text-stone-600 hover:text-black hover:bg-stone-100 transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-2.5 py-1 font-bold text-stone-900">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-2 py-1 text-stone-600 hover:text-black hover:bg-stone-100 transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Price */}
                      <span className="text-xs font-extrabold text-stone-900">
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
            <div className="p-5 border-t border-stone-200 bg-stone-50 space-y-4">
              {/* Promo Code Input */}
              <div className="space-y-2">
                <form onSubmit={handleApplyPromo} className="flex items-center space-x-2">
                  <div className="relative flex-1">
                    <Tag size={14} className="absolute left-3 top-2.5 text-stone-400" />
                    <input
                      type="text"
                      placeholder="Promo Code (e.g. CEYLON10)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-stone-300 rounded-xs uppercase tracking-wider font-semibold focus:outline-none focus:border-amber-800 bg-white"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-stone-900 text-white text-xs uppercase tracking-wider font-bold px-4 py-2 hover:bg-amber-800 transition-colors rounded-xs"
                  >
                    Apply
                  </button>
                </form>

                {promoMessage && (
                  <p
                    className={`text-[11px] font-semibold flex items-center space-x-1 ${
                      promoMessage.success ? "text-emerald-700" : "text-red-600"
                    }`}
                  >
                    {promoMessage.success ? <Check size={12} /> : <AlertCircle size={12} />}
                    <span>{promoMessage.text}</span>
                  </p>
                )}

                {appliedPromo && (
                  <div className="flex items-center justify-between text-xs bg-emerald-50 text-emerald-800 p-2 rounded-xs border border-emerald-200">
                    <span className="font-bold uppercase tracking-wider">
                      Promo {appliedPromo.code} Applied ({appliedPromo.percent}% OFF)
                    </span>
                    <button
                      onClick={removePromoCode}
                      className="text-stone-500 hover:text-red-700 text-[10px] uppercase font-bold underline"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Subtotal Calculation */}
              <div className="space-y-1.5 text-xs text-stone-600 border-t border-stone-200 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-stone-900">LKR {subtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Discount ({appliedPromo?.code})</span>
                    <span>- LKR {discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Delivery</span>
                  <span className="text-amber-800 font-medium">
                    {subtotal >= 15000 ? "FREE Express COD" : "LKR 400 Flat Rate"}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-stone-200 text-sm font-extrabold text-stone-900">
                  <span>Total</span>
                  <span>LKR {total.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-1 text-[11px] text-emerald-800 font-semibold pt-1">
                  <ShieldCheck size={14} className="text-emerald-700" />
                  <span>Pay Cash on Delivery upon arrival</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-2">
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full bg-gradient-to-r from-amber-800 via-stone-900 to-black hover:from-amber-900 hover:to-stone-900 text-white text-xs uppercase tracking-[0.2em] py-4 px-4 font-extrabold flex items-center justify-center space-x-2 transition-all shadow-md"
                >
                  <span>PROCEED TO COD CHECKOUT</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

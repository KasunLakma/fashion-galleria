"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import {
  ShieldCheck,
  Truck,
  CheckCircle2,
  Lock,
  ChevronRight,
  ShoppingBag,
  ArrowLeft,
  Sparkles,
} from "lucide-react";

const SRI_LANKA_DISTRICTS = [
  "Colombo",
  "Gampaha",
  "Kalutara",
  "Kandy",
  "Matale",
  "Nuwara Eliya",
  "Galle",
  "Matara",
  "Hambantota",
  "Jaffna",
  "Kilinochchi",
  "Mannar",
  "Vavuniya",
  "Mullaitivu",
  "Batticaloa",
  "Ampara",
  "Trincomalee",
  "Kurunegala",
  "Puttalam",
  "Anuradhapura",
  "Polonnaruwa",
  "Badulla",
  "Moneragala",
  "Ratnapura",
  "Kegalle",
];

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, subtotal, discountAmount, appliedPromo, total, clearCart } = useCart();

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    primaryPhone: "",
    secondaryPhone: "",
    address: "",
    district: "Colombo",
    city: "",
    deliveryNotes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState<{
    orderId: string;
    items: typeof cartItems;
    grandTotal: number;
    shippingFee: number;
    deliveryDetails: typeof formData;
  } | null>(null);

  // Delivery fee calculation
  const deliveryFee = subtotal >= 15000 || cartItems.length === 0 ? 0 : 400;
  const grandTotal = total + deliveryFee;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formData.primaryPhone.trim()) {
      newErrors.primaryPhone = "Primary Phone Number is required";
    } else if (!/^[0-9+\-\s]{9,15}$/.test(formData.primaryPhone.trim())) {
      newErrors.primaryPhone = "Please enter a valid phone number (e.g. 0771234567)";
    }
    if (!formData.address.trim()) newErrors.address = "Delivery Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (cartItems.length === 0) {
      alert("Your cart is empty. Please add products before checking out.");
      router.push("/shop");
      return;
    }

    setIsSubmitting(true);

    // Simulate express backend checkout processing
    setTimeout(() => {
      const generatedId = `FG-${Math.floor(100000 + Math.random() * 900000)}`;
      const confirmedData = {
        orderId: generatedId,
        items: [...cartItems],
        grandTotal,
        shippingFee: deliveryFee,
        deliveryDetails: { ...formData },
      };
      setOrderConfirmed(confirmedData);
      clearCart();
      setIsSubmitting(false);
    }, 1500);
  };

  if (orderConfirmed) {
    return (
      <div className="bg-stone-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-white border border-stone-200 shadow-xl rounded-xs p-6 sm:p-10 space-y-8 animate-fade-in">
          {/* Header */}
          <div className="text-center space-y-3 pb-6 border-b border-stone-200">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-2 animate-bounce">
              <CheckCircle2 size={36} />
            </div>
            <span className="text-xs uppercase tracking-[0.3em] text-emerald-800 font-extrabold block">
              ORDER CONFIRMED (CASH ON DELIVERY)
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold uppercase tracking-tight text-stone-900">
              Thank You, {orderConfirmed.deliveryDetails.fullName}!
            </h1>
            <p className="text-xs text-stone-600">
              Order Reference: <strong className="text-stone-900 font-mono text-sm">{orderConfirmed.orderId}</strong>
            </p>
          </div>

          {/* Delivery Callout Banner */}
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-xs text-xs text-stone-800 space-y-1">
            <div className="flex items-center space-x-2 text-amber-900 font-bold uppercase tracking-wider">
              <Truck size={16} />
              <span>Islandwide Cash on Delivery Scheduled</span>
            </div>
            <p className="text-stone-600">
              Please prepare exactly <strong className="text-stone-900 font-bold">LKR {orderConfirmed.grandTotal.toLocaleString()}</strong> in cash for the courier agent.
            </p>
            <p className="text-[11px] text-amber-800 font-semibold pt-1">
              Estimated Delivery: 24-48 Hours (Colombo) | 2-3 Working Days (Outstation).
            </p>
          </div>

          {/* Customer & Address Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-700 bg-stone-50 p-4 border border-stone-200 rounded-xs">
            <div>
              <span className="font-bold uppercase tracking-wider text-stone-900 block mb-1">
                Recipient Details
              </span>
              <p>{orderConfirmed.deliveryDetails.fullName}</p>
              <p>Primary: {orderConfirmed.deliveryDetails.primaryPhone}</p>
              {orderConfirmed.deliveryDetails.secondaryPhone && (
                <p>Alt: {orderConfirmed.deliveryDetails.secondaryPhone}</p>
              )}
            </div>

            <div>
              <span className="font-bold uppercase tracking-wider text-stone-900 block mb-1">
                Shipping Address
              </span>
              <p>{orderConfirmed.deliveryDetails.address}</p>
              <p>
                {orderConfirmed.deliveryDetails.city}, {orderConfirmed.deliveryDetails.district} District
              </p>
            </div>
          </div>

          {/* Purchased Items List */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-stone-900 mb-3">
              Items Ordered ({orderConfirmed.items.length})
            </h3>
            <div className="divide-y divide-stone-200 border-t border-b border-stone-200">
              {orderConfirmed.items.map((item) => (
                <div key={item.id} className="py-3 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-14 object-cover rounded-xs border border-stone-200"
                    />
                    <div>
                      <h4 className="font-serif font-bold text-stone-900">{item.title}</h4>
                      <p className="text-[11px] text-stone-500">
                        Size: {item.size} {item.color ? `| ${item.color}` : ""} x {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-stone-900">
                    LKR {(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Grand Total Summary */}
          <div className="space-y-1.5 text-xs text-stone-700 pt-2 border-t border-stone-200">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-stone-900">LKR {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Islandwide Delivery Fee</span>
              <span className="text-amber-800 font-semibold">
                {orderConfirmed.shippingFee === 0 ? "FREE" : `LKR ${orderConfirmed.shippingFee}`}
              </span>
            </div>
            <div className="flex justify-between text-sm font-extrabold text-stone-900 pt-2 border-t border-stone-200">
              <span>Grand Total (Pay on Delivery)</span>
              <span className="text-amber-800 font-bold">LKR {orderConfirmed.grandTotal.toLocaleString()}</span>
            </div>
          </div>

          {/* Continue Shopping CTA */}
          <div className="pt-4 text-center">
            <Link
              href="/shop"
              className="inline-block w-full bg-black text-white py-4 text-xs uppercase tracking-[0.2em] font-bold hover:bg-amber-800 transition-colors shadow-md"
            >
              Continue Shopping Collection
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-stone-50 min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Navigation Breadcrumb Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-stone-200">
          <Link
            href="/shop"
            className="flex items-center space-x-1 text-xs uppercase tracking-wider font-bold text-stone-600 hover:text-black transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Return to Shop</span>
          </Link>

          <div className="flex items-center space-x-2 text-xs text-emerald-800 font-semibold bg-emerald-50 px-3 py-1.5 rounded-xs border border-emerald-200">
            <ShieldCheck size={16} />
            <span>Express Cash on Delivery (COD) Checkout</span>
          </div>
        </div>

        {/* Form & Summary 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Express Delivery Form (7 Cols on Desktop) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 border border-stone-200 shadow-xs rounded-xs space-y-6">
            <div className="border-b border-stone-200 pb-4">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-amber-800 block mb-1">
                STEP 1 OF 2
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold uppercase tracking-tight text-stone-900">
                Delivery Address & Recipient
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Enter your location in Sri Lanka for Cash on Delivery. No credit card required.
              </p>
            </div>

            <form onSubmit={handleSubmitOrder} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-stone-900 mb-1.5">
                  Full Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="e.g. Dinuka Perera"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`w-full text-xs p-3 border rounded-xs focus:outline-none ${
                    errors.fullName ? "border-red-500 bg-red-50" : "border-stone-300 focus:border-amber-800 bg-white"
                  }`}
                />
                {errors.fullName && <p className="text-[11px] text-red-600 mt-1 font-semibold">{errors.fullName}</p>}
              </div>

              {/* Phone Numbers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-stone-900 mb-1.5">
                    Primary Phone (Mobile) <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    name="primaryPhone"
                    placeholder="e.g. 077 123 4567"
                    value={formData.primaryPhone}
                    onChange={handleInputChange}
                    className={`w-full text-xs p-3 border rounded-xs focus:outline-none ${
                      errors.primaryPhone ? "border-red-500 bg-red-50" : "border-stone-300 focus:border-amber-800 bg-white"
                    }`}
                  />
                  {errors.primaryPhone && <p className="text-[11px] text-red-600 mt-1 font-semibold">{errors.primaryPhone}</p>}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-stone-900 mb-1.5">
                    Secondary Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    name="secondaryPhone"
                    placeholder="e.g. 011 200 3000"
                    value={formData.secondaryPhone}
                    onChange={handleInputChange}
                    className="w-full text-xs p-3 border border-stone-300 rounded-xs focus:outline-none focus:border-amber-800 bg-white"
                  />
                </div>
              </div>

              {/* Delivery Address */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-stone-900 mb-1.5">
                  Street Address & House / Apt Number <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="e.g. No. 45/A, Flower Road, Colombo 07"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={`w-full text-xs p-3 border rounded-xs focus:outline-none ${
                    errors.address ? "border-red-500 bg-red-50" : "border-stone-300 focus:border-amber-800 bg-white"
                  }`}
                />
                {errors.address && <p className="text-[11px] text-red-600 mt-1 font-semibold">{errors.address}</p>}
              </div>

              {/* District & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-stone-900 mb-1.5">
                    District <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    className="w-full text-xs p-3 border border-stone-300 rounded-xs focus:outline-none focus:border-amber-800 bg-white cursor-pointer"
                  >
                    {SRI_LANKA_DISTRICTS.map((d) => (
                      <option key={d} value={d}>
                        {d} District
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-stone-900 mb-1.5">
                    City / Area <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    placeholder="e.g. Colombo 07 / Kandy City"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`w-full text-xs p-3 border rounded-xs focus:outline-none ${
                      errors.city ? "border-red-500 bg-red-50" : "border-stone-300 focus:border-amber-800 bg-white"
                    }`}
                  />
                  {errors.city && <p className="text-[11px] text-red-600 mt-1 font-semibold">{errors.city}</p>}
                </div>
              </div>

              {/* Special Instructions */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-stone-900 mb-1.5">
                  Special Delivery Instructions (Optional)
                </label>
                <textarea
                  name="deliveryNotes"
                  rows={2}
                  placeholder="e.g. Deliver between 9 AM - 5 PM or call before arrival."
                  value={formData.deliveryNotes}
                  onChange={handleInputChange}
                  className="w-full text-xs p-3 border border-stone-300 rounded-xs focus:outline-none focus:border-amber-800 bg-white"
                />
              </div>

              {/* Payment Method Pre-selected Selector */}
              <div className="pt-4 border-t border-stone-200 space-y-3">
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-amber-800 block">
                  STEP 2 OF 2
                </span>
                <h3 className="font-serif text-lg font-bold uppercase tracking-tight text-stone-900">
                  Payment Option
                </h3>

                <div className="bg-amber-50/80 border-2 border-amber-700 p-4 rounded-xs flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-5 h-5 rounded-full border-4 border-amber-800 bg-white shrink-0" />
                    <div>
                      <strong className="block text-xs uppercase tracking-wider font-bold text-stone-900">
                        Cash on Delivery (COD)
                      </strong>
                      <span className="text-[11px] text-stone-600">
                        Pay cash directly to the courier agent when receiving your package.
                      </span>
                    </div>
                  </div>
                  <ShieldCheck size={22} className="text-amber-800 shrink-0" />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-amber-800 via-stone-900 to-black hover:from-amber-900 hover:to-black text-white py-4 px-6 text-xs uppercase tracking-[0.2em] font-extrabold transition-all shadow-lg flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <Sparkles size={16} className="animate-spin" />
                      <span>PROCESSING YOUR COD ORDER...</span>
                    </>
                  ) : (
                    <>
                      <Lock size={16} className="text-amber-400" />
                      <span>CONFIRM ORDER (CASH ON DELIVERY)</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Order Summary Card (5 Cols on Desktop) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 border border-stone-200 shadow-xs rounded-xs space-y-4">
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <h3 className="font-serif text-sm font-bold uppercase tracking-widest text-stone-900 flex items-center space-x-2">
                  <ShoppingBag size={18} className="text-amber-800" />
                  <span>Order Summary ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})</span>
                </h3>
                <Link href="/shop" className="text-[10px] text-amber-800 font-bold uppercase underline">
                  Edit Bag
                </Link>
              </div>

              {/* Itemized List */}
              <div className="divide-y divide-stone-100 max-h-72 overflow-y-auto custom-scrollbar">
                {cartItems.length === 0 ? (
                  <p className="text-xs text-stone-500 py-4 text-center">Your bag is currently empty.</p>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.id} className="py-3 flex space-x-3 items-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-12 h-14 object-cover rounded-xs border border-stone-200 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-xs font-bold text-stone-900 truncate">
                          {item.title}
                        </h4>
                        <p className="text-[10px] text-stone-500 uppercase">
                          Size: {item.size} {item.color ? `| ${item.color}` : ""}
                        </p>
                        <p className="text-[11px] text-stone-700 font-semibold">
                          Qty: {item.quantity} x LKR {item.price.toLocaleString()}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-stone-900 shrink-0">
                        LKR {(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))
                )}
              </div>

              {/* Price Calculation Breakdowns */}
              <div className="border-t border-stone-200 pt-3 space-y-2 text-xs text-stone-600">
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
                  <span>Islandwide Delivery Fee</span>
                  <span className="text-amber-800 font-semibold">
                    {deliveryFee === 0 ? "FREE" : `LKR ${deliveryFee}`}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-extrabold text-stone-900 pt-3 border-t border-stone-200">
                  <span>Grand Total</span>
                  <span className="text-amber-800 text-base">LKR {grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Guarantee Box */}
              <div className="bg-stone-50 border border-stone-200 p-3 rounded-xs text-[11px] text-stone-600 space-y-1.5">
                <div className="flex items-center space-x-1.5 font-bold text-stone-900 uppercase">
                  <ShieldCheck size={14} className="text-emerald-700" />
                  <span>100% Risk-Free Guarantee</span>
                </div>
                <p>
                  Inspect your luxury garments upon delivery. We offer a 7-day door-to-door courier exchange if you need a size adjustment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

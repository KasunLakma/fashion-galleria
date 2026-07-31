"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  Package,
  Truck,
  MapPin,
  RefreshCw,
  ShoppingBag,
  ShieldCheck,
  Phone,
  AlertCircle,
  XCircle,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import { trackPurchase } from "@/components/analytics/Pixels";

export interface OrderItemData {
  id: string;
  title: string;
  size: string;
  color?: string | null;
  quantity: number;
  price: number;
  image?: string | null;
}

export interface DeliveryStatusData {
  id: string;
  status: string;
  note?: string | null;
  createdAt: string;
}

export interface OrderData {
  id: string;
  orderNumber: string;
  customerName: string;
  email?: string | null;
  primaryPhone: string;
  secondaryPhone?: string | null;
  address: string;
  city: string;
  district: string;
  deliveryNotes?: string | null;
  paymentMethod: string;
  status: string;
  subtotal: number;
  deliveryFee: number;
  discountAmount: number;
  grandTotal: number;
  items: OrderItemData[];
  statusHistory: DeliveryStatusData[];
  createdAt: string;
  updatedAt: string;
}

const ORDER_STEPS = [
  { id: "Pending", label: "Order Placed", desc: "We received your order", icon: Clock },
  { id: "Processing", label: "Accepted & Processing", desc: "Packing at Colombo Atelier", icon: Package },
  { id: "Shipped", label: "Package Shipped", desc: "Dispatched to Courier Agent", icon: Truck },
  { id: "Out for Delivery", label: "Out for Delivery", desc: "Courier agent on the way", icon: MapPin },
  { id: "Delivered", label: "Delivered", desc: "Handed over & payment done", icon: CheckCircle2 },
];

export default function OrderTrackerView({ orderId }: { orderId: string }) {
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchOrder = useCallback(async () => {
    try {
      setIsRefreshing(true);
      const res = await fetch(`/api/orders/${orderId}`);
      const data = await res.json();

      if (data.success && data.order) {
        setOrder(data.order);
        setError(null);
      } else {
        setError(data.error || "Order not found");
      }
    } catch (err) {
      console.error("Order fetch error:", err);
      setError("Failed to load order tracking details.");
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, [orderId]);

  useEffect(() => {
    fetchOrder();
    trackPurchase(orderId, 11490, 1);
  }, [orderId, fetchOrder]);

  const getStepStatus = (stepId: string) => {
    if (!order) return "upcoming";

    const currentStatus = order.status.toLowerCase();
    if (currentStatus === "cancelled") return "cancelled";

    const stepOrder = ["pending", "accepted", "processing", "shipped", "dispatched", "out for delivery", "delivered", "completed"];
    
    // Normalize step matching
    let currentIdx = 0;
    if (currentStatus === "pending") currentIdx = 0;
    else if (currentStatus === "accepted" || currentStatus === "processing") currentIdx = 1;
    else if (currentStatus === "shipped" || currentStatus === "dispatched") currentIdx = 2;
    else if (currentStatus === "out for delivery") currentIdx = 3;
    else if (currentStatus === "delivered" || currentStatus === "completed") currentIdx = 4;

    let targetIdx = 0;
    if (stepId === "Pending") targetIdx = 0;
    else if (stepId === "Processing") targetIdx = 1;
    else if (stepId === "Shipped") targetIdx = 2;
    else if (stepId === "Out for Delivery") targetIdx = 3;
    else if (stepId === "Delivered") targetIdx = 4;

    if (currentIdx > targetIdx) return "completed";
    if (currentIdx === targetIdx) return "current";
    return "upcoming";
  };

  if (loading) {
    return (
      <div className="bg-stone-50 min-h-screen py-16 flex justify-center items-center">
        <div className="text-center space-y-4">
          <RefreshCw size={32} className="animate-spin text-amber-800 mx-auto" />
          <p className="text-xs uppercase tracking-widest text-stone-600 font-bold">
            Retrieving Real-time Order Details...
          </p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="bg-stone-50 min-h-screen py-16 px-4">
        <div className="max-w-md mx-auto bg-white border border-stone-200 p-8 rounded-xs text-center space-y-4 shadow-lg">
          <AlertCircle size={40} className="text-amber-800 mx-auto" />
          <h2 className="font-serif text-xl font-bold uppercase tracking-tight text-stone-900">
            Order Reference Not Found
          </h2>
          <p className="text-xs text-stone-600">
            We could not find an active order matching reference <strong className="font-mono font-bold text-stone-900">{orderId}</strong>.
          </p>
          <div className="pt-4">
            <Link
              href="/shop"
              className="inline-block w-full bg-black text-white py-3 text-xs uppercase tracking-widest font-bold hover:bg-amber-800 transition-colors"
            >
              Back to Collection
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isCancelled = order.status.toLowerCase() === "cancelled";

  return (
    <div className="bg-stone-50 min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between border-b border-stone-200 pb-4">
          <Link
            href="/shop"
            className="flex items-center space-x-1 text-xs uppercase tracking-wider font-bold text-stone-600 hover:text-black transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Return to Shop</span>
          </Link>

          <button
            onClick={fetchOrder}
            disabled={isRefreshing}
            className="flex items-center space-x-2 text-xs font-bold uppercase text-amber-800 hover:text-stone-900 transition-colors"
          >
            <RefreshCw size={14} className={isRefreshing ? "animate-spin" : ""} />
            <span>Refresh Tracker</span>
          </button>
        </div>

        {/* Order Header Card */}
        <div className="bg-white border border-stone-200 shadow-xl rounded-xs p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-6">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] uppercase tracking-[0.25em] text-amber-800 font-extrabold block">
                  LIVE ORDER TRACKER
                </span>
                <span
                  className={`text-[9px] uppercase font-extrabold px-2 py-0.5 rounded border ${
                    isCancelled
                      ? "bg-red-100 text-red-900 border-red-300"
                      : order.status === "Delivered" || order.status === "Completed"
                      ? "bg-emerald-100 text-emerald-900 border-emerald-300"
                      : "bg-amber-100 text-amber-900 border-amber-300"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold uppercase tracking-tight text-stone-900 mt-1">
                Order #{order.orderNumber}
              </h1>
              <p className="text-xs text-stone-500 mt-1">
                Placed on {new Date(order.createdAt).toLocaleString("en-LK", { dateStyle: "medium", timeStyle: "short" })}
              </p>
            </div>

            <div className="text-right sm:border-l sm:border-stone-200 sm:pl-6">
              <span className="text-[10px] text-stone-500 uppercase tracking-widest block font-bold">
                Grand Total ({order.paymentMethod})
              </span>
              <span className="font-serif text-2xl font-extrabold text-amber-800">
                LKR {order.grandTotal.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Cancelled Banner */}
          {isCancelled && (
            <div className="bg-red-50 border border-red-200 p-4 rounded-xs text-xs text-red-900 flex items-center space-x-3">
              <XCircle size={24} className="text-red-700 shrink-0" />
              <div>
                <strong className="uppercase font-bold block">Order Cancelled</strong>
                <span>This order has been cancelled. Please contact customer support if you have questions.</span>
              </div>
            </div>
          )}

          {/* Real-time 5-Step Progress Tracker */}
          {!isCancelled && (
            <div className="py-4 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-stone-900 mb-6">
                Fulfillment Status Progression
              </h3>

              <div className="relative">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {ORDER_STEPS.map((step, idx) => {
                    const status = getStepStatus(step.id);
                    const StepIcon = step.icon;
                    const isCompleted = status === "completed";
                    const isCurrent = status === "current";

                    return (
                      <div
                        key={step.id}
                        className={`p-4 border rounded-xs transition-all relative ${
                          isCurrent
                            ? "bg-amber-50 border-amber-800 shadow-md ring-1 ring-amber-800"
                            : isCompleted
                            ? "bg-stone-50 border-emerald-600"
                            : "bg-white border-stone-200 opacity-60"
                        }`}
                      >
                        <div className="flex items-center space-x-3 md:block md:space-x-0 md:text-center space-y-1">
                          <div
                            className={`w-9 h-9 rounded-full flex items-center justify-center mx-auto shrink-0 ${
                              isCompleted
                                ? "bg-emerald-600 text-white"
                                : isCurrent
                                ? "bg-amber-800 text-white animate-pulse"
                                : "bg-stone-200 text-stone-500"
                            }`}
                          >
                            <StepIcon size={18} />
                          </div>
                          <div>
                            <span className="text-[11px] font-bold uppercase tracking-wider block text-stone-900 mt-1">
                              {step.label}
                            </span>
                            <span className="text-[10px] text-stone-500 block leading-tight mt-0.5">
                              {step.desc}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Status Timeline History Logs */}
          {order.statusHistory && order.statusHistory.length > 0 && (
            <div className="border-t border-stone-200 pt-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-stone-900 mb-3">
                Tracking Logs Timeline
              </h3>
              <div className="space-y-3 pl-2 border-l-2 border-amber-800/40 text-xs">
                {order.statusHistory.map((log) => (
                  <div key={log.id} className="relative pl-4">
                    <div className="absolute -left-[17px] top-1 w-2.5 h-2.5 rounded-full bg-amber-800 border-2 border-white" />
                    <div className="flex items-center space-x-2">
                      <strong className="uppercase font-bold text-stone-900">{log.status}</strong>
                      <span className="text-[10px] text-stone-500 font-mono">
                        {new Date(log.createdAt).toLocaleString("en-LK", { dateStyle: "short", timeStyle: "short" })}
                      </span>
                    </div>
                    {log.note && <p className="text-[11px] text-stone-600 mt-0.5">{log.note}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Customer & Address Summary & Itemized Summary */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Column: Delivery & Recipient Details (6 cols) */}
          <div className="md:col-span-6 bg-white border border-stone-200 shadow-sm rounded-xs p-6 space-y-4">
            <h3 className="font-serif text-sm font-bold uppercase tracking-widest text-stone-900 border-b border-stone-200 pb-3 flex items-center space-x-2">
              <MapPin size={18} className="text-amber-800" />
              <span>Recipient & Delivery Address</span>
            </h3>

            <div className="text-xs text-stone-700 space-y-2">
              <div>
                <span className="text-[10px] font-bold uppercase text-stone-400 block">Recipient Name</span>
                <strong className="text-stone-900 text-sm font-serif">{order.customerName}</strong>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <span className="text-[10px] font-bold uppercase text-stone-400 block">Primary Phone</span>
                  <span className="font-mono font-bold text-stone-900">{order.primaryPhone}</span>
                </div>
                {order.secondaryPhone && (
                  <div>
                    <span className="text-[10px] font-bold uppercase text-stone-400 block">Alt Phone</span>
                    <span className="font-mono text-stone-900">{order.secondaryPhone}</span>
                  </div>
                )}
              </div>

              {order.email && (
                <div>
                  <span className="text-[10px] font-bold uppercase text-stone-400 block">Email Address</span>
                  <span className="text-stone-900">{order.email}</span>
                </div>
              )}

              <div className="pt-2 border-t border-stone-100">
                <span className="text-[10px] font-bold uppercase text-stone-400 block">Street Address</span>
                <p className="font-medium text-stone-900">{order.address}</p>
                <p className="font-medium text-stone-900">{order.city}, {order.district} District, Sri Lanka</p>
              </div>

              {order.deliveryNotes && (
                <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-xs text-[11px] text-amber-900 mt-2">
                  <strong>Special Courier Notes:</strong> {order.deliveryNotes}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Order Summary Breakdown (6 cols) */}
          <div className="md:col-span-6 bg-white border border-stone-200 shadow-sm rounded-xs p-6 space-y-4">
            <h3 className="font-serif text-sm font-bold uppercase tracking-widest text-stone-900 border-b border-stone-200 pb-3 flex items-center space-x-2">
              <ShoppingBag size={18} className="text-amber-800" />
              <span>Order Summary ({order.items.reduce((acc, i) => acc + i.quantity, 0)})</span>
            </h3>

            {/* Items List */}
            <div className="divide-y divide-stone-100 max-h-64 overflow-y-auto custom-scrollbar">
              {order.items.map((item) => (
                <div key={item.id} className="py-3 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-3">
                    {item.image ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-12 h-14 object-cover rounded-xs border border-stone-200 shrink-0"
                      />
                    ) : (
                      <div className="w-12 h-14 bg-stone-100 flex items-center justify-center text-stone-400 rounded-xs">
                        <Package size={20} />
                      </div>
                    )}
                    <div>
                      <h4 className="font-serif font-bold text-stone-900">{item.title}</h4>
                      <p className="text-[11px] text-stone-500 uppercase">
                        Size: {item.size} {item.color ? `| ${item.color}` : ""} x {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-stone-900 shrink-0">
                    LKR {(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Financial Breakdown */}
            <div className="border-t border-stone-200 pt-3 space-y-1.5 text-xs text-stone-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-stone-900">LKR {order.subtotal.toLocaleString()}</span>
              </div>

              {order.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Discount Applied</span>
                  <span>- LKR {order.discountAmount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Islandwide Delivery Fee</span>
                <span className="text-amber-800 font-semibold">
                  {order.deliveryFee === 0 ? "FREE" : `LKR ${order.deliveryFee}`}
                </span>
              </div>

              <div className="flex justify-between text-sm font-extrabold text-stone-900 pt-3 border-t border-stone-200">
                <span>Grand Total</span>
                <span className="text-amber-800 text-base">LKR {order.grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Support Banner */}
        <div className="bg-stone-900 text-white p-6 rounded-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-serif text-sm font-bold uppercase tracking-wider">Need assistance with your order?</h4>
            <p className="text-xs text-stone-400">Our Colombo Atelier support line is active Monday - Saturday (9 AM - 7 PM).</p>
          </div>
          <a
            href="tel:+94117008000"
            className="inline-flex items-center space-x-2 bg-amber-800 hover:bg-amber-900 text-white text-xs uppercase font-extrabold px-5 py-3 rounded-xs tracking-wider transition-colors shrink-0"
          >
            <Phone size={14} />
            <span>+94 11 700 8000</span>
          </a>
        </div>
      </div>
    </div>
  );
}

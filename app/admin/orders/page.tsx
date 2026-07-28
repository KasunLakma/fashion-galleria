"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import {
  ShoppingBag,
  Filter,
  CheckCircle2,
  Clock,
  Printer,
  X,
  Search,
  ChevronRight,
  Eye,
  MapPin,
  Phone,
  User,
  Truck,
} from "lucide-react";

export interface OrderRecord {
  id: string;
  orderId: string;
  customerName: string;
  primaryPhone: string;
  secondaryPhone?: string;
  address: string;
  city: string;
  district: string;
  deliveryNotes?: string;
  items: Array<{
    title: string;
    size: string;
    color?: string;
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  deliveryFee: number;
  discountAmount: number;
  grandTotal: number;
  paymentMethod: string;
  status: "Pending" | "Processing" | "Dispatched" | "Completed" | "Cancelled";
  date: string;
}

const INITIAL_MOCK_ORDERS: OrderRecord[] = [
  {
    id: "doc-1",
    orderId: "FG-892415",
    customerName: "Dinuka Perera",
    primaryPhone: "0771234567",
    secondaryPhone: "0112003000",
    address: "No. 45/A, Flower Road",
    city: "Colombo 07",
    district: "Colombo",
    deliveryNotes: "Call before arrival",
    items: [
      { title: "Victoria Emerald Linen Wrap Dress", size: "M", color: "Emerald Green", quantity: 1, price: 8990 },
      { title: "Sienna High-Waist Pleated Midi Skirt", size: "M", color: "Terracotta", quantity: 1, price: 6990 },
    ],
    subtotal: 15980,
    deliveryFee: 0,
    discountAmount: 0,
    grandTotal: 15980,
    paymentMethod: "Cash on Delivery (COD)",
    status: "Pending",
    date: "10 mins ago",
  },
  {
    id: "doc-2",
    orderId: "FG-892414",
    customerName: "Nishani Jayasinghe",
    primaryPhone: "0719876543",
    address: "128, Peradeniya Road",
    city: "Kandy",
    district: "Kandy",
    items: [
      { title: "Aurelia Gold-Button Tailored Blazer", size: "S", color: "Ivory White", quantity: 1, price: 14990 },
    ],
    subtotal: 14990,
    deliveryFee: 400,
    discountAmount: 0,
    grandTotal: 15390,
    paymentMethod: "Cash on Delivery (COD)",
    status: "Processing",
    date: "1 hour ago",
  },
  {
    id: "doc-3",
    orderId: "FG-892413",
    customerName: "Kavinda De Silva",
    primaryPhone: "0765432109",
    address: "No. 12, Rampart Street",
    city: "Galle Fort",
    district: "Galle",
    items: [
      { title: "Monaco Italian Linen Shirt - Off White", size: "L", color: "Off White", quantity: 2, price: 7490 },
      { title: "Sri Lankan Silk Touch Designer Scarf", size: "One Size", color: "Gold Floral", quantity: 1, price: 3490 },
    ],
    subtotal: 18470,
    deliveryFee: 0,
    discountAmount: 0,
    grandTotal: 18470,
    paymentMethod: "Cash on Delivery (COD)",
    status: "Dispatched",
    date: "3 hours ago",
  },
  {
    id: "doc-4",
    orderId: "FG-892412",
    customerName: "Amaya Fernando",
    primaryPhone: "0701122334",
    address: "56, Main Street",
    city: "Negombo",
    district: "Gampaha",
    items: [
      { title: "Celeste Satin Cowl Neck Evening Midi", size: "S", color: "Ruby Red", quantity: 1, price: 11490 },
    ],
    subtotal: 11490,
    deliveryFee: 400,
    discountAmount: 0,
    grandTotal: 11890,
    paymentMethod: "Cash on Delivery (COD)",
    status: "Completed",
    date: "Yesterday",
  },
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderRecord[]>(INITIAL_MOCK_ORDERS);
  const [activeTab, setActiveTab] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<OrderRecord | null>(null);
  const [packingSlipOrder, setPackingSlipOrder] = useState<OrderRecord | null>(null);

  // Fetch Firestore orders if DB available
  useEffect(() => {
    async function fetchOrders() {
      if (db) {
        try {
          const snapshot = await getDocs(collection(db, "orders"));
          if (!snapshot.empty) {
            const fetched = snapshot.docs.map((docSnap) => ({
              id: docSnap.id,
              ...docSnap.data(),
            })) as OrderRecord[];
            setOrders(fetched);
          }
        } catch (err) {
          console.warn("Firestore orders fetch error:", err);
        }
      }
    }
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderId: string, newStatus: OrderRecord["status"]) => {
    setOrders((prev) =>
      prev.map((o) => (o.orderId === orderId ? { ...o, status: newStatus } : o))
    );
    if (selectedOrder && selectedOrder.orderId === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }

    if (db) {
      try {
        const orderToUpdate = orders.find((o) => o.orderId === orderId);
        if (orderToUpdate) {
          const docRef = doc(db, "orders", orderToUpdate.id);
          await updateDoc(docRef, { status: newStatus });
        }
      } catch (err) {
        console.warn("Firestore status update error:", err);
      }
    }
  };

  const filteredOrders = orders.filter((ord) => {
    const matchesTab = activeTab === "All" || ord.status === activeTab;
    const matchesSearch =
      ord.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-stone-200 pb-4 gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-amber-800 block mb-1">
            FULFILLMENT CONTROL CONSOLE
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold uppercase tracking-tight text-stone-900">
            Order Processing & Dispatch
          </h1>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search size={16} className="absolute left-3 top-3 text-stone-400" />
          <input
            type="text"
            placeholder="Search Order ID, Customer, City..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-9 pr-4 py-2.5 bg-white border border-stone-300 rounded-xs focus:outline-none focus:border-amber-800"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto custom-scrollbar border-b border-stone-200 pb-1 text-xs font-bold uppercase tracking-wider">
        {["All", "Pending", "Processing", "Dispatched", "Completed", "Cancelled"].map((tab) => {
          const count = tab === "All" ? orders.length : orders.filter((o) => o.status === tab).length;
          const isActive = activeTab === tab;

          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 whitespace-nowrap transition-all border-b-2 ${
                isActive
                  ? "border-amber-800 text-amber-800 font-extrabold"
                  : "border-transparent text-stone-500 hover:text-stone-900"
              }`}
            >
              {tab} ({count})
            </button>
          );
        })}
      </div>

      {/* Orders List Table */}
      <div className="bg-white border border-stone-200 shadow-xs rounded-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-stone-700">
            <thead className="bg-stone-900 text-white uppercase tracking-wider text-[10px] font-bold">
              <tr>
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer Info</th>
                <th className="p-4">Delivery Location</th>
                <th className="p-4">Items</th>
                <th className="p-4">Grand Total</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 font-medium">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-stone-500 font-semibold">
                    No orders match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((ord) => (
                  <tr key={ord.orderId} className="hover:bg-stone-50 transition-colors">
                    <td className="p-4 font-mono font-bold text-stone-900">{ord.orderId}</td>
                    <td className="p-4">
                      <strong className="block text-stone-900 font-serif text-sm">{ord.customerName}</strong>
                      <span className="text-[11px] text-stone-500">{ord.primaryPhone}</span>
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-stone-900 block">{ord.city}</span>
                      <span className="text-[10px] text-stone-500 uppercase">{ord.district} District</span>
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-stone-900">{ord.items.length} Item(s)</span>
                      <p className="text-[10px] text-stone-500 line-clamp-1">
                        {ord.items.map((i) => i.title).join(", ")}
                      </p>
                    </td>
                    <td className="p-4 font-bold text-stone-900">
                      LKR {ord.grandTotal.toLocaleString()}
                    </td>
                    <td className="p-4">
                      <select
                        value={ord.status}
                        onChange={(e) => handleUpdateStatus(ord.orderId, e.target.value as OrderRecord["status"])}
                        className={`text-[10px] uppercase font-extrabold px-2.5 py-1 rounded border cursor-pointer focus:outline-none ${
                          ord.status === "Pending"
                            ? "bg-amber-100 text-amber-900 border-amber-300"
                            : ord.status === "Processing"
                            ? "bg-blue-100 text-blue-900 border-blue-200"
                            : ord.status === "Dispatched"
                            ? "bg-purple-100 text-purple-900 border-purple-200"
                            : "bg-emerald-100 text-emerald-900 border-emerald-200"
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Dispatched">Dispatched</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => setSelectedOrder(ord)}
                        className="p-1.5 bg-stone-100 text-stone-800 hover:bg-stone-900 hover:text-white rounded transition-colors"
                        title="View Order Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => setPackingSlipOrder(ord)}
                        className="p-1.5 bg-amber-100 text-amber-900 hover:bg-amber-800 hover:text-white rounded transition-colors"
                        title="Print Packing Slip"
                      >
                        <Printer size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Inspector Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-xs" onClick={() => setSelectedOrder(null)} />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-xl bg-white shadow-2xl rounded-xs overflow-hidden z-10 animate-fade-in">
              <div className="p-5 bg-stone-900 text-white flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold uppercase">Order Details #{selectedOrder.orderId}</h3>
                  <span className="text-[10px] text-amber-400 uppercase font-semibold">Payment: Cash on Delivery (COD)</span>
                </div>
                <button onClick={() => setSelectedOrder(null)} className="p-1 hover:bg-stone-800 rounded">
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto custom-scrollbar text-xs">
                {/* Customer Details */}
                <div className="bg-stone-50 p-4 border border-stone-200 rounded-xs space-y-2">
                  <h4 className="font-bold uppercase tracking-wider text-stone-900 flex items-center space-x-2">
                    <User size={14} className="text-amber-800" />
                    <span>Customer & Delivery Info</span>
                  </h4>
                  <p><strong className="text-stone-900">Name:</strong> {selectedOrder.customerName}</p>
                  <p><strong className="text-stone-900">Primary Phone:</strong> {selectedOrder.primaryPhone}</p>
                  {selectedOrder.secondaryPhone && <p><strong className="text-stone-900">Alt Phone:</strong> {selectedOrder.secondaryPhone}</p>}
                  <p><strong className="text-stone-900">Address:</strong> {selectedOrder.address}, {selectedOrder.city}, {selectedOrder.district} District</p>
                  {selectedOrder.deliveryNotes && <p className="text-amber-900 bg-amber-50 p-2 border border-amber-200"><strong>Notes:</strong> {selectedOrder.deliveryNotes}</p>}
                </div>

                {/* Items */}
                <div>
                  <h4 className="font-bold uppercase tracking-wider text-stone-900 mb-2">Itemized List</h4>
                  <div className="divide-y divide-stone-200 border-t border-b border-stone-200">
                    {selectedOrder.items.map((i, idx) => (
                      <div key={idx} className="py-2.5 flex justify-between items-center">
                        <div>
                          <h5 className="font-serif font-bold text-stone-900">{i.title}</h5>
                          <span className="text-[10px] text-stone-500 uppercase">Size: {i.size} {i.color ? `| Color: ${i.color}` : ""}</span>
                        </div>
                        <span className="font-bold text-stone-900">Qty {i.quantity} x LKR {i.price.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Grand Total */}
                <div className="flex justify-between items-center text-sm font-extrabold text-stone-900 pt-2 border-t border-stone-200">
                  <span>Grand Total (Pay on Delivery)</span>
                  <span className="text-amber-800 text-base">LKR {selectedOrder.grandTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Printable Shipping Label / Packing Slip Modal */}
      {packingSlipOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-xs" onClick={() => setPackingSlipOrder(null)} />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-md bg-white p-6 shadow-2xl border-2 border-black space-y-6 z-10 animate-fade-in font-mono">
              <div className="text-center border-b-2 border-black pb-4">
                <h2 className="text-xl font-bold uppercase tracking-widest font-serif">FASHION GALLERIA</h2>
                <p className="text-[10px] uppercase tracking-wider">Sri Lanka Courier Shipping Label</p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between border-b border-black/20 pb-2">
                  <span>ORDER REF:</span>
                  <strong className="text-sm font-bold">{packingSlipOrder.orderId}</strong>
                </div>
                <div className="flex justify-between border-b border-black/20 pb-2">
                  <span>PAYMENT:</span>
                  <strong className="text-sm font-extrabold text-red-700">CASH ON DELIVERY (COD)</strong>
                </div>
                <div className="flex justify-between border-b border-black/20 pb-2 text-sm font-bold">
                  <span>AMOUNT TO COLLECT:</span>
                  <span>LKR {packingSlipOrder.grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Recipient Details */}
              <div className="border-2 border-dashed border-black p-3 text-xs space-y-1 bg-stone-50">
                <span className="font-bold uppercase block text-[10px]">RECIPIENT / SHIP TO:</span>
                <strong className="text-sm block">{packingSlipOrder.customerName}</strong>
                <p>{packingSlipOrder.address}</p>
                <p>{packingSlipOrder.city}, {packingSlipOrder.district} District</p>
                <p className="font-bold pt-1">TEL: {packingSlipOrder.primaryPhone}</p>
              </div>

              <div className="pt-2 flex justify-between">
                <button onClick={() => window.print()} className="bg-black text-white text-xs uppercase px-4 py-2 font-bold">
                  Print Slip
                </button>
                <button onClick={() => setPackingSlipOrder(null)} className="border border-black text-xs uppercase px-4 py-2 font-bold">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

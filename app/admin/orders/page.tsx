"use client";

import { useState, useEffect, useCallback } from "react";
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
  AlertTriangle,
  Trash2,
  Check,
  RefreshCw,
  Mail,
  Package,
} from "lucide-react";

export interface OrderItemRecord {
  id: string;
  title: string;
  size: string;
  color?: string | null;
  quantity: number;
  price: number;
  image?: string | null;
}

export interface StatusHistoryRecord {
  id: string;
  status: string;
  note?: string | null;
  createdAt: string;
}

export interface AdminOrderRecord {
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
  items: OrderItemRecord[];
  statusHistory: StatusHistoryRecord[];
  createdAt: string;
  updatedAt: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrderRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Modals state
  const [selectedOrder, setSelectedOrder] = useState<AdminOrderRecord | null>(null);
  const [packingSlipOrder, setPackingSlipOrder] = useState<AdminOrderRecord | null>(null);

  // Confirmation modal states
  const [cancelModalOrder, setCancelModalOrder] = useState<AdminOrderRecord | null>(null);
  const [deleteModalOrder, setDeleteModalOrder] = useState<AdminOrderRecord | null>(null);
  const [isProcessingAction, setIsProcessingAction] = useState(false);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/orders");
      const data = await res.json();
      if (data.success && Array.isArray(data.orders)) {
        setOrders(data.orders);
        setError(null);
      } else {
        setError(data.error || "Failed to load orders");
      }
    } catch (err) {
      console.error("Admin fetch orders error:", err);
      setError("Error connecting to server.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleUpdateStatus = async (orderId: string, newStatus: string, note?: string) => {
    setIsProcessingAction(true);
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus, note }),
      });
      const data = await res.json();

      if (data.success && data.order) {
        setOrders((prev) =>
          prev.map((o) => (o.id === data.order.id || o.orderNumber === data.order.orderNumber ? data.order : o))
        );
        if (selectedOrder && (selectedOrder.id === data.order.id || selectedOrder.orderNumber === data.order.orderNumber)) {
          setSelectedOrder(data.order);
        }
      } else {
        alert(data.error || "Failed to update status.");
      }
    } catch (err) {
      console.error("Update status error:", err);
      alert("Error updating order status.");
    } finally {
      setIsProcessingAction(false);
    }
  };

  const handleConfirmCancel = async () => {
    if (!cancelModalOrder) return;
    await handleUpdateStatus(cancelModalOrder.orderNumber, "Cancelled", "Order cancelled by administrator.");
    setCancelModalOrder(null);
  };

  const handleConfirmDelete = async () => {
    if (!deleteModalOrder) return;
    setIsProcessingAction(true);
    try {
      const res = await fetch(`/api/admin/orders/${deleteModalOrder.orderNumber}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) => prev.filter((o) => o.id !== deleteModalOrder.id && o.orderNumber !== deleteModalOrder.orderNumber));
        if (selectedOrder?.id === deleteModalOrder.id) setSelectedOrder(null);
        setDeleteModalOrder(null);
      } else {
        alert(data.error || "Failed to delete order.");
      }
    } catch (err) {
      console.error("Delete order error:", err);
      alert("Error deleting order.");
    } finally {
      setIsProcessingAction(false);
    }
  };

  const filteredOrders = orders.filter((ord) => {
    const matchesTab =
      activeTab === "All" ||
      ord.status.toLowerCase() === activeTab.toLowerCase();

    const query = searchQuery.toLowerCase();
    const matchesSearch =
      ord.orderNumber.toLowerCase().includes(query) ||
      ord.customerName.toLowerCase().includes(query) ||
      ord.primaryPhone.includes(query) ||
      (ord.email && ord.email.toLowerCase().includes(query)) ||
      ord.city.toLowerCase().includes(query) ||
      ord.district.toLowerCase().includes(query);

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
            Order Management & Fulfillments
          </h1>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={fetchOrders}
            className="flex items-center space-x-2 text-xs font-bold uppercase px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded transition-colors"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            <span>Refresh</span>
          </button>

          {/* Search */}
          <div className="relative w-full md:w-72">
            <Search size={16} className="absolute left-3 top-3 text-stone-400" />
            <input
              type="text"
              placeholder="Search Order #, Name, Phone, City..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-9 pr-4 py-2.5 bg-white border border-stone-300 rounded-xs focus:outline-none focus:border-amber-800"
            />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto custom-scrollbar border-b border-stone-200 pb-1 text-xs font-bold uppercase tracking-wider">
        {["All", "Pending", "Accepted", "Processing", "Shipped", "Out for Delivery", "Delivered", "Cancelled"].map(
          (tab) => {
            const count =
              tab === "All"
                ? orders.length
                : orders.filter((o) => o.status.toLowerCase() === tab.toLowerCase()).length;
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
          }
        )}
      </div>

      {/* Orders List Table */}
      <div className="bg-white border border-stone-200 shadow-xs rounded-xs overflow-hidden">
        {loading && orders.length === 0 ? (
          <div className="p-12 text-center text-stone-500 space-y-2">
            <RefreshCw size={28} className="animate-spin text-amber-800 mx-auto" />
            <p className="text-xs font-bold uppercase">Loading Orders from Neon Database...</p>
          </div>
        ) : error && orders.length === 0 ? (
          <div className="p-8 text-center text-red-600 font-semibold text-xs">
            {error}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-stone-700">
              <thead className="bg-stone-900 text-white uppercase tracking-wider text-[10px] font-bold">
                <tr>
                  <th className="p-4">Order Ref</th>
                  <th className="p-4">Customer Details</th>
                  <th className="p-4">Delivery Location</th>
                  <th className="p-4">Items & Payment</th>
                  <th className="p-4">Grand Total</th>
                  <th className="p-4">Order Status</th>
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
                    <tr key={ord.id} className="hover:bg-stone-50 transition-colors">
                      <td className="p-4">
                        <strong className="font-mono font-bold text-stone-900 block text-sm">{ord.orderNumber}</strong>
                        <span className="text-[10px] text-stone-400 font-mono">
                          {new Date(ord.createdAt).toLocaleDateString("en-LK")}
                        </span>
                      </td>

                      <td className="p-4">
                        <strong className="block text-stone-900 font-serif text-sm">{ord.customerName}</strong>
                        <span className="text-[11px] text-stone-600 block">{ord.primaryPhone}</span>
                        {ord.email && <span className="text-[10px] text-stone-400 block">{ord.email}</span>}
                      </td>

                      <td className="p-4">
                        <span className="font-bold text-stone-900 block">{ord.city}</span>
                        <span className="text-[10px] text-stone-500 uppercase">{ord.district} District</span>
                      </td>

                      <td className="p-4">
                        <span className="font-bold text-stone-900 block">
                          {ord.items.length} Item(s)
                        </span>
                        <span className="text-[10px] text-stone-500 block truncate max-w-[180px]">
                          {ord.items.map((i) => i.title).join(", ")}
                        </span>
                        <span className="text-[10px] bg-stone-100 text-stone-700 px-1.5 py-0.5 rounded font-semibold uppercase mt-1 inline-block">
                          {ord.paymentMethod}
                        </span>
                      </td>

                      <td className="p-4 font-extrabold text-stone-900 text-sm">
                        LKR {ord.grandTotal.toLocaleString()}
                      </td>

                      <td className="p-4">
                        <div className="space-y-1.5">
                          {/* Quick Accept Action Button for Pending Orders */}
                          {ord.status.toLowerCase() === "pending" && (
                            <button
                              onClick={() => handleUpdateStatus(ord.orderNumber, "Accepted", "Order accepted by administrator.")}
                              disabled={isProcessingAction}
                              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white text-[10px] font-extrabold uppercase py-1 px-2 rounded flex items-center justify-center space-x-1 transition-colors"
                            >
                              <Check size={12} />
                              <span>ACCEPT ORDER</span>
                            </button>
                          )}

                          {/* Status Picker Dropdown */}
                          <select
                            value={ord.status}
                            onChange={(e) => handleUpdateStatus(ord.orderNumber, e.target.value)}
                            disabled={isProcessingAction}
                            className={`w-full text-[10px] uppercase font-extrabold px-2 py-1 rounded border cursor-pointer focus:outline-none ${
                              ord.status.toLowerCase() === "pending"
                                ? "bg-amber-100 text-amber-900 border-amber-300"
                                : ord.status.toLowerCase() === "accepted" || ord.status.toLowerCase() === "processing"
                                ? "bg-blue-100 text-blue-900 border-blue-200"
                                : ord.status.toLowerCase() === "shipped" || ord.status.toLowerCase() === "dispatched"
                                ? "bg-purple-100 text-purple-900 border-purple-200"
                                : ord.status.toLowerCase() === "out for delivery"
                                ? "bg-indigo-100 text-indigo-900 border-indigo-200"
                                : ord.status.toLowerCase() === "delivered" || ord.status.toLowerCase() === "completed"
                                ? "bg-emerald-100 text-emerald-900 border-emerald-200"
                                : "bg-red-100 text-red-900 border-red-200"
                            }`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Accepted">Accepted</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Out for Delivery">Out for Delivery</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </div>
                      </td>

                      <td className="p-4 text-right space-x-1.5">
                        <button
                          onClick={() => setSelectedOrder(ord)}
                          className="p-1.5 bg-stone-100 text-stone-800 hover:bg-stone-900 hover:text-white rounded transition-colors"
                          title="View Full Order Details"
                        >
                          <Eye size={16} />
                        </button>

                        <button
                          onClick={() => setPackingSlipOrder(ord)}
                          className="p-1.5 bg-amber-100 text-amber-900 hover:bg-amber-800 hover:text-white rounded transition-colors"
                          title="Print Shipping Label / Packing Slip"
                        >
                          <Printer size={16} />
                        </button>

                        {ord.status.toLowerCase() !== "cancelled" && (
                          <button
                            onClick={() => setCancelModalOrder(ord)}
                            className="p-1.5 bg-amber-50 text-amber-800 hover:bg-amber-700 hover:text-white rounded transition-colors"
                            title="Cancel Order"
                          >
                            <X size={16} />
                          </button>
                        )}

                        <button
                          onClick={() => setDeleteModalOrder(ord)}
                          className="p-1.5 bg-red-50 text-red-700 hover:bg-red-700 hover:text-white rounded transition-colors"
                          title="Delete Order"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Detail Inspector Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-xs" onClick={() => setSelectedOrder(null)} />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-2xl bg-white shadow-2xl rounded-xs overflow-hidden z-10 animate-fade-in">
              {/* Modal Header */}
              <div className="p-5 bg-stone-900 text-white flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-serif text-lg font-bold uppercase">Order Details #{selectedOrder.orderNumber}</h3>
                    <span className="text-[10px] bg-amber-800 text-white font-extrabold px-2 py-0.5 rounded uppercase">
                      {selectedOrder.status}
                    </span>
                  </div>
                  <span className="text-[11px] text-amber-400 uppercase font-semibold block mt-0.5">
                    Payment Method: {selectedOrder.paymentMethod}
                  </span>
                </div>
                <button onClick={() => setSelectedOrder(null)} className="p-1 hover:bg-stone-800 rounded">
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto custom-scrollbar text-xs">
                {/* Customer Details Card */}
                <div className="bg-stone-50 p-4 border border-stone-200 rounded-xs space-y-2">
                  <h4 className="font-bold uppercase tracking-wider text-stone-900 flex items-center space-x-2 border-b border-stone-200 pb-2">
                    <User size={14} className="text-amber-800" />
                    <span>Customer & Shipping Profile</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <strong className="text-stone-900 block text-[11px] uppercase font-bold">Recipient Name</strong>
                      <span>{selectedOrder.customerName}</span>
                    </div>
                    <div>
                      <strong className="text-stone-900 block text-[11px] uppercase font-bold">Primary Contact</strong>
                      <span className="font-mono font-bold">{selectedOrder.primaryPhone}</span>
                      {selectedOrder.secondaryPhone && (
                        <span className="font-mono text-stone-500 block text-[11px]">Alt: {selectedOrder.secondaryPhone}</span>
                      )}
                    </div>
                    {selectedOrder.email && (
                      <div className="sm:col-span-2">
                        <strong className="text-stone-900 block text-[11px] uppercase font-bold">Email Address</strong>
                        <span>{selectedOrder.email}</span>
                      </div>
                    )}
                    <div className="sm:col-span-2">
                      <strong className="text-stone-900 block text-[11px] uppercase font-bold">Delivery Address</strong>
                      <p>{selectedOrder.address}, {selectedOrder.city}, {selectedOrder.district} District, Sri Lanka</p>
                    </div>
                    {selectedOrder.deliveryNotes && (
                      <div className="sm:col-span-2 bg-amber-50 p-2.5 border border-amber-200 text-amber-900">
                        <strong>Courier Instructions:</strong> {selectedOrder.deliveryNotes}
                      </div>
                    )}
                  </div>
                </div>

                {/* Items Breakdown */}
                <div>
                  <h4 className="font-bold uppercase tracking-wider text-stone-900 mb-2 border-b border-stone-200 pb-2">
                    Itemized Order Details ({selectedOrder.items.length})
                  </h4>
                  <div className="divide-y divide-stone-200 border-b border-stone-200">
                    {selectedOrder.items.map((i, idx) => (
                      <div key={idx} className="py-3 flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          {i.image ? (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img src={i.image} alt={i.title} className="w-10 h-12 object-cover border border-stone-200 rounded-xs" />
                          ) : (
                            <div className="w-10 h-12 bg-stone-100 flex items-center justify-center text-stone-400">
                              <Package size={16} />
                            </div>
                          )}
                          <div>
                            <h5 className="font-serif font-bold text-stone-900">{i.title}</h5>
                            <span className="text-[10px] text-stone-500 uppercase">
                              Size: {i.size} {i.color ? `| Color: ${i.color}` : ""}
                            </span>
                          </div>
                        </div>
                        <span className="font-bold text-stone-900">
                          {i.quantity} x LKR {i.price.toLocaleString()} = LKR {(i.quantity * i.price).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Status Logs Timeline */}
                {selectedOrder.statusHistory && selectedOrder.statusHistory.length > 0 && (
                  <div>
                    <h4 className="font-bold uppercase tracking-wider text-stone-900 mb-2">Fulfillment Logs</h4>
                    <div className="space-y-2 pl-2 border-l-2 border-amber-800">
                      {selectedOrder.statusHistory.map((log) => (
                        <div key={log.id} className="relative pl-3 text-[11px]">
                          <div className="flex items-center space-x-2">
                            <strong className="uppercase font-bold text-stone-900">{log.status}</strong>
                            <span className="text-stone-400 font-mono text-[10px]">
                              {new Date(log.createdAt).toLocaleString("en-LK")}
                            </span>
                          </div>
                          {log.note && <p className="text-stone-600">{log.note}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Grand Total Breakdown */}
                <div className="bg-stone-50 p-4 border border-stone-200 space-y-1.5">
                  <div className="flex justify-between text-stone-600">
                    <span>Subtotal</span>
                    <span>LKR {selectedOrder.subtotal.toLocaleString()}</span>
                  </div>
                  {selectedOrder.discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-bold">
                      <span>Discount</span>
                      <span>- LKR {selectedOrder.discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-stone-600">
                    <span>Delivery Fee</span>
                    <span>{selectedOrder.deliveryFee === 0 ? "FREE" : `LKR ${selectedOrder.deliveryFee}`}</span>
                  </div>
                  <div className="flex justify-between text-sm font-extrabold text-stone-900 pt-2 border-t border-stone-200">
                    <span>Grand Total</span>
                    <span className="text-amber-800 text-base">LKR {selectedOrder.grandTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-stone-100 border-t border-stone-200 flex justify-between">
                <button
                  onClick={() => {
                    setPackingSlipOrder(selectedOrder);
                    setSelectedOrder(null);
                  }}
                  className="bg-amber-800 hover:bg-amber-900 text-white text-xs uppercase px-4 py-2 font-bold flex items-center space-x-2 rounded transition-colors"
                >
                  <Printer size={14} />
                  <span>Print Courier Label</span>
                </button>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="bg-stone-900 hover:bg-black text-white text-xs uppercase px-4 py-2 font-bold rounded transition-colors"
                >
                  Close Window
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal: Cancel Order */}
      {cancelModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-xs" onClick={() => setCancelModalOrder(null)} />
          <div className="relative w-full max-w-md bg-white border border-stone-300 p-6 shadow-2xl rounded-xs z-10 space-y-4 animate-fade-in text-xs">
            <div className="flex items-center space-x-3 text-amber-800">
              <AlertTriangle size={28} />
              <h3 className="font-serif text-lg font-bold uppercase text-stone-900">Confirm Order Cancellation</h3>
            </div>
            <p className="text-stone-600">
              Are you sure you want to cancel order <strong className="font-mono font-bold text-stone-900">#{cancelModalOrder.orderNumber}</strong> for customer <strong>{cancelModalOrder.customerName}</strong>?
            </p>
            <div className="pt-2 flex justify-end space-x-2">
              <button
                onClick={() => setCancelModalOrder(null)}
                className="px-4 py-2 border border-stone-300 text-stone-700 font-bold uppercase hover:bg-stone-100 rounded"
              >
                No, Go Back
              </button>
              <button
                onClick={handleConfirmCancel}
                disabled={isProcessingAction}
                className="px-4 py-2 bg-amber-800 hover:bg-amber-900 text-white font-bold uppercase rounded shadow"
              >
                {isProcessingAction ? "Cancelling..." : "Yes, Cancel Order"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal: Delete Order */}
      {deleteModalOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-xs" onClick={() => setDeleteModalOrder(null)} />
          <div className="relative w-full max-w-md bg-white border border-red-300 p-6 shadow-2xl rounded-xs z-10 space-y-4 animate-fade-in text-xs">
            <div className="flex items-center space-x-3 text-red-700">
              <Trash2 size={28} />
              <h3 className="font-serif text-lg font-bold uppercase text-stone-900">Delete Order Permanently</h3>
            </div>
            <p className="text-stone-600">
              This action cannot be undone. This will permanently delete order <strong className="font-mono font-bold text-stone-900">#{deleteModalOrder.orderNumber}</strong> and its item history from Neon PostgreSQL database.
            </p>
            <div className="pt-2 flex justify-end space-x-2">
              <button
                onClick={() => setDeleteModalOrder(null)}
                className="px-4 py-2 border border-stone-300 text-stone-700 font-bold uppercase hover:bg-stone-100 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={isProcessingAction}
                className="px-4 py-2 bg-red-700 hover:bg-red-800 text-white font-bold uppercase rounded shadow"
              >
                {isProcessingAction ? "Deleting..." : "Yes, Delete Order"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Printable Shipping Label / Packing Slip Modal */}
      {packingSlipOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-xs" onClick={() => setPackingSlipOrder(null)} />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-md bg-white p-6 shadow-2xl border-2 border-black space-y-5 z-10 animate-fade-in font-mono">
              <div className="text-center border-b-2 border-black pb-3">
                <h2 className="text-xl font-bold uppercase tracking-widest font-serif">FASHION GALLERIA</h2>
                <p className="text-[10px] uppercase tracking-wider">Sri Lanka Courier Shipping Label</p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between border-b border-black/20 pb-2">
                  <span>ORDER REF:</span>
                  <strong className="text-sm font-bold">{packingSlipOrder.orderNumber}</strong>
                </div>
                <div className="flex justify-between border-b border-black/20 pb-2">
                  <span>PAYMENT METHOD:</span>
                  <strong className="text-sm font-extrabold text-red-700">{packingSlipOrder.paymentMethod}</strong>
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

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { PRODUCTS_DATA, Product } from "@/data/mockData";
import {
  TrendingUp,
  ShoppingBag,
  Clock,
  EyeOff,
  ArrowRight,
  PackageCheck,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

export default function AdminDashboardPage() {
  const { adminUser, role } = useAdminAuth();
  const isOwner = role === "Owner";
  const [productsList, setProductsList] = useState<Product[]>(PRODUCTS_DATA);

  useEffect(() => {
    fetch("/api/admin/products", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.products) && data.products.length > 0) {
          setProductsList((prev) => {
            const existingIds = new Set(data.products.map((p: any) => p.id));
            return [...data.products, ...prev.filter((p) => !existingIds.has(p.id))];
          });
        }
      })
      .catch((err) => console.warn("Admin page fetch products error:", err));
  }, []);

  // Mock revenue metrics calculation
  const mockOrders = [
    {
      id: "FG-892415",
      customer: "Dinuka Perera",
      city: "Colombo 07",
      itemsCount: 2,
      total: 17980,
      status: "Pending",
      date: "10 mins ago",
    },
    {
      id: "FG-892414",
      customer: "Nishani Jayasinghe",
      city: "Kandy",
      itemsCount: 1,
      total: 14990,
      status: "Processing",
      date: "1 hour ago",
    },
    {
      id: "FG-892413",
      customer: "Kavinda De Silva",
      city: "Galle",
      itemsCount: 3,
      total: 21970,
      status: "Dispatched",
      date: "3 hours ago",
    },
    {
      id: "FG-892412",
      customer: "Amaya Fernando",
      city: "Negombo",
      itemsCount: 1,
      total: 11490,
      status: "Completed",
      date: "Yesterday",
    },
  ];

  const totalRevenue = mockOrders.reduce((acc, o) => acc + o.total, 0);
  const pendingOrdersCount = mockOrders.filter((o) => o.status === "Pending" || o.status === "Processing").length;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-stone-900 text-white p-6 rounded-xs shadow-md gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.3em] text-amber-400 font-extrabold block">
            ATELIER OVERVIEW
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold uppercase tracking-tight">
            Welcome Back, {adminUser?.name || "Admin"}
          </h1>
          <p className="text-xs text-stone-400 mt-0.5">
            Role: <strong className="text-white">{role}</strong> | Real-time Sri Lanka Cash on Delivery fulfillment.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/admin/orders"
            className="bg-amber-700 hover:bg-amber-800 text-white text-xs uppercase tracking-widest px-5 py-2.5 font-bold transition-colors rounded-xs shadow-xs"
          >
            Fulfill Orders ({pendingOrdersCount})
          </Link>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Card 1: Total Revenue (Owner Only) */}
        <div className="bg-white p-6 border border-stone-200 shadow-xs rounded-xs relative overflow-hidden">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Sales Revenue</span>
            <TrendingUp size={20} className="text-amber-800" />
          </div>
          {isOwner ? (
            <div>
              <span className="font-sans text-2xl sm:text-3xl font-extrabold text-stone-900">
                LKR {(totalRevenue * 12).toLocaleString()}
              </span>
              <span className="text-[10px] text-emerald-700 font-bold block mt-1">
                ↑ +18.4% vs last month
              </span>
            </div>
          ) : (
            <div className="py-2 text-stone-400 flex items-center space-x-2">
              <EyeOff size={18} />
              <span className="text-xs font-bold uppercase tracking-wider">Owner Access Only</span>
            </div>
          )}
        </div>

        {/* Card 2: Total Orders */}
        <div className="bg-white p-6 border border-stone-200 shadow-xs rounded-xs">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Total Orders</span>
            <ShoppingBag size={20} className="text-amber-800" />
          </div>
          <span className="font-sans text-2xl sm:text-3xl font-extrabold text-stone-900">
            142 Orders
          </span>
          <span className="text-[10px] text-stone-500 font-semibold block mt-1">
            Islandwide COD Orders
          </span>
        </div>

        {/* Card 3: Pending Deliveries */}
        <div className="bg-white p-6 border border-stone-200 shadow-xs rounded-xs">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Pending Fulfillment</span>
            <Clock size={20} className="text-amber-800" />
          </div>
          <span className="font-sans text-2xl sm:text-3xl font-extrabold text-amber-800">
            {pendingOrdersCount} Pending
          </span>
          <span className="text-[10px] text-amber-900 font-bold block mt-1">
            Requires courier dispatch
          </span>
        </div>

        {/* Card 4: Average Order Value */}
        <div className="bg-white p-6 border border-stone-200 shadow-xs rounded-xs">
          <div className="flex items-center justify-between text-stone-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Avg. Order Value</span>
            <PackageCheck size={20} className="text-amber-800" />
          </div>
          <span className="font-sans text-2xl sm:text-3xl font-extrabold text-stone-900">
            LKR 16,608
          </span>
          <span className="text-[10px] text-stone-500 font-semibold block mt-1">
            Per transaction
          </span>
        </div>
      </div>

      {/* Grid: Recent Orders (Left 7 cols) & Top Selling Items (Right 5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Orders Console Table */}
        <div className="lg:col-span-7 bg-white p-6 border border-stone-200 shadow-xs rounded-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-200 pb-4">
            <div>
              <h3 className="font-serif text-lg font-bold uppercase text-stone-900">
                Recent Orders
              </h3>
              <p className="text-xs text-stone-500">Latest Cash on Delivery customer checkouts</p>
            </div>
            <Link
              href="/admin/orders"
              className="text-xs uppercase font-bold text-amber-800 hover:text-black flex items-center space-x-1"
            >
              <span>View All</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-stone-700">
              <thead className="bg-stone-100 uppercase tracking-wider text-[10px] font-bold text-stone-900 border-b border-stone-200">
                <tr>
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Total</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 font-medium">
                {mockOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-stone-50">
                    <td className="p-3 font-mono font-bold text-stone-900">{ord.id}</td>
                    <td className="p-3 font-bold text-stone-900">{ord.customer}</td>
                    <td className="p-3 text-stone-500">{ord.city}</td>
                    <td className="p-3 font-bold text-stone-900">LKR {ord.total.toLocaleString()}</td>
                    <td className="p-3">
                      <span
                        className={`text-[9px] uppercase font-extrabold px-2 py-0.5 rounded border ${
                          ord.status === "Pending"
                            ? "bg-amber-100 text-amber-900 border-amber-300"
                            : ord.status === "Processing"
                            ? "bg-blue-100 text-blue-900 border-blue-200"
                            : ord.status === "Dispatched"
                            ? "bg-purple-100 text-purple-900 border-purple-200"
                            : "bg-emerald-100 text-emerald-900 border-emerald-200"
                        }`}
                      >
                        {ord.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top-Selling Products & Stock Alert Widget */}
        <div className="lg:col-span-5 bg-white p-6 border border-stone-200 shadow-xs rounded-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-200 pb-4">
            <div>
              <h3 className="font-serif text-lg font-bold uppercase text-stone-900">
                Catalog Inventory
              </h3>
              <p className="text-xs text-stone-500">Live stock counts & bestsellers</p>
            </div>
            <Link
              href="/admin/products"
              className="text-xs uppercase font-bold text-amber-800 hover:text-black flex items-center space-x-1"
            >
              <span>Manage</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="space-y-3">
            {productsList.slice(0, 4).map((p, idx) => {
              const mockStock = [8, 3, 14, 2][idx]; // Low stock simulation
              const isLowStock = mockStock < 5;

              return (
                <div key={p.id} className="flex items-center justify-between p-2.5 bg-stone-50 border border-stone-200 rounded-xs">
                  <div className="flex items-center space-x-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.primaryImage}
                      alt={p.name}
                      className="w-10 h-12 object-cover rounded-xs border border-stone-200"
                    />
                    <div>
                      <h4 className="font-serif text-xs font-bold text-stone-900 line-clamp-1">{p.name}</h4>
                      <span className="text-[10px] text-stone-500 uppercase">{p.category}</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-bold text-xs text-stone-900 block">
                      LKR {p.discountedPrice.toLocaleString()}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase flex items-center space-x-1 justify-end ${
                        isLowStock ? "text-red-600 animate-pulse" : "text-emerald-700"
                      }`}
                    >
                      {isLowStock ? <AlertTriangle size={12} /> : <CheckCircle2 size={12} />}
                      <span>{mockStock} in Stock</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

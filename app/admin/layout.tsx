"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useAdminAuth } from "@/context/AdminAuthContext";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  LogOut,
  ShieldCheck,
  UserCheck,
  Store,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { adminUser, isAuthenticated, logout } = useAdminAuth();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!isLoginPage && !isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isLoginPage, isAuthenticated, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    return null; // Prevents flash before redirect
  }

  const navItems = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      roles: ["Owner", "Staff"],
    },
    {
      name: "Order Fulfillment",
      href: "/admin/orders",
      icon: ShoppingBag,
      roles: ["Owner", "Staff"],
    },
    {
      name: "Products & Stock",
      href: "/admin/products",
      icon: Package,
      roles: ["Owner", "Staff"],
    },
  ];

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col md:flex-row selection:bg-amber-100 selection:text-amber-900">
      {/* Mobile Topbar Navigation */}
      <div className="md:hidden bg-stone-950 text-white p-4 flex items-center justify-between sticky top-0 z-40 border-b border-stone-800">
        <Link href="/admin" className="font-serif text-lg font-bold tracking-widest uppercase">
          Galleria Admin
        </Link>
        <button
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          className="p-2 text-stone-300 hover:text-white"
        >
          {isMobileSidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-stone-950 text-white flex flex-col justify-between transition-transform duration-300 md:static md:translate-x-0 ${
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Header */}
          <div className="p-6 border-b border-stone-900">
            <Link href="/" className="block">
              <span className="font-serif text-xl font-bold tracking-[0.2em] text-white uppercase block">
                Fashion Galleria
              </span>
              <span className="text-[9px] tracking-[0.3em] text-amber-400 uppercase font-bold block mt-0.5">
                ADMIN CONTROL CENTER
              </span>
            </Link>

            {/* Active Role Badge */}
            <div className="mt-4 flex items-center space-x-2 bg-stone-900 px-3 py-2 rounded-xs border border-stone-800 text-xs">
              {adminUser?.role === "Owner" ? (
                <>
                  <ShieldCheck size={16} className="text-amber-400 shrink-0" />
                  <div>
                    <span className="block font-bold text-white text-[11px]">OWNER ATELIER</span>
                    <span className="text-[9px] text-stone-400 uppercase">Full Access</span>
                  </div>
                </>
              ) : (
                <>
                  <UserCheck size={16} className="text-sky-400 shrink-0" />
                  <div>
                    <span className="block font-bold text-white text-[11px]">STAFF MEMBER</span>
                    <span className="text-[9px] text-stone-400 uppercase">Fulfillment Only</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xs text-xs font-semibold uppercase tracking-wider transition-all ${
                    isActive
                      ? "bg-amber-700 text-white font-bold shadow-xs"
                      : "text-stone-400 hover:bg-stone-900 hover:text-white"
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-stone-900 space-y-2">
          <Link
            href="/"
            className="flex items-center space-x-2 w-full px-4 py-2.5 text-xs text-stone-400 hover:text-white uppercase font-semibold transition-colors"
          >
            <Store size={16} />
            <span>View Public Shop</span>
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 w-full px-4 py-2.5 text-xs text-red-400 hover:bg-red-950/50 rounded-xs uppercase font-semibold transition-colors"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Admin View Content */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar">
        {children}
      </main>
    </div>
  );
}

"use client";

import { CartProvider } from "@/context/CartContext";
import { AdminAuthProvider } from "@/context/AdminAuthContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <CartProvider>{children}</CartProvider>
    </AdminAuthProvider>
  );
}


"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/data/mockData";

export interface CartItem {
  id: string;
  productId: string;
  title: string;
  category: string;
  color?: string;
  size: string;
  price: number;
  originalPrice: number;
  quantity: number;
  image: string;
}

export interface PromoCode {
  code: string;
  percent: number;
}

interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  appliedPromo: PromoCode | null;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addToCart: (product: Product, size?: string, color?: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  subtotal: number;
  discountAmount: number;
  total: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const VALID_PROMOS: Record<string, number> = {
  CEYLON10: 10,
  WELCOME15: 15,
  GALLERIA20: 20,
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);

  // Hydrate cart from localStorage on client side
  useEffect(() => {
    try {
      const saved = localStorage.getItem("fg_cart_v1");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const filtered = parsed.filter(
            (item: any) =>
              item &&
              item.id &&
              item.title &&
              item.title !== "Victoria Emerald Linen Wrap Dress" &&
              typeof item.price === "number"
          );
          setCartItems(filtered);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("fg_cart_v1", JSON.stringify(cartItems));
    } catch {
      // ignore
    }
  }, [cartItems]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen((prev) => !prev);

  const addToCart = (product: Product, size?: string, color?: string, quantity = 1) => {
    const chosenSize = size || (product.sizes && product.sizes[0]) || "Standard";
    const chosenColor = color || (product.colors && product.colors.length > 0 ? product.colors[0].name : "");
    const cartItemId = `${product.id}-${chosenSize}-${chosenColor}`;

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        const newItem: CartItem = {
          id: cartItemId,
          productId: product.id,
          title: product.name,
          category: product.category,
          color: chosenColor,
          size: chosenSize,
          price: product.discountedPrice,
          originalPrice: product.originalPrice,
          quantity,
          image: product.primaryImage,
        };
        return [...prev, newItem];
      }
    });

    // Auto-open cart drawer when item is added
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedPromo(null);
  };

  const applyPromoCode = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    if (VALID_PROMOS[cleanCode]) {
      const percent = VALID_PROMOS[cleanCode];
      setAppliedPromo({ code: cleanCode, percent });
      return { success: true, message: `Promo code ${cleanCode} applied (${percent}% OFF)!` };
    }
    return { success: false, message: "Invalid promo code. Try 'CEYLON10' or 'WELCOME15'." };
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = appliedPromo ? Math.round((subtotal * appliedPromo.percent) / 100) : 0;
  const total = Math.max(0, subtotal - discountAmount);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        appliedPromo,
        openCart,
        closeCart,
        toggleCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyPromoCode,
        removePromoCode,
        subtotal,
        discountAmount,
        total,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

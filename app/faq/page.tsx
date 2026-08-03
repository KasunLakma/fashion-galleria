"use client";

import { useState } from "react";
import Link from "next/link";
import {
  HelpCircle,
  ChevronDown,
  ShoppingBag,
  Truck,
  Ruler,
  User,
  ShieldCheck,
  PhoneCall,
  Search,
} from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category: "Ordering" | "Shipping" | "Sizing" | "Account";
}

const FAQ_DATA: FAQItem[] = [
  // Ordering
  {
    category: "Ordering",
    question: "How do I place an order on Fashion Galleria?",
    answer:
      "Simply browse our collection at `/shop`, select your preferred garment size and color, and click 'Add to Bag'. Proceed to checkout, enter your delivery address in Sri Lanka, select Cash on Delivery (COD) or Card payment, and confirm your order.",
  },
  {
    category: "Ordering",
    question: "Can I place an order as a Guest without creating an account?",
    answer:
      "Yes! Guest checkout is fully supported. You only need to provide your full name, primary delivery address, and phone number for Cash on Delivery confirmation.",
  },
  {
    category: "Ordering",
    question: "Can I modify or cancel my order after submitting?",
    answer:
      "You can modify or cancel your order within 2 hours of submission by calling our hotline at +94 11 700 8000 or WhatsApping +94 77 123 4567 before order dispatch.",
  },
  {
    category: "Ordering",
    question: "How do I apply a promo code or discount voucher?",
    answer:
      "At checkout or inside your shopping bag, enter your promo code into the 'Promo Code' input box and click 'Apply'. The discount will immediately reflect in your order total.",
  },

  // Shipping
  {
    category: "Shipping",
    question: "Do you offer Cash on Delivery (COD) islandwide?",
    answer:
      "Yes! Cash on Delivery is 100% supported across all 25 districts in Sri Lanka, including Colombo, Kandy, Galle, Jaffna, Trincomalee, Matara, and Kurunegala.",
  },
  {
    category: "Shipping",
    question: "What are your delivery timeframes and shipping fees?",
    answer:
      "Orders within Colombo 01-15 are delivered within 24-48 hours. All other Sri Lankan districts receive delivery within 2 to 3 business days. Delivery is FREE on orders over LKR 15,000; otherwise, a flat fee of LKR 400 applies.",
  },
  {
    category: "Shipping",
    question: "How can I track my order delivery status?",
    answer:
      "Visit our `/track-order` page and enter your Order ID (e.g. FG-892415) or your registered email address to view real-time courier tracking updates.",
  },
  {
    category: "Shipping",
    question: "What happens if I am not at home when the courier arrives?",
    answer:
      "The courier agent will contact your primary phone number before delivery. If you are unavailable, a re-delivery will be scheduled for the next working day at no additional charge.",
  },

  // Sizing
  {
    category: "Sizing",
    question: "How do I choose the correct size for dresses and workwear?",
    answer:
      "Each product page features a detailed 'Size Guide' with measurements in inches for Bust, Waist, and Hips (ranging from XS to XXL). Our garments are tailored to standard UK/Sri Lankan sizing.",
  },
  {
    category: "Sizing",
    question: "What if the size I ordered doesn't fit properly?",
    answer:
      "Don't worry! We offer a 7-day door-to-door courier exchange policy across Sri Lanka. Our courier will deliver your replacement size directly to your door.",
  },
  {
    category: "Sizing",
    question: "Do you offer custom alterations or bespoke tailoring?",
    answer:
      "Custom hem adjustments and boutique fittings can be requested by visiting our flagship atelier at Ward Place, Colombo 07.",
  },

  // Account
  {
    category: "Account",
    question: "How do I check my previous purchase history?",
    answer:
      "Navigate to the `/profile` page and log in with your email address. You will see a detailed record of all past orders, delivery statuses, and invoices.",
  },
  {
    category: "Account",
    question: "Is my personal data and payment information secure?",
    answer:
      "Absolutely. Our website uses 256-bit SSL encryption and strict data protection practices. We never store credit card numbers, and Cash on Delivery payments are settled directly with official courier partners.",
  },
  {
    category: "Account",
    question: "How do I reset my account password or update my address?",
    answer:
      "Log into `/profile` to update your delivery address, primary phone number, and contact preferences anytime.",
  },
];

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState<"All" | "Ordering" | "Shipping" | "Sizing" | "Account">("All");
  const [openItems, setOpenItems] = useState<Record<number, boolean>>({ 0: true, 4: true });
  const [searchQuery, setSearchQuery] = useState("");

  const toggleItem = (index: number) => {
    setOpenItems((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const filteredFAQs = FAQ_DATA.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { label: "All Questions", value: "All", icon: HelpCircle },
    { label: "Ordering", value: "Ordering", icon: ShoppingBag },
    { label: "Shipping & COD", value: "Shipping", icon: Truck },
    { label: "Sizing & Fit", value: "Sizing", icon: Ruler },
    { label: "Account & Safety", value: "Account", icon: User },
  ] as const;

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-amber-100 selection:text-amber-900">
      {/* Top Banner */}
      <section className="bg-stone-950 text-white py-16 sm:py-20 border-b border-stone-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
          <span className="inline-flex items-center space-x-2 text-amber-400 text-xs tracking-[0.3em] uppercase font-bold bg-amber-950/60 border border-amber-800/60 px-3.5 py-1 rounded-full">
            <HelpCircle size={14} />
            <span>KNOWLEDGE BASE & SUPPORT</span>
          </span>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase">
            Frequently Asked Questions
          </h1>

          <p className="text-stone-300 text-xs sm:text-sm max-w-xl mx-auto font-light leading-relaxed">
            Find quick answers to common questions about islandwide Cash on Delivery, ordering, sizing guides, and 7-day doorstep exchanges.
          </p>

          {/* Search Box */}
          <div className="max-w-md mx-auto relative pt-2">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g. COD, returns, shipping fee)..."
              className="w-full bg-stone-900 border border-stone-700 text-white placeholder-stone-400 text-xs pl-10 pr-4 py-3 rounded-xs focus:outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Category Tabs & FAQs */}
      <section className="py-12 sm:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2 border-b border-stone-200 pb-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.value;

            return (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value as any)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xs text-xs font-bold uppercase tracking-wider transition-all ${
                  isActive
                    ? "bg-amber-800 text-white shadow-xs"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900"
                }`}
              >
                <Icon size={15} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12 bg-stone-50 border border-dashed border-stone-300 rounded-xs">
              <p className="text-xs text-stone-600 font-semibold uppercase tracking-wider mb-2">
                No matching questions found
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="text-xs font-bold text-amber-800 underline uppercase"
              >
                Clear Search & Filters
              </button>
            </div>
          ) : (
            filteredFAQs.map((item, idx) => {
              const isOpen = !!openItems[idx];

              return (
                <div
                  key={idx}
                  className="border border-stone-200 rounded-xs overflow-hidden bg-white shadow-xs transition-all"
                >
                  <button
                    onClick={() => toggleItem(idx)}
                    className="w-full flex items-center justify-between p-5 text-left font-serif text-sm sm:text-base font-bold text-stone-900 hover:bg-stone-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3 pr-4">
                      <span className="text-[10px] uppercase tracking-widest font-extrabold px-2 py-0.5 rounded bg-amber-100 text-amber-900 shrink-0">
                        {item.category}
                      </span>
                      <span>{item.question}</span>
                    </div>
                    <ChevronDown
                      size={18}
                      className={`text-stone-500 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-amber-800" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-600 border-t border-stone-100 bg-stone-50/50 leading-relaxed">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Support Banner */}
        <div className="bg-stone-900 text-white p-8 rounded-xs shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-serif text-lg font-bold uppercase text-amber-400">
              Still Have Questions?
            </h3>
            <p className="text-xs text-stone-300">
              Our Colombo atelier support team is happy to help with sizing, order updates, or custom requests.
            </p>
          </div>
          <a
            href="https://wa.me/94771234567"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-xs transition-colors shrink-0 flex items-center space-x-2"
          >
            <PhoneCall size={16} />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </section>
    </div>
  );
}

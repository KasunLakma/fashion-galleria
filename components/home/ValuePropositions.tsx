"use client";

import { Truck, Banknote, RefreshCw, Headphones } from "lucide-react";

const valueProps = [
  {
    id: 1,
    icon: Truck,
    title: "ISLANDWIDE DELIVERY",
    subtitle: "Fast express shipping across all 25 districts",
  },
  {
    id: 2,
    icon: Banknote,
    title: "CASH ON DELIVERY",
    subtitle: "Pay conveniently at your doorstep",
  },
  {
    id: 3,
    icon: RefreshCw,
    title: "EASY EXCHANGES",
    subtitle: "Hassle-free 7-day door-to-door exchange",
  },
  {
    id: 4,
    icon: Headphones,
    title: "CUSTOMER SUPPORT",
    subtitle: "Dedicated Sri Lanka hotline & WhatsApp care",
  },
];

export default function ValuePropositions() {
  return (
    <section className="bg-stone-50 border-y border-stone-200 py-10 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {valueProps.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="flex flex-col items-center text-center p-4 rounded-xs transition-all hover:bg-white hover:shadow-xs group"
              >
                <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-800 border border-amber-200 flex items-center justify-center mb-3 group-hover:bg-black group-hover:text-white transition-colors duration-300">
                  <Icon size={22} />
                </div>

                <h3 className="font-serif text-xs md:text-sm font-bold uppercase tracking-wider text-gray-900 mb-1">
                  {item.title}
                </h3>

                <p className="text-[11px] text-stone-600 max-w-[200px] leading-relaxed font-light">
                  {item.subtitle}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

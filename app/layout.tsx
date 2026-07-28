import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Providers from "@/components/providers/Providers";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fashion Galleria | Luxury Sri Lankan Fashion & Workwear",
  description:
    "Islandwide Cash on Delivery Available. Shop elevated dresses, workwear, men's linen, and new arrivals at Fashion Galleria Sri Lanka.",
  keywords: ["fashion galleria", "sri lanka fashion", "kelly felder style", "dresses colombo", "workwear sri lanka", "cash on delivery"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-white text-gray-900 font-sans selection:bg-amber-100 selection:text-amber-900">
        <Providers>
          <AnnouncementBar />
          <Header />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}


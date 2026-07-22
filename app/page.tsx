import HeroBanner from "@/components/home/HeroBanner";
import CategoryGrid from "@/components/home/CategoryGrid";
import ProductGrid from "@/components/home/ProductGrid";
import ValuePropositions from "@/components/home/ValuePropositions";
import CustomerReviews from "@/components/home/CustomerReviews";

export default function Home() {
  return (
    <div className="w-full space-y-0">
      {/* 1. Hero Banner Section */}
      <HeroBanner />

      {/* 2. Brand Value Propositions Bar */}
      <ValuePropositions />

      {/* 3. Category Grid Section */}
      <CategoryGrid />

      {/* 4. Trending Now / New Arrivals Grid */}
      <ProductGrid />

      {/* 5. Customer Reviews & Social Proof */}
      <CustomerReviews />
    </div>
  );
}

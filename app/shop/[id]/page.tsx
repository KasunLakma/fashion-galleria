export const revalidate = 0;
export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import Link from "next/link";
import { PRODUCTS_DATA, Product } from "@/data/mockData";
import prisma from "@/lib/prisma";
import ProductImageGallery from "@/components/shop/ProductImageGallery";
import ProductDetailsRight from "@/components/shop/ProductDetailsRight";
import RelatedProducts from "@/components/shop/RelatedProducts";
import { ChevronRight } from "lucide-react";

async function getProduct(id: string): Promise<Product | null> {
  try {
    const dbProduct = await prisma.product.findUnique({
      where: { id },
    });
    if (dbProduct) {
      return {
        id: dbProduct.id,
        name: dbProduct.name,
        category: dbProduct.category,
        originalPrice: dbProduct.originalPrice,
        discountedPrice: dbProduct.discountedPrice,
        rating: dbProduct.rating,
        reviewCount: dbProduct.reviewCount,
        primaryImage: dbProduct.primaryImage,
        hoverImage: dbProduct.hoverImage || dbProduct.primaryImage,
        galleryImages: dbProduct.galleryImages.length > 0 ? dbProduct.galleryImages : [dbProduct.primaryImage],
        tag: dbProduct.tag || "NEW",
        tagColor: dbProduct.tagColor || "bg-black text-white",
        sizes: dbProduct.sizes.length > 0 ? dbProduct.sizes : ["M"],
        inStock: dbProduct.inStock,
        isNewArrival: dbProduct.isNewArrival,
        isBestseller: dbProduct.isBestseller,
        description: dbProduct.description || "",
      };
    }
  } catch (err) {
    console.warn("Error fetching product from DB:", err);
  }
  return PRODUCTS_DATA.find((p) => p.id === id) || null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return {
      title: "Product Not Found | Fashion Galleria",
    };
  }

  return {
    title: `${product.name} | Fashion Galleria Sri Lanka`,
    description: product.description || `Buy ${product.name} at Fashion Galleria. Cash on Delivery available across Sri Lanka.`,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  const galleryImages = product.galleryImages && product.galleryImages.length > 0
    ? product.galleryImages
    : [product.primaryImage, product.hoverImage];

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumbs Navigation Bar */}
      <div className="bg-stone-50 border-b border-stone-200 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center space-x-2 text-xs uppercase tracking-wider text-stone-500 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <ChevronRight size={12} />
          <Link href="/shop" className="hover:text-black transition-colors">
            Shop
          </Link>
          <ChevronRight size={12} />
          <Link href={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-black transition-colors">
            {product.category}
          </Link>
          <ChevronRight size={12} />
          <span className="font-bold text-stone-900 truncate max-w-[200px] sm:max-w-xs">
            {product.name}
          </span>
        </div>
      </div>

      {/* Main PDP Grid: Gallery (Left) & Product Details (Right) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Side: High-res Gallery (7 cols on Desktop) */}
          <div className="lg:col-span-7">
            <ProductImageGallery
              images={galleryImages}
              productName={product.name}
              tag={product.tag}
              tagColor={product.tagColor}
            />
          </div>

          {/* Right Side: Product Meta, Options & CTAs (5 cols on Desktop) */}
          <div className="lg:col-span-5">
            <ProductDetailsRight product={product} />
          </div>
        </div>

        {/* Bottom Section: Related Products Carousel/Grid */}
        <RelatedProducts
          currentProductId={product.id}
          category={product.category}
        />
      </div>
    </div>
  );
}

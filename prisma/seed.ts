import { PrismaClient } from "@prisma/client";
import { CATEGORIES_DATA, PRODUCTS_DATA, REVIEWS_DATA } from "../data/mockData";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting database seed process...");

  // Seed Categories
  console.log("Seeding categories...");
  for (const category of CATEGORIES_DATA) {
    await prisma.category.upsert({
      where: { id: category.id },
      update: {
        title: category.title,
        itemCount: category.itemCount,
        image: category.image,
        link: category.link,
      },
      create: {
        id: category.id,
        title: category.title,
        itemCount: category.itemCount,
        image: category.image,
        link: category.link,
      },
    });
  }

  // Seed Products
  console.log("Seeding products...");
  for (const product of PRODUCTS_DATA) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: {
        name: product.name,
        category: product.category,
        originalPrice: product.originalPrice,
        discountedPrice: product.discountedPrice,
        rating: product.rating,
        reviewCount: product.reviewCount,
        primaryImage: product.primaryImage,
        hoverImage: product.hoverImage,
        galleryImages: product.galleryImages || [],
        tag: product.tag,
        tagColor: product.tagColor || null,
        sizes: product.sizes || [],
        outOfStockSizes: product.outOfStockSizes || [],
        colors: product.colors ? JSON.parse(JSON.stringify(product.colors)) : [],
        inStock: product.inStock ?? true,
        isNewArrival: product.isNewArrival ?? false,
        isBestseller: product.isBestseller ?? false,
        description: product.description || null,
        fabricCare: product.fabricCare || [],
        shippingReturns: product.shippingReturns || null,
      },
      create: {
        id: product.id,
        name: product.name,
        category: product.category,
        originalPrice: product.originalPrice,
        discountedPrice: product.discountedPrice,
        rating: product.rating,
        reviewCount: product.reviewCount,
        primaryImage: product.primaryImage,
        hoverImage: product.hoverImage,
        galleryImages: product.galleryImages || [],
        tag: product.tag,
        tagColor: product.tagColor || null,
        sizes: product.sizes || [],
        outOfStockSizes: product.outOfStockSizes || [],
        colors: product.colors ? JSON.parse(JSON.stringify(product.colors)) : [],
        inStock: product.inStock ?? true,
        isNewArrival: product.isNewArrival ?? false,
        isBestseller: product.isBestseller ?? false,
        description: product.description || null,
        fabricCare: product.fabricCare || [],
        shippingReturns: product.shippingReturns || null,
      },
    });
  }

  // Seed Reviews
  console.log("Seeding reviews...");
  for (const review of REVIEWS_DATA) {
    await prisma.review.upsert({
      where: { id: review.id },
      update: {
        author: review.author,
        location: review.location,
        rating: review.rating,
        title: review.title,
        comment: review.comment,
        verifiedBuyer: review.verifiedBuyer,
        purchasedItem: review.purchasedItem,
        date: review.date,
      },
      create: {
        id: review.id,
        author: review.author,
        location: review.location,
        rating: review.rating,
        title: review.title,
        comment: review.comment,
        verifiedBuyer: review.verifiedBuyer,
        purchasedItem: review.purchasedItem,
        date: review.date,
      },
    });
  }

  console.log("Database seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error during database seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

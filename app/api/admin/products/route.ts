import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, products });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "Error fetching products.";
    console.error("GET Admin Products API Error:", error);
    return NextResponse.json({ success: false, error: errMessage }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      category,
      originalPrice,
      discountedPrice,
      primaryImage,
      hoverImage,
      tag,
      sizes,
      description,
    } = body;

    if (!name || !category || !primaryImage) {
      return NextResponse.json(
        { success: false, error: "Product name, category, and primary image are required." },
        { status: 400 }
      );
    }

    const sizesArray = typeof sizes === "string" ? sizes.split(",").map((s) => s.trim()) : sizes || ["M"];

    const newProduct = await prisma.product.create({
      data: {
        name,
        category,
        originalPrice: Number(originalPrice || discountedPrice || 0),
        discountedPrice: Number(discountedPrice || 0),
        rating: 5.0,
        reviewCount: 1,
        primaryImage,
        hoverImage: hoverImage || primaryImage,
        galleryImages: [primaryImage],
        tag: tag || "NEW",
        sizes: sizesArray,
        inStock: true,
        isNewArrival: true,
        description: description || "",
      },
    });

    return NextResponse.json({
      success: true,
      product: newProduct,
      message: "Product SKU created successfully in PostgreSQL.",
    });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "Error saving product to database.";
    console.error("POST Admin Product API Error:", error);
    return NextResponse.json({ success: false, error: errMessage }, { status: 500 });
  }
}

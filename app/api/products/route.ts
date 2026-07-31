export const revalidate = 0;
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { PRODUCTS_DATA } from "@/data/mockData";

export async function GET() {
  try {
    const dbProducts = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });

    // Merge DB products with mock data avoiding duplicates
    const dbIds = new Set(dbProducts.map((p) => p.id));
    const merged = [...dbProducts, ...PRODUCTS_DATA.filter((p) => !dbIds.has(p.id))];

    return NextResponse.json(
      { success: true, products: merged },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  } catch (error: unknown) {
    console.error("GET Public Products API Error:", error);
    return NextResponse.json({ success: true, products: PRODUCTS_DATA });
  }
}

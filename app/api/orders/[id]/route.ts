import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const rawId = await params;
    const searchKey = decodeURIComponent(rawId.id || "").trim();

    if (!searchKey) {
      return NextResponse.json(
        { success: false, error: "Order reference or email address is required." },
        { status: 400 }
      );
    }

    // Case 1: Search by Registered Email Address
    if (searchKey.includes("@")) {
      const emailLower = searchKey.toLowerCase();
      const orders = await prisma.order.findMany({
        where: {
          OR: [
            { email: { equals: emailLower, mode: "insensitive" } },
            { user: { email: { equals: emailLower, mode: "insensitive" } } },
          ],
        },
        include: {
          items: true,
          statusHistory: {
            orderBy: { createdAt: "asc" },
          },
        },
        orderBy: { createdAt: "desc" },
      });

      if (orders.length === 0) {
        return NextResponse.json(
          { success: false, error: `No active orders found for email "${searchKey}".` },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        type: "email",
        email: emailLower,
        orders,
      });
    }

    // Case 2: Search by Specific Order Number or Database ID
    const order = await prisma.order.findFirst({
      where: {
        OR: [{ orderNumber: searchKey }, { id: searchKey }],
      },
      include: {
        items: true,
        statusHistory: {
          orderBy: { createdAt: "asc" },
        },
      },
    });

    if (!order) {
      return NextResponse.json(
        { success: false, error: `Order reference "${searchKey}" not found.` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      type: "order",
      order,
    });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "Error fetching order.";
    console.error("Fetch Order API Error:", error);
    return NextResponse.json(
      { success: false, error: errMessage },
      { status: 500 }
    );
  }
}

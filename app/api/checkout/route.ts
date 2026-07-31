import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendOrderConfirmationEmail, OrderEmailPayload } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      customerName,
      email,
      primaryPhone,
      secondaryPhone,
      address,
      city,
      district,
      deliveryNotes,
      paymentMethod,
      items,
      subtotal,
      deliveryFee,
      discountAmount,
      grandTotal,
    } = body;

    if (!customerName || !primaryPhone || !address || !city || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Missing required order details." },
        { status: 400 }
      );
    }

    const generatedOrderId = `FG-${Math.floor(100000 + Math.random() * 900000)}`;
    const cleanEmail = email && typeof email === "string" ? email.trim().toLowerCase() : null;
    const cleanPhone = String(primaryPhone).trim();

    // 1. Auto-create or associate Customer Profile
    let userId: string | null = null;
    try {
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [
            ...(cleanEmail ? [{ email: cleanEmail }] : []),
            { phone: cleanPhone },
          ],
        },
      });

      if (existingUser) {
        userId = existingUser.id;
        await prisma.user.update({
          where: { id: existingUser.id },
          data: {
            name: customerName,
            ...(cleanEmail && !existingUser.email ? { email: cleanEmail } : {}),
            address,
            city,
            district: district || "Colombo",
          },
        });
      } else {
        const newUser = await prisma.user.create({
          data: {
            name: customerName,
            email: cleanEmail,
            phone: cleanPhone,
            address,
            city,
            district: district || "Colombo",
          },
        });
        userId = newUser.id;
      }
    } catch (userErr) {
      console.warn("User profile association warning:", userErr);
    }

    // 2. Create Order in PostgreSQL via Prisma
    const createdOrder = await prisma.order.create({
      data: {
        orderNumber: generatedOrderId,
        userId: userId,
        customerName,
        email: cleanEmail,
        primaryPhone: cleanPhone,
        secondaryPhone: secondaryPhone || "",
        address,
        city,
        district: district || "Colombo",
        deliveryNotes: deliveryNotes || "",
        paymentMethod: paymentMethod || "Cash on Delivery (COD)",
        status: "Pending",
        subtotal: Number(subtotal),
        deliveryFee: Number(deliveryFee),
        discountAmount: Number(discountAmount || 0),
        grandTotal: Number(grandTotal),
        items: {
          create: items.map((item: { productId?: string; id?: string; title?: string; name?: string; size?: string; color?: string; quantity?: number; price?: number; image?: string; primaryImage?: string }) => ({
            productId: item.productId || item.id || null,
            title: item.title || item.name || "Item",
            size: item.size || "M",
            color: item.color || null,
            quantity: Number(item.quantity || 1),
            price: Number(item.price || 0),
            image: item.image || item.primaryImage || null,
          })),
        },
        statusHistory: {
          create: {
            status: "Pending",
            note: "Order submitted by customer.",
          },
        },
      },
    });

    // 3. Dispatch Email (non-blocking so it never hangs order creation)
    const emailPayload: OrderEmailPayload = {
      orderId: generatedOrderId,
      customerName,
      primaryPhone: cleanPhone,
      secondaryPhone,
      address,
      city,
      district: district || "Colombo",
      deliveryNotes,
      items: items.map((item: { title?: string; name?: string; size?: string; color?: string; quantity?: number; price?: number }) => ({
        title: item.title || item.name || "Item",
        size: item.size || "M",
        color: item.color,
        quantity: Number(item.quantity || 1),
        price: Number(item.price || 0),
      })),
      subtotal: Number(subtotal),
      deliveryFee: Number(deliveryFee),
      discountAmount: Number(discountAmount || 0),
      grandTotal: Number(grandTotal),
    };

    sendOrderConfirmationEmail(emailPayload).catch((emailErr) => {
      console.error("Non-blocking order email send error:", emailErr);
    });

    return NextResponse.json({
      success: true,
      orderId: createdOrder.orderNumber,
      message: "Order created successfully.",
      orderSummary: {
        orderId: createdOrder.orderNumber,
        grandTotal: createdOrder.grandTotal,
        customerName: createdOrder.customerName,
      },
    });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "Internal Server Error handling checkout.";
    console.error("API Checkout Route Error:", error);
    return NextResponse.json(
      { success: false, error: errMessage },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, doc, updateDoc, increment } from "firebase/firestore";
import { sendOrderConfirmationEmail, OrderEmailPayload } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, primaryPhone, secondaryPhone, address, city, district, deliveryNotes, items, subtotal, deliveryFee, discountAmount, grandTotal } = body;

    if (!customerName || !primaryPhone || !address || !city || !items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Missing required order details." },
        { status: 400 }
      );
    }

    const generatedOrderId = `FG-${Math.floor(100000 + Math.random() * 900000)}`;

    const orderData = {
      orderId: generatedOrderId,
      customerName,
      primaryPhone,
      secondaryPhone: secondaryPhone || "",
      address,
      city,
      district: district || "Colombo",
      deliveryNotes: deliveryNotes || "",
      items,
      subtotal,
      deliveryFee,
      discountAmount: discountAmount || 0,
      grandTotal,
      paymentMethod: "Cash on Delivery (COD)",
      status: "Pending",
      createdAt: serverTimestamp(),
    };

    // 1. Save Order to Firestore orders collection if DB initialized
    let firestoreDocId = null;
    if (db) {
      try {
        const docRef = await addDoc(collection(db, "orders"), orderData);
        firestoreDocId = docRef.id;

        // 2. Deduct quantities from products collection
        for (const item of items) {
          if (item.productId) {
            try {
              const productRef = doc(db, "products", item.productId);
              await updateDoc(productRef, {
                stockQuantity: increment(-item.quantity),
              });
            } catch (err) {
              console.warn(`Could not update stock for product ${item.productId}:`, err);
            }
          }
        }
      } catch (dbError) {
        console.warn("Firestore order save error (proceeding with fallback):", dbError);
      }
    }

    // 3. Send Transactional Email via Resend
    const emailPayload: OrderEmailPayload = {
      orderId: generatedOrderId,
      customerName,
      primaryPhone,
      secondaryPhone,
      address,
      city,
      district: district || "Colombo",
      deliveryNotes,
      items,
      subtotal,
      deliveryFee,
      discountAmount: discountAmount || 0,
      grandTotal,
    };

    await sendOrderConfirmationEmail(emailPayload);

    return NextResponse.json({
      success: true,
      orderId: generatedOrderId,
      firestoreDocId,
      message: "Order created successfully. Confirmation email dispatched.",
      orderSummary: {
        orderId: generatedOrderId,
        grandTotal,
        customerName,
        district: district || "Colombo",
      },
    });
  } catch (error) {
    console.error("API Checkout Route Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error handling checkout." },
      { status: 500 }
    );
  }
}

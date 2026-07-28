import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export interface OrderEmailPayload {
  orderId: string;
  customerName: string;
  primaryPhone: string;
  secondaryPhone?: string;
  address: string;
  city: string;
  district: string;
  deliveryNotes?: string;
  items: Array<{
    title: string;
    size: string;
    color?: string;
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  deliveryFee: number;
  discountAmount: number;
  grandTotal: number;
}

export async function sendOrderConfirmationEmail(payload: OrderEmailPayload) {
  const itemsHtml = payload.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eeeeee; font-size: 13px; color: #333333;">
          <strong>${item.title}</strong><br/>
          <span style="font-size: 11px; color: #777777;">Size: ${item.size} ${item.color ? `| Color: ${item.color}` : ""}</span>
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #eeeeee; font-size: 13px; text-align: center; color: #333333;">
          ${item.quantity}
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #eeeeee; font-size: 13px; text-align: right; color: #333333;">
          LKR ${(item.price * item.quantity).toLocaleString()}
        </td>
      </tr>
    `
    )
    .join("");

  const emailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Order Confirmation #${payload.orderId}</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #f7f7f7; margin: 0; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e0e0e0; border-radius: 4px; overflow: hidden;">
          
          <!-- Header Banner -->
          <div style="background-color: #000000; padding: 25px; text-align: center;">
            <h1 style="color: #ffffff; font-family: 'Playfair Display', Georgia, serif; font-size: 24px; letter-spacing: 3px; margin: 0; text-transform: uppercase;">
              FASHION GALLERIA
            </h1>
            <p style="color: #d4af37; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; margin-top: 5px;">
              SRI LANKA • ATELIER COLLECTION
            </p>
          </div>

          <!-- Order Status Callout -->
          <div style="background-color: #fff9e6; border-bottom: 1px solid #ffe599; padding: 15px 20px; text-align: center;">
            <h2 style="color: #8a5a00; font-size: 14px; margin: 0; text-transform: uppercase; letter-spacing: 1px;">
              ✓ CASH ON DELIVERY (COD) ORDER CONFIRMED
            </h2>
            <p style="color: #666666; font-size: 12px; margin: 5px 0 0 0;">
              Order Reference: <strong>${payload.orderId}</strong>
            </p>
          </div>

          <!-- Customer & Address Summary -->
          <div style="padding: 20px;">
            <p style="font-size: 14px; color: #333333; margin-bottom: 15px;">
              Dear <strong>${payload.customerName}</strong>,
            </p>
            <p style="font-size: 13px; color: #555555; line-height: 1.5; margin-bottom: 20px;">
              Thank you for shopping with Fashion Galleria! Your luxury apparel order has been placed successfully. Please prepare <strong>LKR ${payload.grandTotal.toLocaleString()}</strong> in cash upon delivery.
            </p>

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 12px; background-color: #fafafa; border: 1px solid #eeeeee;">
              <tr>
                <td style="padding: 12px; width: 50%; vertical-align: top;">
                  <strong style="color: #000000; text-transform: uppercase;">Delivery Address:</strong><br/>
                  ${payload.address}<br/>
                  ${payload.city}, ${payload.district} District<br/>
                  Sri Lanka
                </td>
                <td style="padding: 12px; width: 50%; vertical-align: top;">
                  <strong style="color: #000000; text-transform: uppercase;">Contact Info:</strong><br/>
                  Phone: ${payload.primaryPhone}<br/>
                  ${payload.secondaryPhone ? `Alt: ${payload.secondaryPhone}<br/>` : ""}
                  Payment: <strong>Cash on Delivery (COD)</strong>
                </td>
              </tr>
            </table>

            <!-- Items Table -->
            <h3 style="font-size: 13px; text-transform: uppercase; letter-spacing: 1px; color: #000000; border-bottom: 2px solid #000000; padding-bottom: 5px; margin-bottom: 10px;">
              Order Summary
            </h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <thead>
                <tr style="background-color: #f0f0f0; text-transform: uppercase; font-size: 11px; color: #333333;">
                  <th style="padding: 8px; text-align: left;">Item</th>
                  <th style="padding: 8px; text-align: center;">Qty</th>
                  <th style="padding: 8px; text-align: right;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>

            <!-- Totals Breakdown -->
            <table style="width: 100%; font-size: 13px; color: #333333; border-top: 1px solid #eeeeee; padding-top: 10px;">
              <tr>
                <td style="padding: 4px 0;">Subtotal:</td>
                <td style="text-align: right; padding: 4px 0;">LKR ${payload.subtotal.toLocaleString()}</td>
              </tr>
              ${
                payload.discountAmount > 0
                  ? `<tr>
                      <td style="padding: 4px 0; color: #2e7d32;">Discount:</td>
                      <td style="text-align: right; padding: 4px 0; color: #2e7d32;">- LKR ${payload.discountAmount.toLocaleString()}</td>
                    </tr>`
                  : ""
              }
              <tr>
                <td style="padding: 4px 0;">Islandwide Delivery:</td>
                <td style="text-align: right; padding: 4px 0;">${payload.deliveryFee === 0 ? "FREE" : `LKR ${payload.deliveryFee}`}</td>
              </tr>
              <tr style="font-size: 16px; font-weight: bold; color: #000000;">
                <td style="padding: 10px 0; border-top: 2px solid #000000;">Grand Total (Pay on Delivery):</td>
                <td style="text-align: right; padding: 10px 0; border-top: 2px solid #000000; color: #8a5a00;">
                  LKR ${payload.grandTotal.toLocaleString()}
                </td>
              </tr>
            </table>

            <!-- Shipping Timeline -->
            <div style="margin-top: 25px; padding: 15px; background-color: #f5f5f5; font-size: 12px; color: #555555; border-left: 3px solid #8a5a00;">
              <strong>📦 Delivery Timeline:</strong><br/>
              • Colombo & Suburbs: 24 - 48 Hours<br/>
              • Outstation Islandwide: 2 - 3 Working Days<br/>
              • Need size exchange? We offer a 7-day door-to-door courier swap service.
            </div>

          </div>

          <!-- Footer -->
          <div style="background-color: #111111; color: #999999; padding: 15px; text-align: center; font-size: 11px;">
            Fashion Galleria Sri Lanka • Customer Support: +94 11 700 8000
          </div>
        </div>
      </body>
    </html>
  `;

  if (!resend) {
    console.log(`[SIMULATED EMAIL DISPATCH] Order Confirmation #${payload.orderId} sent to ${payload.customerName}`);
    return { success: true, simulated: true };
  }

  try {
    const data = await resend.emails.send({
      from: "Fashion Galleria <orders@fashiongalleria.lk>",
      to: ["customer@example.com"], // Replace with recipient email if available
      subject: `Order Confirmation #${payload.orderId} - Fashion Galleria Sri Lanka`,
      html: emailHtml,
    });
    return { success: true, data };
  } catch (error) {
    console.error("Resend API Email dispatch error:", error);
    return { success: false, error };
  }
}

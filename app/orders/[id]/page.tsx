"use client";

import { use } from "react";
import OrderTrackerView from "@/components/shop/OrderTrackerView";

export default function OrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const orderId = resolvedParams.id;

  return <OrderTrackerView orderId={orderId} />;
}

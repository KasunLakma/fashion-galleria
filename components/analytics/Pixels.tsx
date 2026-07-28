"use client";

import Script from "next/script";

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "123456789012345";
const TIKTOK_PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID || "C1234567890ABCDEFG";

export function trackPageView() {
  if (typeof window !== "undefined") {
    if ((window as unknown as { fbq?: Function }).fbq) {
      (window as unknown as { fbq: Function }).fbq("track", "PageView");
    }
    if ((window as unknown as { ttq?: { page: Function } }).ttq) {
      (window as unknown as { ttq: { page: Function } }).ttq.page();
    }
    console.log("📊 [Pixel Tracking] PageView event fired.");
  }
}

export function trackAddToCart(productId: string, productName: string, price: number, size?: string) {
  if (typeof window !== "undefined") {
    if ((window as unknown as { fbq?: Function }).fbq) {
      (window as unknown as { fbq: Function }).fbq("track", "AddToCart", {
        content_name: productName,
        content_ids: [productId],
        content_type: "product",
        value: price,
        currency: "LKR",
        size,
      });
    }
    if ((window as unknown as { ttq?: { track: Function } }).ttq) {
      (window as unknown as { ttq: { track: Function } }).ttq.track("AddToCart", {
        content_id: productId,
        content_name: productName,
        value: price,
        currency: "LKR",
      });
    }
    console.log(`📊 [Pixel Tracking] AddToCart event fired for ${productName} (LKR ${price})`);
  }
}

export function trackPurchase(orderId: string, grandTotal: number, itemCount: number) {
  if (typeof window !== "undefined") {
    if ((window as unknown as { fbq?: Function }).fbq) {
      (window as unknown as { fbq: Function }).fbq("track", "Purchase", {
        value: grandTotal,
        currency: "LKR",
        order_id: orderId,
        num_items: itemCount,
      });
    }
    if ((window as unknown as { ttq?: { track: Function } }).ttq) {
      (window as unknown as { ttq: { track: Function } }).ttq.track("CompletePayment", {
        value: grandTotal,
        currency: "LKR",
        order_id: orderId,
      });
    }
    console.log(`📊 [Pixel Tracking] Purchase event fired for Order #${orderId} (LKR ${grandTotal})`);
  }
}

export default function Pixels() {
  return (
    <>
      {/* Meta (Facebook) Pixel */}
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `,
        }}
      />

      {/* TikTok Pixel */}
      <Script
        id="tiktok-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq.methods[i],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._t[e]._b=n,ttq._o=ttq._o||{},ttq._o[e]=ttq._o[e]||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
              ttq.load('${TIKTOK_PIXEL_ID}');
              ttq.page();
            }(window, document, 'ttq');
          `,
        }}
      />
    </>
  );
}

"use client";

import { useEffect } from "react";
import Script from "next/script";
import { AdSlot } from "@/components/ad-slot";
import { cn } from "@/lib/utils";

const publisherId = "ca-pub-9427809665187984";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export function AdsenseUnit({
  className,
  label = "Advertisement",
  slot = process.env.NEXT_PUBLIC_ADSENSE_DISPLAY_SLOT,
}: {
  className?: string;
  label?: string;
  slot?: string;
}) {
  useEffect(() => {
    if (!slot) return;

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      // Ad blockers or delayed AdSense loading should not affect the app UI.
    }
  }, [slot]);

  if (!slot) {
    return <AdSlot className={className} label={label} />;
  }

  return (
    <>
      <Script
        async
        crossOrigin="anonymous"
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`}
        strategy="lazyOnload"
      />
      <aside
        aria-label={label}
        className={cn(
          "overflow-hidden rounded-lg border border-border bg-card p-2 shadow-sm",
          className,
        )}
      >
        <ins
          className="adsbygoogle"
          data-ad-client={publisherId}
          data-ad-format="auto"
          data-ad-slot={slot}
          data-full-width-responsive="true"
          style={{ display: "block" }}
        />
      </aside>
    </>
  );
}

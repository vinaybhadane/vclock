import { LiveClock } from "@/components/live-clock";
import { ToolLayout } from "@/components/tool-layout";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Live Clock - Current Time Now",
  description: "See the current local time, date, day, and timezone in a clean live online clock.",
  path: "/clock",
  keywords: ["live clock", "time now", "current time", "online clock"],
});

export default function ClockPage() {
  const faq = faqJsonLd([
    { question: "Does the live clock use my local timezone?", answer: "Yes. vClock uses your browser timezone from the Intl API." },
    { question: "Can I use a 24 hour clock?", answer: "Yes. Use the 12h and 24h controls above the clock." },
  ]);
  return (
    <>
      <ToolLayout
        description="Check the current time now with a large digital clock, today's date, weekday, timezone, and fullscreen mode."
        title="Live Clock"
      >
        <LiveClock />
      </ToolLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Live Clock", url: "/clock" }])),
        }}
      />
    </>
  );
}


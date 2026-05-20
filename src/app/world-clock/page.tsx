import { ToolLayout } from "@/components/tool-layout";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";
import { DynamicWorldClock } from "@/components/dynamic-loaders";

export const metadata = pageMetadata({
  title: "World Clock - Global Time Zone Converter",
  description: "Search and compare live world clocks for India, USA, UK, UAE, Japan, China, Australia, Europe, and more.",
  path: "/world-clock",
  keywords: ["world clock", "time zones", "global clock", "UTC offset"],
});

export default function WorldClockPage() {
  return (
    <>
      <ToolLayout
        description="Add live clocks for major cities and countries, compare UTC offsets, and see day or night status at a glance."
        title="World Clock"
      >
        <DynamicWorldClock />
      </ToolLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd([
            { question: "Does the world clock support daylight saving time?", answer: "Yes. Timezone calculations are handled by the browser Intl API, including DST where supported." },
            { question: "Can I add multiple world clocks?", answer: "Yes. Search for a city or country and add any number of clocks." },
          ])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "World Clock", url: "/world-clock" }])),
        }}
      />
    </>
  );
}


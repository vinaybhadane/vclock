import { Stopwatch } from "@/components/stopwatch";
import { ToolLayout } from "@/components/tool-layout";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Online Stopwatch - Precise Stopwatch With Laps",
  description: "Run a precise online stopwatch with lap tracking, fullscreen mode, responsive controls, and keyboard shortcuts.",
  path: "/stopwatch",
  keywords: ["online stopwatch", "stopwatch timer", "lap stopwatch"],
});

export default function StopwatchPage() {
  return (
    <>
      <ToolLayout
        description="Measure elapsed time with a fast stopwatch, lap list, fullscreen display, and simple keyboard controls."
        title="Online Stopwatch"
      >
        <Stopwatch />
      </ToolLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd([
        { question: "Does the stopwatch track laps?", answer: "Yes. Use the Lap button or the L key to save lap times." },
        { question: "Are keyboard shortcuts supported?", answer: "Yes. Space starts or pauses, L adds a lap, and R resets." },
      ])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Stopwatch", url: "/stopwatch" }])) }} />
    </>
  );
}


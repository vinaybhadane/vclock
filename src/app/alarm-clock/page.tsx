import { ToolLayout } from "@/components/tool-layout";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";
import { DynamicAlarmClock } from "@/components/dynamic-loaders";

export const metadata = pageMetadata({
  title: "Online Alarm Clock - Browser Alarm With Snooze",
  description: "Create multiple online alarms with labels, sound choices, notifications, snooze, editing, and local persistence.",
  path: "/alarm-clock",
  keywords: ["online alarm clock", "browser alarm", "alarm clock", "wake up alarm"],
});

export default function AlarmPage() {
  return (
    <>
      <ToolLayout
        description="Set browser-based alarms that stay saved on your device, with labels, sound selection, notification support, and snooze."
        title="Alarm Clock"
      >
        <DynamicAlarmClock />
      </ToolLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd([
        { question: "Are alarms saved?", answer: "Yes. Alarms are saved in your browser localStorage on the current device." },
        { question: "Can vClock show alarm notifications?", answer: "Yes. Enable notifications in your browser to receive alarm alerts." },
      ])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Alarm Clock", url: "/alarm-clock" }])) }} />
    </>
  );
}


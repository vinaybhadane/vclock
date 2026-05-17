import { OnlineTimer } from "@/components/online-timer";
import { ToolLayout } from "@/components/tool-layout";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Online Timer - Free Countdown Timer",
  description: "Use a fast online countdown timer with presets, custom time, sound alerts, notifications, and fullscreen mode.",
  path: "/timer",
  keywords: ["online timer", "countdown timer", "pomodoro timer", "study timer"],
});

export default function TimerPage() {
  return (
    <>
      <ToolLayout
        description="Start a countdown in seconds with useful presets for focus, cooking, workouts, study sessions, and Pomodoro breaks."
        title="Online Timer"
      >
        <OnlineTimer />
      </ToolLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd([
        { question: "Can the timer notify me when finished?", answer: "Yes. Enable browser notifications and vClock can show a completion notification." },
        { question: "Does the timer have sound?", answer: "Yes. A short sound plays when the countdown reaches zero." },
      ])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: "Home", url: "/" }, { name: "Online Timer", url: "/timer" }])) }} />
    </>
  );
}


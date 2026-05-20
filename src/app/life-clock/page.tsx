import { ToolLayout } from "@/components/tool-layout";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";
import { DynamicLifeClockTool } from "@/components/dynamic-loaders";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = pageMetadata({
  title: "Life Journey Clock - Fun Mystery Life Countdown | vClock",
  description: "Create your personalized mystery life journey timer. Watch your timeline progress with a fun entertainment-based countdown experience.",
  path: "/life-clock",
  keywords: ["life clock", "mystery countdown", "life timer", "journey clock", "fun countdown timer"],
});

export default function LifeClockPage() {
  const faqData = [
    {
      question: "What is the Life Journey Clock?",
      answer: "The Life Journey Clock is a motivational tool that visualizes your personal timeline as an active countdown. It calculates time lived and remaining target time for entertainment purposes."
    },
    {
      question: "Does this tool predict my actual lifespan?",
      answer: "No. The Life Journey Clock does not predict death or real-life events. It generates a randomized remaining time purely for entertainment and motivation."
    },
    {
      question: "How is the target date calculated?",
      answer: "The tool uses your birth date to determine your current age, and then assigns a random remaining lifespan that dynamically ranges from 6 months up to a maximum total age of 80 years."
    },
    {
      question: "Can I reset the journey timer?",
      answer: "Yes. You can click the 'Reset' button at any time to clear your name and birth date from localStorage, letting you start a new journey timer."
    },
    {
      question: "Is my birth date saved on a database server?",
      answer: "No. Your name, birth date, and target date are stored solely in your local browser's localStorage. No personal data is sent to a server."
    },
    {
      question: "Why does the journey timer countdown tick?",
      answer: "The countdown ticks down in real-time to serve as a visual reminder to cherish each moment and make every day meaningful."
    },
    {
      question: "Does the progress bar update continuously?",
      answer: "Yes. The progress bar displays your journey completed percentage down to six decimal places, showing real-time timeline advancement."
    },
    {
      question: "Can I use the Life Journey Clock on mobile?",
      answer: "Yes. The Life Journey Clock is fully responsive and optimized for smartphones, tablets, laptops, and desktop computers."
    }
  ];

  const webpageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Life Journey Clock",
    "url": "https://vclock.tech/life-clock",
    "description": "Create your personalized mystery life journey timer. Watch your timeline progress with a fun entertainment-based countdown experience."
  };

  return (
    <>
      <ToolLayout
        description="See your personal timeline with a motivational countdown, progress bar, lived statistics, and daily focus quotes."
        title="Life Journey Clock"
      >
        <DynamicLifeClockTool />

        {/* SEO Content Section */}
        <section className="mt-16 border-t border-border pt-12">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">How Life Journey Clock Works</h2>
          <p className="mt-4 text-muted-foreground leading-7">
            The Life Journey Clock operates through a simple onboarding flow that visualizes your life's passage. Once you provide your name and birth date, the app computes your current age in years, months, and days. It then generates a randomized target lifespan based on standard demographic parameters, capping at a maximum total age of 80 years with a guaranteed minimum remaining time of 6 months. This calculation is generated exactly once per device and is stored locally in your browser so that it remains constant across page refreshes.
          </p>

          <h2 className="text-3xl font-semibold tracking-tight text-foreground mt-12">How Life Journey Clock Helps Motivation</h2>
          <p className="mt-4 text-muted-foreground leading-7">
            Seeing your timeline ticking down helps put daily worries in perspective. By showing the percentage of your journey completed to several decimal places, the tool serves as a mindful visual cue. It shifts focus from procrastination to execution, reminding you to cherish relationships, pursue creative endeavors, and make today count. Coupled with randomized motivational reminders, it guides you to approach every single day with fresh energy and intention.
          </p>

          <h2 className="text-3xl font-semibold tracking-tight text-foreground mt-12">Frequently Asked Questions</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {faqData.map((item, idx) => (
              <Card key={idx} className="border border-border bg-card">
                <CardContent className="p-5">
                  <h3 className="text-lg font-semibold text-foreground">{item.question}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-6">
                    {item.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </ToolLayout>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqData)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([
            { name: "Home", url: "/" },
            { name: "Life Journey Clock", url: "/life-clock" }
          ])),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }}
      />
    </>
  );
}

import { ToolLayout } from "@/components/tool-layout";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";
import { DynamicWishClockTool } from "@/components/dynamic-loaders";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = pageMetadata({
  title: "Wish Complete Clock - Goal Countdown Timer | vClock",
  description: "Track your goals and wishes with a motivational countdown timer. Watch your dream journey progress every day.",
  path: "/wish-clock",
  keywords: ["wish timer", "goal countdown", "dream timer", "motivation timer", "productivity timer"],
});

export default function WishClockPage() {
  const faqData = [
    {
      question: "What is the Wish Complete Clock?",
      answer: "The Wish Complete Clock is a goal-tracking countdown timer designed to help you organize, visualize, and count down to your dreams and long-term milestones."
    },
    {
      question: "How does the smart target date generation work?",
      answer: "If you don't enter a custom target date, the tool generates a smart, category-specific timeline (e.g., 1-5 years for Career goals, 6 months to 2 years for Health goals)."
    },
    {
      question: "Can I track multiple wishes at once?",
      answer: "Yes. You can add, edit, and delete multiple wish clocks. They are sorted automatically so that the one with the nearest deadline appears first."
    },
    {
      question: "What are the milestones shown on a wish clock?",
      answer: "The tool breaks down your timeline into 25%, 50%, 75%, and 100% complete milestones so you can visually check off progress achievements."
    },
    {
      question: "Is my wish data stored securely?",
      answer: "Yes. All your wishes and target dates are stored locally in your browser's localStorage. No information is uploaded to any servers, ensuring complete privacy."
    },
    {
      question: "Can I edit a wish after creating it?",
      answer: "Yes. Click the edit icon on the wish dashboard details view to modify the wish text, category, or target completion date."
    },
    {
      question: "How does the wish clock countdown update?",
      answer: "The countdown updates in real-time down to the second, providing an active visualization of your progress."
    },
    {
      question: "Can I use the Wish Complete Clock on mobile?",
      answer: "Yes. The Wish Complete Clock is fully responsive and accessible across all mobile devices, tablets, and desktop computers."
    }
  ];

  const webpageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Wish Complete Clock",
    "url": "https://vclock.tech/wish-clock",
    "description": "Track your goals and wishes with a motivational countdown timer. Watch your dream journey progress every day."
  };

  return (
    <>
      <ToolLayout
        description="Write down your goals, wishes, or resolutions to start a beautiful motivational countdown and keep track of milestones."
        title="Wish Complete Clock"
      >
        <DynamicWishClockTool />

        {/* SEO Content Section */}
        <section className="mt-16 border-t border-border pt-12">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">How Wish Complete Clock Works</h2>
          <p className="mt-4 text-muted-foreground leading-7">
            The Wish Complete Clock allows you to create custom countdown cards for your goals and dreams. When adding a wish, you can choose a category (such as Career, Health, or Money) and set a target date. If you leave the target date blank, the app will generate a smart timeline tailored to that category (e.g., 6 months to 2 years for Travel, or 1 to 5 years for Career goals). Your wishes are saved on your own device via localStorage, keeping them active and private without any account registrations.
          </p>

          <h2 className="text-3xl font-semibold tracking-tight text-foreground mt-12">How Wish Complete Clock Helps Motivation</h2>
          <p className="mt-4 text-muted-foreground leading-7">
            Having clear deadlines is essential for goal achievement. The Wish Complete Clock visualizes your timeline progress, turning static aspirations into dynamic, actionable milestones. The dashboard displays the percentage of the journey completed and marks off checkpoints at 25%, 50%, 75%, and 100% completion. Watching the countdown tick down second by second builds healthy urgency, helping you combat procrastination and maintain consistent habits every single day.
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
            { name: "Wish Complete Clock", url: "/wish-clock" }
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

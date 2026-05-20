import Link from "next/link";
import { AlarmClock, Clock3, Globe2, Timer, TimerReset, Hourglass, Sparkles } from "lucide-react";
import { AdsenseUnit } from "@/components/adsense-unit";
import { Card, CardContent } from "@/components/ui/card";
import { DynamicLiveClock } from "@/components/dynamic-loaders";

const tools = [
  { href: "/clock", title: "Live Clock", desc: "Current local time with date, day, timezone, and 12/24 hour mode.", icon: Clock3 },
  { href: "/world-clock", title: "World Clock", desc: "Compare live times across major countries, cities, and UTC offsets.", icon: Globe2 },
  { href: "/timer", title: "Online Timer", desc: "Fast countdown timer with presets, notifications, sound, and fullscreen mode.", icon: Timer },
  { href: "/stopwatch", title: "Stopwatch", desc: "Precise stopwatch with lap tracking and keyboard controls.", icon: TimerReset },
  { href: "/alarm-clock", title: "Alarm Clock", desc: "Set multiple browser alarms with labels, sounds, snooze, and persistence.", icon: AlarmClock },
  { href: "/life-clock", title: "Life Journey Clock", desc: "Track your personal timeline with a motivational journey countdown.", icon: Hourglass },
  { href: "/wish-clock", title: "Wish Complete Clock", desc: "Set motivational countdown timers for your dreams and goals.", icon: Sparkles },
];

export default function Home() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "vClock",
    "url": "https://vclock.tech",
    "description": "Free online clock, timer, stopwatch, alarm and world clock."
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is an online clock?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "An online clock is a web application that displays the current local time based on your browser's timezone database. It provides an immediate and precise way to check time, date, weekday, and offset details from any device."
        }
      },
      {
        "@type": "Question",
        "name": "How do I set alarms?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "To set an alarm, visit the Alarm Clock page, configure your wake-up time, enter a label (e.g., \"Meeting\"), choose a sound (soft or bright), and click \"Add\". Alarms run in the browser and persist via localStorage on your device."
        }
      },
      {
        "@type": "Question",
        "name": "Is vClock free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, vClock is a 100% free online utility service. All five tools—Live Clock, World Clock, Countdown Timer, Stopwatch, and Alarm Clock—are fully accessible without fees, registrations, or usage limits."
        }
      },
      {
        "@type": "Question",
        "name": "Can multiple timers run simultaneously?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "While each page tab supports a single running timer with presets, you can easily track multiple countdowns concurrently by opening vClock in multiple browser tabs or window instances."
        }
      },
      {
        "@type": "Question",
        "name": "Does World Clock support DST?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. The World Clock leverages your system browser's Intl.DateTimeFormat database, which keeps updated rules for Daylight Saving Time (DST) across worldwide cities, calculating offsets automatically."
        }
      },
      {
        "@type": "Question",
        "name": "Can alarms run in background tabs?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Alarms are designed to trigger in background tabs. However, modern browsers sleep background tabs to save battery. To ensure maximum reliability, we recommend keeping the tab active or enabling browser notifications."
        }
      },
      {
        "@type": "Question",
        "name": "Is the stopwatch precise?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. The stopwatch uses high-precision system clock ticks to measure intervals. It tracks elapsed time accurately down to milliseconds, making it suitable for sports, research, studying, and productivity tasks."
        }
      },
      {
        "@type": "Question",
        "name": "Is vClock mobile optimized?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. vClock is fully responsive and optimized for mobile browsers, tablets, and desktops. You can also install it as a PWA directly to your device home screen for quick, application-style launch."
        }
      }
    ]
  };

  return (
    <section className="soft-surface py-12 sm:py-16">
      <div className="page-shell">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-wide text-accent">Fast time tools</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-normal sm:text-6xl">
            Live Clock
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            Check the current time now with a fast digital clock, date, day, timezone, and
            fullscreen mode.
          </p>
        </div>
        <div className="mt-8">
          <DynamicLiveClock />
        </div>
        <AdsenseUnit className="my-8 min-h-28 sm:min-h-36" label="Homepage top advertisement" />
        
        <div className="mb-4 text-2xl font-semibold text-foreground">More time tools</div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Link href={tool.href} key={tool.href}>
              <Card className="h-full transition-transform hover:-translate-y-0.5">
                <CardContent className="grid gap-4 p-5">
                  <tool.icon className="text-accent" size={24} />
                  <div>
                    <div className="text-xl font-semibold text-foreground">{tool.title}</div>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{tool.desc}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        
        <section className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="text-2xl font-semibold text-foreground">Online clock tools for every routine</div>
            <p className="mt-4 leading-7 text-muted-foreground">
              vClock brings the essentials of timekeeping into one fast web app:
              a live digital clock, world clock comparisons, a countdown timer,
              a precise stopwatch, and browser alarms. It is built for quick
              checks during work, study, travel planning, workouts, cooking, and
              meetings across time zones.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            <article>
              <div className="font-semibold text-foreground">Current time at a glance</div>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                The live clock shows your local time with the date, weekday,
                timezone, and a fullscreen display for desks, classrooms, and
                shared screens.
              </p>
            </article>
            <article>
              <div className="font-semibold text-foreground">Timers and alarms that stay simple</div>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Start countdowns from common presets, save browser alarms with
                labels, and keep focus on the task instead of configuring a
                heavy scheduling app.
              </p>
            </article>
            <article>
              <div className="font-semibold text-foreground">World clocks for planning</div>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Compare cities and countries before calls, releases, trips, or
                events so it is clear what time it is for every participant.
              </p>
            </article>
          </div>
        </section>

        {/* How to Use Section */}
        <section className="mt-16 border-t border-border pt-12">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">How to Use vClock</h2>
          <p className="mt-4 text-muted-foreground leading-7">
            vClock is designed to be your go-to hub for everyday time management. Our tools operate entirely in the browser, providing instant access with zero installation. Below is a detailed guide on how to make the most of each utility.
          </p>
          
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold text-foreground">Using Online Clock</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-6">
                The Live Clock gives you accurate local time with weekday, date, and timezone auto-detection. Toggle between 12-hour and 24-hour formats to suit your preference. Click the fullscreen button to view the clock in a large, distraction-free display, making it perfect for office monitors, classroom screens, or desks.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground">Using Stopwatch</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-6">
                Measure elapsed time down to milliseconds using the Online Stopwatch. It is ideal for workouts, cooking, studying, and lab experiments. Use the Lap button to record split times in a neat chronological list. You can control the stopwatch using convenient keyboard shortcuts: press Space to start/pause, L to lap, and R to reset.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground">Using Timer</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-6">
                The Countdown Timer helps you keep track of tasks and breaks. You can input custom hours, minutes, and seconds or choose from handy presets (1 min, 5 min, 10 min, 25 min). It's an excellent companion for Pomodoro study sessions, workouts, or kitchen tasks, and it alerts you with a clear audio tone and a desktop notification when finished.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground">Setting Browser Alarms</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-6">
                Never miss a deadline or appointment. With the Alarm Clock, you can set multiple alarms with customizable labels, active sound selections (soft or bright alerts), and snooze intervals. Your alarms are saved securely in your browser's local storage, meaning they persist even if you close the tab or refresh the page.
              </p>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-foreground">Using World Clock</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-6">
              Coordinate global schedules with ease. The World Clock allows you to search and add live times for major cities and timezone offsets (UTC/GMT) globally. Each clock card features a local time indicator and a visual day/night indicator, making it incredibly simple to schedule international calls, release dates, or track global travel times.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mt-16 border-t border-border pt-12">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">Frequently Asked Questions</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <Card>
              <CardContent className="p-5">
                <h3 className="text-lg font-semibold text-foreground">What is an online clock?</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-6">
                  An online clock is a web application that displays the current local time based on your browser's timezone database. It provides an immediate and precise way to check time, date, weekday, and offset details from any device.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <h3 className="text-lg font-semibold text-foreground">How do I set alarms?</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-6">
                  To set an alarm, visit the Alarm Clock page, configure your wake-up time, enter a label (e.g., "Meeting"), choose a sound (soft or bright), and click "Add". Alarms run in the browser and persist via localStorage on your device.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <h3 className="text-lg font-semibold text-foreground">Is vClock free?</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-6">
                  Yes, vClock is a 100% free online utility service. All five tools—Live Clock, World Clock, Countdown Timer, Stopwatch, and Alarm Clock—are fully accessible without fees, registrations, or usage limits.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <h3 className="text-lg font-semibold text-foreground">Can multiple timers run simultaneously?</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-6">
                  While each page tab supports a single running timer with presets, you can easily track multiple countdowns concurrently by opening vClock in multiple browser tabs or window instances.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <h3 className="text-lg font-semibold text-foreground">Does World Clock support DST?</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-6">
                  Yes. The World Clock leverages your system browser's Intl.DateTimeFormat database, which keeps updated rules for Daylight Saving Time (DST) across worldwide cities, calculating offsets automatically.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <h3 className="text-lg font-semibold text-foreground">Can alarms run in background tabs?</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-6">
                  Yes. Alarms are designed to trigger in background tabs. However, modern browsers sleep background tabs to save battery. To ensure maximum reliability, we recommend keeping the tab active or enabling browser notifications.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <h3 className="text-lg font-semibold text-foreground">Is the stopwatch precise?</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-6">
                  Yes. The stopwatch uses high-precision system clock ticks to measure intervals. It tracks elapsed time accurately down to milliseconds, making it suitable for sports, research, studying, and productivity tasks.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <h3 className="text-lg font-semibold text-foreground">Is vClock mobile optimized?</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-6">
                  Absolutely. vClock is fully responsive and optimized for mobile browsers, tablets, and desktops. You can also install it as a PWA directly to your device home screen for quick, application-style launch.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <AdsenseUnit className="mt-8 min-h-28 sm:min-h-36" label="Homepage bottom advertisement" />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </section>
  );
}

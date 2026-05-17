import { pageMetadata } from "@/lib/seo";
import { InfoPage } from "@/components/info-page";

export const metadata = pageMetadata({
  title: "About Us",
  description: "Learn about vClock, a fast and accessible online time utility platform.",
  path: "/about-us",
});

export default function Page() {
  return (
    <InfoPage title="About Us">
      <p>
        vClock is a frontend-focused clock utility built for speed, clarity, and everyday use.
        It provides live time, world clocks, timers, stopwatch tracking, and browser alarms in a
        clean interface that works well on phones, tablets, and desktops.
      </p>
    </InfoPage>
  );
}


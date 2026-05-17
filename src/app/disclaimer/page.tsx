import { pageMetadata } from "@/lib/seo";
import { InfoPage } from "@/components/info-page";

export const metadata = pageMetadata({
  title: "Disclaimer",
  description: "Disclaimer for vClock online clock and timer utilities.",
  path: "/disclaimer",
});

export default function Page() {
  return (
    <InfoPage title="Disclaimer">
      <p>
        vClock displays time based on your browser, device settings, and standardized browser
        timezone APIs. While the tools are built for accuracy, they are not a substitute for
        certified timing systems or mission-critical alarms.
      </p>
    </InfoPage>
  );
}


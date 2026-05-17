import { pageMetadata } from "@/lib/seo";
import { InfoPage } from "@/components/info-page";

export const metadata = pageMetadata({
  title: "Cookie Policy",
  description: "Cookie and local storage policy for vClock.",
  path: "/cookie-policy",
});

export default function Page() {
  return (
    <InfoPage title="Cookie Policy">
      <p>
        vClock uses localStorage to remember your theme and saved alarms. Browser notifications
        require your permission. Future advertising partners may use cookies to deliver and measure
        ads according to applicable policies.
      </p>
    </InfoPage>
  );
}


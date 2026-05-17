import { pageMetadata } from "@/lib/seo";
import { InfoPage } from "@/components/info-page";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "Privacy policy for vClock and its browser-based time tools.",
  path: "/privacy-policy",
});

export default function Page() {
  return (
    <InfoPage title="Privacy Policy">
      <p>
        vClock is designed to run in your browser. Alarm settings and theme preference are stored
        locally on your device. We do not require an account for the clock utilities.
      </p>
      <p>
        If advertising or analytics services are added, they may use cookies or similar technology
        according to their own policies. You can manage browser storage and permissions at any time
        from your browser settings.
      </p>
    </InfoPage>
  );
}


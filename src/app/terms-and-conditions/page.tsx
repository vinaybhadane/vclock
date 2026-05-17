import { pageMetadata } from "@/lib/seo";
import { InfoPage } from "@/components/info-page";

export const metadata = pageMetadata({
  title: "Terms and Conditions",
  description: "Terms and conditions for using vClock online time tools.",
  path: "/terms-and-conditions",
});

export default function Page() {
  return (
    <InfoPage title="Terms and Conditions">
      <p>
        vClock is provided as a general utility. You may use the site for personal, educational,
        and professional timing needs. The tools rely on your device, browser, and system time.
      </p>
      <p>
        Do not use vClock where timing errors could create safety, legal, medical, or financial
        risk. By using the site, you agree to use it responsibly.
      </p>
    </InfoPage>
  );
}


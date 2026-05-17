import { pageMetadata } from "@/lib/seo";
import { InfoPage } from "@/components/info-page";

export const metadata = pageMetadata({
  title: "Contact Us",
  description: "Contact vClock for feedback, support, and general questions.",
  path: "/contact-us",
});

export default function Page() {
  return (
    <InfoPage title="Contact Us">
      <p>
        For feedback, support, or business questions, contact the vClock team at
        <a className="ml-1 font-medium text-accent" href="mailto:hello@vclock.tech">
          hello@vclock.tech
        </a>
        .
      </p>
    </InfoPage>
  );
}


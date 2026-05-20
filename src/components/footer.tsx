import Link from "next/link";
import { AdsenseUnit } from "@/components/adsense-unit";

const links = [
  ["Life Journey Clock", "/life-clock"],
  ["Wish Complete Clock", "/wish-clock"],
  ["About Us", "/about-us"],
  ["Privacy Policy", "/privacy-policy"],
  ["Terms & Conditions", "/terms-and-conditions"],
  ["Cookie Policy", "/cookie-policy"],
  ["Contact Us", "/contact-us"],
  ["Disclaimer", "/disclaimer"],
  ["Sitemap", "/sitemap.xml"],
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-card/50">
      <div className="page-shell grid gap-8 py-10">
        <AdsenseUnit className="min-h-28 sm:min-h-32" label="Footer advertisement" />
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="font-semibold">vClock</p>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Fast, accessible online time tools for everyday work, study, travel, and focus.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
            {links.map(([label, href]) => (
              <Link className="hover:text-foreground" href={href} key={href}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

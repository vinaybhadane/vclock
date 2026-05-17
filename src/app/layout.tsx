import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { PwaRegister } from "@/components/pwa-register";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vclock.tech"),
  applicationName: "vClock",
  title: {
    default: "vClock - Online Clock, Timer, Stopwatch, Alarm and World Clock",
    template: "%s | vClock",
  },
  description:
    "vClock is a fast, mobile-friendly clock utility with live time, world clocks, online timer, stopwatch, and browser alarms.",
  keywords: [
    "online clock",
    "live clock",
    "world clock",
    "online timer",
    "stopwatch",
    "alarm clock",
    "time now",
  ],
  authors: [{ name: "vClock" }],
  creator: "vClock",
  publisher: "vClock",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://vclock.tech",
    siteName: "vClock",
    title: "vClock - Fast Online Time Tools",
    description:
      "A clean, ultra-fast clock utility for live time, world clocks, timers, stopwatch, and alarms.",
  },
  twitter: {
    card: "summary_large_image",
    title: "vClock - Fast Online Time Tools",
    description:
      "Live clock, world clock, timer, stopwatch, and alarm clock in one fast web app.",
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
    ],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-full bg-background text-foreground antialiased`}
      >
        <Script
          async
          crossOrigin="anonymous"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9427809665187984"
          strategy="afterInteractive"
        />
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <PwaRegister />
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "vClock",
              url: "https://vclock.tech",
              applicationCategory: "UtilitiesApplication",
              operatingSystem: "Any",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            }),
          }}
        />
      </body>
    </html>
  );
}

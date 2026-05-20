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
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport = {
  themeColor: "#000000",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://vclock.tech"),
  applicationName: "vClock",
  title: {
    default: "vClock - Online Clock, Timer, Stopwatch & World Clock",
    template: "%s | vClock",
  },
  description:
    "Free online clock, timer, stopwatch, alarm and world clock. Set browser alarms easily. Fast, accurate and perfect for daily time management.",
  keywords: [
    "online clock",
    "timer",
    "stopwatch",
    "alarm",
    "world clock",
    "browser timer",
    "digital clock",
    "desktop timer",
  ],
  authors: [{ name: "vClock" }],
  creator: "vClock",
  publisher: "vClock",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://vclock.tech",
    siteName: "vClock",
    title: "vClock - Online Clock, Timer, Stopwatch & World Clock",
    description:
      "Free online clock, timer, stopwatch, alarm and world clock. Fast, accurate and perfect for daily time management.",
    images: [
      {
        url: "https://vclock.tech/og-image.png",
        width: 1200,
        height: 630,
        alt: "vClock - Online Clock, Timer, Stopwatch & World Clock",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "vClock - Online Clock, Timer, Stopwatch & World Clock",
    description:
      "Free online clock, timer, stopwatch, alarm and world clock. Fast, accurate and perfect for daily time management.",
    images: [
      {
        url: "https://vclock.tech/og-image.png",
        width: 1200,
        height: 630,
        alt: "vClock - Online Clock, Timer, Stopwatch & World Clock preview",
      },
    ],
  },
  manifest: "/manifest.webmanifest",
  other: {
    "google-adsense-account": "ca-pub-9427809665187984",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/logo.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <Script
          async
          crossOrigin="anonymous"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9427809665187984"
          strategy="lazyOnload"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-full bg-background text-foreground antialiased`}
      >
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

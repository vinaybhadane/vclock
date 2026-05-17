import type { MetadataRoute } from "next";

const routes = [
  "",
  "/clock",
  "/world-clock",
  "/timer",
  "/stopwatch",
  "/alarm-clock",
  "/about-us",
  "/privacy-policy",
  "/terms-and-conditions",
  "/cookie-policy",
  "/contact-us",
  "/disclaimer",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `https://vclock.tech${route}`,
    lastModified: new Date(),
    changeFrequency: route ? "weekly" : "daily",
    priority: route === "" ? 1 : route.includes("policy") || route.includes("terms") ? 0.4 : 0.8,
  }));
}


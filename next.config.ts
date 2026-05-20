import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async redirects() {
    return [
      { source: "/time-now", destination: "/clock", permanent: true },
      { source: "/online-timer", destination: "/timer", permanent: true },
      { source: "/online-stopwatch", destination: "/stopwatch", permanent: true },
      { source: "/online-alarm-clock", destination: "/alarm-clock", permanent: true },
    ];
  },
};

export default nextConfig;

import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", // Changed from default for better Netlify compatibility
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
    unoptimized: true, // Required for static export/Netlify
  },
  devIndicators: {
    position: "bottom-right",
  },
  // Disable type checking during build (Netlify will handle it)
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default withSentryConfig(nextConfig, {
  org: "raveen-kumar",
  project: "startup-global-2r",
  silent: !process.env.CI,
  widenClientFileUpload: true,
  disableLogger: true,
  automaticVercelMonitors: true,
});
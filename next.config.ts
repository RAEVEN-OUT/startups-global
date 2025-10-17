import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
  devIndicators: {
    position: "bottom-right",
  },

  // Disable sourcemaps in production to prevent duplicate uploads
  productionBrowserSourceMaps: false,
};

// Sentry config — all options below are officially supported
export default withSentryConfig(nextConfig, {
  org: "raveen-kumar",
  project: "startup-global-2r",

  silent: !process.env.CI,
  disableLogger: true,
  automaticVercelMonitors: true,

  // ✅ Recommended: control source map upload using environment vars
  // You’ll skip uploading maps by not setting SENTRY_AUTH_TOKEN on Netlify
});

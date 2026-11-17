import type { NextConfig } from "next";
import { RYBBIT_HOST, RYBBIT_PROXY_PATH } from "./src/lib/analytics";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
];

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async rewrites() {
    return [
      { source: `${RYBBIT_PROXY_PATH}/script.js`, destination: `${RYBBIT_HOST}/api/script.js` },
      { source: `${RYBBIT_PROXY_PATH}/track`, destination: `${RYBBIT_HOST}/api/track` },
      {
        source: `${RYBBIT_PROXY_PATH}/site/tracking-config/:siteId`,
        destination: `${RYBBIT_HOST}/api/site/tracking-config/:siteId`,
      },
    ];
  },
};

export default nextConfig;

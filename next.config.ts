import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

/**
 * Custom CSP was removed: a strict `script-src 'self'` blocked Next.js inline
 * scripts in production (blank page / console CSP errors). Reintroduce CSP with
 * nonces or `'unsafe-inline'`/`'strict-dynamic'` if you need it again.
 */

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  async headers() {
    const baseHeaders = [
      { key: "X-Frame-Options", value: "DENY" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
      },
    ];

    const prodOnlyHeaders = isProd
      ? [
          { key: "X-DNS-Prefetch-Control", value: "on" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ]
      : [];

    return [
      {
        source: "/:path*",
        headers: [...baseHeaders, ...prodOnlyHeaders],
      },
    ];
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Permissions-Policy",
            value: "clipboard-write=(), clipboard-read=()",
          },
        ],
      },
    ];
  },
  images: {
    unoptimized: true,
  },
  // experimental: {
  //   // This is the correct way to configure allowed origins for development.
  //   // Using a wildcard for cloudworkstations.dev allows any assigned URL to work.
  //   allowedDevOrigins: ["*.cloudworkstations.dev"],
  // },
};

export default nextConfig;

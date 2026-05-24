import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // 301 permanente de boglehub.vercel.app → boglehub.com
        // Requerido para Google Search Console Change of Address
        source: '/:path*',
        has: [{ type: 'host', value: 'boglehub.vercel.app' }],
        destination: 'https://boglehub.com/:path*',
        permanent: true,
      },
    ]
  },
}

export default nextConfig;

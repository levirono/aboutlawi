import type { NextConfig } from "next";

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: cloudName ? `/${cloudName}/**` : "/**",
      },
    ],
  },
  experimental: {
    serverActions: {
      // Admin image uploads are sent to a Server Action; matches MAX_IMAGE_BYTES plus form overhead.
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;

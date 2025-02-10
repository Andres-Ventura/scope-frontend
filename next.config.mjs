/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["image.thum.io"], // Allow external images from image.thum.io
  },
};

export default nextConfig;

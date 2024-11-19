import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "i.pinimg.com",
      "encrypted-tbn0.gstatic.com",
    ],
  },
};

export default nextConfig;

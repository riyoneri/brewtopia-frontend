/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL: "http://localhost:5000/api",
  },
};

export default nextConfig;

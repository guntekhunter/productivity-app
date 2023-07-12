/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/unm/image/upload/**",
      },
    ],
  },
  env: {
    NEXTAUTH_SECRET: "http://localhost:3000/",
  },
};

module.exports = nextConfig;

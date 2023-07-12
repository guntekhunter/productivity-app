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
    NEXTAUTH_SECRET: "https://productivity-app-zeta.vercel.app/",
  },
};

module.exports = nextConfig;

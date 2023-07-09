/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
    loader: "cloudinary",
    path: "https://res.cloudinary.com/unm/image/upload",
  },
  env: {
    NEXTAUTH_SECRET: "https://productivity-app-five.vercel.app/",
  },
};

module.exports = nextConfig;

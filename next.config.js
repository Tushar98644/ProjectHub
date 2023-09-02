/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["localhost"],
    },
    distDir: "build",
};

module.exports = nextConfig;

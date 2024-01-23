/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ["localhost"],
    },

    async rewrites() {
        return [
            {
                source: "/metrics",
                destination: "/api/metrics",
            },
        ];
    },
    // distDir: "build",
};

module.exports = nextConfig;

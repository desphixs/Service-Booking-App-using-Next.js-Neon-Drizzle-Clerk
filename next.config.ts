import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "utfs.io", // For UploadThing images
                port: "",
                pathname: "/f/**",
            },
            {
                protocol: "https",
                hostname: "img.clerk.com", // For Clerk profile images
                port: "",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;

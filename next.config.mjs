/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      "/data": ["./data/**/*"],
    },
  },
};

export default nextConfig;

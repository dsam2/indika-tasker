/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // This allows the build to finish even with ESLint errors
    ignoreDuringBuilds: true,
  },
  typescript: {
    // This allows the build to finish even with TypeScript errors
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

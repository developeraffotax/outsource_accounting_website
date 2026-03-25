/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: "/contact-us",
        destination: "/contactUs",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "fantastic-dog-00a226e27b.strapiapp.com",
      },
      {
        protocol: "https",
        hostname: "fantastic-dog-00a226e27b.media.strapiapp.com",
      },
    ],
  },
};

export default nextConfig;

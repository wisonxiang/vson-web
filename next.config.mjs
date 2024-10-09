/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
const nextConfig = {
  // output: "standalone",
  assetPrefix: isProd ? 'https://cdn.vson.top/pc' : '',
  // reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.vson.top',
        port: '',
        pathname: '/pc/',
      },
    ],
  },
};

export default nextConfig;

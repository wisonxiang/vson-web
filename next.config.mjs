/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'

const rewrites = () => {
  return [
    {
      source: "/api/:slug*",
      destination: "https://vson.top/api/:slug*",
    },
    {
      source: "/socket",
      destination: "http://localhost:3200/socket/",
    },
  ];
};
const nextConfig = {
  output: "standalone",
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
  rewrites
};

export default nextConfig;

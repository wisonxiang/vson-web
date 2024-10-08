/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
const nextConfig = {
  output: "standalone",
  assetPrefix: isProd ? 'https://cdn.vson.top/pc' : '',
  // reactStrictMode: true,
};

export default nextConfig;

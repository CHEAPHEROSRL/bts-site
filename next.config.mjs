/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: [
    '*.replit.dev',
    '*.repl.co',
    '*.replit.app',
    '*.kirk.replit.dev',
    '127.0.0.1',
    'localhost',
  ],
};

export default nextConfig;

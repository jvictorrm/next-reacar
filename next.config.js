/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/cars',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

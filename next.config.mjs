/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint:{
    ignoreDuringBuilds:true,
},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'http://localhost:3000/',
        pathname: '/**',
      },
    ],
    domains: ['res.cloudinary.com'],
  },

};

export default nextConfig;

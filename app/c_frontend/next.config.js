/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    loader: "imgix",
    path: "https://proy-cloud.s3.amazonaws.com/images/",
    domains: ['proy-cloud.s3.amazonaws.com'],
  }
}

module.exports = nextConfig

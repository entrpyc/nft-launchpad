/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fuchsia-neighbouring-lemur-97.mypinata.cloud"
      }
    ]
  }
}

export default nextConfig;

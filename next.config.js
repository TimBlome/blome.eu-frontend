/**
 * @type {import('next').NextConfig}
 */

module.exports = {
  images: {
    loader: "default",
    domains: ["localhost", "cms.blome.eu"],
  },
  output: 'standalone'
}

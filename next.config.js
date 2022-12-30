/**
 * @type {import('next').NextConfig}
 */
 const withImages = require('next-images')

module.exports = withImages({
  images: {
    loader: "default",
    domains: ["localhost", "cms.blome.eu"],
  },
  output: 'standalone'
});

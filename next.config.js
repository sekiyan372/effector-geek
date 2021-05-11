module.exports = {
  future: {
    webpack5: true,
  },
  webpack: (config) => {
    config.experiments = {}
    return config
  },
}

const withImages = require('next-images')
module.exports = withImages()

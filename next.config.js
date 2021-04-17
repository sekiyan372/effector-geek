module.exports = {
  future: {
    webpack5: true,
  },
  webpack(config) {
    config.experiments = {}
    return config
  }
}

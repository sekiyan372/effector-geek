module.exports = {
  future: {
    webpack5: true,
  },
  webpack: (config) => {
    config.experiments = {}
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000
        }
      }
    })
    return config
  },
}

module.exports = {
  purge: ['./src/components/**/*.tsx', './src/pages/**/*.tsx', './public/**/*.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        '84': '21rem',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

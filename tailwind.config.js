module.exports = {
  purge: ['./src/components/**/*.tsx', './src/pages/**/*.tsx', './public/**/*.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      margin: {
        'm-center': '0 auto',
      },
      width: {
        'w-18': '4.5rem',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

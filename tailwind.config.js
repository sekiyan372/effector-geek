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
      },
    },
    height: {
      '200': '50rem',
      '240': '60rem',
      '260': '65rem',
      '280': '70rem',
    },
    maxHeight: {
      '100': '25rem',
      '108': '27rem',
      '120': '30rem'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

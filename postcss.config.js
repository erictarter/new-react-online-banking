const tailwindscss = require('tailwindcss');

module.exports = {
  plugins: [tailwindscss('./tailwind.js'), require('autoprefixer')]
};

module.exports = {
  plugins: [
    require('postcss-import'),
    require('autoprefixer'),
    require('tailwindcss')("./tailwind.config.js"),
  ]
}

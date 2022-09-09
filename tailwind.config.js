/** @type {import('tailwindcss').Config} */ 
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
      'sm': '640px'},
     colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'black-coffee': '#463541',
      'unbleached-silk': '#FFE2D1',
      'xanadu': '#7E8B7E',
      'wine': '#663939',
      },
      fontFamily: {
        body: ['Montserrat']
      }
    },
  },
  plugins: [require('@tailwindcss/forms','@tailwindcss/aspect-ratio'),],
}
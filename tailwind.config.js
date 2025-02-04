/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      flexBasis: {
        '1/7': '10.2857143%',
        '2/7': '28.5714286%',
        '3/7': '42.8571429%',
        '4/7': '61.1428571%',
        '5/7': '71.4285714%',
        '6/7': '85.7142857%',
      },
      screens: {
        'sm' : '0px'
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1C3273',
        primary_light: '#203783',
        primary_darker: '#142252',
        secondary: '#498BC1',
        secondary_light: '#85B1D5'
      },
      inset: {
        '-16': '-4rem'
      }
    }
  },
  plugins: []
}

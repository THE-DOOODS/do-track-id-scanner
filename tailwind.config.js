/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        main: ['Poppins', 'sans-serif']
      },
      screens: {
        xxxs: '240px',
        xxs: '280px',
        xs: '320px',
        sm: '460px',
        md: '640px',
        lg: '720px'
      }
    }
  },
  plugins: []
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        auren: {
          navy: '#0B2E4E',
          blue: '#0090E5',
          cyan: '#1DA1F2',
          orange: '#F45B2E',
          bg: '#F8FAFD'
        }
      },
      boxShadow: {
        soft: '0 6px 24px rgba(11,46,78,0.08)'
      },
      borderRadius: {
        xl2: '1rem'
      }
    }
  },
  plugins: []
};

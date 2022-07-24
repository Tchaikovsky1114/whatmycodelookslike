module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'modern-blue': '#0F172A'
      },
      keyframes: {
        fadeIn: {
          '0%,60%': {
            opacity: 0
          },
          '100%': {
            opacity: 100
          }
        }
      }

    },

  },
  plugins: [],
}
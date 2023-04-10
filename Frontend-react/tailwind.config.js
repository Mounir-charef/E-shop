/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
      "./index.html",
  ],
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1350px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      fontFamily: {
        'Stylish': ['Stylish', 'sans-serif'],
        "Pacifico": ["Pacifico", "cursive"],
      },
      keyframes: {
        'fade-in-down': {
            '0%, 100%': {
                opacity: '0',
                translate : '-50% -10px'
            },
            '50%': {
                opacity: '1',
                translate : '-50% 50%'
            },
        }
      },
        animation: {
            'fade-in-down': 'fade-in-down 4s ease-in-out',
        }
    },
  },
  plugins: [
  ],
}
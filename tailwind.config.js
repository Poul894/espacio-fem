/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#FBF6EE",
          50: "#FDFBF7",
          100: "#FBF6EE",
          200: "#F7F0E8",
        },
        pink: {
          soft: "#F6D5E0",
          DEFAULT: "#EBB6C8",
          100: "#F6D3D9",
        },
        lavender: {
          DEFAULT: "#D9C5E8",
          light: "#F3EEF8",
        },
        violet: {
          DEFAULT: "#8E5A9B",
          deep: "#6B3F7A",
          muted: "#9B6FA8",
        },
        plum: {
          DEFAULT: "#4A1F4F",
          light: "#6B4A6F",
        },
        gold: {
          DEFAULT: "#C9A66B",
        }
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        script: ['"Dancing Script"', 'cursive'],
        body: ['"Montserrat"', '"Poppins"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'pill': '9999px',
        'card': '22px',
      },
      boxShadow: {
        'soft': '0 10px 40px -10px rgba(74, 31, 79, 0.15)',
        'card': '0 8px 30px -12px rgba(142, 90, 155, 0.4)',
        'button': '0 6px 20px -8px rgba(142, 90, 155, 0.6)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #FBF6EE 0%, #F3EEF8 50%, #F9F0F4 100%)',
        'section-gradient': 'linear-gradient(180deg, rgba(217,197,232,0.25) 0%, rgba(251,246,238,0.9) 100%)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}


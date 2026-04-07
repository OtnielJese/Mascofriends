/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        secondary: {
          50: '#fffbec',
          100: '#fff6d3',
          200: '#ffeaa5',
          300: '#ffd86d',
          400: '#ffbc32',
          500: '#ff9f0a',
          600: '#f27f00',
          700: '#c95c02',
          800: '#a0480b',
          900: '#813c0c',
        },
        accent: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        vetivet: {
          red: '#E31E24',           // Rojo principal del logo MASCO
          'red-light': '#FFE8E9',   // Rojo claro para fondos
          'red-hover': '#C11A1F',   // Rojo oscuro para hover
          blue: '#005CAB',          // Azul principal del logo FRIENDS
          'blue-light': '#E6F1FF',  // Azul claro para fondos
          'blue-hover': '#004788',  // Azul oscuro para hover
          dark: '#1a1a1a',          // Negro para textos
          gray: '#6B7280',          // Gris para textos secundarios
          // Alias para mantener compatibilidad temporal
          green: '#E31E24',
          'green-light': '#FFE8E9',
          orange: '#E31E24',
          teal: '#005CAB',
          navy: '#1a1a1a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

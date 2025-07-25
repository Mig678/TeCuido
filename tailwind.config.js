/* eslint-disable */
/* eslint-env node */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'bg-base': '#0f172a',
        'bg-surface': '#1e293b',
        'card': '#1e293b',
        'card-border': '#475569',
        'text-main': '#f8fafc',
        'text-muted': '#cbd5e1',
        'primary': '#14b8a6',
        'primary-light': '#2dd4bf',
        'accent': '#14b8a6',
        'muted': '#334155',
        'border': '#334155',
      },
      fontFamily: {
        sans: [
          'Inter',
          'DM Sans',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.7' },
        },
        'pulse-slower': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.5' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        float: 'float 3.8s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 3.5s cubic-bezier(0.4,0,0.6,1) infinite',
        'pulse-slower': 'pulse-slower 7s cubic-bezier(0.4,0,0.6,1) infinite',
        shimmer: 'shimmer 1.2s linear infinite',
      },
    },
  },
  plugins: [],
}

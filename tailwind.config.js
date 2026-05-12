/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0a0a0a',
        wood: '#1a0f0a',
        parchment: '#2a1f14',
        gold: '#d4a574',
        'gold-dark': '#b8860b',
        ember: '#cc5500',
        blood: '#8b0000',
        'baba-green': '#1a4a1a',
        'chort-red': '#6b0000',
        'lesnik-brown': '#3d2b1f',
        'zmaj-purple': '#3a0a4e',
      },
      fontFamily: {
        medieval: ['Georgia', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'card-flip': 'cardFlip 0.6s ease-in-out',
        'float': 'float 3s ease-in-out infinite',
        'flicker': 'flicker 0.15s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { transform: 'translateY(20px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
        pulseGlow: { '0%, 100%': { boxShadow: '0 0 5px rgba(212,165,116,0.3)' }, '50%': { boxShadow: '0 0 20px rgba(212,165,116,0.6)' } },
        cardFlip: { '0%': { transform: 'rotateY(0deg)' }, '100%': { transform: 'rotateY(180deg)' } },
        float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        flicker: { '0%': { opacity: '0.8' }, '100%': { opacity: '1' } },
      },
    },
  },
  plugins: [],
}

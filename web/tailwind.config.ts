// /web/tailwind.config.ts - COMPLETE AND CORRECTED FILE

import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'lab-blue': '#0F172A',
        'deep-blue': '#1E293B',
        'flame': '#F97316',
        'amber': '#FBBF24',
        'papyrus': '#F8F5EF',
        'parchment': '#EFE6D5',
        'scroll': '#E0D5C0',
        'success': '#14B8A6',
        'error': '#F43F5E',
        'info': '#3B82F6',
        'text-primary': 'rgba(255, 255, 255, 0.95)',
        'text-secondary': 'rgba(255, 255, 255, 0.7)',
        'text-muted': 'rgba(255, 255, 255, 0.5)',
        'text-light-bg-primary': '#1F2937',
        'text-light-bg-secondary': '#4b5563',
        'form-input-border': '#D1D5DB',
      },
      backgroundImage: {
        'gradient-flame': 'linear-gradient(135deg, #F97316, #FBBF24)',
        // --- THIS IS THE FINAL, DARKER GRADIENT ---
        'gradient-subtle-text': 'linear-gradient(to right,rgb(18, 25, 59), #201356)',
        'ambient-glow': `
          radial-gradient(circle at 15% 15%, rgba(249, 115, 22, 0.18) 0%, transparent 45%),
          radial-gradient(circle at 85% 85%, rgba(197, 83, 235, 0.18) 0%, transparent 45%),
          radial-gradient(circle at 85% 15%, rgba(56, 189, 248, 0.08) 0%, transparent 40%),
          radial-gradient(circle at 15% 85%, rgba(255, 202, 40, 0.12) 0%, transparent 40%)
        `,
      },
      spacing: {
        '18': '4.5rem',
      },
      borderRadius: {
        'sm': '0.25rem',
        'md': '0.5rem',
        'lg': '1rem',
        'xl': '1.5rem',
        '2xl': '2rem',
      },
      boxShadow: {
        'md': '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
        'lg': '0 10px 15px -3px rgba(0,0,0,0.15), 0 4px 6px -2px rgba(0,0,0,0.1)',
        'xl': '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
        '2xl': '0 25px 50px -12px rgba(0,0,0,0.25)',
        'inner': 'inset 0 2px 4px 0 rgba(0,0,0,0.06)',
      },
      keyframes: {
        'ambient-shift': {
          '0%': { backgroundPosition: '0% 0%, 0% 0%, 0% 0%, 0% 0%' },
          '100%': { backgroundPosition: '5% 10%, -5% -5%, 10% -5%, -10% 5%' },
        },
        'subtle-wiggle': {
          '0%, 100%': { transform: 'translateX(0) rotate(0)' },
          '25%': { transform: 'translateX(-2px) rotate(-1deg)' },
          '75%': { transform: 'translateX(2px) rotate(1deg)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
        },
        spin: {
          to: { transform: 'rotate(360deg)' },
        },
        'fade-in-up': { 
          '0%': { opacity: '0', transform: 'translateY(10px)' }, 
          '100%': { opacity: '1', transform: 'translateY(0)' } 
        },
      },
      animation: {
        'ambient-shift': 'ambient-shift 30s ease infinite alternate',
        'subtle-wiggle': 'subtle-wiggle 0.5s ease-in-out 1',
        shake: 'shake 0.5s ease-in-out',
        spin: 'spin 0.8s linear infinite',
        'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        serif: ['var(--font-playfair-display)', 'serif'],
      },
    },
  },
  plugins: [
  require('@tailwindcss/typography'), // <-- ADD THIS LINE
],
}
export default config
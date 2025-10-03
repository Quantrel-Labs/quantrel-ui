import type { Config } from "tailwindcss"

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        // Framer-inspired color palette
        'surface': {
          'primary': '#000000',
          'secondary': 'rgba(15, 23, 42, 0.5)',
          'tertiary': 'rgba(30, 41, 59, 0.3)',
        },
        'glass': {
          'bg': 'rgba(15, 23, 42, 0.4)',
          'bg-light': 'rgba(30, 41, 59, 0.3)',
          'bg-strong': 'rgba(15, 23, 42, 0.7)',
          'border': 'rgba(148, 163, 184, 0.2)',
          'border-strong': 'rgba(148, 163, 184, 0.3)',
        },
        'text': {
          'primary': '#ffffff',
          'secondary': 'rgba(241, 245, 249, 0.8)',
          'muted': 'rgba(241, 245, 249, 0.6)',
          'accent': 'rgba(59, 130, 246, 0.9)',
        },
        'accent': {
          'blue': '#0099ff',
          'purple': '#8b5cf6',
          'pink': '#ec4899',
          'cyan': '#06b6d4',
          'orange': '#f59e0b',
          'red': '#ef4444',
        },
      },
      backgroundImage: {
        // Enhanced gradients matching Framer style
        'gradient-primary': 'linear-gradient(135deg, #0099ff 0%, #8b5cf6 35%, #ec4899 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%)',
        'gradient-accent': 'linear-gradient(135deg, #f59e0b 0%, #ef4444 50%, #ec4899 100%)',
        'gradient-surface': 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.6) 100%)',
        'gradient-glass': 'linear-gradient(135deg, rgba(15, 23, 42, 0.6) 0%, rgba(30, 41, 59, 0.4) 100%)',
        'gradient-text': 'linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0.4) 100%)',
        'gradient-text-accent': 'linear-gradient(135deg, #0099ff 0%, #8b5cf6 50%, #ec4899 100%)',
        'shimmer': 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent)',
        'noise': 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)',
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '20px',
        '3xl': '24px',
        '4xl': '32px',
        '5xl': '40px',
      },
      boxShadow: {
        'glass': '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
        'glass-xl': '0 35px 80px -20px rgba(0, 0, 0, 0.8)',
        'glass-sm': '0 4px 25px -5px rgba(0, 0, 0, 0.1)',
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.3)',
        'glow-purple': '0 0 20px rgba(139, 92, 246, 0.3)',
        'glow-pink': '0 0 20px rgba(236, 72, 153, 0.3)',
        'glow-strong': '0 0 40px rgba(59, 130, 246, 0.5)',
        'inner-glow': 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'inner-glow-strong': 'inset 0 1px 0 rgba(255, 255, 255, 0.2)',
      },
      backdropBlur: {
        'xs': '2px',
        'glass': '40px',
        'strong': '60px',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        'fade-in-scale': 'fadeInScale 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        'shimmer': 'shimmer 3s infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'pulse-glow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInScale: {
          '0%': { opacity: '0', transform: 'scale(0.9) translateY(20px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(59, 130, 246, 0.5)' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
    },
  },
  plugins: [],
} satisfies Config
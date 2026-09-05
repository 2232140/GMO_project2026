import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['var(--font-nunito)', 'sans-serif'],
        fredoka: ['var(--font-fredoka)', 'sans-serif'],
      },
      colors: {
        y2k: {
          pink: '#ff1493',
          purple: '#9b59b6',
          blue: '#00bfff',
          gold: '#ffd700',
          cyan: '#00ffff',
          green: '#00ff88',
        },
      },
      backgroundImage: {
        'aurora': 'linear-gradient(135deg, #1a0a2e 0%, #16213e 25%, #0f3460 50%, #1a0a2e 100%)',
        'holographic': 'linear-gradient(45deg, #ff1493, #9b59b6, #00bfff, #00ff88, #ffd700, #ff1493)',
        'card-shine': 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.3) 50%, transparent 60%)',
      },
      animation: {
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'sparkle': 'sparkle 1.5s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'holo-rotate': 'holoRotate 4s linear infinite',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'pop': 'pop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'card-flip': 'cardFlip 0.6s ease-in-out',
        'aurora-shift': 'auroraShift 8s ease-in-out infinite',
        'star-twinkle': 'starTwinkle 2s ease-in-out infinite',
        'bounce-light': 'bounceLite 2s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        sparkle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(1.2)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(255,20,147,0.5), 0 0 20px rgba(155,89,182,0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(255,20,147,0.8), 0 0 40px rgba(155,89,182,0.6), 0 0 60px rgba(0,191,255,0.4)' },
        },
        holoRotate: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        pop: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        cardFlip: {
          '0%': { transform: 'rotateY(0deg)' },
          '50%': { transform: 'rotateY(90deg)' },
          '100%': { transform: 'rotateY(0deg)' },
        },
        auroraShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        starTwinkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.1)' },
        },
        bounceLite: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      boxShadow: {
        'y2k': '0 0 15px rgba(255,20,147,0.5), 0 0 30px rgba(155,89,182,0.3)',
        'y2k-blue': '0 0 15px rgba(0,191,255,0.5), 0 0 30px rgba(0,255,255,0.3)',
        'y2k-gold': '0 0 15px rgba(255,215,0,0.5), 0 0 30px rgba(255,180,0,0.3)',
        'card': '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1)',
        'card-hover': '0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.2), 0 0 30px rgba(255,20,147,0.3)',
        'neon-pink': '0 0 5px #ff1493, 0 0 10px #ff1493, 0 0 20px #ff1493',
        'neon-purple': '0 0 5px #9b59b6, 0 0 10px #9b59b6, 0 0 20px #9b59b6',
      },
    },
  },
  plugins: [],
};

export default config;

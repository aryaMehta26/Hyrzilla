/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgDark: '#040906',
        accentBg: '#081A10',
        cardBg: 'rgba(10, 24, 16, 0.75)',
        cardBg2: 'rgba(14, 34, 23, 0.6)',
        brandGreen: '#25E87A',
        brandGlow: 'rgba(37,232,122,0.16)',
        brandGlowLg: 'rgba(37,232,122,0.30)',
        tMain: '#FFFFFF',
        tMuted: '#A1B5A8',
        tSub: '#526B5D',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        emeraldGlow: '0 0 24px rgba(37,232,122,0.18)',
        emeraldGlowLg: '0 0 36px rgba(37,232,122,0.30)',
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "var(--clr-void)",
        obsidian: "var(--clr-obsidian)",
        charcoal: "var(--clr-charcoal)",
        stone: "var(--clr-stone)",
        mist: "var(--clr-mist)",
        gold: {
          DEFAULT: "var(--clr-gold)",
          light: "var(--clr-gold-light)",
          dim: "var(--clr-gold-dim)",
        },
        cream: "var(--clr-cream)",
        ivory: "var(--clr-ivory)",
        smoke: "var(--clr-smoke)",
        fog: "var(--clr-fog)",
        forest: "var(--clr-forest)",
        moss: "var(--clr-moss)",
        sage: "var(--clr-sage)",
      },
      fontFamily: {
        cormorant: ["Cormorant", "serif"],
        dmSerif: ["DM Serif Display", "serif"],
        dmSans: ["DM Sans", "sans-serif"],
        jost: ["Jost", "sans-serif"],
      },
    },
  },
  plugins: [],
}


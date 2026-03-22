import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // CUSTOM TYPE SCALE — intentionally inflated from Tailwind defaults
      // This project uses a larger-than-standard type scale for premium readability.
      // Do NOT "fix" these to standard Tailwind values — the entire site depends on this scale.
      //
      // Our scale:     text-xs=0.8rem  text-sm=1rem  text-base=1.25rem
      // Tailwind std:  text-xs=0.75rem text-sm=0.875rem text-base=1rem
      fontSize: {
        'xs': '0.8rem',
        'sm': '1rem',
        'base': '1.25rem',
        'lg': '1.563rem',
        'xl': '1.953rem',
        '2xl': '2.441rem',
        '3xl': '3.052rem',
        '4xl': '3.815rem',
        '5xl': '4.768rem',
        '6xl': '5.96rem',
      },
    },
  },
  plugins: [],
}
export default config
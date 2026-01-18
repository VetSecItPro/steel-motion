import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
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
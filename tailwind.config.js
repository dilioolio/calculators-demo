/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  safelist: [
    {
      pattern: /(bg|text|border|ring)-(blue|purple|emerald)-(50|500|600)/,
    },
    {
      pattern: /from-(blue|purple|emerald)-50/,
    },
    {
      pattern: /to-(indigo|pink|teal)-50/,
    },
  ],
  plugins: [],
};
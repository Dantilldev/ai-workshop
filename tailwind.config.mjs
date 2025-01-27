const flowbite = require('flowbite-react/tailwind');
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    flowbite.content(),
  ],
  theme: {
    extend: {
      animation: {
        'custom-bounce': 'custom-bounce 1s infinite',
      },
      keyframes: {
        'custom-bounce': {
          '0%, 100%': {transform: 'translateY(0)'},
          '50%': {transform: 'translateY(-0.5rem)'},
        },
      },
      spacing: {
        150: '-0.15s',
        300: '-0.3s',
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [flowbite.plugin()],
};

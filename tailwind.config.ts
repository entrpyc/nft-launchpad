import type { Config } from "tailwindcss";

import { gridExtension } from './tailwind.plugins';

const configColors = {
  bg: {
    primary: 'var(--bg-primary)',
    secondary: 'var(--bg-secondary)',
    contrast: 'var(--bg-contrast)',
    error: 'var(--bg-error)',
  },
  text: {
    primary: 'var(--text-primary)',
    secondary: 'var(--text-secondary)',
    accent: 'var(--text-accent)',
    contrast: 'var(--text-contrast)',
    error: 'var(--text-error)',
  },
}

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        config: configColors
      },
    },
  },
  plugins: [gridExtension],
};
export default config;
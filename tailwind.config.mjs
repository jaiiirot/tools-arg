/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        "console-bg": "#3C3C3B", // Fondo oscuro
        "console-green": "#00FF00", // Verde neón
        "console-white": "#FFFFFF", // Blanco
        "console-gray": "#4d4d4b", // Un tono ligeramente más claro para bordes y tarjetas
      },
      fontFamily: {
        mono: ['"Fira Code"', "Consolas", '"Courier New"', "monospace"],
      },
    },
  },
  plugins: [],
};

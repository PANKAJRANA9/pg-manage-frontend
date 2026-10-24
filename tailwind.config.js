/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sidebar: "#151a2e",
        sidebarActive: "#2a3558",
        brand: {
          blue: "#2563eb",
          dark: "#1e293b"
        }
      },
      boxShadow: {
        card: "0 4px 24px rgba(0,0,0,0.06)",
        soft: "0 2px 12px rgba(0,0,0,0.05)"
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px"
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx", "./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5", // Indigo 600
        secondary: "#F59E0B", // Amber 500
        accent: "#10B981", // Emerald 500
        background: "#F3F4F6", // Gray 200
        text: "#111827", // Gray 900
        border: "#E5E7EB", // Gray 300
        card: "#FFFFFF", // White
        cardBorder: "#D1D5DB", // Gray 400
        cardShadow: "#00000029", // Semi-transparent black
        button: "#3B82F6", // Blue 500
        buttonText: "#FFFFFF", // White
        buttonHover: "#2563EB", // Blue 600
        buttonActive: "#1D4ED8", // Blue 700
        inputBackground: "#FFFFFF", // White
        inputBorder: "#D1D5DB", // Gray 400
        inputText: "#111827", // Gray 900
        inputPlaceholder: "#9CA3AF", // Gray 500
        link: "#3B82F6", // Blue 500
        linkHover: "#2563EB", // Blue 600
      }
    },
  },
  plugins: [],
}
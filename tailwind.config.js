/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*", "./components/**/*.{js,jsx,ts,tsx}"], // apply to "app" and "components" folders and every file in those two.
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
  fontFamily: {
    sundori: ["Sundori"],
  },
}

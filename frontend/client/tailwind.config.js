/* eslint-disable no-undef */

const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    fontFamily: {
      display: ["Poppins","san-serif"],
    },
    extend: {
      colors:{
        primary: "#05B6D3",
        secondary: "#EF863E",
        'neutralDGrey': '#4D4D4D',
        'brandPrimary': '#443d60',
        'neutralGrey': '#717171',
        'gray900' : '#18191F',
        'brandSecondary': '#f43b85',
        'neutralSliver': '#F5F7FA'
      },
      display: ["focus-group"]
    },
  },
  plugins: [flowbite.plugin(),],
}


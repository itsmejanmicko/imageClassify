/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,ts,tsx,jsx}"],
  theme: {
    extend: {
      fontFamily:{
        customFont:["Fira Code", "serif"]
      },
      colors:{
        primary:'#010233'
      }
    },
  },
  plugins: [],
}


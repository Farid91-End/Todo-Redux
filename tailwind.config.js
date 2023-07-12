/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens:{
      'xl':{max:'1024px'},
      'lg':{max: '900px'},
      'md':{max: '768px'},
      'sm':{max: '640px'},
      'smm':{max: '400px'},
    }
  },
  plugins: [],
}


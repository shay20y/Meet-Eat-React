/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    mode: "jit",
    theme: {
        extend: {
            colors: {
                main: "#8ed7ec",
                secondary: "#f87125",
                'btn-hover':'#22C55E',
                't-black': "#08152c",
                't-white': '#fefefe'
            },
            fontFamily: {
                poppins: ["Poppins", "sans-serif"],
            },
        },
    },
    plugins: [],
};
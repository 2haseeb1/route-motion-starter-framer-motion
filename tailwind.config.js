/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    safelist: [
        { pattern: /(bg|text|border|ring)-(slate|indigo|emerald)-(50|200|400|500|600|700)/ },
        { pattern: /hover:bg-(slate|indigo|emerald)-700/ },
    ],
};
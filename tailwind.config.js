/** @type {import('tailwindcss').Config} */
module.exports = {
    "postcss-import": {},
    "tailwindcss/nesting": "postcss-nesting",
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
                "nav-text": "var(--nav-text)",
            },
            // screens: {
            //   '2xl':'1440px',
            //   'lg': '1125px',
            //   'md': '650px',
            //   'sm': '500px',
            //   'xsm': '375px',
            // },
            backgroundImage: {
                "dark-bg": "url('/public/dark.jpeg.svg')",
            },
            plugins: [],
        },
    },
};

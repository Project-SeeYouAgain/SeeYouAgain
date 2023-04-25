/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}', './src/app/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            colors: {
                blue: '#5669FF',
                orange: '#FF8655',
                red: '#FF6262',
                white: '#FFFFFF',
                sky: '#EAECFF',
                black: '#252525',
                darkgrey: '#8E8E93',
                middlegrey: '#D2D2D2',
                lightgrey: '#F2F2F2',
            },
        },
    },
    plugins: [],
};

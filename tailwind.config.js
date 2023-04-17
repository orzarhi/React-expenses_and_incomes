/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				comic: ["Comic Neue", "cursive"],
			},
			keyframes: {
				wiggle: {
					"0%, 100%": { transform: "rotate(-1deg)" },
					"50%": { transform: "rotate(1deg)" },
				},
			},
		},
		screens: {
			xl: { max: "1600px" },
			lg: { max: "1400px" },
			md: { max: "1064px" },
			sm: { max: "639px" },
			vsm: { max: "400px" },
		},
		colors: {
			blue: "#1fb6ff",
			white: "#ffffff",
			purple: "#7e5bef",
			pink: "#ff49db",
			red: "#E74646",
			"red-lite": "#9d174dcc",
			orange: "#ff7849",
			"orange-lite": "#FFA45B",
			green: "#5F8D4E",
			yellow: "#ffc82c",
			"gray-dark": "#273444",
			gray: "#8492a6",
			"gray-light": "#FEFBF3",
			black: "#171717",
		},
	},
	plugins: [],
};

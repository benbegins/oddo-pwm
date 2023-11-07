/** @type {import('tailwindcss').Config} */
export default {
	content: ["../templates/**/*.twig", "./components/**/*.js", "./js/**/*.js"],
	theme: {
		fontFamily: {
			lato: ["Lato", "sans-serif"],
			baskerville: ["Libre Baskerville", "serif"],
		},

		colors: {
			transparent: "transparent",
			white: "#ffffff",
			black: "#272529",
			rouge: "#D52819",
			mint: "#55A185",
			greige: "#F7F2EE",
			armerie: "#003D39",
			vert: "#B4CEB4",
		},

		container: {
			center: true,
			padding: {
				DEFAULT: "1.25rem",
				lg: "1.5rem",
			},
		},

		fontSize: {
			xs: "0.75rem",
			sm: "0.875rem",
			base: "1rem",
			md: "1.25rem",
			lg: "1.5rem",
			xl: "1.75rem",
			"2xl": "2rem",
			"3xl": "2.375rem",
			"4xl": "3.375rem",
			"5xl": "4rem",
		},

		extend: {
			aspectRatio: {
				portrait: "17/20",
			},
			spacing: {
				56: "3.5rem",
				80: "5rem",
			},
		},
	},
	plugins: [],
}

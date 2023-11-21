import type { Config } from "tailwindcss"
// const { fontFamily } = require("tailwindcss/defaultTheme")

const config: Config = {
	darkMode: ["class"],
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			// fontFamily: {
			// 	sans: ["var(--font-sans)"],
			// },
		},
	},
	plugins: [require("tailwindcss-animate"), require("flowbite/plugin")],
}
export default config

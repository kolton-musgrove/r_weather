/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.svelte'],
	theme: {
		extend: {
			backgroundImage: {
				overcast: "url('./static/images/overcast.svg')",
				cloudy: "url('./static/images/cloudy.svg')",
				clear: "url('./static/images/clear.svg')"
			}
		}
	},
	plugins: []
};

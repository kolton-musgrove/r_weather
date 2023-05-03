/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.svelte'],
	theme: {
		extend: {
			backgroundImage: {
				overcast: "url('static/images/overcast.svg')"
			}
		}
	},
	plugins: []
};

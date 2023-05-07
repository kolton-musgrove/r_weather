/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.svelte'],
	theme: {
		extend: {
			backgroundImage: {
				Overcast: "url('./static/images/overcast.svg')",
				Cloudy: "url('./static/images/cloudy.svg')",
				'Clear': "url('https://images.unsplash.com/photo-1623846736569-1d90cba76d65?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80')"

			}
		}
	},
	plugins: []
};

/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				text: '#f6f8fd',
				background: '#040916',
				primary: '#0b215c',
				primary_light: '#103089',
				secondary: '#081330',
				secondary_light: '#163383',
				accent: '#daab2b',
				accent_light: '#e8cb7d',
			}
		}
	},

	plugins: []
};

module.exports = config;

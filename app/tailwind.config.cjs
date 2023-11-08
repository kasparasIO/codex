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
				accent: '#daab2b'
			}
		}
	},

	plugins: []
};

module.exports = config;

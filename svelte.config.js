/** @type {import('@sveltejs/kit').Config} */
import adapter from "@sveltejs/adapter-static"
import preprocess from 'svelte-preprocess'
const config = {
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		adapter: adapter(),
		target: '#svelte'
	},
	preprocess: preprocess()
};

export default config;

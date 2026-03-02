// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
	site: 'https://becomingx.tagg.kr',
	output: 'static',
	integrations: [tailwind()],
});

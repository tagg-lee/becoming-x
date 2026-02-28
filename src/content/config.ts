import { defineCollection, z } from 'astro:content';
import { contentLoader } from '../loaders/contentLoader';

const pages = defineCollection({
	loader: contentLoader(),
	schema: z.object({
		id: z.string(),
		slug: z.string(),
		title: z.string(),
		description: z.string(),
		tags: z.array(z.string()),
		uploaded_date: z.string(),
		created_date: z.string(),
		body: z.string(),
		rendered_html: z.string(),
		format: z.enum(['md', 'html']),
	}),
});

export const collections = { pages };

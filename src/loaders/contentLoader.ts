import type { Loader } from 'astro/loaders';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import yaml from 'js-yaml';

const CONTENT_DIR = path.resolve('content');

interface ContentEntry {
	id: string;
	slug: string;
	title: string;
	description: string;
	tags: string[];
	uploaded_date: string;
	created_date: string;
	published_date: string;
	updated_date: string;
	contributor: string;
	body: string;
	rendered_html: string;
	format: 'md' | 'html';
}

function parseHtmlFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
	const match = raw.match(/^<!--\s*\n([\s\S]*?)\n\s*-->/);
	if (!match) {
		return { data: {}, content: raw };
	}
	const yamlStr = match[1];
	const content = raw.slice(match[0].length).trim();
	const data = yaml.load(yamlStr) as Record<string, unknown>;
	return { data: data ?? {}, content };
}

function toDateString(val: unknown): string {
	if (val instanceof Date) return val.toISOString().slice(0, 10);
	if (typeof val === 'string') return val;
	return new Date().toISOString().slice(0, 10);
}

function slugify(filename: string): string {
	return filename.replace(/\.[^.]+$/, '');
}

export function contentLoader(): Loader {
	return {
		name: 'content-loader',
		async load({ store, logger }) {
			store.clear();

			if (!fs.existsSync(CONTENT_DIR)) {
				logger.warn('content/ directory not found');
				return;
			}

			const files = fs.readdirSync(CONTENT_DIR).filter(
				(f) => f.endsWith('.md') || f.endsWith('.html')
			);

			for (const file of files) {
				const filePath = path.join(CONTENT_DIR, file);
				const raw = fs.readFileSync(filePath, 'utf-8');
				const ext = path.extname(file).slice(1) as 'md' | 'html';
				const slug = slugify(file);

				let data: Record<string, unknown>;
				let body: string;
				let rendered_html: string;

				if (ext === 'md') {
					const parsed = matter(raw);
					data = parsed.data;
					body = parsed.content;
					// Astro will render markdown via the content collection entry's render()
					rendered_html = '';
				} else {
					const parsed = parseHtmlFrontmatter(raw);
					data = parsed.data;
					body = parsed.content;
					rendered_html = parsed.content;
				}

				const entry: ContentEntry = {
					id: slug,
					slug,
					title: (data.title as string) ?? file,
					description: (data.description as string) ?? '',
					tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
					uploaded_date: toDateString(data.uploaded_date),
					created_date: toDateString(data.created_date),
					published_date: toDateString(data.published_date),
					updated_date: toDateString(data.updated_date),
					contributor: (data.contributor as string) ?? '',
					body,
					rendered_html,
					format: ext,
				};

				store.set({
					id: entry.id,
					data: entry,
				});
			}

			logger.info(`Loaded ${files.length} content files`);
		},
	};
}

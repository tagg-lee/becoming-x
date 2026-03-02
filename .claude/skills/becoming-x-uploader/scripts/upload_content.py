#!/usr/bin/env python3
"""Upload content files to Becoming X site with automatic frontmatter generation."""

import argparse
import json
import os
import re
import sys
from datetime import date


def normalize_filename(name: str) -> str:
	"""Normalize filename: lowercase, spaces to hyphens, strip special chars."""
	base, ext = os.path.splitext(name)
	base = base.lower()
	base = re.sub(r'\s+', '-', base)
	base = re.sub(r'[^a-z0-9\-]', '', base)
	base = re.sub(r'-+', '-', base).strip('-')
	return f"{base}{ext.lower()}"


def title_from_filename(name: str) -> str:
	"""Generate a title from filename."""
	base = os.path.splitext(name)[0]
	base = re.sub(r'[-_]+', ' ', base)
	return base.title()


def parse_md_frontmatter(content: str) -> tuple[dict, str]:
	"""Parse YAML frontmatter from markdown content."""
	match = re.match(r'^---\s*\n(.*?)\n---\s*\n?(.*)', content, re.DOTALL)
	if not match:
		return {}, content

	yaml_str = match.group(1)
	body = match.group(2)
	data = {}
	for line in yaml_str.split('\n'):
		line = line.strip()
		if not line or line.startswith('#'):
			continue
		if ':' in line:
			key, _, val = line.partition(':')
			key = key.strip()
			val = val.strip()
			if val.startswith('[') and val.endswith(']'):
				items = val[1:-1]
				data[key] = [item.strip().strip("'\"") for item in items.split(',') if item.strip()]
			else:
				data[key] = val.strip("'\"")
	return data, body


def parse_html_frontmatter(content: str) -> tuple[dict, str]:
	"""Parse YAML frontmatter from HTML comment block."""
	match = re.match(r'^<!--\s*\n([\s\S]*?)\n\s*-->', content)
	if not match:
		return {}, content

	yaml_str = match.group(1)
	body = content[match.end():].strip()
	data = {}
	for line in yaml_str.split('\n'):
		line = line.strip()
		if not line or line.startswith('#'):
			continue
		if ':' in line:
			key, _, val = line.partition(':')
			key = key.strip()
			val = val.strip()
			if val.startswith('[') and val.endswith(']'):
				items = val[1:-1]
				data[key] = [item.strip().strip("'\"") for item in items.split(',') if item.strip()]
			else:
				data[key] = val.strip("'\"")
	return data, body


def build_md_frontmatter(data: dict) -> str:
	"""Build YAML frontmatter string for markdown."""
	lines = ['---']
	lines.append(f"title: {data['title']}")
	lines.append(f"description: {data['description']}")
	tags_str = ', '.join(data['tags']) if data['tags'] else ''
	lines.append(f"tags: [{tags_str}]")
	lines.append(f"uploaded_date: {data['uploaded_date']}")
	lines.append(f"created_date: {data['created_date']}")
	lines.append('---')
	return '\n'.join(lines)


def build_html_frontmatter(data: dict) -> str:
	"""Build YAML frontmatter string for HTML (comment block)."""
	lines = ['<!--']
	lines.append(f"title: {data['title']}")
	lines.append(f"description: {data['description']}")
	tags_str = ', '.join(data['tags']) if data['tags'] else ''
	lines.append(f"tags: [{tags_str}]")
	lines.append(f"uploaded_date: {data['uploaded_date']}")
	lines.append(f"created_date: {data['created_date']}")
	lines.append('-->')
	return '\n'.join(lines)


def main():
	parser = argparse.ArgumentParser(description='Upload content to Becoming X site')
	parser.add_argument('source', help='Source file path (.md or .html)')
	parser.add_argument('content_dir', help='Target content/ directory path')
	parser.add_argument('--dry-run', action='store_true', help='Preview only, do not write')
	parser.add_argument('--overwrite', action='store_true', help='Overwrite existing file')
	parser.add_argument('--title', help='Override title')
	parser.add_argument('--description', help='Override description')
	parser.add_argument('--tags', help='Override tags (comma-separated)')
	parser.add_argument('--created-date', help='Override created_date (YYYY-MM-DD)')
	parser.add_argument('--filename', help='Override output filename')
	args = parser.parse_args()

	source = os.path.expanduser(args.source)
	content_dir = os.path.expanduser(args.content_dir)

	if not os.path.isfile(source):
		print(f"Error: Source file not found: {source}", file=sys.stderr)
		sys.exit(1)

	if not os.path.isdir(content_dir):
		print(f"Error: Content directory not found: {content_dir}", file=sys.stderr)
		sys.exit(1)

	ext = os.path.splitext(source)[1].lower()
	if ext not in ('.md', '.html'):
		print(f"Error: Unsupported file type: {ext}. Use .md or .html", file=sys.stderr)
		sys.exit(1)

	with open(source, 'r', encoding='utf-8') as f:
		content = f.read()

	if ext == '.md':
		existing_data, body = parse_md_frontmatter(content)
	else:
		existing_data, body = parse_html_frontmatter(content)

	original_filename = os.path.basename(source)
	output_filename = args.filename if args.filename else normalize_filename(original_filename)

	today = date.today().isoformat()
	data = {
		'title': args.title or existing_data.get('title') or title_from_filename(original_filename),
		'description': args.description or existing_data.get('description', ''),
		'tags': [t.strip() for t in args.tags.split(',')] if args.tags else existing_data.get('tags', []),
		'uploaded_date': today,
		'created_date': args.created_date or existing_data.get('created_date') or today,
	}

	if ext == '.md':
		frontmatter = build_md_frontmatter(data)
		output_content = f"{frontmatter}\n\n{body.lstrip()}"
	else:
		frontmatter = build_html_frontmatter(data)
		output_content = f"{frontmatter}\n{body.lstrip()}"

	output_path = os.path.join(content_dir, output_filename)

	result = {
		'source': source,
		'output_filename': output_filename,
		'output_path': output_path,
		'slug': os.path.splitext(output_filename)[0],
		'metadata': data,
		'dry_run': args.dry_run,
	}

	if args.dry_run:
		print(json.dumps(result, indent=2, ensure_ascii=False))
		sys.exit(0)

	if os.path.exists(output_path) and not args.overwrite:
		result['conflict'] = True
		result['message'] = f"File already exists: {output_path}"
		print(json.dumps(result, indent=2, ensure_ascii=False), file=sys.stderr)
		sys.exit(2)

	with open(output_path, 'w', encoding='utf-8') as f:
		f.write(output_content)

	result['written'] = True
	print(json.dumps(result, indent=2, ensure_ascii=False))
	sys.exit(0)


if __name__ == '__main__':
	main()

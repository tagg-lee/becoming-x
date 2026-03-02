---
name: becoming-x-uploader
description: Upload MD/HTML content files to the Becoming X site with automatic frontmatter generation
triggers:
  - upload
  - add content
  - publish
  - becoming x에 올려줘
  - 업로드
  - 콘텐츠 추가
---

# Becoming X Content Uploader

Upload markdown or HTML files to the Becoming X static site (`content/` folder) with automatic frontmatter generation and validation.

## Project Path

```
/Users/tagg/File Manager for Tagg/01. Project Manager/20_Projects/20_ Projects_Development/Becoming X
```

## Workflow

1. **Identify source file**: Get the file path from the user. If not provided, ask for it.
2. **Dry run**: Execute the upload script with `--dry-run` to preview metadata and filename normalization.
   ```bash
   python3 ~/.claude/skills/becoming-x-uploader/scripts/upload_content.py --dry-run "<source_file>" "<project_content_dir>"
   ```
3. **Show preview**: Display the generated frontmatter and normalized filename to the user. Ask for confirmation or edits.
4. **Execute upload**: Run the script without `--dry-run` to write the file.
   ```bash
   python3 ~/.claude/skills/becoming-x-uploader/scripts/upload_content.py "<source_file>" "<project_content_dir>"
   ```
5. **Handle conflicts**: If exit code is 2, the file already exists. Ask the user whether to overwrite (`--overwrite`) or rename.
6. **Optional preview**: Offer to run `npm run dev` for a local preview.

## Script Location

- Project-local: `.claude/skills/becoming-x-uploader/scripts/upload_content.py`
- Global: `~/.claude/skills/becoming-x-uploader/scripts/upload_content.py`

## Supported Formats

- **Markdown** (`.md`): YAML frontmatter with `---` delimiters
- **HTML** (`.html`): YAML metadata in `<!-- ... -->` comment block at the top

## Frontmatter Fields

| Field | Type | Default |
|-------|------|---------|
| `title` | string | Title-cased filename |
| `description` | string | `""` |
| `tags` | string[] | `[]` |
| `uploaded_date` | string (YYYY-MM-DD) | Today |
| `created_date` | string (YYYY-MM-DD) | Today |

## Reference Files

| File | Purpose |
|------|---------|
| `src/loaders/contentLoader.ts` | Slug/frontmatter format spec |
| `src/content/config.ts` | Required field schema |
| `content/example-post.md` | MD format reference |
| `content/example-page.html` | HTML format reference |

## Important Notes

- **Always show preview before writing**. Never skip the dry-run confirmation step.
- Filename normalization: lowercase, spaces→hyphens, remove special chars (keeps alphanumeric, hyphens, dots).
- The loader's `slugify` just strips the extension, so the filename itself must be URL-safe.
- User may provide frontmatter overrides as arguments or edit them during the preview step.

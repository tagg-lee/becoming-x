# Changelog

## [0.2.0] - 2026-03-02

### Added
- Add Decap CMS at `/admin/` for browser-based content editing
- Add Cloudflare Functions for GitHub OAuth (`/api/auth`, `/api/callback`)
- Add CMS collection config for Markdown content (`content/*.md`)

### Infrastructure
- Configure `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` on Cloudflare Pages

## [0.1.0] - 2026-02-28

### Added
- Configure custom domain `becomingx.tagg.kr` for production site
- Add `site` property to `astro.config.mjs` for canonical URL generation

### Changed
- Update live URL in README from `becoming-x.pages.dev` to `becomingx.tagg.kr`

### Infrastructure
- Add Cloudflare Pages custom domain via API (`becomingx.tagg.kr`)
- Configure Cloudflare DNS CNAME record (`becomingx` → `becoming-x.pages.dev`, proxied)

## [0.0.1] - 2026-02-28

### Added
- Initialize Astro 5 static site with Tailwind CSS
- Content Collection with custom loader for `.md` and `.html` files
- Dashboard with search, tag filtering, and sorting
- Cloudflare Pages deployment via Wrangler

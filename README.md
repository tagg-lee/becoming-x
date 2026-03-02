# Becoming X

Markdown와 HTML 파일을 `content/` 폴더에 넣고 push하면 자동으로 빌드·배포되는 정적 콘텐츠 대시보드.

**Live:** https://becomingx.tagg.kr

## Author

| | |
|---|---|
| **이름** | 이태극 (Taegeuk Lee) |
| **닉네임** | Tagg Lee |
| **이메일** | overmensch280@gmail.com |
| **커맨드스페이스** | [class.cmdspace.kr](https://class.cmdspace.kr/) · [slashpage](https://slashpage.com/cmds-class) |

## Tech Stack

- **Astro 5** — Static site generator
- **Tailwind CSS** — Styling
- **Cloudflare Pages** — Hosting & auto-deploy
- **Cloudflare Functions** — GitHub OAuth for CMS
- **Decap CMS** — Browser-based content editor
- **Vanilla JS** — Client-side filtering/sorting (no framework)

## Project Structure

```
Becoming X/
├── content/                  ← 콘텐츠 파일 (.md, .html)
│   ├── example-post.md
│   └── example-page.html
├── src/
│   ├── content/config.ts     ← Content Collection 스키마
│   ├── loaders/
│   │   └── contentLoader.ts  ← 커스텀 로더 (.md + .html)
│   ├── pages/
│   │   ├── index.astro       ← 대시보드 (필터/소팅/검색)
│   │   └── content/
│   │       └── [slug].astro  ← 개별 콘텐츠 페이지
│   ├── components/
│   │   └── ContentCard.astro
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── ContentLayout.astro
│   ├── lib/
│   │   └── markdown.ts
│   └── styles/global.css
├── functions/
│   └── api/
│       ├── auth.js              ← GitHub OAuth 시작
│       └── callback.js          ← OAuth 토큰 처리
├── public/
│   └── admin/
│       ├── index.html           ← Decap CMS SPA
│       └── config.yml           ← CMS 컬렉션/필드 설정
├── astro.config.mjs
├── tailwind.config.mjs
├── wrangler.jsonc
└── package.json
```

## Quick Start

```sh
npm install
npm run dev          # http://localhost:4321
```

## Adding Content

### Markdown (.md)

표준 YAML frontmatter를 사용한다:

```markdown
---
title: My Post
description: Optional description
tags: [tag1, tag2]
uploaded_date: 2026-02-28
created_date: 2026-01-15
---

Content here...
```

### HTML (.html)

파일 최상단 HTML 주석 안에 YAML을 작성한다:

```html
<!--
title: My Page
description: Optional description
tags: [reference, html]
uploaded_date: 2026-02-28
created_date: 2026-01-15
-->
<h1>Content here</h1>
```

### Metadata Fields

| Field | Type | Required | Default |
|-------|------|----------|---------|
| `title` | string | Yes | filename |
| `description` | string | No | `""` |
| `tags` | string[] | No | `[]` |
| `uploaded_date` | date | No | today |
| `created_date` | date | No | today |

## Dashboard Features

- **Search** — 제목/설명 텍스트 필터
- **Tag Filter** — 태그 칩 클릭으로 토글
- **Sort** — uploaded_date / created_date / title (오름차순/내림차순)

## Commands

| Command | Action |
|---------|--------|
| `npm run dev` | 로컬 개발 서버 (localhost:4321) |
| `npm run build` | 프로덕션 빌드 → `dist/` |
| `npm run preview` | Wrangler로 Cloudflare 환경 로컬 테스트 |

## CMS (Content Editor)

브라우저에서 콘텐츠를 편집/추가할 수 있는 Decap CMS가 `/admin/`에 설치되어 있다.

**접속:** https://becomingx.tagg.kr/admin/

GitHub OAuth로 로그인하면 `content/` 폴더의 Markdown 파일을 WYSIWYG 에디터로 편집할 수 있다. HTML 파일은 CMS에서 관리 불가.

### 환경 변수 (Cloudflare Pages)

| 변수 | 설명 |
|------|------|
| `GITHUB_CLIENT_ID` | GitHub OAuth App Client ID |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth App Client Secret |

### OAuth 인증 흐름

```
[/admin/] → [/api/auth] → [GitHub OAuth] → [/api/callback] → [토큰 반환] → [CMS 사용]
```

## Deploy

### Manual Deploy

```sh
npm run build
npx wrangler pages deploy dist
```

### Auto Deploy (GitHub 연동)

Cloudflare Dashboard → Workers & Pages → becoming-x → Settings → Builds & Deployments → Git 연동:

| Setting | Value |
|---------|-------|
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Environment variable | `NODE_VERSION=20` |

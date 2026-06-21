# Session Recovery — Photography Portfolio Website

## What This Project Is
Personal photography portfolio + blog for Jeffrey Andersen. Static site, no database, no auth, no admin dashboard. Feels like a printed photography book (Leica/Fujifilm/Kinfolk aesthetic).

## Current Phase
**Phase 1 COMPLETE** — Scaffolding done. Ready for Phase 2 (Content Layer).

## Git Checkpoints
- `204f3a2` — Initial commit (scaffold files)
- `d7e2fb0` — Design token alignment (fonts, colors, dark mode removal)

## Folder Structure
```
/app                    ← Next.js App Router pages
/components             ← Shared UI components (Phase 3)
/content/gallery        ← .md gallery data (Phase 2+)
/content/blog           ← .md blog posts (Phase 2+)
/lib                     ← content.ts, types.ts, markdown.ts (Phase 2)
/public/robots.txt
```

## Tech Stack
Next.js 15 (App Router), React 19, TypeScript 5.7 (strict), Tailwind CSS 3.4 + @tailwindcss/typography, Cloudflare Pages (hosting), Cloudflare R2 (images).

## Dependencies Installed (npm)
next, react, react-dom, typescript, tailwindcss, @tailwindcss/typography, gray-matter, remark, remark-html, reading-time. Total: 107 packages.

## Design Decisions (Finalized)
- **Colors:** bg `#FAF9F7`, card `#FFFFFF`, text `#1E1E1E`, muted `#666666`, border `#E7E5E4`, accent `#7A6A58` (sparse)
- **Fonts:** Cormorant Garamond (headings), Montserrat (body). Loaded via next/font. No system fallbacks.
- **No dark mode.** Single light theme only.
- **Layout:** 1200px max content, 750px text width, 8px spacing scale, 12px border radius, 150-250ms transitions
- **Navigation:** Non-sticky. Desktop horizontal, mobile hamburger slide-down

## Content Schemas
**Gallery** (`/content/gallery/*.md`): YAML frontmatter with title, slug, description, date (ISO), featuredImage (R2 URL), photos array (src required; caption/camera/lens/film/exposure optional), tags optional.

**Blog** (`/content/blog/*.md`): YAML frontmatter with title, slug, date (ISO), excerpt, featuredImage (optional R2 URL), tags optional. Reading time computed at build from markdown body via `reading-time`. Not stored in frontmatter.

## Image Handling
Manual upload to Cloudflare R2 → copy URL → paste into markdown frontmatter → commit. Next.js `<Image>` consumes R2 URLs directly via `remotePatterns` in next.config (bucket: `pub-bb6c9d94d00f45b68ba134ebabec27ac.r2.dev`). No resizing, no processing pipeline, no thumbnails generated server-side.

## Explicitly Rejected
No database, no auth, no admin dashboard, no image upload API, no server-side image transformation, no analytics SDKs, no state management libraries, no CI/CD workflow files (unless requested later).

## Remaining Phases (Sequential, Approval-Per-Phase)
2. Content Layer & Data Utilities (read/parse markdown at build time)
3. Shared Components (Navigation, Footer, Hero, GalleryCard, PhotoGrid, Lightbox, BlogCard, MarkdownRenderer, SectionHeading)
4. Home Page
5. Gallery Pages (`/gallery`, `/gallery/[slug]`)
6. Blog Pages (`/blog`, `/blog/[slug]`)
7. About Page
8. SEO & Performance Optimization
9. Deployment Configuration

## Critical Rules from agent-rules.md
- Present every file change line-by-line before editing. Wait for approval. One file at a time.
- Phase boundaries are strict hard stops — never cross them without explicit command.
- No system font fallbacks. Font loading failure = blank until fonts load (acceptable).
- Only write English text visible to the end user in code.

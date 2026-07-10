# Project State — Photography Portfolio Website

## Project Goals

Build a clean, modern photography portfolio website that also functions as a small personal blog. The site should feel professional, thoughtfully designed, warm, and curated — resembling a photography book rather than a social media application. Prioritize photography while allowing occasional blog posts and personal information.

---

## Chosen Technologies

| Technology | Purpose |
|------------|---------|
| Next.js (App Router) | Framework with static site generation |
| TypeScript | Type safety, strict mode enabled |
| Tailwind CSS + `@tailwindcss/typography` | Styling and prose typography |
| Cloudflare Pages | Static hosting and deployments |
| Cloudflare R2 | Image storage |
| GitHub | Source control |
| `gray-matter` | Frontmatter parsing |
| `remark` + `remark-html` | Markdown to HTML conversion |
| `reading-time` | Blog reading time estimates |

---

## Design Principles

- **Visual references:** Leica, Fujifilm, Kinfolk Magazine, printed photography books
- **Color palette:** Background `#FAF9F7`, Cards `#FFFFFF`, Primary text `#1E1E1E`, Secondary text `#666666`, Borders `#E7E5E4`, Accent `#7A6A58` (used sparingly)
- **Typography:** Cormorant Garamond (headings), Montserrat (body)
- **Layout:** Max content width 1200px, text max width 750px, 8px spacing scale, 12px border radius, subtle shadows, 150-250ms transitions
- **Navigation:** Non-sticky. Desktop horizontal nav, mobile hamburger with slide-down
- **Feel:** Warm, intentional, quiet, professional, human, curated, timeless

---

## Folder Structure

```
/app
  /page.tsx
  /gallery/[slug]/page.tsx
  /gallery/page.tsx
  /blog/[slug]/page.tsx
  /blog/page.tsx
  /about/page.tsx
  /sitemap.ts
/components
/content
  /gallery     (.md files)
  /blog        (.md files)
/lib
  content.ts   (read + parse markdown at build time)
  types.ts     (TypeScript interfaces)
  markdown.ts  (markdown to HTML)
/public
  robots.txt
```

---

## Dependencies

| Package | Purpose |
|---------|---------|
| `next` | Framework |
| `react`, `react-dom` | UI library |
| `typescript` | Type safety |
| `tailwindcss` + `@tailwindcss/typography` | Styling |
| `gray-matter` | Frontmatter parsing |
| `remark`, `remark-html` | Markdown to HTML |
| `reading-time` | Reading time estimates |

No state management, no database drivers, no analytics SDKs.

---

## Content Schemas

### Gallery Markdown (`/content/gallery/*.md`)

```yaml
---
title: "Tokyo Streets"
slug: "tokyo-streets"
description: "A walk through neon-lit alleys and quiet temple neighborhoods."
date: "2025-11-14"
featuredImage: "https://r2.example.com/galleries/tokyo/hero.jpg"
photos:
  - src: "https://r2.example.com/galleries/tokyo/001.jpg"
    caption: "Shibuya crossing at dusk"
    camera: "Leica M6"
    lens: "Summicron-M 35mm f/2"
    film: "Kodak Portra 400"
    exposure: "1/125s at f/5.6"
  - src: "https://r2.example.com/galleries/tokyo/002.jpg"
tags:
  - street
  - japan
  - film
---
```

**Gallery frontmatter fields:**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `title` | string | Yes | Gallery display name |
| `slug` | string | Yes | URL-safe identifier |
| `description` | string | Yes | Short description for cards |
| `date` | string | Yes | ISO date `YYYY-MM-DD` |
| `featuredImage` | string | Yes | R2 URL for gallery card/hero |
| `photos` | Photo[] | Yes | At least one photo |
| `tags` | string[] | No | Filtering and related galleries |

**Photo object fields:**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `src` | string | **Yes** | Direct R2 URL (only required field) |
| `caption` | string | No | Displayed in lightbox |
| `camera` | string | No | EXIF-style metadata |
| `lens` | string | No | EXIF-style metadata |
| `film` | string | No | Film stock used |
| `exposure` | string | No | Exposure settings |
| `width` | number | No | Image width |
| `height` | number | No | Image height |
| `notes` | string | No | Additional notes |

### Blog Markdown (`/content/blog/*.md`)

```yaml
---
title: "Why I Shoot Film in 2025"
slug: "why-i-shoot-film-in-2025"
date: "2025-12-01"
excerpt: "An honest look at why film photography still matters to me."
featuredImage: "https://r2.example.com/blog/film-2025/hero.jpg"
tags:
  - film
  - opinion
---

The body of the post is written in Markdown...
```

**Blog frontmatter fields:**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `title` | string | Yes | Post display name |
| `slug` | string | Yes | URL-safe identifier |
| `date` | string | Yes | ISO date `YYYY-MM-DD` |
| `excerpt` | string | Yes | Summary for cards and index |
| `featuredImage` | string | No | R2 URL for blog card image |
| `tags` | string[] | No | Categorization |

Reading time is computed at build time from the markdown body using `reading-time`. Not stored in frontmatter.

---

## Cloudflare R2 Approach

- Images are **manually uploaded** to Cloudflare R2 (CLI, dashboard, or third-party tool).
- Markdown frontmatter stores only the **direct URL** to each image.
- Next.js `<Image>` consumes R2 URLs directly via `remotePatterns` in `next.config`.
- Workflow: upload to R2 → copy URL → add to markdown → commit and push.

---

## Explicitly Rejected Features

- No database
- No authentication
- No admin dashboard
- No image upload API
- No image resizing or processing pipeline (thumbnails, medium, full-res variants)
- No analytics SDKs
- No CI/CD workflow files (unless explicitly requested later)
- No state management libraries
- No server-side image transformation

---

## Current Phase

**Phase 6: Blog Pages — COMPLETE** (uncommitted)

Blog index page and blog post detail pages implemented. All TypeScript verified (`npx tsc --noEmit`) and production build verified (`npm run build`). **Not yet committed or pushed.**

| # | Component / Page | File | Type | Features |
|---|------------------|------|------|----------|
| 1 | Navigation | `components/Navigation.tsx` | Client | Desktop horizontal nav + mobile hamburger slide-down |
| 2 | Footer | `components/Footer.tsx` | Server | Links · divider · copyright · GitHub badge |
| 3 | SectionHeading | `components/SectionHeading.tsx` | Server | Cormorant Garamond heading + muted subtitle |
| 4 | GalleryCard | `components/GalleryCard.tsx` | Server | Image zoom hover, meta line (date · film) |
| 5 | BlogCard | `components/BlogCard.tsx` | Client | Horizontal layout with image/text-only variants |
| 6 | PhotoGrid | `components/PhotoGrid.tsx` | Server | Responsive grid, lazy loading, caption toggle |
| 7 | Lightbox | `components/Lightbox.tsx` | Client | Keyboard + swipe nav, film metadata, empty guard |
| 8 | MarkdownRenderer | `components/MarkdownRenderer.tsx` | Server | remark pipeline + prose typography |

---

## Remaining Phases

| Phase | Name | Status |
|-------|------|--------|
| 1 | Project Scaffolding and Foundation | COMPLETE |
| 2 | Content Layer and Data Utilities | COMPLETE |
| 3 | Shared Components | COMPLETE (`d85cf1f`) |
| 4 | Home Page | Not started |
| 5 | Gallery Pages | **COMPLETE** (uncommitted) |
| 6 | Blog Pages | **COMPLETE** (uncommitted) |
| 7 | About Page | Not started |
| 8 | SEO and Performance Optimization | Not started |
| 9 | Deployment Configuration | Not started |

Execution order: 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9. Each phase stops pending approval.

Project is ready to begin Phase 7 — About Page.

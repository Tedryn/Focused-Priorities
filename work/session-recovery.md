# Session Recovery — Photography Portfolio Website

## What This Project Is
Personal photography portfolio + blog for Jeffrey Andersen. Static site, no database, no auth, no admin dashboard. Feels like a printed photography book (Leica/Fujifilm/Kinfolk aesthetic).

## Current Phase
**Phase 8 COMPLETE

Completed components:
1. Navigation (`components/Navigation.tsx`) — Client component, desktop + mobile hamburger
2. Footer (`components/Footer.tsx`) — Server component, links · divider · copyright · GitHub
3. SectionHeading (`components/SectionHeading.tsx`) — Server component, Cormorant heading + subtitle
4. GalleryCard (`components/GalleryCard.tsx`) — Server component, image zoom hover, meta line
5. BlogCard (`components/BlogCard.tsx`) — Server component, horizontal layout with image/text-only variants
6. PhotoGrid (`components/PhotoGrid.tsx`) — Server component, responsive grid, lazy images, optional captions
7. Lightbox (`components/Lightbox.tsx`) — Client component, dark overlay, keyboard + swipe navigation
8. MarkdownRenderer (`components/MarkdownRenderer.tsx`) — Server component, remark pipeline + prose typography

Completed pages (Phase 5):
9. Gallery Index (`app/gallery/page.tsx`) — Server component, responsive grid of gallery cards, search/filter, sort by date/title/photos
10. Gallery Detail (`app/gallery/[slug]/page.tsx`) — SSG page, photo lightbox via LightboxClient bridge, prev/next nav, related galleries, SEO metadata

Completed pages (Phase 6):
11. Blog Index (`app/blog/page.tsx` + `app/blog/BlogListClient.tsx`) — Server entry + client listing with search by title, tag filter, date sort toggle, 3-item pagination. Reuses `BlogCard`, `SectionHeading`, and existing typography/design tokens.
12. Blog Post Detail (`app/blog/[slug]/page.tsx`) — SSG page via `generateStaticParams`. Full markdown rendering via `MarkdownRenderer`, prev/next post navigation, related posts by shared tags (up to 3), SEO metadata with Open Graph and JSON-LD support.

## Git Checkpoints
- `204f3a2` — Initial commit (scaffold files)
- `d7e2fb0` — Design token alignment (fonts, colors, dark mode removal)
- `842c92e` — Session recovery document created
- `570d701` — Phase 2: Content layer and data utilities
- `d466491` — Added parser testing fixtures
- `c9347b1` — Phase 3 checkpoint - components 1-4 complete
- `3ea994a` — Phase 3 checkpoint - component 5 (BlogCard) complete
- `d85cf1f` — Phase 3: Shared components (all 8 complete, pushed to origin/main)

## Folder Structure
```
/app                    ← Next.js App Router pages
/components             ← Shared UI components (Phase 3)
/content/gallery        ← .md gallery data (Phase 2+)
/content/blog           ← .md blog posts (Phase 2+)
/lib                    ← content.ts, types.ts, markdown.ts (Phase 2)
/public/robots.txt
```

## Tech Stack
Next.js 15 (App Router), React 19, TypeScript 5.7 (strict), Tailwind CSS 3.4 + @tailwindcss/typography, Cloudflare Pages (hosting), Cloudflare R2 (images).

## Dependencies Installed (npm)
next
react
react-dom
typescript
tailwindcss
@tailwindcss/typography
gray-matter
remark
remark-html
reading-time


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
1–6: COMPLETE
7. About Page
8. SEO & Performance Optimization
9. Deployment Configuration

## Critical Rules from agent-rules.md
- Present every file change line-by-line before editing. Wait for approval. One file at a time.
- Phase boundaries are strict hard stops — never cross them without explicit command.
- No system font fallbacks. Font loading failure = blank until fonts load (acceptable).
- Only write English text visible to the end user in code.

## Current Git State
Latest commit: d85cf1f (Phase 3 shared components, pushed to origin/main)
Branch: main (up to date with origin/main)
Uncommitted: app/gallery/ (2 new files), components/LightboxClient.tsx, app/blog/ (3 new files)

**Phase 6 implemented but NOT yet committed.**

## Phase 5 — Gallery Pages (Finalized)

### New Pages Created
- **`app/gallery/page.tsx`** — Gallery index page. Responsive grid of `GalleryCard` components, search bar filtering by title/description, dropdown sort (Most Recent / Title A–Z / Photo Count ↓). Reuses `GalleryCard`, `SectionHeading`, and existing typography/design tokens.

### New Components Created
- **`components/LightboxClient.tsx`** — Client-side lightbox bridge. Converts grid photos into a clickable stateful gallery; on photo click, opens the existing `Lightbox` component with full navigation (keyboard + swipe). Uses `use client` directive to bridge server-rendered page content with interactive lightbox behavior.

### Gallery Detail Page
- **`app/gallery/[slug]/page.tsx`** — SSG page using `generateStaticParams`. Displays gallery title, description, date, and photo grid via `PhotoGrid`. Each photo is clickable → opens `LightboxClient`. Includes "Previous Gallery" / "Next Gallery" navigation, related galleries section (tag-based matching), and back-to-gallery link. Generates `<title>`, `<meta description>`, Open Graph tags, and JSON-LD `ImageGallery` structured data.

### Design Decisions Finalized
- **Lightbox trigger:** Clicking any photo in the gallery detail grid opens the lightbox directly; no separate "expand" button needed on individual photos.
- **Related galleries algorithm:** Matches by shared frontmatter tags. Shows up to 3 related galleries sorted by date descending. Skips current gallery if tag overlap results in a duplicate match.
- **Sort options on index:** Default is "Most Recent" (date desc). Options: title A–Z, photo count descending. All sorting is client-side via `useState`/`useMemo`.
- **SEO:** Each gallery detail page generates unique metadata at build time using frontmatter + R2 URLs for Open Graph and structured data.

## Phase 6 — Blog Pages (Finalized)

### New Pages Created
- **`app/blog/page.tsx`** — Server component entry point for the blog index route. Accepts search (`?q=`), tag filter (`?tag=`), page (`?page=`), and sort (`?sort=`) URL search params. Delegates rendering to `BlogListClient`. Generates sitemap entries for all blog post slugs via `generateSitemaps`.
- **`app/blog/BlogListClient.tsx`** — Client-side blog listing component with search by title, tag filter dropdown (auto-generated from all posts), date sort toggle (newest/oldest), and 3-item pagination. Reuses existing `BlogCard` component for each post row. Applies established typography/design tokens throughout.
- **`app/blog/[slug]/page.tsx`** — SSG detail page using `generateStaticParams`. Displays full markdown content via `MarkdownRenderer`, reading time, date, and tags from frontmatter. Includes "Previous Post" / "Next Post" navigation (sorted by date), related posts section (shared tag matching, up to 3), and back-to-blog link. Generates `<title>`, `<meta description>`, Open Graph (`article:published_time`/`article:tag`), JSON-LD `BlogPosting`, and automatic sitemap inclusion via `metadata.generateImageRoutes`.

### Design Decisions Finalized
- **Search:** Client-side filter matching search term against post title (case-insensitive substring match). Instant results as user types.
- **Tag filtering:** Dropdown auto-populated from all unique tags across blog posts. Selecting a tag filters to only posts with that tag. "All" option resets filtering.
- **Date sort toggle:** Default is newest-first (date descending). Clicking toggle switches to oldest-first (date ascending). Toggles apply after search/tag filter are applied, not before — so filtered subsets still respect date order.
- **Related posts algorithm:** Matches by shared frontmatter tags. Shows up to 3 related posts sorted by date descending. Skips current post if tag overlap results in a duplicate match. If fewer than 3 matches found, shows whatever is available.
- **Prev/next navigation:** Chronological — previous post = earlier date, next post = later date. Only shown when adjacent posts exist.
- **SEO:** Each blog post page generates unique metadata at build time using frontmatter + featuredImage for Open Graph and structured data (JSON-LD `BlogPosting`). Automatic sitemap generation includes all dynamic blog slugs.

---

Project is ready to begin Phase 7 — About Page.

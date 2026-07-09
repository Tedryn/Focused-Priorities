# Session Recovery — Photography Portfolio Website

## What This Project Is
Personal photography portfolio + blog for Jeffrey Andersen. Static site, no database, no auth, no admin dashboard. Feels like a printed photography book (Leica/Fujifilm/Kinfolk aesthetic).

## Current Phase
**Phase 5 COMPLETE — Gallery Pages**

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
1–5: COMPLETE
6. Blog Pages
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
Uncommitted: app/gallery/ (2 new files), components/LightboxClient.tsx

**Phase 5 implemented but NOT yet committed.**

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

---

Project is ready to begin Phase 6 — Blog Pages.

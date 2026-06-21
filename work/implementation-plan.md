# Implementation Plan — Photography Portfolio Website

## Overview

Build a Next.js + TypeScript photography portfolio with Git-based content management, deployed to Cloudflare Pages with R2 image storage. All content via Markdown files. No database, no auth, no admin dashboard.
---

Phase 0: Architecture Review

### Tasks

- [ ]Present proposed folder structure
- [ ]Present dependency list
- [ ]Present component tree
- [ ]Present content schemas
- [ ]Present routing structure
- [ ]Present R2 integration approach
- [ ]Wait for approval

---

## Phase 1: Project Scaffolding and Foundation

**Goal:** Initialize the Next.js project with proper configuration.

### Tasks

- [ ] Create Next.js project with TypeScript and App Router
- [ ] Install Tailwind CSS and configure it
- [ ] Configure `tailwind.config` with design token colors:
  - Background: `#FAF9F7`
  - Cards: `#FFFFFF`
  - Primary text: `#1E1E1E`
  - Secondary text: `#666666`
  - Borders: `#E7E5E4`
  - Accent: `#7A6A58`
- [ ] Configure Google Fonts (Playfair Display for headings, Inter for body)
- [ ] Set up Tailwind typography plugin (`@tailwindcss/typography`)
- [ ] Create global layout with `<html lang="en">`, metadata defaults, and Font injection
- [ ] Configure `next.config` for image domains (Cloudflare R2)
- [ ] Create `.gitignore` appropriate for the project
- [ ] Initialize Git repository

### Files Created/Modified

- `package.json`
- `next.config.ts`
- `tailwind.config.ts`
- `tsconfig.json`
- `postcss.config.mjs`
- `globals.css`
- `app/layout.tsx`
- `.gitignore`

---

## Phase 2: Content Layer and Data Utilities

**Goal:** Build the Markdown-based content reading system.

### Tasks

- [ ] Create directories and provide example frontmatter templates only. Do not create placeholder content or lorem ipsum posts.
- [ ] Create `lib/content.ts`:
  - Read markdown files from disk at build time (`fs.readdir`, `fs.readFileSync`)
  - Parse frontmatter (use `gray-matter`)
  - Return typed data arrays for galleries and blog posts
  - Support sorting by date descending
- [ ] Create `lib/types.ts`:
  - Define TypeScript interfaces: `Gallery`, `BlogPost`, `Photo`
- [ ] Create `lib/markdown.ts`:
  - Convert markdown to HTML (use `remark` + `remark-html`)

### Dependencies Added

- `gray-matter` — frontmatter parsing
- `remark` + `remark-html` — Markdown to HTML conversion

### Files Created

- `/content/gallery/` (sample `.md` files)
- `/content/blog/` (sample `.md` files)
- `lib/content.ts`
- `lib/types.ts`
- `lib/markdown.ts`

---

## Phase 3: Shared Components

**Goal:** Build all reusable UI components per design specification.

### Tasks

- [ ] Create `components/Navigation.tsx`:
  - Desktop: Logo | Home | Gallery | Blog | About (horizontal)
  - Mobile: Hamburger menu with slide-down panel
  - No sticky behavior
- [ ] Create `components/Footer.tsx`:
  - Site name, short tagline, navigation links, GitHub link, copyright
  - Small and understated per design
- [ ] Create `components/SectionHeading.tsx`:
  - Playfair Display heading with consistent styling
- [ ] Create `components/GalleryCard.tsx`:
  - Card: large image, title, description, photo count
  - Hover: slight image zoom + card lift (2-4px)
  - Responsive grid: 3 col desktop / 2 col tablet / 1 col mobile
- [ ] Create `components/BlogCard.tsx`:
  - Featured image, date, title, excerpt, "Read More →"
  - Subtle fade and lift animation on hover
- [ ] Create `components/PhotoGrid.tsx`:
  - Responsive justified grid with consistent row heights. Optional masonry layout may be explored later.
  - 16px gap between images
  - Rounded corners (12px)
  - Lazy loading via Next.js `<Image>` with `loading="lazy"`
- [ ] Create `components/Lightbox.tsx`:
  - Dark overlay
  - Keyboard navigation (arrow keys, Escape)
  - Previous/Next controls
  - Image caption display
  - Mobile swipe support
- [ ] Create `components/MarkdownRenderer.tsx`:
  - Render HTML string safely
  - Apply Prose typography classes

### Files Created

- `components/Navigation.tsx`
- `components/Footer.tsx`
- `components/SectionHeading.tsx`
- `components/GalleryCard.tsx`
- `components/BlogCard.tsx`
- `components/PhotoGrid.tsx`
- `components/Lightbox.tsx`
- `components/MarkdownRenderer.tsx`

---

## Phase 4: Home Page

**Goal:** Implement the home page with hero, featured galleries, latest blog posts.

### Tasks

- [ ] Create `app/page.tsx`:
  - Hero section: large image, site title, short intro, CTA buttons (View Gallery, Read Blog)
  - Featured Galleries section: display 3-6 galleries using GalleryCard
  - Latest Writing section: display 3 most recent blog posts using BlogCard
  - Footer
- [ ] Generate static metadata (title, description, OpenGraph tags)

### Files Created/Modified

- `app/page.tsx`
- `app/opengraph-image.png` or dynamic OG generation (if needed)

---

## Phase 5: Gallery Pages

**Goal:** Implement gallery index and individual gallery pages.

### Tasks

- [ ] Create `app/gallery/page.tsx`:
  - Responsive card grid of all galleries using GalleryCard
  - Generate static metadata
- [ ] Create `app/gallery/[slug]/page.tsx`:
  - Use dynamic routes with `generateStaticParams` for SSG
  - Display gallery title, description, date, tags
  - Render PhotoGrid with lazy-loaded images
  - Lightbox integration
  - Related galleries section at bottom
  - Previous/Next gallery navigation
- [ ] type Photo = {
  src: string;
  thumbnail?: string;
  width?: number;
  height?: number;
  caption?: string;
  camera?: string;
  lens?: string;
  film?: string;
  exposure?: string;
  notes?: string;
};

### Files Created

- `app/gallery/page.tsx`
- `app/gallery/[slug]/page.tsx`
- `app/gallery/[slug]/layout.tsx` (if needed)

---

## Phase 6: Blog Pages

**Goal:** Implement blog index and individual blog post pages.

### Tasks

- [ ] Create `app/blog/page.tsx`:
  - List of all blog posts using BlogCard
  - Featured image, date, reading time estimate, excerpt
  - Generate static metadata
- [ ] Create `app/blog/[slug]/page.tsx`:
  - Dynamic routes with `generateStaticParams` for SSG
  - Render markdown content via MarkdownRenderer
  - Display title, publication date, tags
  - Previous/Next post navigation
  - Reading time calculation
  - Responsive typography (max-width 750px)

### Files Created

- `app/blog/page.tsx`
- `app/blog/[slug]/page.tsx`

---

## Phase 7: About Page

**Goal:** Implement the static about page.

### Tasks

- [ ] Create `app/about/page.tsx`:
  - Portrait image at top
  - Biography section
  - Photography journey section
  - Favorite cameras and equipment section
  - Contact information
  - Social profile links
  - Two-column layout on desktop, single column on mobile
  - Generate static metadata

### Files Created

- `app/about/page.tsx`

---

## Phase 8: SEO and Performance Optimization

**Goal:** Meet Lighthouse target above 90 with proper SEO setup.

### Tasks

- [ ] Create `app/sitemap.ts`:
  - Dynamic sitemap generation from all routes (galleries, blog posts, static pages)
- [ ] Create `public/robots.txt`:
  - Allow crawling, reference sitemap
- [ ] Add metadata to each page route:
  - Page title, description
  - OpenGraph tags (title, description, image, type)
  - Canonical URLs
- [ ] Ensure all `<Image>` components use proper `srcset` and `sizes` attributes
- [ ] Configure responsive image sizes for thumbnails, medium, full resolution, Assume image variants are generated manually or via external tooling.
Do not implement an image processing pipeline.
- [ ] Verify lazy loading is applied to below-the-fold images
- [ ] Add semantic HTML structure (`<main>`, `<article>`, `<nav>`, `<header>`, `<footer>`)
- [ ] Run Lighthouse audit and address any issues

### Files Created/Modified

- `app/sitemap.ts`
- `public/robots.txt`
- Metadata updates to all page files

---

## Phase 9: Deployment Configuration

**Goal:** Configure the project for Cloudflare Pages deployment.

### Tasks

- [ ] Create `wrangler.toml` or Cloudflare Pages deployment configuration
- [ ] Document Cloudflare Pages GitHub integration. Do not create CI/CD workflows unless specifically requested.
  - Build on push to main branch
  - Deploy to Cloudflare Pages
- [ ] Document image upload workflow in README:
  - Upload photos to R2 bucket
  - Copy image URL
  - Add metadata to markdown file
  - Commit and push

### Files Created

- `wrangler.toml` (or equivalent)
- `.github/workflows/deploy.yml`
- `README.md`

---

## Dependency Summary

| Package | Purpose |
|---------|---------|
| `next` | Framework |
| `react`, `react-dom` | UI library |
| `typescript` | Type safety |
| `tailwindcss` + `@tailwindcss/typography` | Styling |
| `gray-matter` | Frontmatter parsing |
| `remark`, `remark-html` | Markdown to HTML |
| `next/font` (built-in) | Google Fonts optimization |

No additional state management, no database drivers, no analytics SDKs.

---

## Execution Order

Phases will be executed in order: **1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9**

After each phase completes, execution stops pending approval before proceeding to the next phase.

---

## Notes and Constraints

- TypeScript strict mode enabled throughout
- Server components preferred; client components only where interactivity required (Lightbox, Navigation mobile toggle)
- No authentication, no database, no admin dashboard
- All content managed via Markdown + Git workflow
- Images stored in Cloudflare R2, referenced by URL in frontmatter
- Target Lighthouse score: 90+
- Design feels: warm, intentional, quiet, professional, human, curated, timeless
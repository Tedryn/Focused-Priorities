# Photography Portfolio Website Requirements

## Project Goal

Build a clean, modern photography portfolio website that also functions as a small personal blog. The website should feel professional and thoughtfully designed without appearing overly minimalistic or corporate.

The website should prioritize photography while still allowing occasional blog posts and personal information.

---

# Technical Requirements

## Framework

* Next.js (latest stable version)
* TypeScript
* App Router
* Tailwind CSS
* Static site generation where practical
* Responsive design

## Hosting

* Cloudflare Pages
* Cloudflare R2 for image storage
* GitHub repository for source control and deployments

---

# Content Management

No database.

All content should be managed through Git.

Content should be stored in markdown files.

Suggested structure:

/content
/blog
gallery

/public
/images
/avatars

Each gallery and blog post should be represented by markdown files with frontmatter metadata.

Example metadata:

title:
slug:
date:
coverImage:
description:
tags:

---

# Pages

## Home Page

Purpose:
Introduce the photographer and highlight featured work.

Sections:

1. Hero section

   * Site title
   * Short introduction
   * Optional portrait image
   * Call-to-action buttons:

     * View Gallery
     * Read Blog

2. Featured Galleries

   * Display 3-6 featured galleries
   * Gallery thumbnail
   * Gallery title
   * Short description

3. Latest Blog Posts

   * Display 3 recent posts

4. Footer

   * Copyright
   * GitHub link
   * Optional social links

---

## Gallery Index Page

Purpose:
Browse photography collections.

Requirements:

* Responsive card grid
* Gallery cover image
* Title
* Short description
* Photo count
* Date

Cards should have:

* Subtle hover animation
* Slight image zoom
* Soft shadow transitions

---

## Individual Gallery Page

Purpose:
Display photos belonging to one collection.

Requirements:

* Gallery title
* Description
* Date
* Tags

Photo grid:

* Masonry style or balanced responsive grid
* Lazy loaded images
* Lightbox viewer
* Keyboard navigation
* Mobile swipe support if practical

Each photo should support:

* Caption
* Optional EXIF information
* Optional notes

Bottom section:

* Related galleries
* Previous gallery
* Next gallery

---

## Blog Index Page

Requirements:

* List of blog posts
* Featured image
* Date
* Reading time estimate
* Short excerpt

---

## Individual Blog Post Page

Requirements:

* Markdown rendering
* Syntax highlighting for code blocks
* Responsive typography
* Previous and next post navigation
* Tags

---

## About Page

Purpose:
Introduce the photographer.

Sections:

* Portrait image
* Biography
* Photography journey
* Favorite cameras and film stocks
* Contact information
* Links to social profiles

Optional:

* Equipment section
* Frequently asked questions

---

# Administration Requirements

No admin dashboard.

Updating the site should be performed through:

1. Create markdown files
2. Commit changes to Git
3. Push to GitHub
4. Automatic deployment to Cloudflare Pages

Image workflow:

1. Upload photos to Cloudflare R2
2. Copy image URL
3. Add image metadata to markdown files
4. Commit and push changes

---

# Performance Requirements

* Lighthouse score target above 90
* Minimal JavaScript where possible
* Responsive images
* Lazy loading
* Good Core Web Vitals
* Accessibility best practices
* Semantic HTML

---

# SEO Requirements

* Metadata for all pages
* OpenGraph tags
* Sitemap generation
* robots.txt
* Canonical URLs

---

# Non-Functional Requirements

The website should feel:

* Clean
* Modern
* Calm
* Photography focused
* Slightly editorial
* Personal rather than corporate
* Simple to maintain
* Fast and lightweight

Avoid:

* Heavy animations
* Excessive gradients
* Glassmorphism
* Social media style feeds
* Dashboard-style interfaces

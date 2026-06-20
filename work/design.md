# Photography Portfolio Website Design Specification

## Design Philosophy

The website should feel like a modern photography journal.

Visual references:

* Leica
* Fujifilm
* Kinfolk Magazine
* Exposure photography portfolios
* Printed photography books

The design should communicate craftsmanship and intentionality.

Avoid:

* Startup aesthetics
* Excessive minimalism
* Large empty areas
* Dark cyber themes
* Generic templates

---

# Visual Style

## Color Palette

Background:
#FAF9F7

Cards:
#FFFFFF

Primary text:
#1E1E1E

Secondary text:
#666666

Borders:
#E7E5E4

Accent:
#7A6A58

The accent color should be used sparingly.

---

# Typography

Headings:
Cormorant Garamond

Body:
Montserrat

Characteristics:

* Large readable headings
* Comfortable line length
* Generous spacing
* Editorial feel

---

# Layout Principles

Maximum content width:
1200px

Content width for text:
750px

Spacing system:
8px base scale

Corners:
12px radius

Shadows:
Very subtle

Animations:
150-250ms transitions

---

# Navigation

## Desktop:

## Logo | Home | Gallery | Blog | About

Sticky navigation:
No

Navigation should remain simple and unobtrusive.

Mobile:
Hamburger menu with slide-down navigation.

---

# Home Page

---

Hero Image
Title
Short Introduction
Buttons
-------

## Featured Galleries

## Card Grid

## Latest Writing

## Post Cards

## Footer

Hero section:

* Large but not full-screen
* Portrait or featured image
* Centered copy
* Plenty of breathing room

---

# Gallery Cards

Card structure:

---

Large Image
Title
Description
Photo Count
-----------

Behavior:

* Slight image zoom on hover
* Card lift of 2-4px
* Smooth transitions

Grid:
Desktop: 3 columns
Tablet: 2 columns
Mobile: 1 column

---

# Gallery Page

Top:
Gallery title
Description
Metadata

Photos:
Balanced masonry layout

Spacing:
16px between images

Images:

* Rounded corners
* No heavy borders
* Soft shadow only on hover

Lightbox:

* Dark overlay
* Keyboard support
* Image caption
* Next and previous controls

---

# Blog Cards

---

Featured Image
Date
Title
Excerpt
Read More →
-----------

Animations:
Very subtle fade and lift.

---

# Blog Post Layout

Centered article.

Max width:
750px

Features:

* Large title
* Publication date
* Optional hero image
* Comfortable reading experience
* Typography optimized for long-form writing

---

# About Page

Top:
Portrait photo
Introduction

Sections:
Biography
Photography Journey
Equipment
Contact Information

Layout:
Single-column on mobile.
Two-column on desktop.

---

# Footer

---

Site Name
Short Tagline
Navigation Links
GitHub Link
Copyright
---------

Small and understated.

---

# Component Architecture

Components:
/components
Navigation.tsx
Footer.tsx
Hero.tsx
GalleryCard.tsx
PhotoGrid.tsx
Lightbox.tsx
BlogCard.tsx
MarkdownRenderer.tsx
SectionHeading.tsx

---

# Folder Structure

/app
/page.tsx
/gallery
/[slug]
/blog
/[slug]
/about

/components
/content
/gallery
/blog
/lib
/styles

---

# Image Handling

Store original images in Cloudflare R2.

Generate:

* Thumbnail
* Medium
* Full resolution

Use responsive srcset images.

Enable lazy loading.

Do not load full-resolution images until requested.

---

# Desired Emotional Feel

The user should feel:

"I am visiting the personal website of a photographer who cares deeply about the craft."

The website should feel:

* Warm
* Intentional
* Quiet
* Professional
* Human
* Curated
* Timeless

The website should resemble a beautifully designed photography book more than a social media application.

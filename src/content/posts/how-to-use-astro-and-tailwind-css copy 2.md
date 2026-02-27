---
layout: "../layouts/PostLayout.astro"
title: How to use Astro and Tailwind CSS
description: Since it's the first post on my site, let me introduce how I build this site.
released: 2026-02-27
abstract: "Astro is a modern web framework designed for speed, paired with Tailwind CSS to create a highly customizable and performant developer experience. This post documents the philosophy and tools behind the creation of this digital space."
---

## Why Astro?

Building a site shouldn't be about sending megabytes of JavaScript to the client. Astro's **Island Architecture** allows me to keep the site fast by default, while only hydrating interactive components when necessary. For a content-driven site like this one, it's the perfect choice.

### Key Features of this Build:

* **Content Collections:** Managing posts with type-safety (well, mostly!) and structured data.
* **Tailwind CSS:** Utility-first styling that keeps the design system consistent and the bundle size small.
* **Minimalism:** No unnecessary bloat, just typography and white space.

## The Tech Stack

I wanted something that felt invisible during the writing process but powerful during the building process. Here is the breakdown:

1.  **Framework:** Astro 5.0
2.  **Styling:** Tailwind CSS with `@tailwindcss/typography`
3.  **Deployment:** Vercel / Netlify
4.  **Content:** Markdown & MDX

## Code Example

To get started with Tailwind in an Astro project, it's as simple as:

```bash
npx astro add tailwind
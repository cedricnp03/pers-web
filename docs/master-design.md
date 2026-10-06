# Cedric's Personal Website — Master Design File

> **Status:** Living Document / Work in Progress  
> **Author:** Cedric Purwanto  
> **Last Updated:** October 2026  

---

## 1. Core Purpose & Manifesto

* **Built for Myself, Not for Recruiters**: This is not a polished corporate resume or a cookie-cutter portfolio. It is a **personal sandbox, digital garden, and brain dump**.
* **Zero Performance Pressure**: A low-friction space to publish thoughts, musical musings, cooking experiments, code snippets, or raw shower thoughts without asking for permission.
* **Authenticity First**: Chemistry graduate entering software engineering, cellist/guitarist, noodle lover. The site should feel like hanging out in a personal studio or quiet room, not sitting in a job interview.

---

## 2. Visual & Design Principles

### Principle 1: Black & White First (Rule 2)
* **The Constraint**: Design purely in grayscale before touching color.
* **Why**: Removing color forces us to master the fundamentals:
  * **Typography scale & weight**: Clear hierarchy between page title, section headers, body copy, and metadata.
  * **Whitespace & padding**: Giving content generous breathing room so it feels uncluttered and calm.
  * **Contrast & values**: Relying on neutral values (`zinc-950`, `zinc-600`, `zinc-400`, `zinc-100`, `white`) for depth.
* **The Single Accent Color (Warm Amber // Rosin & Chiyu Gold)**:
  * Evokes the amber varnish of cello wood, bow rosin, and the golden chicken oil (*chiyu*) atop Iekei ramen.
  * Restricted strictly to micro-interactions:
    * `::selection`: Warm honey text selection highlight (`bg-amber-100 text-amber-900`).
    * Active filter pill on `/blog`: `bg-amber-800 text-white`.
    * Link hovers & underlines: `hover:text-amber-800 hover:decoration-amber-600`.
    * Blockquote accent borders: `border-amber-400`.

### Principle 2: Clean, Quiet & Cozy (Modern 2028)
* **Uncluttered & Literary**: Feels like opening a well-typeset book, field journal, or quiet text editor.
* **Warmth over Cold Tech**: Generous margins, readable line heights (`leading-relaxed`), and subtle textures rather than harsh dashboard boxes.
* **Mobile & Desktop Parity**: Built mobile-first so reading on a phone feels just as natural as browsing on a desktop.

---

## 3. Content Pillars

The site reflects Cedric's authentic interests, research, and life in Tokyo:

### ✍️ 1. Writing & Essays (The Blog)
* Longer-form writing, reflections on starting life as a software engineer, living in Tokyo, and personal essays.
* A distraction-free, beautifully typeset reading experience following the Black & White First principle.
* Tags: `#essays`, `#software`, `#tokyo`, `#life`.

### 🧪 2. Computational Chemistry Research
* Academic background: Undergrad and Master's in **Computational Chemistry**.
* **DFT (Density Functional Theory)**:
  * Research on the polymerization of undecenol, with a primary focus on carbon catalyst design.
* **MD (Molecular Dynamics) Simulations**:
  * Work on PEMFC (Proton-Exchange Membrane Fuel Cells) and LiTFSI (battery electrolyte salt).
  * *Note on confidentiality*: High-level methodologies, conceptual takeaways, and computational science learnings (avoiding proprietary/confidential data).
* Bridging the gap: How computational chemistry simulations (Python, bash, HPC clusters, molecular models) paved the way to software engineering.
* Tags: `#computational-chem`, `#dft`, `#md-simulation`, `#catalysis`.

### 🍜 3. Tokyo Noodle Log (Jirokei, Iekei & Seabura)
* Based in Tokyo, Japan. Zero chemical pretension — pure, genuine love for heavy, rich, fatty noodles.
* **Styles of Choice**:
  * **Jirokei (二郎系)**: Massive noodles, garlic, cabbage/sprouts, pork chunks.
  * **Iekei (家系)**: Rich pork-bone soy broth, thick straight noodles, chicken oil, nori + rice pairing.
  * **Seabura (背脂)**: Heavy pork back fat bowls.
* Personal bowl reviews, spot recommendations in Tokyo, and honest noodle logs.
* Tags: `#ramen`, `#tokyo-eats`, `#jirokei`, `#iekei`, `#seabura`.

### 🎻 4. Music (Cello & Guitar)
* Playing cello and guitar; acoustic overtones, favorite chord progressions, classical pieces (Bach), and casual audio recordings.
* Tags: `#cello`, `#guitar`, `#music`.

---

## 4. Site Architecture

```
content/
└── posts/                     # Markdown source files for all writing
    ├── 2026-10-06-tokyo-software-engineer.md
    ├── 2026-09-20-carbon-catalyst-dft.md
    ├── 2026-08-15-holy-trinity-tokyo-ramen.md
    └── 2026-07-28-cello-overtones.md

lib/
└── posts.ts                   # Node fs utility to parse dates from filenames & sort posts

app/
├── layout.tsx                 # Root layout with Geist font & base metadata
├── globals.css                # Base stylesheet (locked to light theme)
├── page.tsx                   # Homepage (reads latest posts dynamically)
└── blog/
    ├── page.tsx               # Full archive of all writing
    └── [slug]/
        └── page.tsx           # Dynamic SSG reading page for each post
```

---

## 5. The Writing & Publishing System

Writing is designed to be frictionless, fast, and completely free of third-party CMS or database dependencies.

### How to Publish a Post
1. Create a `.md` file inside `content/posts/` using the standard `YYYY-MM-DD-title.md` format:
   ```text
   content/posts/2026-10-15-my-post-name.md
   ```
2. Add the optional frontmatter header at the top (the date is automatically parsed from the filename, but you can also override it):

```markdown
---
title: My Post Title
tag: Life
description: A short one-sentence summary for the post preview.
---

Post content goes here. You can write paragraphs, lists, and thoughts freely.
```

### Automatic System Behaviors
* **Automatic Date Extraction**: The `YYYY-MM-DD` prefix in the filename is automatically parsed as the post date.
* **Clean URL Slugs**: The date prefix is automatically stripped from the URL route (e.g. `2026-10-15-my-post-name.md` serves at `/blog/my-post-name`).
* **Static Generation (SSG)**: Next.js pre-renders each post to static HTML at build time using `generateStaticParams()`.
* **Chronological Sorting**: Posts are automatically sorted newest-first by date on both the homepage feed and `/blog` archive.
* **Rich Markdown Formatting**: Uses `marked` to compile headings, bold/italics, bullet/numbered lists, blockquotes, code blocks, and links into beautifully styled HTML.

---

## 6. Next Decisions & Brainstorming Backlog

- [x] **Home Page Flow**: Implemented clean Black & White First list with header, pillar navigation, recent stream, and footer.
- [x] **Writing Format**: Implemented Markdown file system in `content/posts/` with `YYYY-MM-DD-title.md` convention.
- [x] **Markdown Formatting**: Integrated `marked` with custom Black & White typography styling.
- [ ] **Tag Filtering**: Allow filtering posts on `/blog` by tag (`#ramen`, `#research`, `#music`, `#life`).
- [ ] **Audio Embeds**: Clean native `<audio>` player component for cello and guitar voice memos.
- [ ] **Dedicated Pillar Pages**: Build custom pages for `/research` and `/ramen` if deeper content is needed beyond single posts.

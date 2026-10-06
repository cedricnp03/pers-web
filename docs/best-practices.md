# Engineering & Design Best Practices

> **Scope:** Guidelines for building, maintaining, and extending Cedric Purwanto's website.  
> **Audience:** Developers and AI assistants working in this repository.

---

## 1. Visual Design: Black & White First (Rule 2)

* **Design in Grayscale First**: Establish typography scale, line heights, padding, and layout contrast before adding any decorative color.
* **Semantic Contrast**: Use the `zinc` palette with deliberate intent:
  * `text-zinc-950`: Primary headings and active titles.
  * `text-zinc-600` / `text-zinc-700`: Body reading copy (`leading-relaxed` or `leading-7`).
  * `text-zinc-400` / `text-zinc-500`: Monospace metadata, dates, and subtle borders.
* **Restraint over Clutter**: Empty space is intentional. Avoid adding cards, background gradients, or unnecessary boxes when clean typography and hairlines (`border-zinc-200`) suffice.

---

## 2. Next.js App Router Conventions (v16+)

* **Server Components by Default**: All pages and layout files should remain React Server Components. Only introduce `"use client"` when browser APIs, event listeners, or client-side hooks (`useState`, `useEffect`) are strictly necessary.
* **Asynchronous Route Params**: In Next.js 15+, `params` and `searchParams` on page components are Promises:
  ```tsx
  export default async function Page({
    params,
    searchParams,
  }: {
    params: Promise<{ slug: string }>;
    searchParams?: Promise<{ tag?: string }>;
  }) {
    const { slug } = await params;
    const { tag } = (await searchParams) || {};
  }
  ```
* **Static Site Generation (SSG)**: For dynamic content routes like `/blog/[slug]`, always export `generateStaticParams()` to pre-render static HTML at build time.
* **Dynamic Metadata for SEO**:
  * Root layout must define `title.template: "%s · Cedric Purwanto"`.
  * Every page should export static `metadata` or dynamic `generateMetadata({ params })` so browser tabs and search engines show the exact post title.
* **Layout Props**: Use standard, self-contained React types for root layouts:
  ```tsx
  export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>)
  ```

---

## 3. Content Architecture & Markdown

* **File Location**: All blog posts, research logs, and notes live in `content/posts/`.
* **Filename Convention**: Always name markdown files with the ISO 8601 date prefix:
  ```text
  YYYY-MM-DD-slug-name.md
  ```
  * Example: `2026-10-06-tokyo-software-engineer.md`
  * The date is automatically extracted from the filename.
  * The clean slug is used for the URL (e.g. `/blog/tokyo-software-engineer`).
* **Frontmatter Schema**:
  ```markdown
  ---
  title: Title of Post
  tag: Life | Research | Ramen | Music
  description: One-sentence preview summary.
  ---
  ```

---

## 4. Dependencies & Security Hygiene

* **Minimalist Dependencies**: Prefer Node.js built-ins (`fs`, `path`) and small, focused packages (e.g. `marked`). Avoid heavy dependencies or full-blown CMS libraries.
* **Audit Fix Rule**: **NEVER** run `npm audit fix --force`. Automated force-fixes aggressively downgrade major packages (e.g. attempting to downgrade Next.js 16 to Next.js 14), breaking the codebase. Instead, update direct dependencies explicitly (e.g. `npm install next@latest`).
* **Git Cleanliness**: Keep temporary screenshots, local dumps, and scratch files out of git using `.gitignore`. Always run `git status` before finishing a task.

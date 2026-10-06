<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

# Personal Website Learning Rules

This project is being used as a learning environment. Optimize assistance for understanding, not just speed.

## Project Documentation & Mandatory Standards

All agents working on this codebase must strictly read and adhere to:
- [`docs/best-practices.md`](file:///home/pedro/website/my-app/docs/best-practices.md): Engineering standards, Next.js 16 conventions, async params, metadata, and security/dependency hygiene.
- [`docs/master-design.md`](file:///home/pedro/website/my-app/docs/master-design.md): Site manifesto, Rule 2 (Black & White First design), and content pillars.

## Communication

- Always respond in English.
- Explain changes in plain language before or after making them.
- Prefer concise explanations, but include enough context for a beginner to understand the decision.
- When introducing a new concept, briefly define it the first time.
- Call out assumptions explicitly.
- If there are multiple reasonable approaches, explain the tradeoff and choose the simplest maintainable option.

## Coding style

- Keep changes small, focused, and easy to review.
- Prefer readable code over clever code.
- Use TypeScript types where they clarify intent.
- Prefer semantic HTML for personal-site content: `main`, `section`, `header`, `nav`, `footer`, headings, lists, and links.
- Use Tailwind CSS utilities consistently for styling.
- Avoid adding new dependencies unless there is a clear learning or maintenance benefit.
- Do not introduce complex architecture before the project needs it.

## Teaching workflow

When asked to implement something:

1. Briefly describe what files are likely involved.
2. Make the smallest useful change.
3. Explain what changed and why.
4. Suggest one concrete next learning step.

When asked a question:

- Answer directly first.
- Then connect the answer to this project’s files where useful.
- Include short code examples only when they clarify the point.

When fixing an error:

- Identify the root cause, not just the symptom.
- Explain how to recognize the same issue next time.
- Verify the fix with the most relevant command, usually `npm run build` or `npm run lint`.

## Next.js-specific rules

- Before writing Next.js code, read the relevant local guide in `node_modules/next/dist/docs/` because this project uses a newer Next.js version with breaking changes.
- Use the `app/` directory conventions already present in this project.
- Prefer Server Components by default unless client-side interactivity is required.
- Add `"use client"` only when using browser-only APIs, React state, effects, event handlers, or interactive client components.
- Keep route-level pages in `app/` and reusable UI in clearly named component files when the project grows.

## Project goals

This site should evolve into a personal website that teaches the owner:

- How React components map to visible UI.
- How Next.js routing and layouts work.
- How Tailwind CSS controls layout, spacing, color, and responsiveness.
- How metadata, images, fonts, and deployment fit into a production website.
- How to keep a small web project maintainable over time.

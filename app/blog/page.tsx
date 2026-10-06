import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "A chronological stream of research notes, Tokyo ramen logs, cello riffs, and essays.",
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams?: Promise<{ tag?: string }>;
}) {
  const { tag } = (await searchParams) || {};
  const allPosts = getAllPosts();

  const posts = tag
    ? allPosts.filter(
        (p) => p.tag.toLowerCase() === tag.trim().toLowerCase()
      )
    : allPosts;

  const availableTags = ["All", "Research", "Ramen", "Music", "Life"];

  return (
    <div className="min-h-screen bg-white px-6 py-20 font-sans text-zinc-950">
      <main className="mx-auto max-w-2xl space-y-12">
        <header className="space-y-4">
          <Link
            href="/"
            className="font-mono text-xs text-zinc-400 transition-colors hover:text-amber-800"
          >
            ← Home
          </Link>

          <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
            Writing &amp; Thought Dumps
          </h1>

          <p className="text-base leading-relaxed text-zinc-600">
            A chronological stream of research notes, Tokyo ramen logs, cello
            riffs, and essays.
          </p>

          {/* Quick Filter Bar */}
          <nav aria-label="Tag filters" className="pt-2">
            <ul className="flex flex-wrap items-center gap-2 font-mono text-xs">
              {availableTags.map((t) => {
                const isSelected =
                  (!tag && t === "All") ||
                  (tag && tag.toLowerCase() === t.toLowerCase());

                const href = t === "All" ? "/blog" : `/blog?tag=${t}`;

                return (
                  <li key={t}>
                    <Link
                      href={href}
                      className={`rounded px-2.5 py-0.5 transition-colors ${
                        isSelected
                          ? "bg-amber-800 text-white font-medium shadow-xs"
                          : "bg-zinc-100 text-zinc-600 hover:bg-amber-50 hover:text-amber-900"
                      }`}
                    >
                      {t}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </header>

        <section aria-label="Posts list">
          {posts.length === 0 ? (
            <div className="py-12 text-center font-mono text-xs text-zinc-400">
              No entries found for tag &ldquo;{tag}&rdquo;.{" "}
              <Link href="/blog" className="underline text-amber-800">
                View all entries
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-zinc-100">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                  >
                    <div className="space-y-1">
                      <h2 className="text-base font-medium text-zinc-800 transition-colors group-hover:text-amber-950 group-hover:underline underline-offset-4 group-hover:decoration-amber-500/60">
                        {post.title}
                      </h2>
                      {post.description && (
                        <p className="text-xs leading-relaxed text-zinc-500">
                          {post.description}
                        </p>
                      )}
                    </div>

                    <div className="mt-2 flex shrink-0 items-center gap-3 font-mono text-xs text-zinc-400 sm:mt-0">
                      <span className="rounded bg-zinc-100 px-1.5 py-0.5 text-[11px] text-zinc-600 transition-colors group-hover:bg-amber-50 group-hover:text-amber-800">
                        {post.tag}
                      </span>
                      <time dateTime={post.date}>{post.date}</time>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <footer className="border-t border-zinc-200 pt-8">
          <Link
            href="/"
            className="font-mono text-xs text-zinc-400 hover:text-amber-800 underline underline-offset-4"
          >
            ← Back to Home
          </Link>
        </footer>
      </main>
    </div>
  );
}

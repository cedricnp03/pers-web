import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();
  const recentPosts = posts.slice(0, 4);

  return (
    <div className="min-h-screen bg-white px-6 py-20 font-sans text-zinc-950">
      <main className="mx-auto max-w-2xl space-y-16">
        {/* Header: Identity & Quiet Statement */}
        <header className="space-y-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
              Cedric Purwanto
            </h1>
            <span className="font-mono text-xs text-zinc-400">
              Tokyo, Japan
            </span>
          </div>

          <p className="text-base leading-relaxed text-zinc-600 sm:text-lg">
            Computational chemistry graduate turned into software engineer.
            This is my quiet corner on the web for thought dumps, DFT &amp; MD
            research, Tokyo ramen logs, and music rants.
          </p>

          {/* Navigation: Content Pillars */}
          <nav aria-label="Topics" className="pt-2">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-wider text-zinc-500">
              <li>
                <Link
                  href="/blog"
                  className="transition-colors hover:text-amber-800 underline underline-offset-4 decoration-zinc-300 hover:decoration-amber-600"
                >
                  Writing
                </Link>
              </li>
              <li>
                <Link
                  href="/blog?tag=Research"
                  className="transition-colors hover:text-amber-800 underline underline-offset-4 decoration-zinc-300 hover:decoration-amber-600"
                >
                  Research
                </Link>
              </li>
              <li>
                <Link
                  href="/blog?tag=Ramen"
                  className="transition-colors hover:text-amber-800 underline underline-offset-4 decoration-zinc-300 hover:decoration-amber-600"
                >
                  Ramen Log
                </Link>
              </li>
              <li>
                <Link
                  href="/blog?tag=Music"
                  className="transition-colors hover:text-amber-800 underline underline-offset-4 decoration-zinc-300 hover:decoration-amber-600"
                >
                  Music
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        {/* Section: Recent Entries / Thought Stream */}
        <section aria-labelledby="recent-heading" className="space-y-6">
          <div className="flex items-baseline justify-between border-b border-zinc-200 pb-3">
            <h2
              id="recent-heading"
              className="text-xs font-mono uppercase tracking-widest text-zinc-400"
            >
              Recent Notes &amp; Writing
            </h2>
            <Link
              href="/blog"
              className="font-mono text-xs text-zinc-500 hover:text-amber-800"
            >
              All entries →
            </Link>
          </div>

          <ul className="divide-y divide-zinc-100">
            {recentPosts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                >
                  <span className="text-base font-medium text-zinc-800 transition-colors group-hover:text-amber-950 group-hover:underline underline-offset-4 group-hover:decoration-amber-500/60">
                    {post.title}
                  </span>
                  <div className="mt-1 flex shrink-0 items-center gap-3 font-mono text-xs text-zinc-400 sm:mt-0">
                    <span className="rounded bg-zinc-100 px-1.5 py-0.5 text-[11px] text-zinc-600 transition-colors duration-150 group-hover:bg-amber-50 group-hover:text-amber-800">
                      {post.tag}
                    </span>
                    <time dateTime={post.date}>{post.date}</time>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Cello String Tuning Accent & Footer */}
        <footer className="space-y-6 border-t border-zinc-200 pt-8">
          <div className="flex items-center justify-between font-mono text-[11px] text-zinc-400">
            <span>
              <span className="text-amber-800">🎻</span> C₂ ── G₂ ── D₃ ── A₃
            </span>
            <span className="italic text-zinc-400">&ldquo;Tuning in empty rooms&rdquo;</span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-400">
            <div className="flex gap-4">
              <a
                href="https://github.com/cedricnp03"
                target="_blank"
                rel="noreferrer"
                className="hover:text-amber-800 underline underline-offset-4 decoration-zinc-300 hover:decoration-amber-600"
              >
                GitHub
              </a>
              <a
                href="mailto:cedricnp03@gmail.com"
                className="hover:text-amber-800 underline underline-offset-4 decoration-zinc-300 hover:decoration-amber-600"
              >
                Email
              </a>
            </div>
            <span>© 2026 Cedric Purwanto</span>
          </div>
        </footer>
      </main>
    </div>
  );
}

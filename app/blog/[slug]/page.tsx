import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { marked } from "marked";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Parse markdown into HTML at build/request time
  const htmlContent = await marked.parse(post.content);

  return (
    <div className="min-h-screen bg-white px-6 py-20 font-sans text-zinc-950">
      <main className="mx-auto max-w-2xl space-y-12">
        {/* Navigation back */}
        <nav>
          <Link
            href="/blog"
            className="font-mono text-xs text-zinc-400 transition-colors hover:text-amber-800"
          >
            ← Back to writing
          </Link>
        </nav>

        {/* Article Header */}
        <header className="space-y-4 border-b border-zinc-200 pb-8">
          <div className="flex items-center gap-3 font-mono text-xs text-zinc-400">
            <span className="rounded border border-amber-200/60 bg-amber-50 px-2 py-0.5 text-amber-900">
              {post.tag}
            </span>
            <time dateTime={post.date}>{post.date}</time>
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
            {post.title}
          </h1>

          {post.description && (
            <p className="text-lg leading-relaxed text-zinc-500">
              {post.description}
            </p>
          )}
        </header>

        {/* Article Body (Formatted Markdown with Amber Accents) */}
        <article
          className="space-y-6 text-base leading-relaxed text-zinc-700 [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:tracking-tight [&>h2]:text-zinc-950 [&>h2]:pt-4 [&>h3]:text-lg [&>h3]:font-medium [&>h3]:text-zinc-900 [&>p]:leading-7 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-2 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:space-y-2 [&>blockquote]:border-l-2 [&>blockquote]:border-amber-400 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-zinc-600 [&>pre]:rounded-lg [&>pre]:border [&>pre]:border-zinc-200 [&>pre]:bg-zinc-50 [&>pre]:p-4 [&>pre]:font-mono [&>pre]:text-xs [&>pre]:overflow-x-auto [&_code]:font-mono [&_code]:text-xs [&_code]:bg-zinc-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&>pre_code]:bg-transparent [&>pre_code]:p-0 [&_a]:underline [&_a]:underline-offset-4 [&_a]:text-amber-800 hover:[&_a]:text-amber-900 [&_a]:decoration-amber-500/60"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* Article Footer */}
        <footer className="border-t border-zinc-200 pt-8">
          <div className="flex items-center justify-between font-mono text-xs text-zinc-400">
            <Link
              href="/"
              className="hover:text-amber-800 underline underline-offset-4 decoration-zinc-300 hover:decoration-amber-600"
            >
              Home
            </Link>
            <Link
              href="/blog"
              className="hover:text-amber-800 underline underline-offset-4 decoration-zinc-300 hover:decoration-amber-600"
            >
              All Writing
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}

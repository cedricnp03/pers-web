import fs from "node:fs";
import path from "node:path";

export interface Post {
  slug: string;
  title: string;
  date: string;
  tag: string;
  description: string;
  content: string;
}

const postsDirectory = path.join(process.cwd(), "content/posts");
const DATE_FILENAME_REGEX = /^(\d{4}-\d{2}-\d{2})-(.+)$/;

/**
 * Parses frontmatter and body from a raw markdown file string.
 * Supports date extraction from filename (e.g. 2026-10-06-my-post.md).
 */
function parseMarkdownFile(
  fileContents: string,
  fileNameWithoutExt: string
): Post {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
  const match = fileContents.match(frontmatterRegex);

  const metadata: Record<string, string> = {};
  let content = fileContents;

  if (match) {
    const rawFrontmatter = match[1];
    content = match[2].trim();

    rawFrontmatter.split("\n").forEach((line) => {
      const colonIndex = line.indexOf(":");
      if (colonIndex !== -1) {
        const key = line.slice(0, colonIndex).trim();
        const value = line.slice(colonIndex + 1).trim();
        metadata[key] = value;
      }
    });
  }

  // Check if filename has YYYY-MM-DD prefix
  const dateMatch = fileNameWithoutExt.match(DATE_FILENAME_REGEX);
  const dateFromFilename = dateMatch ? dateMatch[1] : undefined;
  const slugFromFilename = dateMatch ? dateMatch[2] : fileNameWithoutExt;

  return {
    slug: slugFromFilename,
    title: metadata.title || slugFromFilename.replace(/-/g, " "),
    date: metadata.date || dateFromFilename || "2026-10-01",
    tag: metadata.tag || "Note",
    description: metadata.description || "",
    content,
  };
}

/**
 * Retrieves all posts from content/posts, sorted newest first.
 */
export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((name) => name.endsWith(".md"))
    .map((fileName) => {
      const fileNameWithoutExt = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      return parseMarkdownFile(fileContents, fileNameWithoutExt);
    });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/**
 * Retrieves a single post by slug, matching both `slug.md` and `YYYY-MM-DD-slug.md`.
 */
export function getPostBySlug(slug: string): Post | null {
  if (!fs.existsSync(postsDirectory)) {
    return null;
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const targetFile = fileNames.find((name) => {
    if (!name.endsWith(".md")) return false;
    const base = name.replace(/\.md$/, "");
    if (base === slug) return true;
    const dateMatch = base.match(DATE_FILENAME_REGEX);
    return dateMatch ? dateMatch[2] === slug : false;
  });

  if (!targetFile) {
    return null;
  }

  const fullPath = path.join(postsDirectory, targetFile);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  return parseMarkdownFile(fileContents, targetFile.replace(/\.md$/, ""));
}

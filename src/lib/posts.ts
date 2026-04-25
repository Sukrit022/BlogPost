import fs from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import readingTime from "reading-time";
import remarkGfm from "remark-gfm";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  readingTime: string;
};

type PostFrontmatter = {
  title: string;
  date: string;
  excerpt: string;
  tags?: string[];
};

const postsDirectory = path.join(process.cwd(), "content", "posts");

function toPostMeta(slug: string, frontmatter: PostFrontmatter, content: string): PostMeta {
  return {
    slug,
    title: frontmatter.title,
    date: frontmatter.date,
    excerpt: frontmatter.excerpt,
    tags: frontmatter.tags ?? [],
    readingTime: readingTime(content).text,
  };
}

function sortByDateDesc(a: PostMeta, b: PostMeta): number {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

export async function getPostSlugs(): Promise<string[]> {
  const entries = await fs.readdir(postsDirectory);

  return entries
    .filter((entry) => entry.endsWith(".mdx"))
    .map((entry) => entry.replace(/\.mdx$/, ""));
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const slugs = await getPostSlugs();

  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const filePath = path.join(postsDirectory, `${slug}.mdx`);
      const source = await fs.readFile(filePath, "utf8");
      const { data, content } = matter(source);

      return toPostMeta(slug, data as PostFrontmatter, content);
    }),
  );

  return posts.sort(sortByDateDesc);
}

export async function getRecentPosts(limit = 4): Promise<PostMeta[]> {
  const posts = await getAllPosts();
  return posts.slice(0, limit);
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const tagSet = new Set<string>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => tagSet.add(tag));
  });

  return Array.from(tagSet).sort((a, b) => a.localeCompare(b));
}

export async function getPostBySlug(slug: string): Promise<(PostMeta & { content: React.ReactNode }) | null> {
  const filePath = path.join(postsDirectory, `${slug}.mdx`);

  try {
    const source = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(source);

    const compiled = await compileMDX({
      source: content,
      options: {
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
      },
    });

    const postMeta = toPostMeta(slug, data as PostFrontmatter, content);

    return {
      ...postMeta,
      content: compiled.content,
    };
  } catch {
    return null;
  }
}

export function formatPostDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

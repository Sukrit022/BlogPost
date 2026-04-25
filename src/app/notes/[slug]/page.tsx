import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { MdxContent } from "@/components/mdx-content";
import { formatPostDate, getPostBySlug, getPostSlugs } from "@/lib/posts";

type NotePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: NotePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post not found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="animate-fade-in">
      <header className="mb-10 space-y-4 border-b border-border/70 pb-8">
        <p className="text-xs uppercase tracking-[0.18em] text-muted">
          {formatPostDate(post.date)} · {post.readingTime}
        </p>
        <h1 className="max-w-3xl font-display text-4xl leading-tight text-foreground md:text-5xl">{post.title}</h1>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={`${post.slug}-${tag}`} className="rounded-full border border-border px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-muted">
              {tag}
            </span>
          ))}
        </div>
      </header>

      <MdxContent>{post.content}</MdxContent>
    </article>
  );
}

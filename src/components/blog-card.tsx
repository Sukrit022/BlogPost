import Link from "next/link";

import type { PostMeta } from "@/lib/posts";
import { formatPostDate } from "@/lib/posts";

type BlogCardProps = {
  post: PostMeta;
};

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="card-lift h-full rounded-2xl border border-border/80 bg-card p-5">
      <div className="mb-3 flex items-center justify-between gap-3 text-xs uppercase tracking-[0.14em] text-muted">
        <time>{formatPostDate(post.date)}</time>
        <span>{post.readingTime}</span>
      </div>

      <h3 className="mb-2 font-display text-xl leading-tight text-foreground">
        <Link href={`/notes/${post.slug}`} className="story-link">
          {post.title}
        </Link>
      </h3>

      <p className="mb-4 text-sm leading-6 text-muted">{post.excerpt}</p>

      <div className="flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span key={`${post.slug}-${tag}`} className="rounded-full border border-border px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-muted">
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}

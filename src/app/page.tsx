import Link from "next/link";

import { BlogCard } from "@/components/blog-card";
import { getAllPosts, getAllTags, getRecentPosts } from "@/lib/posts";

export default async function Home() {
  const [recentPosts, allPosts, tags] = await Promise.all([
    getRecentPosts(4),
    getAllPosts(),
    getAllTags(),
  ]);
  const focusTags = tags.slice(0, 6);

  return (
    <div className="space-y-14">
      <section className="animate-fade-in space-y-6">
        <p className="text-xs uppercase tracking-[0.22em] text-muted">Notebook • Startups • Research</p>
        <h1 className="max-w-2xl font-display text-4xl leading-[1.1] text-foreground md:text-5xl">
          A running log of things I changed my mind about in AI.
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-muted">
          I started this as rough notes after classes, podcasts, and random paper deep-dives.
          Over time it turned into something between a journal and a map of where AI might be going.
        </p>
      </section>

      <section className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-muted">Recent posts</p>
            <h2 className="font-display text-3xl text-foreground">What I wrote lately</h2>
          </div>
          <Link href="/notes" className="text-sm text-muted transition hover:text-foreground">
            View all notes
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {recentPosts.map((post, index) => (
            <div
              key={post.slug}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 90}ms`, animationFillMode: "both" }}
            >
              <BlogCard post={post} />
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="font-display text-3xl text-foreground">All posts</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {allPosts.map((post, index) => (
            <div
              key={post.slug}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 35}ms`, animationFillMode: "both" }}
            >
              <BlogCard post={post} />
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-border/70 bg-card p-6">
        <p className="text-xs uppercase tracking-[0.18em] text-muted">Topics I keep returning to</p>
        <div className="flex flex-wrap gap-2">
          {focusTags.map((tag) => (
            <span key={tag} className="rounded-full border border-border px-3 py-1 text-xs uppercase tracking-[0.12em] text-muted">
              {tag}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}

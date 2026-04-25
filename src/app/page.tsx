import Link from "next/link";

import { BlogCard } from "@/components/blog-card";
import { getAllPosts, getAllTags, getRecentPosts } from "@/lib/posts";

export default async function Home() {
  const [recentPosts, allPosts, tags] = await Promise.all([
    getRecentPosts(4),
    getAllPosts(),
    getAllTags(),
  ]);

  return (
    <div className="space-y-14">
      <section className="animate-fade-in space-y-6">
        <p className="text-xs uppercase tracking-[0.22em] text-muted">Notebook • AI • Startups</p>
        <h1 className="max-w-2xl font-display text-4xl leading-[1.1] text-foreground md:text-5xl">
          A running log of things I changed my mind about in AI.
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-muted">
          I started this as rough notes after classes, podcasts, and random paper deep-dives.
          Over time it turned into something between a journal and a map of where AI might be going.
        </p>
      </section>

      <section className="grid gap-6 rounded-2xl border border-border/70 bg-card p-6 md:grid-cols-[1.1fr_1fr]">
        <div className="space-y-3">
          <h2 className="font-display text-2xl text-foreground">About Sukrit</h2>
          <p className="leading-7 text-muted">
            I&apos;m a college student trying to get less impressed by demos and more curious about what is actually durable.
            Most of these notes are from late-night rabbit holes around model behavior, startup moats, and evaluation gaps.
          </p>
        </div>
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.14em] text-muted">Current curiosity list</p>
          <ul className="space-y-2 text-sm leading-6 text-muted">
            <li>How synthetic data loops quietly degrade signal</li>
            <li>Where small models keep winning on latency + cost</li>
            <li>Why eval tooling feels behind model capability</li>
          </ul>
        </div>
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
          {tags.map((tag) => (
            <span key={tag} className="rounded-full border border-border px-3 py-1 text-xs uppercase tracking-[0.12em] text-muted">
              {tag}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}

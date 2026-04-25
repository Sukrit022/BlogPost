import { BlogCard } from "@/components/blog-card";
import { getAllPosts } from "@/lib/posts";

export default async function NotesPage() {
  const posts = await getAllPosts();

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">Archive</p>
        <h1 className="font-display text-4xl text-foreground">All notes</h1>
        <p className="max-w-2xl text-base leading-7 text-muted">
          A running sequence from simpler observations to sharper takes.
          Not polished on purpose.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        {posts.map((post, index) => (
          <div
            key={post.slug}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 30}ms`, animationFillMode: "both" }}
          >
            <BlogCard post={post} />
          </div>
        ))}
      </section>
    </div>
  );
}

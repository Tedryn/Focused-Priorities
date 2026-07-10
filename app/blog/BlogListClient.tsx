"use client";

import { useState, useMemo } from "react";
import BlogCard from "@/components/BlogCard";
import type { BlogPost } from "@/lib/types";

export default function BlogListClient({ posts }: { posts: BlogPost[] }) {
  const [search, setSearch] = useState("");

  const filteredPosts = useMemo(() => {
    if (!search.trim()) return posts;
    const q = search.toLowerCase();
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags?.some((t) => t.toLowerCase().includes(q))
    );
  }, [posts, search]);

  return (
    <>
      {/* Search */}
      <section className="py-8">
        <input
          type="text"
          placeholder="Search by title, excerpt, or tag..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-border bg-transparent font-montserrat text-sm tracking-wide px-4 py-3 outline-none transition-colors duration-200 focus:border-accent placeholder:text-border"
        />
      </section>

      {/* Post List */}
      <section>
        {filteredPosts.length > 0 ? (
          <div className="space-y-10 md:space-y-12">
            {filteredPosts.map((post) => (
              <BlogCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                excerpt={post.excerpt}
                date={post.date}
                featuredImage={post.featuredImage}
                readingTime={post.readingTime}
                tags={post.tags}
              />
            ))}
          </div>
        ) : (
          <p className="py-16 font-montserrat text-center text-sm tracking-wide text-muted">
            No posts match your search.
          </p>
        )}
      </section>

      {/* Footer divider */}
      {filteredPosts.length > 0 && (
        <div className="mt-20 border-t border-border" />
      )}
    </>
  );
}

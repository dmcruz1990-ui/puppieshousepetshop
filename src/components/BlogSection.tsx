"use client";

import { useEffect, useState } from "react";
import { fetchPosts, type Post } from "@/lib/blog";
import { asset } from "@/lib/asset";

export default function BlogSection() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchPosts().then(setPosts).catch(() => {});
  }, []);

  if (posts.length === 0) return null;

  return (
    <section id="blog" className="mx-auto max-w-7xl px-4 py-16">
      <div className="text-center">
        <p className="font-semibold uppercase tracking-[0.2em] text-accent-600 text-xs sm:text-sm">Blog & Noticias</p>
        <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-brand-900">Consejos para ti y tu cachorro</h2>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {posts.slice(0, 3).map((p) => (
          <article key={p.id} className="flex flex-col overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-sm">
            <div className="aspect-[16/10] overflow-hidden bg-brand-50">
              {p.image && <img src={p.image} onError={(e) => ((e.target as HTMLImageElement).src = asset("/placeholder-dog.svg"))} alt={p.title} className="h-full w-full object-cover" loading="lazy" />}
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="font-serif text-xl font-bold text-brand-900">{p.title}</h3>
              <p className="mt-2 flex-1 text-sm text-brand-500">{p.excerpt}</p>
              <details className="mt-3 group">
                <summary className="cursor-pointer list-none text-sm font-semibold text-accent-600 hover:text-accent-700">
                  Leer más →
                </summary>
                <p className="mt-2 text-sm text-brand-600">{p.body}</p>
              </details>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { fetchPosts, updatePost, seedBlogIfEmpty, type Post } from "@/lib/blog";
import { uploadImage } from "@/lib/catalog";
import { PageHeader } from "@/components/admin/ui";

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    // Siembra en la base si está vacía, para que las ediciones sí se guarden.
    seedBlogIfEmpty()
      .then(setPosts)
      .catch(() => fetchPosts().then(setPosts).catch(() => setPosts([])));
  }, []);

  if (!posts) return <div className="p-10 text-brand-400">Cargando…</div>;

  const save = async (id: string, patch: Partial<Post>) => {
    setPosts((prev) => (prev ? prev.map((p) => (p.id === id ? { ...p, ...patch } : p)) : prev));
    try {
      await updatePost(id, patch);
    } catch {
      alert("No se pudo guardar. ¿Creaste la tabla 'blog_posts' y la sesión está activa?");
    }
  };

  const seed = async () => {
    setBusy(true);
    try {
      setPosts(await seedBlogIfEmpty());
    } catch {
      alert("No se pudo cargar el blog inicial.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Blog & Noticias"
        subtitle="Edita las 3 entradas que aparecen en la web pública."
        action={
          posts.length === 0 ? (
            <button onClick={seed} disabled={busy} className="rounded-full bg-accent-500 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-600 disabled:opacity-50">
              Cargar entradas iniciales
            </button>
          ) : null
        }
      />
      <div className="p-6 space-y-5">
        {posts.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-brand-200 bg-white p-10 text-center text-brand-500">
            Aún no hay entradas. Pulsa <b>“Cargar entradas iniciales”</b>.
          </div>
        ) : (
          posts.map((p) => <PostEditor key={p.id} post={p} onSave={save} />)
        )}
      </div>
    </div>
  );
}

function PostEditor({ post, onSave }: { post: Post; onSave: (id: string, p: Partial<Post>) => void }) {
  const [draft, setDraft] = useState(post);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const commit = (patch: Partial<Post>) => onSave(post.id, patch);

  const onImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file, `blog-${post.id}`);
      setDraft((d) => ({ ...d, image: url }));
      commit({ image: url });
    } catch {
      alert("No se pudo subir la imagen.");
    } finally {
      setUploading(false);
    }
  };

  const cls = "w-full rounded-lg border border-brand-200 px-3 py-2 text-sm text-brand-800 outline-none focus:border-accent-500";

  return (
    <div className="rounded-2xl border border-brand-100 bg-white p-4">
      <div className="flex gap-4">
        <button onClick={() => fileRef.current?.click()} className="group relative h-24 w-32 shrink-0 overflow-hidden rounded-xl border border-brand-100 bg-brand-50" title="Cambiar imagen">
          {draft.image ? <img src={draft.image} alt="" className="h-full w-full object-cover" /> : <span className="grid h-full w-full place-items-center text-xs text-brand-400">Sin imagen</span>}
          <span className="absolute inset-x-0 bottom-0 bg-black/55 py-1 text-center text-[10px] font-semibold text-white opacity-0 transition group-hover:opacity-100">{uploading ? "Subiendo…" : "Cambiar"}</span>
        </button>
        <input ref={fileRef} type="file" accept="image/*" onChange={onImage} className="hidden" />
        <div className="min-w-0 flex-1 space-y-2">
          <input value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} onBlur={() => commit({ title: draft.title })} placeholder="Título" className={`${cls} font-semibold`} />
          <input value={draft.excerpt} onChange={(e) => setDraft({ ...draft, excerpt: e.target.value })} onBlur={() => commit({ excerpt: draft.excerpt })} placeholder="Resumen corto" className={cls} />
        </div>
      </div>
      <textarea value={draft.body} onChange={(e) => setDraft({ ...draft, body: e.target.value })} onBlur={() => commit({ body: draft.body })} placeholder="Contenido de la entrada" rows={3} className={`${cls} mt-2 resize-none`} />
    </div>
  );
}

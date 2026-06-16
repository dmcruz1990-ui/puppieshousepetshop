"use client";

import { useEffect, useRef, useState } from "react";
import {
  fetchCatalog,
  updateProductDb,
  addProductDb,
  deleteProductDb,
  seedCatalogIfEmpty,
  uploadImage,
} from "@/lib/catalog";
import { type Product, type Size, type ProductStatus, sizeLabel } from "@/data/products";
import { formatCOP } from "@/data/site";
import { PageHeader, StatCard } from "@/components/admin/ui";

export default function CatalogoAdminPage() {
  const [items, setItems] = useState<Product[] | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetchCatalog().then(setItems).catch(() => setItems([]));
  }, []);

  if (!items) return <div className="p-10 text-brand-400">Cargando…</div>;

  const save = async (id: string, patch: Partial<Product>) => {
    setItems((prev) => (prev ? prev.map((p) => (p.id === id ? { ...p, ...patch } : p)) : prev));
    try {
      await updateProductDb(id, patch);
    } catch {
      alert("No se pudo guardar. Revisa tu conexión o que la tabla 'products' exista.");
    }
  };

  const add = async () => {
    setBusy(true);
    try {
      const p = await addProductDb();
      setItems((prev) => (prev ? [p, ...prev] : [p]));
    } catch {
      alert("No se pudo agregar. ¿Iniciaste sesión y existe la tabla?");
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("¿Eliminar este cachorro del catálogo?")) return;
    setItems((prev) => (prev ? prev.filter((p) => p.id !== id) : prev));
    try {
      await deleteProductDb(id);
    } catch {
      alert("No se pudo eliminar.");
    }
  };

  const seed = async () => {
    setBusy(true);
    try {
      const list = await seedCatalogIfEmpty();
      setItems(list);
    } catch {
      alert("No se pudo cargar el catálogo inicial.");
    } finally {
      setBusy(false);
    }
  };

  const available = items.filter((p) => p.status === "disponible").length;
  const value = items.reduce((a, p) => a + p.price * p.stock, 0);

  return (
    <div>
      <PageHeader
        title="Catálogo"
        subtitle="Edita precios, fotos, estado y stock. Se guarda en tu base de datos y se ve en la web al instante."
        action={
          <div className="flex gap-2">
            {items.length === 0 && (
              <button onClick={seed} disabled={busy} className="rounded-full border border-brand-200 px-4 py-2 text-sm font-medium text-brand-600 hover:bg-brand-50 disabled:opacity-50">
                Cargar catálogo inicial
              </button>
            )}
            <button onClick={add} disabled={busy} className="rounded-full bg-accent-500 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-600 disabled:opacity-50">
              + Agregar cachorro
            </button>
          </div>
        }
      />
      <div className="p-6 space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard label="Cachorros publicados" value={String(items.length)} tone="brand" />
          <StatCard label="Disponibles" value={String(available)} tone="emerald" />
          <StatCard label="Valor del inventario" value={formatCOP(value)} tone="accent" />
        </div>

        {items.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-brand-200 bg-white p-10 text-center">
            <p className="text-brand-500">Aún no hay cachorros. Pulsa <b>“Cargar catálogo inicial”</b> o <b>“Agregar cachorro”</b>.</p>
          </div>
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {items.map((p) => (
              <ProductEditor key={p.id} product={p} onSave={save} onDelete={remove} />
            ))}
          </div>
        )}

        <p className="text-xs text-brand-400">
          ☁️ Guardado en Supabase. Las fotos se suben a la nube y quedan permanentes para todos tus clientes.
        </p>
      </div>
    </div>
  );
}

function ProductEditor({
  product,
  onSave,
  onDelete,
}: {
  product: Product;
  onSave: (id: string, p: Partial<Product>) => void;
  onDelete: (id: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [draft, setDraft] = useState(product);
  const [uploading, setUploading] = useState(false);

  const commit = (patch: Partial<Product>) => onSave(product.id, patch);
  const gallery = draft.images && draft.images.length ? draft.images : draft.image ? [draft.image] : [];

  const applyGallery = (images: string[]) => {
    setDraft((d) => ({ ...d, images, image: images[0] || "" }));
    commit({ images, image: images[0] || "" });
  };

  const onAddImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);
    try {
      const urls: string[] = [];
      for (const f of files) urls.push(await uploadImage(f, product.id));
      applyGallery([...gallery, ...urls]);
    } catch {
      alert("No se pudo subir la foto. Revisa que el bucket 'catalog' exista y tengas sesión.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const removeImage = (idx: number) => applyGallery(gallery.filter((_, k) => k !== idx));
  const makeCover = (idx: number) => applyGallery([gallery[idx], ...gallery.filter((_, k) => k !== idx)]);

  return (
    <div className="rounded-2xl border border-brand-100 bg-white p-4">
      <div className="flex gap-4">
        <div className="w-32 shrink-0">
          <button
            onClick={() => fileRef.current?.click()}
            className="group relative h-24 w-32 overflow-hidden rounded-xl border border-brand-100 bg-brand-50"
            title="Agregar fotos"
          >
            {gallery[0] ? (
              <img src={gallery[0]} alt={draft.name} className="h-full w-full object-cover" />
            ) : (
              <span className="grid h-full w-full place-items-center text-xs text-brand-400">Sin foto</span>
            )}
            <span className="absolute inset-x-0 bottom-0 bg-black/55 py-1 text-center text-[10px] font-semibold text-white opacity-0 transition group-hover:opacity-100">
              {uploading ? "Subiendo…" : "+ Agregar fotos"}
            </span>
          </button>
          <input ref={fileRef} type="file" accept="image/*" multiple onChange={onAddImages} className="hidden" />
          {gallery.length > 1 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {gallery.map((img, k) => (
                <div key={k} className="group relative h-9 w-9 overflow-hidden rounded-md border border-brand-100">
                  <img src={img} alt="" className="h-full w-full object-cover" />
                  {k === 0 && <span className="absolute inset-x-0 bottom-0 bg-accent-500 text-center text-[7px] font-bold text-white">PORTADA</span>}
                  <button onClick={() => removeImage(k)} className="absolute right-0 top-0 grid h-3.5 w-3.5 place-items-center bg-rose-600 text-[8px] text-white" title="Quitar">✕</button>
                  {k !== 0 && <button onClick={() => makeCover(k)} className="absolute inset-0 bg-black/0 hover:bg-black/30" title="Hacer portada" />}
                </div>
              ))}
            </div>
          )}
          <p className="mt-1 text-[10px] text-brand-400">{gallery.length} foto(s). Clic en una para hacerla portada.</p>
        </div>

        <div className="min-w-0 flex-1 space-y-2">
          <input
            value={draft.name}
            onChange={(e) => setDraft({ ...draft, name: e.target.value })}
            onBlur={() => commit({ name: draft.name })}
            className="w-full rounded-lg border border-brand-200 px-3 py-1.5 text-sm font-semibold text-brand-900 outline-none focus:border-accent-500"
          />
          <div className="grid grid-cols-2 gap-2">
            <Field label="Raza">
              <input value={draft.breed} onChange={(e) => setDraft({ ...draft, breed: e.target.value })} onBlur={() => commit({ breed: draft.breed })} className={inputCls} />
            </Field>
            <Field label="Color">
              <input value={draft.color} onChange={(e) => setDraft({ ...draft, color: e.target.value })} onBlur={() => commit({ color: draft.color })} className={inputCls} />
            </Field>
          </div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Field label="Precio (COP)">
          <input
            type="number"
            value={draft.price}
            onChange={(e) => setDraft({ ...draft, price: Number(e.target.value) })}
            onBlur={() => commit({ price: draft.price })}
            className={`${inputCls} font-semibold`}
          />
        </Field>
        <Field label="Estado">
          <select value={draft.status} onChange={(e) => { const status = e.target.value as ProductStatus; setDraft({ ...draft, status }); commit({ status }); }} className={inputCls}>
            <option value="disponible">Disponible</option>
            <option value="reservado">Reservado</option>
            <option value="vendido">Vendido</option>
          </select>
        </Field>
        <Field label="Stock">
          <input type="number" value={draft.stock} onChange={(e) => setDraft({ ...draft, stock: Number(e.target.value) })} onBlur={() => commit({ stock: draft.stock })} className={inputCls} />
        </Field>
        <Field label="Tamaño">
          <select value={draft.size} onChange={(e) => { const size = e.target.value as Size; setDraft({ ...draft, size }); commit({ size }); }} className={inputCls}>
            {(["pequeno", "mediano", "grande"] as Size[]).map((s) => (
              <option key={s} value={s}>{sizeLabel[s]}</option>
            ))}
          </select>
        </Field>
        <Field label="Sexo">
          <select value={draft.sex} onChange={(e) => { const sex = e.target.value as Product["sex"]; setDraft({ ...draft, sex }); commit({ sex }); }} className={inputCls}>
            <option value="macho">Macho</option>
            <option value="hembra">Hembra</option>
          </select>
        </Field>
        <Field label="Edad (sem)">
          <input type="number" value={draft.ageWeeks} onChange={(e) => setDraft({ ...draft, ageWeeks: Number(e.target.value) })} onBlur={() => commit({ ageWeeks: draft.ageWeeks })} className={inputCls} />
        </Field>
        <Field label="Destacado">
          <select value={draft.featured ? "si" : "no"} onChange={(e) => { const featured = e.target.value === "si"; setDraft({ ...draft, featured }); commit({ featured }); }} className={inputCls}>
            <option value="no">No</option>
            <option value="si">Sí</option>
          </select>
        </Field>
        <div className="flex items-end">
          <button onClick={() => onDelete(product.id)} className="w-full rounded-lg bg-rose-50 px-3 py-1.5 text-sm font-medium text-rose-600 hover:bg-rose-100">
            Eliminar
          </button>
        </div>
      </div>

      <Field label="Descripción">
        <textarea
          value={draft.description}
          onChange={(e) => setDraft({ ...draft, description: e.target.value })}
          onBlur={() => commit({ description: draft.description })}
          rows={2}
          className={`${inputCls} mt-1 resize-none`}
        />
      </Field>
      <Field label="Link de pago Bold (opcional)">
        <input
          value={draft.payLink || ""}
          onChange={(e) => setDraft({ ...draft, payLink: e.target.value })}
          onBlur={() => commit({ payLink: draft.payLink })}
          placeholder="https://checkout.bold.co/..."
          className={inputCls}
        />
      </Field>
    </div>
  );
}

const inputCls = "w-full rounded-lg border border-brand-200 px-2.5 py-1.5 text-sm text-brand-800 outline-none focus:border-accent-500";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-0.5 block text-[11px] font-medium uppercase tracking-wide text-brand-400">{label}</span>
      {children}
    </label>
  );
}

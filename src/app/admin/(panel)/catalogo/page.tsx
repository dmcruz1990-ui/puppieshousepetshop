"use client";

import { useEffect, useRef, useState } from "react";
import {
  getCatalog,
  updateProduct,
  addProduct,
  deleteProduct,
  resetCatalog,
} from "@/lib/clientStore";
import { type Product, type Size, type ProductStatus, sizeLabel } from "@/data/products";
import { formatCOP } from "@/data/site";
import { readImageResized } from "@/lib/image";
import { PageHeader, StatCard } from "@/components/admin/ui";

export default function CatalogoAdminPage() {
  const [items, setItems] = useState<Product[] | null>(null);

  useEffect(() => setItems(getCatalog()), []);

  if (!items) return <div className="p-10 text-brand-400">Cargando…</div>;

  const patch = (id: string, p: Partial<Product>) => setItems(updateProduct(id, p));
  const add = () => setItems(addProduct({}));
  const remove = (id: string) => {
    if (confirm("¿Eliminar este cachorro del catálogo?")) setItems(deleteProduct(id));
  };
  const reset = () => {
    if (confirm("¿Restablecer el catálogo a los valores originales? Se perderán tus cambios.")) setItems(resetCatalog());
  };

  const available = items.filter((p) => p.status === "disponible").length;
  const value = items.reduce((a, p) => a + p.price * p.stock, 0);

  return (
    <div>
      <PageHeader
        title="Catálogo"
        subtitle="Edita precios, fotos, estado y stock. Los cambios se reflejan en la web al instante."
        action={
          <div className="flex gap-2">
            <button onClick={reset} className="rounded-full border border-brand-200 px-4 py-2 text-sm font-medium text-brand-600 hover:bg-brand-50">
              Restablecer
            </button>
            <button onClick={add} className="rounded-full bg-accent-500 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-600">
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

        <div className="grid gap-4 lg:grid-cols-2">
          {items.map((p) => (
            <ProductEditor key={p.id} product={p} onPatch={patch} onDelete={remove} />
          ))}
        </div>

        <p className="text-xs text-brand-400">
          💡 Los cambios se guardan en este navegador (versión de prueba). Al conectar Supabase serán permanentes y
          compartidos en todos los dispositivos.
        </p>
      </div>
    </div>
  );
}

function ProductEditor({
  product,
  onPatch,
  onDelete,
}: {
  product: Product;
  onPatch: (id: string, p: Partial<Product>) => void;
  onDelete: (id: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);

  const onImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await readImageResized(file);
    onPatch(product.id, { image: url });
  };

  return (
    <div className="rounded-2xl border border-brand-100 bg-white p-4">
      <div className="flex gap-4">
        <div className="shrink-0">
          <button
            onClick={() => fileRef.current?.click()}
            className="group relative h-24 w-24 overflow-hidden rounded-xl border border-brand-100 bg-brand-50"
            title="Cambiar foto"
          >
            {product.image ? (
              <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
            ) : (
              <span className="grid h-full w-full place-items-center text-xs text-brand-400">Sin foto</span>
            )}
            <span className="absolute inset-x-0 bottom-0 bg-black/55 py-1 text-center text-[10px] font-semibold text-white opacity-0 transition group-hover:opacity-100">
              Cambiar foto
            </span>
          </button>
          <input ref={fileRef} type="file" accept="image/*" onChange={onImage} className="hidden" />
        </div>

        <div className="min-w-0 flex-1 space-y-2">
          <input
            value={product.name}
            onChange={(e) => onPatch(product.id, { name: e.target.value })}
            className="w-full rounded-lg border border-brand-200 px-3 py-1.5 text-sm font-semibold text-brand-900 outline-none focus:border-accent-500"
          />
          <div className="grid grid-cols-2 gap-2">
            <Field label="Raza">
              <input value={product.breed} onChange={(e) => onPatch(product.id, { breed: e.target.value })} className={inputCls} />
            </Field>
            <Field label="Color">
              <input value={product.color} onChange={(e) => onPatch(product.id, { color: e.target.value })} className={inputCls} />
            </Field>
          </div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Field label="Precio (COP)">
          <input
            type="number"
            value={product.price}
            onChange={(e) => onPatch(product.id, { price: Number(e.target.value) })}
            className={`${inputCls} font-semibold`}
          />
        </Field>
        <Field label="Estado">
          <select value={product.status} onChange={(e) => onPatch(product.id, { status: e.target.value as ProductStatus })} className={inputCls}>
            <option value="disponible">Disponible</option>
            <option value="reservado">Reservado</option>
            <option value="vendido">Vendido</option>
          </select>
        </Field>
        <Field label="Stock">
          <input type="number" value={product.stock} onChange={(e) => onPatch(product.id, { stock: Number(e.target.value) })} className={inputCls} />
        </Field>
        <Field label="Tamaño">
          <select value={product.size} onChange={(e) => onPatch(product.id, { size: e.target.value as Size })} className={inputCls}>
            {(["pequeno", "mediano", "grande"] as Size[]).map((s) => (
              <option key={s} value={s}>{sizeLabel[s]}</option>
            ))}
          </select>
        </Field>
        <Field label="Sexo">
          <select value={product.sex} onChange={(e) => onPatch(product.id, { sex: e.target.value as Product["sex"] })} className={inputCls}>
            <option value="macho">Macho</option>
            <option value="hembra">Hembra</option>
          </select>
        </Field>
        <Field label="Edad (sem)">
          <input type="number" value={product.ageWeeks} onChange={(e) => onPatch(product.id, { ageWeeks: Number(e.target.value) })} className={inputCls} />
        </Field>
        <Field label="Destacado">
          <select value={product.featured ? "si" : "no"} onChange={(e) => onPatch(product.id, { featured: e.target.value === "si" })} className={inputCls}>
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
          value={product.description}
          onChange={(e) => onPatch(product.id, { description: e.target.value })}
          rows={2}
          className={`${inputCls} mt-1 resize-none`}
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

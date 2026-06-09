"use client";

import { useMemo, useState } from "react";
import { categories, type Product, type Size } from "@/data/products";
import ProductCard from "./ProductCard";
import { Grid, List, Filter } from "./icons";

type SortKey = "destacados" | "precio-asc" | "precio-desc";

const sortLabels: Record<SortKey, string> = {
  destacados: "Destacados",
  "precio-asc": "Menor a mayor precio",
  "precio-desc": "Mayor a menor precio",
};

export default function Catalog({ products }: { products: Product[] }) {
  const [cat, setCat] = useState<Size | "todos">("todos");
  const [sort, setSort] = useState<SortKey>("destacados");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filtered = useMemo(() => {
    let list = products.filter((p) => (cat === "todos" ? true : p.size === cat));
    if (sort === "precio-asc") list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === "precio-desc") list = [...list].sort((a, b) => b.price - a.price);
    else
      list = [...list].sort(
        (a, b) => Number(!!b.featured) - Number(!!a.featured) || a.price - b.price,
      );
    // disponibles primero
    return [...list].sort(
      (a, b) => Number(a.status === "vendido") - Number(b.status === "vendido"),
    );
  }, [products, cat, sort]);

  return (
    <section id="catalogo" className="mx-auto max-w-7xl px-4 py-12">
      {/* categorías */}
      <div className="flex flex-wrap gap-2.5">
        {categories.map((c) => (
          <button
            key={c.key}
            onClick={() => setCat(c.key)}
            className={`rounded-full border px-5 py-2.5 text-sm font-medium transition ${
              cat === c.key
                ? "border-brand-800 bg-brand-800 text-white"
                : "border-brand-200 bg-white text-brand-700 hover:border-brand-400"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* controles */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <label className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-2.5 text-sm text-brand-700">
          <Filter className="w-4 h-4 text-brand-500" />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="bg-transparent outline-none cursor-pointer"
          >
            {(Object.keys(sortLabels) as SortKey[]).map((k) => (
              <option key={k} value={k}>
                {sortLabels[k]}
              </option>
            ))}
          </select>
        </label>

        <div className="inline-flex items-center gap-1 rounded-full bg-brand-100 p-1">
          <ViewBtn active={view === "grid"} onClick={() => setView("grid")} icon={<Grid className="w-4 h-4" />} label="Cuadrícula" />
          <ViewBtn active={view === "list"} onClick={() => setView("list")} icon={<List className="w-4 h-4" />} label="Lista" />
        </div>

        <span className="text-sm text-brand-400">{filtered.length} productos</span>
      </div>

      {/* grilla */}
      <div
        className={
          view === "grid"
            ? "mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            : "mt-7 grid grid-cols-1 gap-4 lg:grid-cols-2"
        }
      >
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} layout={view} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-10 text-center text-brand-400">No hay cachorros en esta categoría por ahora.</p>
      )}
    </section>
  );
}

function ViewBtn({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition ${
        active ? "bg-brand-800 text-white" : "text-brand-700 hover:text-brand-900"
      }`}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

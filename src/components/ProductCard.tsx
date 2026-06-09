"use client";

import { useState } from "react";
import { whatsappLink, formatCOP } from "@/data/site";
import { sizeLabel, statusLabel, type Product } from "@/data/products";
import { Paw, Whatsapp } from "./icons";

const statusStyles: Record<Product["status"], string> = {
  disponible: "text-emerald-700",
  reservado: "text-amber-700",
  vendido: "text-rose-700",
};

async function trackLead(p: Product) {
  try {
    await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "whatsapp",
        productId: p.id,
        productName: p.name,
        name: "Interesado web",
        phone: "—",
        message: `Reservar ${p.name}`,
      }),
    });
  } catch {
    /* la versión de prueba no debe romperse si falla el registro */
  }
}

export default function ProductCard({ product, layout = "grid" }: { product: Product; layout?: "grid" | "list" }) {
  const [src, setSrc] = useState(product.image);
  const sold = product.status === "vendido";

  const onReserve = () => {
    trackLead(product);
    window.open(
      whatsappLink(
        `¡Hola Puppies House! 🐾 Estoy interesado(a) en reservar el cachorro *${product.name}* (${formatCOP(product.price)}). ¿Sigue disponible?`,
      ),
      "_blank",
    );
  };

  if (layout === "list") {
    return (
      <article className="flex gap-4 rounded-2xl border border-brand-100 bg-white p-3 shadow-sm hover:shadow-md transition">
        <div className="relative h-28 w-32 shrink-0 overflow-hidden rounded-xl bg-brand-50">
          <img src={src} onError={() => setSrc("/placeholder-dog.svg")} alt={product.name} className="h-full w-full object-cover" loading="lazy" />
        </div>
        <div className="flex flex-1 flex-col">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1 text-xs font-semibold ${statusStyles[product.status]}`}>
              <Paw className="w-3.5 h-3.5" /> {statusLabel[product.status]}
            </span>
            <span className="text-xs text-brand-400">· {sizeLabel[product.size]}</span>
          </div>
          <h3 className="font-serif text-lg font-bold text-brand-900 mt-0.5">{product.name}</h3>
          <p className="text-sm text-brand-500 line-clamp-1">{product.description}</p>
          <div className="mt-auto flex items-center justify-between pt-2">
            <span className="font-serif text-lg font-bold text-brand-800">{formatCOP(product.price)}</span>
            <ReserveBtn onClick={onReserve} disabled={sold} />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-sm hover:shadow-lg transition">
      <div className="relative aspect-[4/3] overflow-hidden bg-brand-50">
        <img
          src={src}
          onError={() => setSrc("/placeholder-dog.svg")}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold shadow-sm">
          <Paw className={`w-3.5 h-3.5 ${statusStyles[product.status]}`} />
          <span className={statusStyles[product.status]}>{statusLabel[product.status]}</span>
        </span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center gap-2 text-xs text-brand-400">
          <span>{sizeLabel[product.size]}</span>
          <span>·</span>
          <span className="capitalize">{product.sex}</span>
          <span>·</span>
          <span>{product.ageWeeks} sem</span>
        </div>
        <h3 className="font-serif text-xl font-bold text-brand-900 mt-1">{product.name}</h3>
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="font-serif text-lg font-bold text-brand-800">{formatCOP(product.price)}</span>
          <ReserveBtn onClick={onReserve} disabled={sold} />
        </div>
      </div>
    </article>
  );
}

function ReserveBtn({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
  if (disabled) {
    return (
      <span className="inline-flex items-center rounded-lg bg-brand-100 px-3.5 py-2 text-sm font-semibold text-brand-400">
        Vendido
      </span>
    );
  }
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-lg bg-brand-800 px-3.5 py-2 text-sm font-semibold text-white hover:bg-brand-900 transition"
    >
      <Whatsapp className="w-4 h-4" /> Reservar
    </button>
  );
}

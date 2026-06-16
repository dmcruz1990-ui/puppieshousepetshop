"use client";

import { useState } from "react";
import { whatsappLink, formatCOP } from "@/data/site";
import { sizeLabel, statusLabel, type Product } from "@/data/products";
import { addLead } from "@/lib/clientStore";
import { asset } from "@/lib/asset";
import { Paw, Whatsapp } from "./icons";

const statusStyles: Record<Product["status"], string> = {
  disponible: "text-emerald-700",
  reservado: "text-amber-700",
  vendido: "text-rose-700",
};

function trackLead(p: Product) {
  try {
    addLead({
      source: "whatsapp",
      productId: p.id,
      productName: p.name,
      name: "Interesado web",
      phone: "—",
      message: `Reservar ${p.name}`,
    });
  } catch {
    /* la versión de prueba no debe romperse si falla el registro */
  }
}

export default function ProductCard({ product, layout = "grid", boldLink = "" }: { product: Product; layout?: "grid" | "list"; boldLink?: string }) {
  const sold = product.status === "vendido";
  const payLink = product.payLink || boldLink;
  const gallery = (product.images && product.images.length ? product.images : [product.image]).filter(Boolean);
  const cover = gallery[0] || product.image;

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
          <CoverImg src={cover} alt={product.name} />
          {gallery.length > 1 && (
            <span className="absolute bottom-1 right-1 rounded-full bg-black/60 px-1.5 py-0.5 text-[10px] font-semibold text-white">📷 {gallery.length}</span>
          )}
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
          <div className="mt-auto pt-2">
            <div className="flex items-center justify-between">
              <span className="font-serif text-lg font-bold text-brand-800">{formatCOP(product.price)}</span>
              <ReserveBtn onClick={onReserve} disabled={sold} />
            </div>
            {!sold && payLink && <PayBtn href={payLink} />}
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-sm hover:shadow-lg transition">
      <div className="relative aspect-[4/3] overflow-hidden bg-brand-50">
        <Gallery images={gallery} alt={product.name} />
        <span className="pointer-events-none absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold shadow-sm">
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
        <div className="mt-auto pt-4">
          <div className="flex items-center justify-between">
            <span className="font-serif text-lg font-bold text-brand-800">{formatCOP(product.price)}</span>
            <ReserveBtn onClick={onReserve} disabled={sold} />
          </div>
          {!sold && payLink && <PayBtn href={payLink} />}
        </div>
      </div>
    </article>
  );
}

function CoverImg({ src, alt }: { src: string; alt: string }) {
  const [s, setS] = useState(src || asset("/placeholder-dog.svg"));
  return <img src={s} onError={() => setS(asset("/placeholder-dog.svg"))} alt={alt} className="h-full w-full object-cover" loading="lazy" />;
}

function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const [i, setI] = useState(0);
  const list = images.length ? images : [asset("/placeholder-dog.svg")];
  const n = list.length;
  const go = (d: number) => setI((p) => (p + d + n) % n);
  return (
    <div className="absolute inset-0">
      <GalleryImg key={i} src={list[i]} alt={alt} />
      {n > 1 && (
        <>
          <button onClick={() => go(-1)} aria-label="Anterior" className="absolute left-2 top-1/2 z-10 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-lg text-brand-800 shadow hover:bg-white">‹</button>
          <button onClick={() => go(1)} aria-label="Siguiente" className="absolute right-2 top-1/2 z-10 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-lg text-brand-800 shadow hover:bg-white">›</button>
          <div className="absolute inset-x-0 bottom-2 z-10 flex justify-center gap-1.5">
            {list.map((_, k) => (
              <span key={k} className={`h-1.5 rounded-full bg-white transition-all ${k === i ? "w-4" : "w-1.5 opacity-60"}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function GalleryImg({ src, alt }: { src: string; alt: string }) {
  const [s, setS] = useState(src);
  return <img src={s} onError={() => setS(asset("/placeholder-dog.svg"))} alt={alt} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />;
}

function PayBtn({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-grape-700 px-3.5 py-2 text-sm font-semibold text-white hover:bg-grape-800 transition"
    >
      💳 Pagar en línea (Bold)
    </a>
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
      className="inline-flex items-center gap-1.5 rounded-lg bg-accent-500 px-3.5 py-2 text-sm font-semibold text-white hover:bg-accent-600 transition"
    >
      <Whatsapp className="w-4 h-4" /> Reservar
    </button>
  );
}

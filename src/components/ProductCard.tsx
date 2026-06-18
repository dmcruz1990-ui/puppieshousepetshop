"use client";

import { useState } from "react";
import { whatsappLink, formatCOP } from "@/data/site";
import { sizeLabel, statusLabel, type Product } from "@/data/products";
import { addLeadDb } from "@/lib/admin";
import { asset } from "@/lib/asset";
import { Paw, Whatsapp, Check, X } from "./icons";

const statusStyles: Record<Product["status"], string> = {
  disponible: "text-emerald-700",
  reservado: "text-amber-700",
  vendido: "text-rose-700",
};

function trackLead(p: Product) {
  addLeadDb({
    source: "whatsapp",
    productId: p.id,
    productName: p.name,
    name: "Interesado web",
    phone: "—",
    message: `Reservar ${p.name}`,
  }).catch(() => {});
}

function publishedLabel(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("es-CO", { day: "numeric", month: "short", year: "numeric" });
}

function isNew(iso?: string) {
  if (!iso) return false;
  const d = new Date(iso).getTime();
  return !isNaN(d) && Date.now() - d < 14 * 24 * 60 * 60 * 1000;
}

export default function ProductCard({ product, layout = "grid", boldLink = "" }: { product: Product; layout?: "grid" | "list"; boldLink?: string }) {
  const [open, setOpen] = useState(false);
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

  const stop = (e: React.MouseEvent) => e.stopPropagation();

  if (layout === "list") {
    return (
      <>
        <article onClick={() => setOpen(true)} className="flex cursor-pointer gap-4 rounded-2xl border border-brand-100 bg-white p-3 shadow-sm hover:shadow-md transition">
          <div className="relative h-28 w-32 shrink-0 overflow-hidden rounded-xl bg-brand-50">
            <CoverImg src={cover} alt={product.name} />
            {gallery.length > 1 && (
              <span className="absolute bottom-1 right-1 rounded-full bg-black/60 px-1.5 py-0.5 text-[10px] font-semibold text-white">📷 {gallery.length}</span>
            )}
            {isNew(product.createdAt) && <span className="absolute left-1 top-1 rounded-full bg-accent-500 px-1.5 py-0.5 text-[10px] font-bold text-white">NUEVO</span>}
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
            {product.createdAt && <p className="text-[11px] text-brand-400">Publicado: {publishedLabel(product.createdAt)}</p>}
            <div className="mt-auto pt-2">
              <div className="flex items-center justify-between">
                <span className="font-serif text-lg font-bold text-brand-800">{formatCOP(product.price)}</span>
                <ReserveBtn onClick={(e) => { stop(e); onReserve(); }} disabled={sold} />
              </div>
              {!sold && payLink && <PayBtn href={payLink} onClick={stop} />}
            </div>
          </div>
        </article>
        {open && <ProductModal product={product} gallery={gallery} payLink={payLink} sold={sold} onReserve={onReserve} onClose={() => setOpen(false)} />}
      </>
    );
  }

  return (
    <>
      <article className="group flex flex-col overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-sm hover:shadow-lg transition">
        <div onClick={() => setOpen(true)} className="relative aspect-[4/3] cursor-pointer overflow-hidden bg-brand-50">
          <Gallery images={gallery} alt={product.name} />
          <span className="pointer-events-none absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold shadow-sm">
            <Paw className={`w-3.5 h-3.5 ${statusStyles[product.status]}`} />
            <span className={statusStyles[product.status]}>{statusLabel[product.status]}</span>
          </span>
          {isNew(product.createdAt) && <span className="absolute right-3 top-3 z-10 rounded-full bg-accent-500 px-2 py-0.5 text-[10px] font-bold text-white shadow">NUEVO</span>}
        </div>
        <div className="flex flex-1 flex-col p-4">
          <div className="flex items-center gap-2 text-xs text-brand-400">
            <span>{sizeLabel[product.size]}</span>
            <span>·</span>
            <span className="capitalize">{product.sex}</span>
            <span>·</span>
            <span>{product.ageWeeks} sem</span>
          </div>
          <button onClick={() => setOpen(true)} className="mt-1 text-left font-serif text-xl font-bold text-brand-900 hover:text-accent-700">
            {product.name}
          </button>
          {product.createdAt && <p className="text-[11px] text-brand-400">Publicado: {publishedLabel(product.createdAt)}</p>}
          <div className="mt-auto pt-3">
            <div className="flex items-center justify-between">
              <span className="font-serif text-lg font-bold text-brand-800">{formatCOP(product.price)}</span>
              <ReserveBtn onClick={(e) => { stop(e); onReserve(); }} disabled={sold} />
            </div>
            {!sold && payLink && <PayBtn href={payLink} onClick={stop} />}
            <button onClick={() => setOpen(true)} className="mt-2 w-full rounded-lg border border-brand-200 px-3 py-1.5 text-sm font-medium text-brand-600 hover:bg-brand-50">
              Ver detalles
            </button>
          </div>
        </div>
      </article>
      {open && <ProductModal product={product} gallery={gallery} payLink={payLink} sold={sold} onReserve={onReserve} onClose={() => setOpen(false)} />}
    </>
  );
}

function ProductModal({
  product,
  gallery,
  payLink,
  sold,
  onReserve,
  onClose,
}: {
  product: Product;
  gallery: string[];
  payLink: string;
  sold: boolean;
  onReserve: () => void;
  onClose: () => void;
}) {
  const meta: [string, string][] = [
    ["Raza", product.breed],
    ["Color", product.color],
    ["Sexo", product.sex],
    ["Edad", `${product.ageWeeks} semanas`],
    ["Tamaño", sizeLabel[product.size]],
    ["Estado", statusLabel[product.status]],
  ];
  return (
    <div onClick={onClose} className="fixed inset-0 z-[60] grid place-items-center bg-black/60 p-4">
      <div onClick={(e) => e.stopPropagation()} className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        <button onClick={onClose} aria-label="Cerrar" className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-brand-700 shadow hover:bg-white">
          <X className="w-5 h-5" />
        </button>
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-3xl bg-brand-50">
          <Gallery images={gallery} alt={product.name} />
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1 text-sm font-semibold ${statusStyles[product.status]}`}>
              <Paw className="w-4 h-4" /> {statusLabel[product.status]}
            </span>
          </div>
          <h2 className="mt-1 font-serif text-2xl font-bold text-brand-900">{product.name}</h2>
          <p className="mt-1 font-serif text-2xl font-bold text-accent-600">{formatCOP(product.price)}</p>
          {product.createdAt && <p className="mt-1 text-xs text-brand-400">Publicado el {publishedLabel(product.createdAt)}</p>}

          <p className="mt-3 text-sm text-brand-600">{product.description}</p>

          <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3">
            {meta.map(([k, v]) => (
              <div key={k}>
                <dt className="text-[11px] uppercase tracking-wide text-brand-400">{k}</dt>
                <dd className="text-sm font-medium capitalize text-brand-800">{v}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-4 flex flex-wrap gap-3 text-xs text-brand-600">
            {product.vaccinated && <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 font-medium text-emerald-700"><Check className="w-3.5 h-3.5" /> Vacunado</span>}
            {product.dewormed && <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 font-medium text-emerald-700"><Check className="w-3.5 h-3.5" /> Desparasitado</span>}
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 font-medium text-emerald-700"><Check className="w-3.5 h-3.5" /> Certificado de pureza</span>
          </div>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            {!sold && (
              <button onClick={onReserve} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-accent-500 px-5 py-3 font-semibold text-white hover:bg-accent-600">
                <Whatsapp className="w-5 h-5" /> Reservar por WhatsApp
              </button>
            )}
            {!sold && payLink && (
              <a href={payLink} target="_blank" rel="noopener noreferrer" className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-grape-700 px-5 py-3 font-semibold text-white hover:bg-grape-800">
                💳 Pagar en línea (Bold)
              </a>
            )}
            {sold && <span className="flex-1 rounded-xl bg-brand-100 px-5 py-3 text-center font-semibold text-brand-400">Vendido</span>}
          </div>
        </div>
      </div>
    </div>
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
  const go = (e: React.MouseEvent, d: number) => {
    e.stopPropagation();
    setI((p) => (p + d + n) % n);
  };
  return (
    <div className="absolute inset-0">
      <GalleryImg key={i} src={list[i]} alt={alt} />
      {n > 1 && (
        <>
          <button onClick={(e) => go(e, -1)} aria-label="Anterior" className="absolute left-2 top-1/2 z-10 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-lg text-brand-800 shadow hover:bg-white">‹</button>
          <button onClick={(e) => go(e, 1)} aria-label="Siguiente" className="absolute right-2 top-1/2 z-10 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-lg text-brand-800 shadow hover:bg-white">›</button>
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

function PayBtn({ href, onClick }: { href: string; onClick?: (e: React.MouseEvent) => void }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-grape-700 px-3.5 py-2 text-sm font-semibold text-white hover:bg-grape-800 transition"
    >
      💳 Pagar en línea (Bold)
    </a>
  );
}

function ReserveBtn({ onClick, disabled }: { onClick: (e: React.MouseEvent) => void; disabled?: boolean }) {
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

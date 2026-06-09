"use client";

import { useState } from "react";
import Link from "next/link";
import { site } from "@/data/site";
import { Paw, X } from "./icons";

export default function Navbar() {
  const [bannerOpen, setBannerOpen] = useState(true);

  return (
    <header className="sticky top-0 z-40">
      {bannerOpen && (
        <div className="bg-brand-900 text-brand-50 text-xs sm:text-sm">
          <div className="relative mx-auto max-w-7xl px-10 py-2.5 flex items-center justify-center gap-2 text-center">
            <Truck />
            <p className="font-medium">
              <span className="font-semibold">Entregas a domicilio en toda {site.country}</span>{" "}
              <span className="hidden sm:inline text-brand-200">— Envíos seguros y responsables</span>
            </p>
            <button
              onClick={() => setBannerOpen(false)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-200 hover:text-white"
              aria-label="Cerrar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
      <div className="bg-white/90 backdrop-blur border-b border-brand-100">
        <nav className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between gap-2">
          <Link href="/" className="flex min-w-0 items-center gap-2.5 sm:gap-3">
            <span className="grid shrink-0 place-items-center w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-brand-500 text-brand-600">
              <Paw className="w-5 h-5 sm:w-6 sm:h-6" />
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block truncate font-serif text-base sm:text-lg font-bold text-brand-900">{site.name}</span>
              <span className="block truncate text-[10px] sm:text-[11px] tracking-wider uppercase text-brand-500">
                {site.tagline}
              </span>
            </span>
          </Link>
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
            <a
              href="#catalogo"
              className="hidden sm:inline-flex items-center rounded-full bg-brand-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-900 transition"
            >
              Ver Catálogo
            </a>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2.5 text-sm font-medium text-brand-700 hover:bg-brand-50 transition"
            >
              Admin
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

function Truck() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13" rx="1" />
      <path d="M16 8h4l3 3v5h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  );
}

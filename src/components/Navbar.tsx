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
        <div className="bg-brand-900 text-brand-50 text-sm">
          <div className="mx-auto max-w-7xl px-4 py-2.5 flex items-center justify-center gap-2 text-center">
            <Truck />
            <p className="font-medium">
              <span className="font-semibold">Entregas a domicilio en toda {site.country}</span>{" "}
              <span className="hidden sm:inline text-brand-200">— Envíos seguros y responsables</span>
            </p>
            <button
              onClick={() => setBannerOpen(false)}
              className="absolute right-4 text-brand-200 hover:text-white"
              aria-label="Cerrar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
      <div className="bg-white/90 backdrop-blur border-b border-brand-100">
        <nav className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid place-items-center w-11 h-11 rounded-full border-2 border-brand-500 text-brand-600">
              <Paw className="w-6 h-6" />
            </span>
            <span className="leading-tight">
              <span className="block font-serif text-lg font-bold text-brand-900">{site.name}</span>
              <span className="block text-[11px] tracking-wider uppercase text-brand-500">
                {site.tagline}
              </span>
            </span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="#catalogo"
              className="hidden sm:inline-flex items-center rounded-full bg-brand-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-900 transition"
            >
              Ver Catálogo
            </a>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-medium text-brand-700 hover:bg-brand-50 transition"
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

"use client";

import { useEffect, useState } from "react";
import { getSettings } from "@/lib/settings";
import { site, whatsappLink } from "@/data/site";
import { Paw, Facebook, Instagram, TikTok, Whatsapp } from "./icons";

export default function Hero() {
  const [bg, setBg] = useState<string>("");

  useEffect(() => {
    getSettings().then((s) => setBg(s.hero_image || "")).catch(() => {});
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-accent-50 to-cream">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          {/* TEXTO */}
          <div className="order-2 text-center lg:order-1 lg:text-left">
            <p className="font-semibold uppercase tracking-[0.2em] text-accent-600 text-xs sm:text-sm">
              Nuestros Cachorros
            </p>
            <h1 className="mt-2 font-serif text-5xl sm:text-6xl xl:text-7xl font-bold text-brand-950">
              {site.name}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base sm:text-lg text-brand-700 text-balance lg:mx-0">
              Cachorros de raza pura, sanos y criados con amor. Especialistas en{" "}
              <span className="font-semibold text-brand-900">Bulldog Francés, Teckel/Dachshund, Caniche, Cockapoo, Pomerania y American Bully Pocket</span>. ¡Encuentra tu compañero ideal!
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <a
                href="#catalogo"
                className="inline-flex items-center gap-2 rounded-full bg-accent-500 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-accent-600 transition"
              >
                <Paw className="w-4 h-4" /> Ver catálogo
              </a>
              <div className="flex items-center gap-2.5">
                <Social href={whatsappLink("¡Hola Puppies House! 🐾 Quiero información sobre los cachorros.")} label="WhatsApp"><Whatsapp className="w-5 h-5" /></Social>
                <Social href={site.social.instagram} label="Instagram"><Instagram className="w-5 h-5" /></Social>
                <Social href={site.social.facebook} label="Facebook"><Facebook className="w-5 h-5" /></Social>
                <Social href={site.social.tiktok} label="TikTok"><TikTok className="w-5 h-5" /></Social>
              </div>
            </div>
          </div>

          {/* FOTO */}
          <div className="order-1 lg:order-2">
            <div className="relative overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-white/60">
              {bg ? (
                <img src={bg} alt="Puppies House Pet Shop" className="h-72 w-full object-cover sm:h-96 lg:h-[30rem]" />
              ) : (
                <div className="grid h-72 w-full place-items-center bg-gradient-to-br from-accent-400 to-grape-600 text-white sm:h-96 lg:h-[30rem]">
                  <div className="text-center">
                    <Paw className="mx-auto h-16 w-16 opacity-90" />
                    <p className="mt-3 font-serif text-2xl font-bold">Bulldog Francés & Teckel</p>
                    <p className="text-sm text-white/80">Sube tu foto en Admin → Configuración</p>
                  </div>
                </div>
              )}
              {/* etiqueta envíos */}
              <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-brand-800 shadow-md backdrop-blur">
                ✈️ Envíos nacionales e internacionales
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Encabezado del catálogo */}
      <div className="mx-auto max-w-7xl px-4 pb-2 pt-4 text-center">
        <h2 className="font-serif text-4xl sm:text-5xl font-bold text-brand-950">Catálogo</h2>
        <div className="mt-2 flex justify-center text-accent-500">
          <Paw className="w-6 h-6" />
        </div>
      </div>
    </section>
  );
}

function Social({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid h-10 w-10 place-items-center rounded-full bg-white text-accent-600 shadow-sm ring-1 ring-brand-100 hover:bg-accent-500 hover:text-white transition"
    >
      {children}
    </a>
  );
}

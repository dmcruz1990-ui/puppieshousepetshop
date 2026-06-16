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
    <section className="relative overflow-hidden">
      {bg && (
        <>
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${bg})` }} />
          <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/80 to-cream" />
        </>
      )}
      <div className="relative mx-auto max-w-7xl px-4 pt-10 pb-6 text-center sm:pt-14">
        <p className="font-semibold uppercase tracking-[0.2em] text-accent-600 text-xs sm:text-sm">
          Nuestros Cachorros
        </p>
        <h1 className="mt-2 font-serif text-5xl sm:text-7xl font-bold text-brand-950">Catálogo</h1>
        <div className="mt-3 flex justify-center text-accent-500">
          <Paw className="w-6 h-6" />
        </div>
        <p className="mx-auto mt-3 max-w-2xl text-base sm:text-lg text-brand-600 text-balance">
          Cachorros de raza pura, sanos y criados con amor. Bulldog Francés y Teckel/Dachshund.
          ¡Encuentra tu compañero ideal!
        </p>
        <div className="mt-5 flex items-center justify-center gap-3">
          <Social href={whatsappLink("¡Hola Puppies House! 🐾 Quiero información sobre los cachorros.")} label="WhatsApp"><Whatsapp className="w-5 h-5" /></Social>
          <Social href={site.social.instagram} label="Instagram"><Instagram className="w-5 h-5" /></Social>
          <Social href={site.social.facebook} label="Facebook"><Facebook className="w-5 h-5" /></Social>
          <Social href={site.social.tiktok} label="TikTok"><TikTok className="w-5 h-5" /></Social>
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

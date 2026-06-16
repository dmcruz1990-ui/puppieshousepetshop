"use client";

import { useEffect, useState } from "react";
import { getSettings } from "@/lib/settings";
import { Paw } from "./icons";

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
      </div>
    </section>
  );
}

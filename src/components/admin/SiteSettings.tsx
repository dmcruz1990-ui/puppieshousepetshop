"use client";

import { useEffect, useRef, useState } from "react";
import { getSettings, setSetting } from "@/lib/settings";
import { uploadImage } from "@/lib/catalog";

export default function SiteSettings() {
  const [bold, setBold] = useState("");
  const [hero, setHero] = useState("");
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getSettings().then((s) => {
      setBold(s.bold_link || "");
      setHero(s.hero_image || "");
    }).catch(() => {});
  }, []);

  const saveBold = async () => {
    try {
      await setSetting("bold_link", bold);
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    } catch {
      alert("No se pudo guardar. ¿Creaste la tabla 'settings' y hay sesión activa?");
    }
  };

  const onHero = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file, "hero");
      await setSetting("hero_image", url);
      setHero(url);
    } catch {
      alert("No se pudo subir la imagen de fondo.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-brand-100 bg-white p-5">
        <h3 className="font-semibold text-brand-900">💳 Pago en línea (Bold Colombia)</h3>
        <p className="text-sm text-brand-400">Pega tu link de pago de Bold. Aparecerá como botón “Pagar en línea” en los cachorros.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <input
            value={bold}
            onChange={(e) => setBold(e.target.value)}
            placeholder="https://checkout.bold.co/payment/..."
            className="min-w-0 flex-1 rounded-lg border border-brand-200 px-3 py-2 text-sm outline-none focus:border-accent-500"
          />
          <button onClick={saveBold} className="rounded-lg bg-accent-500 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-600">
            {saved ? "¡Guardado!" : "Guardar"}
          </button>
        </div>
        <p className="mt-2 text-xs text-brand-400">Este es el link general. También puedes poner un link distinto por cachorro en Catálogo.</p>
      </div>

      <div className="rounded-2xl border border-brand-100 bg-white p-5">
        <h3 className="font-semibold text-brand-900">🖼️ Foto de fondo (portada)</h3>
        <p className="text-sm text-brand-400">Se muestra detrás del título principal de la web.</p>
        <div className="mt-3 flex items-center gap-4">
          <div className="grid h-20 w-32 place-items-center overflow-hidden rounded-xl border border-brand-100 bg-brand-50">
            {hero ? <img src={hero} alt="Fondo" className="h-full w-full object-cover" /> : <span className="text-xs text-brand-400">Sin fondo</span>}
          </div>
          <button onClick={() => fileRef.current?.click()} className="rounded-full bg-accent-500 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-600">
            {uploading ? "Subiendo…" : "Subir fondo"}
          </button>
          <input ref={fileRef} type="file" accept="image/*" onChange={onHero} className="hidden" />
        </div>
      </div>
    </div>
  );
}

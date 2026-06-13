"use client";

import { useEffect, useRef, useState } from "react";
import { getLogo, setLogo } from "@/lib/clientStore";
import { readImageResized } from "@/lib/image";
import { Paw } from "@/components/icons";

export default function LogoUploader() {
  const [logo, setLogoState] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => setLogoState(getLogo()), []);

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await readImageResized(file, 300, 0.9);
    setLogo(url);
    setLogoState(url);
  };

  const remove = () => {
    setLogo(null);
    setLogoState(null);
  };

  return (
    <div className="rounded-2xl border border-brand-100 bg-white p-5">
      <h3 className="font-semibold text-brand-900">Logo del negocio</h3>
      <p className="text-sm text-brand-400">Súbelo y aparecerá en el encabezado y el pie del sitio.</p>
      <div className="mt-4 flex items-center gap-4">
        <div className="grid h-20 w-20 place-items-center overflow-hidden rounded-xl border border-brand-100 bg-brand-50">
          {logo ? (
            <img src={logo} alt="Logo" className="h-full w-full object-cover" />
          ) : (
            <Paw className="h-8 w-8 text-accent-500" />
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => fileRef.current?.click()} className="rounded-full bg-accent-500 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-600">
            Subir logo
          </button>
          {logo && (
            <button onClick={remove} className="rounded-full border border-brand-200 px-4 py-2 text-sm font-medium text-brand-600 hover:bg-brand-50">
              Quitar
            </button>
          )}
          <input ref={fileRef} type="file" accept="image/*" onChange={onFile} className="hidden" />
        </div>
      </div>
      <p className="mt-3 text-xs text-brand-400">Recomendado: PNG cuadrado con fondo transparente.</p>
    </div>
  );
}

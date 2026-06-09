"use client";

import { useState } from "react";
import { addLead } from "@/lib/clientStore";
import { site } from "@/data/site";
import { Heart, Check } from "./icons";

export default function InterestForm() {
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      addLead({ ...form, source: "formulario" });
    } catch {
      /* demo: no romper si falla */
    } finally {
      setDone(true);
      setLoading(false);
    }
  };

  return (
    <section id="contacto" className="mx-auto max-w-7xl px-4 py-16">
      <div className="grid items-center gap-10 rounded-3xl bg-brand-900 p-8 sm:p-12 lg:grid-cols-2">
        <div className="text-brand-50">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-800 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-100">
            <Heart className="w-4 h-4" /> Encuentra tu compañero
          </span>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl font-bold">
            ¿Aún no decides? Te ayudamos a elegir
          </h2>
          <p className="mt-3 text-brand-200">
            Déjanos tus datos y un asesor te contactará con disponibilidad, fotos en vivo y planes
            de entrega segura en toda Colombia. Sin compromiso.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-brand-100">
            {site.includes.map((t) => (
              <li key={t} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-brand-300" /> {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl bg-white p-6 sm:p-8">
          {done ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                <Check className="w-7 h-7" />
              </span>
              <h3 className="mt-4 font-serif text-2xl font-bold text-brand-900">¡Gracias! 🐾</h3>
              <p className="mt-2 text-brand-500">
                Hemos recibido tus datos. Un asesor te contactará muy pronto.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <h3 className="font-serif text-xl font-bold text-brand-900">Quiero más información</h3>
              <Field label="Nombre" value={form.name} onChange={(v) => setForm({ ...form, name: v })} required placeholder="Tu nombre" />
              <Field label="WhatsApp" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} required placeholder="+57 300 000 0000" />
              <Field label="Correo (opcional)" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="tucorreo@email.com" />
              <div>
                <label className="block text-sm font-medium text-brand-700 mb-1">¿Qué cachorro buscas?</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={3}
                  placeholder="Ej: Busco un perro pequeño para apartamento"
                  className="w-full rounded-xl border border-brand-200 px-4 py-2.5 text-sm outline-none focus:border-brand-500"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-brand-800 px-5 py-3 font-semibold text-white hover:bg-brand-900 transition disabled:opacity-60"
              >
                {loading ? "Enviando..." : "Enviar y recibir asesoría"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-brand-700 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-brand-200 px-4 py-2.5 text-sm outline-none focus:border-brand-500"
      />
    </div>
  );
}

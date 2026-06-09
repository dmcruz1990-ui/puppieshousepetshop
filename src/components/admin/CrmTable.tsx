"use client";

import { useMemo, useState } from "react";
import { updateLeadStatus, type Lead, type LeadStatus } from "@/lib/clientStore";
import { Whatsapp } from "@/components/icons";

const STATUSES: LeadStatus[] = ["nuevo", "contactado", "negociando", "cerrado", "perdido"];

const statusStyles: Record<LeadStatus, string> = {
  nuevo: "bg-blue-100 text-blue-700",
  contactado: "bg-amber-100 text-amber-700",
  negociando: "bg-violet-100 text-violet-700",
  cerrado: "bg-emerald-100 text-emerald-700",
  perdido: "bg-rose-100 text-rose-700",
};

function waLink(phone: string, name: string, product?: string) {
  const clean = phone.replace(/[^0-9]/g, "");
  const msg = encodeURIComponent(
    `¡Hola ${name}! 🐾 Te escribimos de Puppies House Pet Shop${product ? ` por tu interés en el ${product}` : ""}. ¿Te gustaría agendar una visita o recibir más fotos?`,
  );
  return `https://wa.me/${clean}?text=${msg}`;
}

export default function CrmTable({ initial }: { initial: Lead[] }) {
  const [leads, setLeads] = useState(initial);
  const [filter, setFilter] = useState<LeadStatus | "todos">("todos");
  const [source, setSource] = useState<"todos" | "whatsapp" | "formulario">("todos");

  const filtered = useMemo(
    () =>
      leads.filter(
        (l) =>
          (filter === "todos" || l.status === filter) &&
          (source === "todos" || l.source === source),
      ),
    [leads, filter, source],
  );

  const setStatus = (id: string, status: LeadStatus) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    updateLeadStatus(id, status);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Chip active={filter === "todos"} onClick={() => setFilter("todos")}>Todos</Chip>
        {STATUSES.map((s) => (
          <Chip key={s} active={filter === s} onClick={() => setFilter(s)}>
            {s}
          </Chip>
        ))}
        <span className="mx-2 h-5 w-px bg-brand-200" />
        <select
          value={source}
          onChange={(e) => setSource(e.target.value as typeof source)}
          className="rounded-full border border-brand-200 bg-white px-3 py-1.5 text-sm text-brand-700 outline-none"
        >
          <option value="todos">Todas las fuentes</option>
          <option value="whatsapp">WhatsApp</option>
          <option value="formulario">Formulario</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-brand-100 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-brand-50 text-left text-brand-500">
            <tr>
              <th className="px-5 py-3 font-medium">Lead</th>
              <th className="px-5 py-3 font-medium">Interés</th>
              <th className="px-5 py-3 font-medium">Fuente</th>
              <th className="px-5 py-3 font-medium">Fecha</th>
              <th className="px-5 py-3 font-medium">Estado</th>
              <th className="px-5 py-3 font-medium text-right">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-50">
            {filtered.map((l) => (
              <tr key={l.id} className="hover:bg-brand-50/50">
                <td className="px-5 py-3">
                  <p className="font-medium text-brand-900">{l.name}</p>
                  <p className="text-xs text-brand-400">{l.phone}{l.email ? ` · ${l.email}` : ""}</p>
                </td>
                <td className="px-5 py-3 text-brand-600">
                  {l.productName || <span className="text-brand-400">Consulta general</span>}
                  {l.message && <p className="text-xs text-brand-400 line-clamp-1">{l.message}</p>}
                </td>
                <td className="px-5 py-3">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${l.source === "whatsapp" ? "bg-emerald-100 text-emerald-700" : "bg-brand-100 text-brand-700"}`}>
                    {l.source}
                  </span>
                </td>
                <td className="px-5 py-3 text-brand-500">{new Date(l.createdAt).toLocaleDateString("es-CO")}</td>
                <td className="px-5 py-3">
                  <select
                    value={l.status}
                    onChange={(e) => setStatus(l.id, e.target.value as LeadStatus)}
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold outline-none ${statusStyles[l.status]}`}
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </td>
                <td className="px-5 py-3 text-right">
                  <a
                    href={waLink(l.phone, l.name, l.productName)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-600"
                  >
                    <Whatsapp className="w-3.5 h-3.5" /> Contactar
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p className="py-10 text-center text-sm text-brand-400">No hay leads con este filtro.</p>
        )}
      </div>
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3.5 py-1.5 text-sm font-medium capitalize transition ${
        active ? "border-accent-500 bg-accent-500 text-white" : "border-brand-200 bg-white text-brand-600 hover:border-brand-400"
      }`}
    >
      {children}
    </button>
  );
}

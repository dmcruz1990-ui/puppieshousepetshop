"use client";

import { useEffect, useState } from "react";
import { getDashboard, getSales, getLeads, type Lead, type Sale } from "@/lib/clientStore";
import { formatCOP } from "@/data/site";
import { PageHeader, StatCard, BarChart } from "@/components/admin/ui";

const leadStatusStyles: Record<string, string> = {
  nuevo: "bg-blue-100 text-blue-700",
  contactado: "bg-amber-100 text-amber-700",
  negociando: "bg-violet-100 text-violet-700",
  cerrado: "bg-emerald-100 text-emerald-700",
  perdido: "bg-rose-100 text-rose-700",
};

type Data = ReturnType<typeof getDashboard>;

export default function Dashboard() {
  const [d, setD] = useState<Data | null>(null);
  const [sales, setSales] = useState<Sale[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    setD(getDashboard());
    setSales(getSales().slice(0, 5));
    setLeads(getLeads().slice(0, 5));
  }, []);

  if (!d) return <div className="p-10 text-brand-400">Cargando…</div>;

  return (
    <div>
      <PageHeader title="Dashboard" subtitle="Resumen del negocio en tiempo real" />
      <div className="p-6 space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Ventas del mes" value={formatCOP(d.revenueMonth)} hint={`${d.salesCount} ventas totales`} tone="emerald" />
          <StatCard label="Ingresos totales" value={formatCOP(d.revenueTotal)} hint="Histórico" tone="brand" />
          <StatCard label="Cachorros disponibles" value={String(d.available)} hint={`Valor inventario ${formatCOP(d.inventoryValue)}`} tone="amber" />
          <StatCard label="Leads abiertos" value={String(d.openLeads)} hint={`${d.newLeads} nuevos hoy`} tone="rose" />
        </div>

        <div className="rounded-2xl border border-brand-100 bg-white p-5">
          <h2 className="font-serif text-lg font-bold text-brand-900">Ventas (últimos 6 meses)</h2>
          <div className="mt-4">
            <BarChart data={d.byMonth} />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-brand-100 bg-white p-5">
            <h2 className="font-serif text-lg font-bold text-brand-900">Ventas recientes</h2>
            <ul className="mt-4 divide-y divide-brand-50">
              {sales.map((s) => (
                <li key={s.id} className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium text-brand-900">{s.productName}</p>
                    <p className="text-xs text-brand-400">{s.buyerName} · {new Date(s.date).toLocaleDateString("es-CO")}</p>
                  </div>
                  <span className="font-semibold text-brand-800">{formatCOP(s.price)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-brand-100 bg-white p-5">
            <h2 className="font-serif text-lg font-bold text-brand-900">Leads recientes</h2>
            <ul className="mt-4 divide-y divide-brand-50">
              {leads.map((l) => (
                <li key={l.id} className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium text-brand-900">{l.name}</p>
                    <p className="text-xs text-brand-400">
                      {l.productName ? `Interés: ${l.productName}` : "Consulta general"} · {l.source}
                    </p>
                  </div>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${leadStatusStyles[l.status]}`}>
                    {l.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

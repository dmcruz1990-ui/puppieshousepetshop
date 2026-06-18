"use client";

import { useEffect, useState } from "react";
import { fetchSales } from "@/lib/admin";
import type { Sale } from "@/lib/clientStore";
import { formatCOP } from "@/data/site";
import { PageHeader, StatCard } from "@/components/admin/ui";

export default function VentasPage() {
  const [sales, setSales] = useState<Sale[] | null>(null);
  useEffect(() => { fetchSales().then(setSales).catch(() => setSales([])); }, []);
  if (!sales) return <div className="p-10 text-brand-400">Cargando…</div>;

  const total = sales.reduce((a, s) => a + s.price, 0);
  const avg = sales.length ? total / sales.length : 0;
  const wpp = sales.filter((s) => s.channel === "whatsapp").length;

  return (
    <div>
      <PageHeader title="Ventas" subtitle="Historial de cachorros vendidos" />
      <div className="p-6 space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard label="Ingresos totales" value={formatCOP(total)} tone="emerald" />
          <StatCard label="Ticket promedio" value={formatCOP(avg)} tone="brand" />
          <StatCard label="Ventas por WhatsApp" value={`${wpp} / ${sales.length}`} tone="amber" />
        </div>

        <div className="overflow-x-auto rounded-2xl border border-brand-100 bg-white">
          <table className="w-full min-w-[600px] text-sm">
            <thead className="bg-brand-50 text-left text-brand-500">
              <tr>
                <th className="px-5 py-3 font-medium">Cachorro</th>
                <th className="px-5 py-3 font-medium">Comprador</th>
                <th className="px-5 py-3 font-medium">Canal</th>
                <th className="px-5 py-3 font-medium">Fecha</th>
                <th className="px-5 py-3 font-medium text-right">Precio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-50">
              {sales.map((s) => (
                <tr key={s.id} className="hover:bg-brand-50/50">
                  <td className="px-5 py-3 font-medium text-brand-900">{s.productName}</td>
                  <td className="px-5 py-3 text-brand-600">{s.buyerName}</td>
                  <td className="px-5 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${s.channel === "whatsapp" ? "bg-emerald-100 text-emerald-700" : "bg-brand-100 text-brand-700"}`}>{s.channel}</span>
                  </td>
                  <td className="px-5 py-3 text-brand-500">{new Date(s.date).toLocaleDateString("es-CO")}</td>
                  <td className="px-5 py-3 text-right font-semibold text-brand-800">{formatCOP(s.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

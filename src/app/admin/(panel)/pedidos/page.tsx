"use client";

import { useEffect, useState } from "react";
import { fetchOrders, updateOrderStatusDb } from "@/lib/admin";
import type { Order, OrderStatus } from "@/lib/clientStore";
import { formatCOP } from "@/data/site";
import { PageHeader, StatCard, TableWrap, Th, Badge } from "@/components/admin/ui";

const STATUSES: OrderStatus[] = ["nuevo", "pagado", "enviado", "entregado"];
const tone: Record<OrderStatus, "amber" | "blue" | "violet" | "emerald"> = {
  nuevo: "amber", pagado: "blue", enviado: "violet", entregado: "emerald",
};

export default function PedidosPage() {
  const [orders, setOrders] = useState<Order[] | null>(null);
  useEffect(() => { fetchOrders().then(setOrders).catch(() => setOrders([])); }, []);
  if (!orders) return <div className="p-10 text-brand-400">Cargando…</div>;

  const revenue = orders.reduce((a, o) => a + o.total, 0);
  const pending = orders.filter((o) => o.status === "nuevo" || o.status === "pagado").length;

  const setStatus = (id: string, status: OrderStatus) => {
    setOrders((prev) => (prev ? prev.map((o) => (o.id === id ? { ...o, status } : o)) : prev));
    updateOrderStatusDb(id, status);
  };

  return (
    <div>
      <PageHeader title="Pedidos" subtitle="Gestiona las compras realizadas en la tienda online" />
      <div className="p-6 space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard label="Total pedidos" value={String(orders.length)} tone="brand" />
          <StatCard label="Por gestionar" value={String(pending)} tone="amber" />
          <StatCard label="Ingresos" value={formatCOP(revenue)} tone="emerald" />
        </div>
        <TableWrap>
          <thead className="bg-brand-50">
            <tr><Th>Pedido</Th><Th>Cliente</Th><Th>Producto</Th><Th>Canal</Th><Th right>Total</Th><Th>Estado</Th></tr>
          </thead>
          <tbody className="divide-y divide-brand-50">
            {orders.map((o) => (
              <tr key={o.id} className="hover:bg-brand-50/50">
                <td className="px-5 py-3 font-medium text-brand-900">{o.id}</td>
                <td className="px-5 py-3 text-brand-700">{o.customer}</td>
                <td className="px-5 py-3 text-brand-600">{o.product}</td>
                <td className="px-5 py-3"><Badge tone={o.channel === "web" ? "accent" : "emerald"}>{o.channel}</Badge></td>
                <td className="px-5 py-3 text-right font-semibold text-brand-800">{formatCOP(o.total)}</td>
                <td className="px-5 py-3">
                  <select value={o.status} onChange={(e) => setStatus(o.id, e.target.value as OrderStatus)} className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize outline-none ${badgeCls(tone[o.status])}`}>
                    {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      </div>
    </div>
  );
}

function badgeCls(t: string) {
  const m: Record<string, string> = { amber: "bg-amber-100 text-amber-700", blue: "bg-blue-100 text-blue-700", violet: "bg-violet-100 text-violet-700", emerald: "bg-emerald-100 text-emerald-700" };
  return m[t] || "bg-slate-100 text-slate-600";
}

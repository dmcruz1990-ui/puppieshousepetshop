"use client";

import { useEffect, useState } from "react";
import { fetchDiscounts } from "@/lib/admin";
import type { Discount } from "@/lib/clientStore";
import { PageHeader, TableWrap, Th, Badge } from "@/components/admin/ui";

export default function DescuentosPage() {
  const [discounts, setDiscounts] = useState<Discount[] | null>(null);
  useEffect(() => { fetchDiscounts().then(setDiscounts).catch(() => setDiscounts([])); }, []);
  if (!discounts) return <div className="p-10 text-brand-400">Cargando…</div>;
  return (
    <div>
      <PageHeader title="Descuentos" subtitle="Cupones y promociones de la tienda" />
      <div className="p-6">
        <TableWrap>
          <thead className="bg-brand-50">
            <tr><Th>Código</Th><Th right>Descuento</Th><Th>Estado</Th></tr>
          </thead>
          <tbody className="divide-y divide-brand-50">
            {discounts.map((d) => (
              <tr key={d.id} className="hover:bg-brand-50/50">
                <td className="px-5 py-3 font-mono font-medium text-brand-900">{d.code}</td>
                <td className="px-5 py-3 text-right font-semibold text-brand-800">{d.percent > 0 ? `${d.percent}%` : "Envío gratis"}</td>
                <td className="px-5 py-3"><Badge tone={d.status === "activo" ? "emerald" : "slate"}>{d.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      </div>
    </div>
  );
}

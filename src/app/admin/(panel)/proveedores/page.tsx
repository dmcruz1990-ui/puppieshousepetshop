"use client";

import { useEffect, useState } from "react";
import { fetchSuppliers } from "@/lib/admin";
import type { Supplier } from "@/lib/clientStore";
import { PageHeader, TableWrap, Th, Badge } from "@/components/admin/ui";

export default function ProveedoresPage() {
  const [suppliers, setSuppliers] = useState<Supplier[] | null>(null);
  useEffect(() => { fetchSuppliers().then(setSuppliers).catch(() => setSuppliers([])); }, []);
  if (!suppliers) return <div className="p-10 text-brand-400">Cargando…</div>;
  return (
    <div>
      <PageHeader title="Proveedores" subtitle="Aliados de alimento, insumos y logística" />
      <div className="p-6">
        <TableWrap>
          <thead className="bg-brand-50">
            <tr><Th>Proveedor</Th><Th>Categoría</Th><Th>Contacto</Th><Th>Teléfono</Th></tr>
          </thead>
          <tbody className="divide-y divide-brand-50">
            {suppliers.map((s) => (
              <tr key={s.id} className="hover:bg-brand-50/50">
                <td className="px-5 py-3 font-medium text-brand-900">{s.name}</td>
                <td className="px-5 py-3"><Badge tone="grape">{s.category}</Badge></td>
                <td className="px-5 py-3 text-brand-600">{s.contact}</td>
                <td className="px-5 py-3 text-brand-600">{s.phone}</td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      </div>
    </div>
  );
}

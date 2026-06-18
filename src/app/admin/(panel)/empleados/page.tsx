"use client";

import { useEffect, useState } from "react";
import { fetchEmployees } from "@/lib/admin";
import type { Employee } from "@/lib/clientStore";
import { PageHeader, StatCard, TableWrap, Th, Badge } from "@/components/admin/ui";

export default function EmpleadosPage() {
  const [emps, setEmps] = useState<Employee[] | null>(null);
  useEffect(() => { fetchEmployees().then(setEmps).catch(() => setEmps([])); }, []);
  if (!emps) return <div className="p-10 text-brand-400">Cargando…</div>;
  const active = emps.filter((e) => e.status === "activo").length;
  return (
    <div>
      <PageHeader title="Empleados" subtitle="Equipo de la tienda y el criadero" />
      <div className="p-6 space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard label="Total" value={String(emps.length)} tone="brand" />
          <StatCard label="Activos" value={String(active)} tone="emerald" />
          <StatCard label="Inactivos" value={String(emps.length - active)} tone="rose" />
        </div>
        <TableWrap>
          <thead className="bg-brand-50">
            <tr><Th>Nombre</Th><Th>Rol</Th><Th>Teléfono</Th><Th>Estado</Th></tr>
          </thead>
          <tbody className="divide-y divide-brand-50">
            {emps.map((e) => (
              <tr key={e.id} className="hover:bg-brand-50/50">
                <td className="px-5 py-3 font-medium text-brand-900">{e.name}</td>
                <td className="px-5 py-3 text-brand-600">{e.role}</td>
                <td className="px-5 py-3 text-brand-600">{e.phone}</td>
                <td className="px-5 py-3"><Badge tone={e.status === "activo" ? "emerald" : "rose"}>{e.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      </div>
    </div>
  );
}

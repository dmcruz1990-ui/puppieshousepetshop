"use client";

import { useEffect, useState } from "react";
import { fetchShifts } from "@/lib/admin";
import type { Shift } from "@/lib/clientStore";
import { PageHeader, TableWrap, Th, Badge } from "@/components/admin/ui";

export default function TurnosPage() {
  const [shifts, setShifts] = useState<Shift[] | null>(null);
  useEffect(() => { fetchShifts().then(setShifts).catch(() => setShifts([])); }, []);
  if (!shifts) return <div className="p-10 text-brand-400">Cargando…</div>;
  return (
    <div>
      <PageHeader title="Turnos" subtitle="Horarios del personal" />
      <div className="p-6">
        <TableWrap>
          <thead className="bg-brand-50">
            <tr><Th>Empleado</Th><Th>Día</Th><Th>Entrada</Th><Th>Salida</Th><Th>Jornada</Th></tr>
          </thead>
          <tbody className="divide-y divide-brand-50">
            {shifts.map((s) => (
              <tr key={s.id} className="hover:bg-brand-50/50">
                <td className="px-5 py-3 font-medium text-brand-900">{s.employee}</td>
                <td className="px-5 py-3 text-brand-600">{s.day}</td>
                <td className="px-5 py-3 text-brand-600">{s.from}</td>
                <td className="px-5 py-3 text-brand-600">{s.to}</td>
                <td className="px-5 py-3"><Badge tone="accent">8 horas</Badge></td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      </div>
    </div>
  );
}

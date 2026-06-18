"use client";

import { useEffect, useState } from "react";
import type { Lead } from "@/lib/clientStore";
import { fetchLeads } from "@/lib/admin";
import { PageHeader, StatCard } from "@/components/admin/ui";
import CrmTable from "@/components/admin/CrmTable";

export default function CrmPage() {
  const [leads, setLeads] = useState<Lead[] | null>(null);

  useEffect(() => {
    fetchLeads().then(setLeads).catch(() => setLeads([]));
  }, []);

  if (!leads) return <div className="p-10 text-brand-400">Cargando…</div>;

  const nuevos = leads.filter((l) => l.status === "nuevo").length;
  const negociando = leads.filter((l) => l.status === "negociando").length;
  const cerrados = leads.filter((l) => l.status === "cerrado").length;

  return (
    <div>
      <PageHeader
        title="CRM / Leads"
        subtitle="Visitas y prospectos para seguimiento y remarketing"
      />
      <div className="p-6 space-y-6">
        <div className="grid gap-4 sm:grid-cols-4">
          <StatCard label="Total leads" value={String(leads.length)} tone="brand" />
          <StatCard label="Nuevos" value={String(nuevos)} tone="rose" />
          <StatCard label="Negociando" value={String(negociando)} tone="amber" />
          <StatCard label="Cerrados" value={String(cerrados)} tone="emerald" />
        </div>
        <CrmTable initial={leads} />
      </div>
    </div>
  );
}

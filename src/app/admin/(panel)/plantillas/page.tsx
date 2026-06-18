"use client";

import { useEffect, useState } from "react";
import { fetchTemplates } from "@/lib/admin";
import type { Template } from "@/lib/clientStore";
import { PageHeader, Card } from "@/components/admin/ui";

export default function PlantillasPage() {
  const [templates, setTemplates] = useState<Template[] | null>(null);
  useEffect(() => { fetchTemplates().then(setTemplates).catch(() => setTemplates([])); }, []);
  if (!templates) return <div className="p-10 text-brand-400">Cargando…</div>;
  return (
    <div>
      <PageHeader title="Plantillas de Mensajes" subtitle="Respuestas rápidas para WhatsApp y remarketing" />
      <div className="p-6 grid gap-4 sm:grid-cols-2">
        {templates.map((t) => (
          <Card key={t.id}>
            <h3 className="font-semibold text-brand-900">{t.title}</h3>
            <p className="mt-2 rounded-xl bg-brand-50 p-3 text-sm text-brand-600">{t.body}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

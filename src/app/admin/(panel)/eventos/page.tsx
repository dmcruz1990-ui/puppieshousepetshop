"use client";

import { useEffect, useState } from "react";
import { fetchEvents } from "@/lib/admin";
import type { EventItem } from "@/lib/clientStore";
import { PageHeader, Card, Badge } from "@/components/admin/ui";

export default function EventosPage() {
  const [events, setEvents] = useState<EventItem[] | null>(null);
  useEffect(() => { fetchEvents().then(setEvents).catch(() => setEvents([])); }, []);
  if (!events) return <div className="p-10 text-brand-400">Cargando…</div>;
  return (
    <div>
      <PageHeader title="Eventos" subtitle="Agenda de actividades del criadero" />
      <div className="p-6 space-y-3">
        {events.map((e) => (
          <Card key={e.id} className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-brand-900">{e.title}</h3>
              <p className="text-sm text-brand-400">{new Date(e.date).toLocaleDateString("es-CO", { weekday: "long", day: "numeric", month: "long" })}</p>
            </div>
            <Badge tone="grape">{e.type}</Badge>
          </Card>
        ))}
      </div>
    </div>
  );
}

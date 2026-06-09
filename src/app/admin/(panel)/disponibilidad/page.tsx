import { getAvailability } from "@/lib/clientStore";
import { PageHeader, Card } from "@/components/admin/ui";

export default function DisponibilidadPage() {
  const items = getAvailability();
  return (
    <div>
      <PageHeader title="Disponibilidad" subtitle="Cupos de visitas, videollamadas y entregas" />
      <div className="p-6 grid gap-4 sm:grid-cols-3">
        {items.map((a) => {
          const pct = Math.round((a.taken / a.slots) * 100);
          return (
            <Card key={a.id}>
              <h3 className="font-semibold text-brand-900">{a.label}</h3>
              <p className="mt-1 text-sm text-brand-400">{a.taken} de {a.slots} cupos ocupados</p>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-brand-100">
                <div className="h-full rounded-full bg-accent-500" style={{ width: `${pct}%` }} />
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

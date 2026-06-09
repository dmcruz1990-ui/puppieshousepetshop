import { getInventory } from "@/lib/clientStore";
import { formatCOP } from "@/data/site";
import { sizeLabel, statusLabel } from "@/data/products";
import { PageHeader, StatCard } from "@/components/admin/ui";

const statusStyles: Record<string, string> = {
  disponible: "bg-emerald-100 text-emerald-700",
  reservado: "bg-amber-100 text-amber-700",
  vendido: "bg-rose-100 text-rose-700",
};

export default function InventarioPage() {
  const inv = getInventory();
  const units = inv.reduce((a, p) => a + p.stock, 0);
  const value = inv.reduce((a, p) => a + p.value, 0);
  const lowStock = inv.filter((p) => p.status === "disponible" && p.stock <= 1).length;

  return (
    <div>
      <PageHeader title="Inventario" subtitle="Disponibilidad y valorización del catálogo" />
      <div className="p-6 space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard label="Unidades en stock" value={String(units)} tone="brand" />
          <StatCard label="Valor del inventario" value={formatCOP(value)} tone="emerald" />
          <StatCard label="Bajo stock" value={String(lowStock)} hint="≤ 1 unidad disponible" tone="rose" />
        </div>

        <div className="overflow-hidden rounded-2xl border border-brand-100 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-brand-50 text-left text-brand-500">
              <tr>
                <th className="px-5 py-3 font-medium">Raza</th>
                <th className="px-5 py-3 font-medium">Tamaño</th>
                <th className="px-5 py-3 font-medium">Estado</th>
                <th className="px-5 py-3 font-medium text-center">Stock</th>
                <th className="px-5 py-3 font-medium text-right">Precio</th>
                <th className="px-5 py-3 font-medium text-right">Valor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-50">
              {inv.map((p) => (
                <tr key={p.id} className="hover:bg-brand-50/50">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <img src={p.image} alt="" className="h-9 w-9 rounded-lg object-cover bg-brand-50" />
                      <span className="font-medium text-brand-900">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-brand-600">{sizeLabel[p.size]}</td>
                  <td className="px-5 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusStyles[p.status]}`}>
                      {statusLabel[p.status]}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-center">
                    <span className={p.stock <= 1 && p.status === "disponible" ? "font-bold text-rose-600" : "text-brand-700"}>
                      {p.stock}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right text-brand-600">{formatCOP(p.price)}</td>
                  <td className="px-5 py-3 text-right font-semibold text-brand-800">{formatCOP(p.value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

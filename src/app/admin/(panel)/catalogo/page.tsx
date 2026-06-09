import { getInventory } from "@/lib/clientStore";
import { formatCOP } from "@/data/site";
import { sizeLabel, statusLabel, type Product } from "@/data/products";
import { PageHeader, StatCard, TableWrap, Th, Badge } from "@/components/admin/ui";

const tone: Record<Product["status"], "emerald" | "amber" | "rose"> = {
  disponible: "emerald",
  reservado: "amber",
  vendido: "rose",
};

export default function CatalogoPage() {
  const items = getInventory();
  const available = items.filter((p) => p.status === "disponible").length;

  return (
    <div>
      <PageHeader title="Catálogo" subtitle="Administra los cachorros publicados en el sitio" />
      <div className="p-6 space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard label="Razas publicadas" value={String(items.length)} tone="brand" />
          <StatCard label="Disponibles" value={String(available)} tone="emerald" />
          <StatCard label="Reservados / vendidos" value={String(items.length - available)} tone="amber" />
        </div>
        <TableWrap>
          <thead className="bg-brand-50">
            <tr><Th>Cachorro</Th><Th>Tamaño</Th><Th right>Precio</Th><Th right>Stock</Th><Th>Estado</Th></tr>
          </thead>
          <tbody className="divide-y divide-brand-50">
            {items.map((p) => (
              <tr key={p.id} className="hover:bg-brand-50/50">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <img src={p.image} alt={p.name} className="h-10 w-10 rounded-lg object-cover" />
                    <span className="font-medium text-brand-900">{p.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-brand-600">{sizeLabel[p.size]}</td>
                <td className="px-5 py-3 text-right font-semibold text-brand-800">{formatCOP(p.price)}</td>
                <td className="px-5 py-3 text-right text-brand-600">{p.stock}</td>
                <td className="px-5 py-3"><Badge tone={tone[p.status]}>{statusLabel[p.status]}</Badge></td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      </div>
    </div>
  );
}

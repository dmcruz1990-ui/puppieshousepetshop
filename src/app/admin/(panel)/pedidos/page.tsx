import { getOrders, type OrderStatus } from "@/lib/clientStore";
import { formatCOP } from "@/data/site";
import { PageHeader, StatCard, TableWrap, Th, Badge } from "@/components/admin/ui";

const tone: Record<OrderStatus, "amber" | "blue" | "violet" | "emerald"> = {
  nuevo: "amber",
  pagado: "blue",
  enviado: "violet",
  entregado: "emerald",
};

export default function PedidosPage() {
  const orders = getOrders();
  const revenue = orders.reduce((a, o) => a + o.total, 0);
  const pending = orders.filter((o) => o.status === "nuevo" || o.status === "pagado").length;

  return (
    <div>
      <PageHeader title="Pedidos" subtitle="Gestiona las compras realizadas en la tienda online" />
      <div className="p-6 space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard label="Total pedidos" value={String(orders.length)} tone="brand" />
          <StatCard label="Por gestionar" value={String(pending)} tone="amber" />
          <StatCard label="Ingresos" value={formatCOP(revenue)} tone="emerald" />
        </div>
        <TableWrap>
          <thead className="bg-brand-50">
            <tr><Th>Pedido</Th><Th>Cliente</Th><Th>Producto</Th><Th>Canal</Th><Th right>Total</Th><Th>Estado</Th></tr>
          </thead>
          <tbody className="divide-y divide-brand-50">
            {orders.map((o) => (
              <tr key={o.id} className="hover:bg-brand-50/50">
                <td className="px-5 py-3 font-medium text-brand-900">{o.id}</td>
                <td className="px-5 py-3 text-brand-700">{o.customer}</td>
                <td className="px-5 py-3 text-brand-600">{o.product}</td>
                <td className="px-5 py-3"><Badge tone={o.channel === "web" ? "accent" : "emerald"}>{o.channel}</Badge></td>
                <td className="px-5 py-3 text-right font-semibold text-brand-800">{formatCOP(o.total)}</td>
                <td className="px-5 py-3"><Badge tone={tone[o.status]}>{o.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </TableWrap>
      </div>
    </div>
  );
}

import { getCategories } from "@/lib/clientStore";
import { PageHeader, Card } from "@/components/admin/ui";

export default function CategoriasPage() {
  const cats = getCategories();
  return (
    <div>
      <PageHeader title="Categorías" subtitle="Organiza los cachorros por tamaño y tipo" />
      <div className="p-6 grid gap-4 sm:grid-cols-3">
        {cats.map((c) => (
          <Card key={c.id}>
            <p className="text-sm text-brand-400">Categoría</p>
            <p className="mt-1 font-serif text-xl font-bold text-brand-900">{c.name}</p>
            <span className="mt-3 inline-block rounded-full bg-accent-100 px-3 py-1 text-xs font-semibold text-accent-700">
              {c.count} cachorros
            </span>
          </Card>
        ))}
      </div>
    </div>
  );
}

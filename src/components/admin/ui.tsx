import { formatCOP } from "@/data/site";

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3 border-b border-brand-100 bg-white px-6 py-5">
      <div>
        <h1 className="font-serif text-2xl font-bold text-brand-900">{title}</h1>
        {subtitle && <p className="text-sm text-brand-400">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function StatCard({
  label,
  value,
  hint,
  tone = "brand",
}: {
  label: string;
  value: string;
  hint?: string;
  tone?: "brand" | "emerald" | "amber" | "rose";
}) {
  const tones: Record<string, string> = {
    brand: "bg-brand-100 text-brand-700",
    emerald: "bg-emerald-100 text-emerald-700",
    amber: "bg-amber-100 text-amber-700",
    rose: "bg-rose-100 text-rose-700",
  };
  return (
    <div className="rounded-2xl border border-brand-100 bg-white p-5">
      <p className="text-sm text-brand-400">{label}</p>
      <p className="mt-1 font-serif text-2xl font-bold text-brand-900">{value}</p>
      {hint && (
        <span className={`mt-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${tones[tone]}`}>
          {hint}
        </span>
      )}
    </div>
  );
}

export function Money({ value }: { value: number }) {
  return <>{formatCOP(value)}</>;
}

export function BarChart({ data }: { data: { label: string; total: number }[] }) {
  const max = Math.max(...data.map((d) => d.total), 1);
  return (
    <div className="flex items-end gap-3 h-40">
      {data.map((d) => (
        <div key={d.label} className="flex flex-1 flex-col items-center gap-2">
          <div className="flex w-full flex-1 items-end">
            <div
              className="w-full rounded-t-lg bg-brand-500 transition-all"
              style={{ height: `${Math.max((d.total / max) * 100, 4)}%` }}
              title={formatCOP(d.total)}
            />
          </div>
          <span className="text-xs capitalize text-brand-400">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

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
  tone?: "brand" | "accent" | "grape" | "emerald" | "amber" | "rose" | "blue" | "violet";
}) {
  const tones: Record<string, string> = {
    brand: "bg-brand-100 text-brand-700",
    accent: "bg-accent-100 text-accent-700",
    grape: "bg-grape-100 text-grape-700",
    emerald: "bg-emerald-100 text-emerald-700",
    amber: "bg-amber-100 text-amber-700",
    rose: "bg-rose-100 text-rose-700",
    blue: "bg-blue-100 text-blue-700",
    violet: "bg-violet-100 text-violet-700",
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

const badgeTones: Record<string, string> = {
  brand: "bg-brand-100 text-brand-700",
  accent: "bg-accent-100 text-accent-700",
  grape: "bg-grape-100 text-grape-700",
  emerald: "bg-emerald-100 text-emerald-700",
  amber: "bg-amber-100 text-amber-700",
  rose: "bg-rose-100 text-rose-700",
  blue: "bg-blue-100 text-blue-700",
  violet: "bg-violet-100 text-violet-700",
  slate: "bg-slate-100 text-slate-600",
};

export function Badge({ tone = "slate", children }: { tone?: keyof typeof badgeTones; children: React.ReactNode }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${badgeTones[tone] ?? badgeTones.slate}`}>
      {children}
    </span>
  );
}

export function Chips<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { key: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o.key}
          onClick={() => onChange(o.key)}
          className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
            value === o.key
              ? "border-accent-500 bg-accent-500 text-white"
              : "border-brand-200 bg-white text-brand-600 hover:border-brand-400"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-brand-100 bg-white p-5 ${className}`}>{children}</div>;
}

export function TableWrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-brand-100 bg-white">
      <table className="w-full min-w-[640px] text-sm">{children}</table>
    </div>
  );
}

export function Th({ children, right }: { children: React.ReactNode; right?: boolean }) {
  return <th className={`px-5 py-3 font-medium text-brand-500 ${right ? "text-right" : "text-left"}`}>{children}</th>;
}

export function Placeholder({ title, text }: { title: string; text: string }) {
  return (
    <div className="p-6">
      <div className="rounded-3xl border border-dashed border-brand-200 bg-white p-10 text-center">
        <h2 className="font-serif text-xl font-bold text-brand-900">{title}</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-brand-400">{text}</p>
        <span className="mt-4 inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
          Módulo en construcción
        </span>
      </div>
    </div>
  );
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

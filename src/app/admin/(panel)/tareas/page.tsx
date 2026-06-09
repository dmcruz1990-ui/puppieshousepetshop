"use client";

import { useEffect, useState } from "react";
import { getTasks, setTaskStatus, type Task, type TaskStatus } from "@/lib/clientStore";
import { PageHeader, StatCard, Chips, Badge } from "@/components/admin/ui";

const statusTone: Record<TaskStatus, "amber" | "blue" | "violet" | "emerald"> = {
  pendiente: "amber",
  aceptada: "blue",
  "en progreso": "violet",
  completada: "emerald",
};
const priorityTone: Record<Task["priority"], "rose" | "amber" | "slate"> = {
  alta: "rose",
  media: "amber",
  baja: "slate",
};
const STATUSES: TaskStatus[] = ["pendiente", "aceptada", "en progreso", "completada"];

const filters = [
  { key: "todas", label: "Todas" },
  { key: "pendiente", label: "Pendientes" },
  { key: "aceptada", label: "Aceptadas" },
  { key: "en progreso", label: "En progreso" },
  { key: "completada", label: "Completadas" },
] as const;
type FilterKey = (typeof filters)[number]["key"];

export default function TareasPage() {
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [filter, setFilter] = useState<FilterKey>("todas");

  useEffect(() => setTasks(getTasks()), []);

  if (!tasks) return <div className="p-10 text-brand-400">Cargando…</div>;

  const visible = filter === "todas" ? tasks : tasks.filter((t) => t.status === filter);
  const update = (id: string, status: TaskStatus) => setTasks(setTaskStatus(id, status));
  const toggle = (t: Task) => update(t.id, t.status === "completada" ? "pendiente" : "completada");
  const count = (s: TaskStatus) => tasks.filter((t) => t.status === s).length;

  return (
    <div>
      <PageHeader title="Tareas" subtitle="Asigna y monitorea tareas del equipo" />
      <div className="p-6 space-y-6">
        <div>
          <h2 className="flex items-center gap-2 font-serif text-2xl font-bold text-brand-900">
            <svg viewBox="0 0 24 24" className="h-6 w-6 text-accent-600" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>
            Gestión de Tareas
          </h2>
          <p className="text-sm text-brand-400">Asigna y monitorea tareas para empleados y administradores.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Total" value={String(tasks.length)} tone="brand" />
          <StatCard label="Pendientes" value={String(count("pendiente"))} tone="amber" />
          <StatCard label="En progreso" value={String(count("en progreso"))} tone="violet" />
          <StatCard label="Completadas" value={String(count("completada"))} tone="emerald" />
        </div>

        <Chips options={filters as unknown as { key: FilterKey; label: string }[]} value={filter} onChange={setFilter} />

        <div className="space-y-3">
          {visible.map((t) => (
            <div key={t.id} className="flex items-start gap-3 rounded-2xl border border-brand-100 bg-white p-4">
              <input
                type="checkbox"
                checked={t.status === "completada"}
                onChange={() => toggle(t)}
                className="mt-1 h-5 w-5 shrink-0 cursor-pointer accent-accent-500"
                aria-label={`Completar ${t.title}`}
              />
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-50 text-accent-600">
                <TaskIcon name={t.icon} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className={`font-semibold text-brand-900 ${t.status === "completada" ? "line-through opacity-60" : ""}`}>{t.title}</h3>
                  <Badge tone={priorityTone[t.priority]}>{t.priority}</Badge>
                </div>
                <p className="text-sm text-brand-500">{t.description}</p>
                <p className="mt-1 text-xs text-brand-400">{t.area} · Asignado a {t.assignee}</p>
              </div>
              <select
                value={t.status}
                onChange={(e) => update(t.id, e.target.value as TaskStatus)}
                className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold capitalize outline-none ${badge(statusTone[t.status])}`}
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          ))}
          {visible.length === 0 && <p className="py-10 text-center text-sm text-brand-400">No hay tareas en este filtro.</p>}
        </div>
      </div>
    </div>
  );
}

function badge(tone: string) {
  const m: Record<string, string> = {
    amber: "bg-amber-100 text-amber-700",
    blue: "bg-blue-100 text-blue-700",
    violet: "bg-violet-100 text-violet-700",
    emerald: "bg-emerald-100 text-emerald-700",
  };
  return m[tone] ?? "bg-slate-100 text-slate-600";
}

function TaskIcon({ name }: { name: string }) {
  const paths: Record<string, string> = {
    bath: "M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3zM7 12V6a2 2 0 0 1 4 0",
    home: "M3 10l9-7 9 7v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM9 21V12h6v9",
    bowl: "M3 11h18a9 9 0 0 1-18 0zM12 11V7a3 3 0 0 1 3-3",
    syringe: "M18 2l4 4M17 5l2 2M14 7l3 3-7 7-3-1-1-3 7-7zM9 14l-5 5",
    spray: "M9 11h7v9a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1zM9 7h7M12 7V3M16 4l2-1M16 7l2 1",
    heart: "M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z",
    clipboard: "M9 2h6a1 1 0 0 1 1 1v2H8V3a1 1 0 0 1 1-1zM8 5H6a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2",
    camera: "M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  };
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d={paths[name] ?? paths.clipboard} />
    </svg>
  );
}

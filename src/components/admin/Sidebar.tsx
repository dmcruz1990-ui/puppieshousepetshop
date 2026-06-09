"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Paw } from "@/components/icons";
import { site } from "@/data/site";
import { signOut } from "@/lib/clientStore";

const nav = [
  { href: "/admin", label: "Dashboard", icon: "M3 12l9-9 9 9M5 10v10h14V10" },
  { href: "/admin/ventas", label: "Ventas", icon: "M3 3v18h18M7 14l4-4 3 3 5-6" },
  { href: "/admin/inventario", label: "Inventario", icon: "M21 16V8l-9-5-9 5v8l9 5 9-5zM3 8l9 5 9-5" },
  { href: "/admin/crm", label: "CRM / Leads", icon: "M17 20v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0 .01M23 20v-2a4 4 0 0 0-3-3.87" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const logout = () => {
    signOut();
    router.push("/admin/login");
  };

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-brand-100 bg-white">
      <div className="flex items-center gap-3 border-b border-brand-100 p-5">
        <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-brand-500 text-brand-600">
          <Paw className="w-5 h-5" />
        </span>
        <div className="leading-tight">
          <p className="text-xs uppercase tracking-wider text-brand-400">Panel Admin</p>
          <p className="font-serif text-base font-bold text-brand-900">{site.shortName}</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {nav.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                active ? "bg-brand-800 text-white" : "text-brand-600 hover:bg-brand-50"
              }`}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d={item.icon} />
              </svg>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-1 border-t border-brand-100 p-3">
        <Link href="/" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-brand-600 hover:bg-brand-50">
          ← Ver sitio
        </Link>
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-rose-600 hover:bg-rose-50"
        >
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}

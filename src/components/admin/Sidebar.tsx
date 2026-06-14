"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Paw } from "@/components/icons";
import { site } from "@/data/site";
import { supabase } from "@/lib/supabase";

const nav: { href: string; label: string; icon: string }[] = [
  { href: "/admin", label: "Dashboard", icon: "M3 12l9-9 9 9M5 10v10h14V10" },
  { href: "/admin/pedidos", label: "Pedidos", icon: "M6 2l1.5 2h9L18 2M5 6h14l-1 14H6L5 6zM9 10v6M15 10v6" },
  { href: "/admin/catalogo", label: "Catálogo", icon: "M4 5h16v14H4zM4 9h16M9 9v10" },
  { href: "/admin/categorias", label: "Categorías", icon: "M3 7l9-4 9 4-9 4-9-4zM3 7v10l9 4 9-4V7" },
  { href: "/admin/inventario", label: "Inventario", icon: "M21 16V8l-9-5-9 5v8l9 5 9-5zM3 8l9 5 9-5" },
  { href: "/admin/ventas", label: "Ventas", icon: "M3 3v18h18M7 14l4-4 3 3 5-6" },
  { href: "/admin/empleados", label: "Empleados", icon: "M17 20v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 7a4 4 0 1 0 0 .01M23 20v-2a4 4 0 0 0-3-3.87" },
  { href: "/admin/turnos", label: "Turnos", icon: "M12 6v6l4 2M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z" },
  { href: "/admin/plantillas", label: "Plantillas Mensajes", icon: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" },
  { href: "/admin/tareas", label: "Tareas", icon: "M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" },
  { href: "/admin/funciones", label: "Funciones", icon: "M3 7h18M3 12h18M3 17h18" },
  { href: "/admin/extras", label: "Extras", icon: "M12 2l2.4 7.4H22l-6 4.6 2.3 7.4L12 17l-6.3 4.4L8 14 2 9.4h7.6z" },
  { href: "/admin/disponibilidad", label: "Disponibilidad", icon: "M3 4h18v18H3zM3 10h18M8 2v4M16 2v4" },
  { href: "/admin/eventos", label: "Eventos", icon: "M13 2L3 14h7l-1 8 10-12h-7z" },
  { href: "/admin/diseno", label: "Diseño de la Página", icon: "M3 3h18v6H3zM3 13h8v8H3zM15 13h6v8h-6z" },
  { href: "/admin/configuracion", label: "Configuración", icon: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a7.97 7.97 0 0 0 0-6l2-1.5-2-3.4-2.3 1a8 8 0 0 0-2.6-1.5L14 0h-4l-.5 2.6A8 8 0 0 0 6.9 4.1l-2.3-1-2 3.4L4.6 9a7.97 7.97 0 0 0 0 6l-2 1.5 2 3.4 2.3-1a8 8 0 0 0 2.6 1.5L10 24h4l.5-2.6a8 8 0 0 0 2.6-1.5l2.3 1 2-3.4z" },
  { href: "/admin/descuentos", label: "Descuentos", icon: "M9 9h.01M15 15h.01M19 5L5 19M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" },
  { href: "/admin/proveedores", label: "Proveedores", icon: "M1 3h15v13H1zM16 8h4l3 3v5h-7V8zM5.5 18.5a2.5 2.5 0 1 0 0 .01M18.5 18.5a2.5 2.5 0 1 0 0 .01" },
  { href: "/admin/crm", label: "Leads (CRM)", icon: "M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  return (
    <aside className="flex w-60 shrink-0 flex-col border-r border-brand-100 bg-white">
      <div className="flex items-center gap-3 border-b border-brand-100 p-4">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-accent-500 text-accent-600">
          <Paw className="w-5 h-5" />
        </span>
        <div className="leading-tight">
          <p className="text-xs uppercase tracking-wider text-brand-400">Panel Admin</p>
          <p className="font-serif text-base font-bold text-brand-900">{site.tagline}</p>
        </div>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
        {nav.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                active ? "bg-accent-500 text-white" : "text-brand-600 hover:bg-brand-50"
              }`}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

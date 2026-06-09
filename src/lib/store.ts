// Almacén en memoria para la versión de prueba (sin base de datos).
// Persiste mientras la instancia esté activa. En producción se reemplaza por Supabase.
import { products, type Product } from "@/data/products";

export type LeadSource = "whatsapp" | "formulario";
export type LeadStatus = "nuevo" | "contactado" | "negociando" | "cerrado" | "perdido";

export type Lead = {
  id: string;
  name: string;
  phone: string;
  email?: string;
  productId?: string;
  productName?: string;
  source: LeadSource;
  message?: string;
  status: LeadStatus;
  createdAt: string;
};

export type Sale = {
  id: string;
  productId: string;
  productName: string;
  price: number;
  buyerName: string;
  channel: "whatsapp" | "directo";
  date: string;
};

type DB = {
  leads: Lead[];
  sales: Sale[];
};

// Usamos globalThis para sobrevivir al hot-reload de Next en dev.
const g = globalThis as unknown as { __puppiesDB?: DB };

function daysAgo(n: number) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

function seed(): DB {
  const find = (id: string) => products.find((p) => p.id === id)!;
  const sales: Sale[] = [
    { id: "s1", productId: "pug", productName: "Pug (Carlino)", price: 4000000, buyerName: "Laura Ramírez", channel: "whatsapp", date: daysAgo(2) },
    { id: "s2", productId: "chihuahua", productName: "Chihuahua", price: 2500000, buyerName: "David Vanegas", channel: "whatsapp", date: daysAgo(5) },
    { id: "s3", productId: "golden-retriever", productName: "Golden Retriever", price: 3300000, buyerName: "Ana Sofía", channel: "directo", date: daysAgo(9) },
    { id: "s4", productId: "beagle", productName: "Beagle", price: 2700000, buyerName: "Carlos Andrés", channel: "whatsapp", date: daysAgo(14) },
    { id: "s5", productId: "labrador-retriever", productName: "Labrador Retriever", price: 3100000, buyerName: "María Catalina", channel: "whatsapp", date: daysAgo(21) },
    { id: "s6", productId: "pomerania", productName: "Pomerania", price: 4200000, buyerName: "Juan Camilo", channel: "directo", date: daysAgo(28) },
  ];
  const leads: Lead[] = [
    { id: "l1", name: "Valeria Martínez", phone: "+57 300 123 4567", source: "whatsapp", productId: "golden-retriever", productName: "Golden Retriever", status: "negociando", message: "¿Sigue disponible el Golden?", createdAt: daysAgo(0) },
    { id: "l2", name: "Diego Fernández", phone: "+57 301 765 4321", email: "diego@email.com", source: "formulario", status: "nuevo", message: "Quiero info de cachorros pequeños", createdAt: daysAgo(0) },
    { id: "l3", name: "Natalia Gómez", phone: "+57 312 987 6543", source: "whatsapp", productId: "husky-siberiano", productName: "Husky Siberiano", status: "contactado", createdAt: daysAgo(1) },
    { id: "l4", name: "José Eduardo", phone: "+57 320 111 2233", source: "whatsapp", productId: "bulldog-frances", productName: "Bulldog Francés", status: "nuevo", createdAt: daysAgo(1) },
    { id: "l5", name: "Laura Valentina", phone: "+57 315 444 5566", email: "lauv@email.com", source: "formulario", status: "cerrado", createdAt: daysAgo(3) },
    { id: "l6", name: "Andrés Torres", phone: "+57 318 222 9988", source: "whatsapp", productId: "caniche-toy", productName: "Caniche Toy", status: "negociando", createdAt: daysAgo(4) },
  ];
  return { leads, sales };
}

function db(): DB {
  if (!g.__puppiesDB) g.__puppiesDB = seed();
  return g.__puppiesDB;
}

// ---- Leads ----
export function getLeads(): Lead[] {
  return [...db().leads].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function addLead(input: Omit<Lead, "id" | "createdAt" | "status"> & { status?: LeadStatus }): Lead {
  const lead: Lead = {
    ...input,
    id: `l${Date.now()}`,
    status: input.status ?? "nuevo",
    createdAt: new Date().toISOString(),
  };
  db().leads.unshift(lead);
  return lead;
}

export function updateLeadStatus(id: string, status: LeadStatus): Lead | null {
  const lead = db().leads.find((l) => l.id === id);
  if (!lead) return null;
  lead.status = status;
  return lead;
}

// ---- Ventas ----
export function getSales(): Sale[] {
  return [...db().sales].sort((a, b) => b.date.localeCompare(a.date));
}

// ---- Inventario (derivado del catálogo) ----
export type InventoryRow = Product & { value: number };
export function getInventory(): InventoryRow[] {
  return products.map((p) => ({ ...p, value: p.price * p.stock }));
}

// ---- Métricas para el dashboard ----
export function getDashboard() {
  const sales = getSales();
  const leads = getLeads();
  const inv = getInventory();
  const now = new Date();
  const monthSales = sales.filter((s) => {
    const d = new Date(s.date);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
  const revenueMonth = monthSales.reduce((a, s) => a + s.price, 0);
  const revenueTotal = sales.reduce((a, s) => a + s.price, 0);
  const available = inv.filter((p) => p.status === "disponible").reduce((a, p) => a + p.stock, 0);
  const inventoryValue = inv.reduce((a, p) => a + p.value, 0);
  const newLeads = leads.filter((l) => l.status === "nuevo").length;
  const openLeads = leads.filter((l) => l.status !== "cerrado" && l.status !== "perdido").length;

  // Ventas por mes (últimos 6 meses) para el gráfico
  const byMonth: { label: string; total: number }[] = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const total = sales
      .filter((s) => {
        const sd = new Date(s.date);
        return sd.getMonth() === d.getMonth() && sd.getFullYear() === d.getFullYear();
      })
      .reduce((a, s) => a + s.price, 0);
    byMonth.push({ label: d.toLocaleDateString("es-CO", { month: "short" }), total });
  }

  return {
    revenueMonth,
    revenueTotal,
    salesCount: sales.length,
    available,
    inventoryValue,
    newLeads,
    openLeads,
    leadsCount: leads.length,
    byMonth,
  };
}

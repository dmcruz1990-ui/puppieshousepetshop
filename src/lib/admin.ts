import { supabase } from "./supabase";
import { fetchCatalog } from "./catalog";
import {
  getSales, getOrders, getTasks, getEmployees, getShifts, getSuppliers,
  getDiscounts, getEvents, getTemplates, getAvailability,
  type Sale, type Order, type Task, type TaskStatus, type OrderStatus,
  type Employee, type Shift, type Supplier, type Discount, type EventItem,
  type Template, type Availability, type Lead, type LeadStatus,
} from "./clientStore";

// Carga genérica: lee la tabla; si está vacía la siembra (requiere sesión admin); si falla usa la semilla.
async function loadOrSeed<T extends Record<string, unknown>>(table: string, seed: T[]): Promise<T[]> {
  const { data, error } = await supabase.from(table).select("*");
  if (error) return seed;
  if (!data || data.length === 0) {
    try { await supabase.from(table).insert(seed as never[]); } catch { /* sin sesión: solo mostrar */ }
    return seed;
  }
  return data as T[];
}

// ---------- LEADS ----------
function leadToRow(l: Partial<Lead>) {
  return {
    id: l.id, name: l.name, phone: l.phone, email: l.email,
    product_id: l.productId, product_name: l.productName,
    source: l.source, message: l.message, status: l.status,
  };
}
function rowToLead(r: Record<string, unknown>): Lead {
  return {
    id: String(r.id), name: (r.name as string) || "", phone: (r.phone as string) || "",
    email: (r.email as string) || undefined,
    productId: (r.product_id as string) || undefined,
    productName: (r.product_name as string) || undefined,
    source: (r.source as Lead["source"]) || "formulario",
    message: (r.message as string) || undefined,
    status: (r.status as LeadStatus) || "nuevo",
    createdAt: (r.created_at as string) || new Date().toISOString(),
  };
}
export async function addLeadDb(input: Omit<Lead, "id" | "createdAt" | "status"> & { status?: LeadStatus }) {
  const row = leadToRow({ ...input, status: input.status ?? "nuevo" });
  delete (row as { id?: string }).id;
  await supabase.from("leads").insert(row);
}
export async function fetchLeads(): Promise<Lead[]> {
  const { data, error } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
  if (error || !data) return [];
  return (data as Record<string, unknown>[]).map(rowToLead);
}
export async function updateLeadStatusDb(id: string, status: LeadStatus) {
  await supabase.from("leads").update({ status }).eq("id", id);
}

// ---------- SALES (Ventas) ----------
const saleToRow = (s: Sale) => ({ id: s.id, product_id: s.productId, product_name: s.productName, price: s.price, buyer_name: s.buyerName, channel: s.channel, date: s.date });
const rowToSale = (r: Record<string, unknown>): Sale => ({ id: String(r.id), productId: (r.product_id as string) || "", productName: (r.product_name as string) || "", price: (r.price as number) || 0, buyerName: (r.buyer_name as string) || "", channel: (r.channel as Sale["channel"]) || "directo", date: (r.date as string) || "" });
export async function fetchSales(): Promise<Sale[]> {
  const { data, error } = await supabase.from("sales").select("*").order("date", { ascending: false });
  if (error) return getSales();
  if (!data || data.length === 0) { try { await supabase.from("sales").insert(getSales().map(saleToRow)); } catch {} return getSales(); }
  return (data as Record<string, unknown>[]).map(rowToSale);
}

// ---------- ORDERS (Pedidos) ----------
export async function fetchOrders(): Promise<Order[]> {
  const rows = await loadOrSeed<Record<string, unknown>>("orders", getOrders() as unknown as Record<string, unknown>[]);
  return rows as unknown as Order[];
}
export async function updateOrderStatusDb(id: string, status: OrderStatus) {
  await supabase.from("orders").update({ status }).eq("id", id);
}

// ---------- TASKS (Tareas) ----------
export async function fetchTasks(): Promise<Task[]> {
  const rows = await loadOrSeed<Record<string, unknown>>("tasks", getTasks() as unknown as Record<string, unknown>[]);
  return rows as unknown as Task[];
}
export async function updateTaskStatusDb(id: string, status: TaskStatus) {
  await supabase.from("tasks").update({ status }).eq("id", id);
}

// ---------- SHIFTS (Turnos) ----------
const shiftToRow = (s: Shift) => ({ id: s.id, employee: s.employee, day: s.day, from_time: s.from, to_time: s.to });
const rowToShift = (r: Record<string, unknown>): Shift => ({ id: String(r.id), employee: (r.employee as string) || "", day: (r.day as string) || "", from: (r.from_time as string) || "", to: (r.to_time as string) || "" });
export async function fetchShifts(): Promise<Shift[]> {
  const { data, error } = await supabase.from("shifts").select("*");
  if (error) return getShifts();
  if (!data || data.length === 0) { try { await supabase.from("shifts").insert(getShifts().map(shiftToRow)); } catch {} return getShifts(); }
  return (data as Record<string, unknown>[]).map(rowToShift);
}

// ---------- Tablas simples (columnas = claves) ----------
export async function fetchEmployees(): Promise<Employee[]> {
  return (await loadOrSeed<Record<string, unknown>>("employees", getEmployees() as unknown as Record<string, unknown>[])) as unknown as Employee[];
}
export async function fetchSuppliers(): Promise<Supplier[]> {
  return (await loadOrSeed<Record<string, unknown>>("suppliers", getSuppliers() as unknown as Record<string, unknown>[])) as unknown as Supplier[];
}
export async function fetchDiscounts(): Promise<Discount[]> {
  return (await loadOrSeed<Record<string, unknown>>("discounts", getDiscounts() as unknown as Record<string, unknown>[])) as unknown as Discount[];
}
export async function fetchEvents(): Promise<EventItem[]> {
  return (await loadOrSeed<Record<string, unknown>>("events", getEvents() as unknown as Record<string, unknown>[])) as unknown as EventItem[];
}
export async function fetchTemplates(): Promise<Template[]> {
  return (await loadOrSeed<Record<string, unknown>>("templates", getTemplates() as unknown as Record<string, unknown>[])) as unknown as Template[];
}
export async function fetchAvailability(): Promise<Availability[]> {
  return (await loadOrSeed<Record<string, unknown>>("availability", getAvailability() as unknown as Record<string, unknown>[])) as unknown as Availability[];
}

// ---------- Inventario / Categorías ----------
export async function fetchInventory() {
  const cat = await fetchCatalog();
  return cat.map((p) => ({ ...p, value: p.price * p.stock }));
}
export async function fetchCategories() {
  const cat = await fetchCatalog();
  return [
    { id: "c1", name: "Pequeños", count: cat.filter((p) => p.size === "pequeno").length },
    { id: "c2", name: "Medianos", count: cat.filter((p) => p.size === "mediano").length },
    { id: "c3", name: "Grandes", count: cat.filter((p) => p.size === "grande").length },
  ];
}

// ---------- Dashboard ----------
export async function fetchDashboard() {
  const [sales, leads, cat] = await Promise.all([fetchSales(), fetchLeads(), fetchCatalog()]);
  const inv = cat.map((p) => ({ ...p, value: p.price * p.stock }));
  const now = new Date();
  const revenueMonth = sales.filter((s) => { const d = new Date(s.date); return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear(); }).reduce((a, s) => a + s.price, 0);
  const revenueTotal = sales.reduce((a, s) => a + s.price, 0);
  const available = inv.filter((p) => p.status === "disponible").reduce((a, p) => a + p.stock, 0);
  const inventoryValue = inv.reduce((a, p) => a + p.value, 0);
  const newLeads = leads.filter((l) => l.status === "nuevo").length;
  const openLeads = leads.filter((l) => l.status !== "cerrado" && l.status !== "perdido").length;
  const byMonth: { label: string; total: number }[] = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const total = sales.filter((s) => { const sd = new Date(s.date); return sd.getMonth() === d.getMonth() && sd.getFullYear() === d.getFullYear(); }).reduce((a, s) => a + s.price, 0);
    byMonth.push({ label: d.toLocaleDateString("es-CO", { month: "short" }), total });
  }
  return { revenueMonth, revenueTotal, salesCount: sales.length, available, inventoryValue, newLeads, openLeads, leadsCount: leads.length, byMonth, sales, leads };
}

// Capa de datos del lado del navegador (versión estática para GitHub Pages).
// Los leads se guardan en localStorage. Reemplaza al backend en esta demo.
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

const LEADS_KEY = "phps_leads";
const AUTH_KEY = "phps_admin";

function daysAgo(n: number) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString();
}

function seedLeads(): Lead[] {
  return [
    { id: "l1", name: "Valeria Martínez", phone: "+57 300 123 4567", source: "whatsapp", productId: "golden-retriever", productName: "Golden Retriever", status: "negociando", message: "¿Sigue disponible el Golden?", createdAt: daysAgo(0) },
    { id: "l2", name: "Diego Fernández", phone: "+57 301 765 4321", email: "diego@email.com", source: "formulario", status: "nuevo", message: "Quiero info de cachorros pequeños", createdAt: daysAgo(0) },
    { id: "l3", name: "Natalia Gómez", phone: "+57 312 987 6543", source: "whatsapp", productId: "husky-siberiano", productName: "Husky Siberiano", status: "contactado", createdAt: daysAgo(1) },
    { id: "l4", name: "José Eduardo", phone: "+57 320 111 2233", source: "whatsapp", productId: "bulldog-frances", productName: "Bulldog Francés", status: "nuevo", createdAt: daysAgo(1) },
    { id: "l5", name: "Laura Valentina", phone: "+57 315 444 5566", email: "lauv@email.com", source: "formulario", status: "cerrado", createdAt: daysAgo(3) },
    { id: "l6", name: "Andrés Torres", phone: "+57 318 222 9988", source: "whatsapp", productId: "caniche-toy", productName: "Caniche Toy", status: "negociando", createdAt: daysAgo(4) },
  ];
}

export function getSales(): Sale[] {
  const sales: Sale[] = [
    { id: "s1", productId: "pug", productName: "Pug (Carlino)", price: 4000000, buyerName: "Laura Ramírez", channel: "whatsapp", date: daysAgo(2) },
    { id: "s2", productId: "chihuahua", productName: "Chihuahua", price: 2500000, buyerName: "David Vanegas", channel: "whatsapp", date: daysAgo(5) },
    { id: "s3", productId: "golden-retriever", productName: "Golden Retriever", price: 3300000, buyerName: "Ana Sofía", channel: "directo", date: daysAgo(9) },
    { id: "s4", productId: "beagle", productName: "Beagle", price: 2700000, buyerName: "Carlos Andrés", channel: "whatsapp", date: daysAgo(14) },
    { id: "s5", productId: "labrador-retriever", productName: "Labrador Retriever", price: 3100000, buyerName: "María Catalina", channel: "whatsapp", date: daysAgo(21) },
    { id: "s6", productId: "pomerania", productName: "Pomerania", price: 4200000, buyerName: "Juan Camilo", channel: "directo", date: daysAgo(28) },
  ];
  return sales.sort((a, b) => b.date.localeCompare(a.date));
}

// ---- Leads (localStorage) ----
function readLeads(): Lead[] {
  if (typeof window === "undefined") return seedLeads();
  try {
    const raw = window.localStorage.getItem(LEADS_KEY);
    if (!raw) {
      const seed = seedLeads();
      window.localStorage.setItem(LEADS_KEY, JSON.stringify(seed));
      return seed;
    }
    return JSON.parse(raw) as Lead[];
  } catch {
    return seedLeads();
  }
}

function writeLeads(leads: Lead[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
  } catch {
    /* noop */
  }
}

export function getLeads(): Lead[] {
  return [...readLeads()].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function addLead(input: Omit<Lead, "id" | "createdAt" | "status"> & { status?: LeadStatus }): Lead {
  const lead: Lead = {
    ...input,
    id: `l${Date.now()}`,
    status: input.status ?? "nuevo",
    createdAt: new Date().toISOString(),
  };
  const leads = readLeads();
  leads.unshift(lead);
  writeLeads(leads);
  return lead;
}

export function updateLeadStatus(id: string, status: LeadStatus): Lead | null {
  const leads = readLeads();
  const lead = leads.find((l) => l.id === id);
  if (!lead) return null;
  lead.status = status;
  writeLeads(leads);
  return lead;
}

// ---- Inventario ----
export type InventoryRow = Product & { value: number };
export function getInventory(): InventoryRow[] {
  return products.map((p) => ({ ...p, value: p.price * p.stock }));
}

// ---- Dashboard ----
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

// ========================= MÓDULOS DEL PANEL =========================

// ---- Tareas ----
export type TaskStatus = "pendiente" | "aceptada" | "en progreso" | "completada";
export type Task = {
  id: string;
  title: string;
  description: string;
  icon: string;
  area: string;
  assignee: string;
  priority: "alta" | "media" | "baja";
  status: TaskStatus;
};

const TASKS_KEY = "phps_tasks";

function seedTasks(): Task[] {
  return [
    { id: "t1", title: "Bañar cachorros", description: "Bañar a los cachorros de 6 a 8 semanas con shampoo especial.", icon: "bath", area: "Grooming", assignee: "María Gómez", priority: "alta", status: "pendiente" },
    { id: "t2", title: "Lavar caniles", description: "Lavar y desinfectar todos los caniles del área.", icon: "home", area: "Limpieza", assignee: "Carlos Ruiz", priority: "alta", status: "en progreso" },
    { id: "t3", title: "Alimentar matronas", description: "Suministrar alimento balanceado y suplementos.", icon: "bowl", area: "Nutrición", assignee: "Ana Torres", priority: "media", status: "aceptada" },
    { id: "t4", title: "Verificar esquemas de vacunación", description: "Revisar cartillas y registrar vacunas aplicadas.", icon: "syringe", area: "Salud", assignee: "Dr. Pérez", priority: "alta", status: "pendiente" },
    { id: "t5", title: "Limpieza de área de juego", description: "Recoger desechos y limpiar el área de juego.", icon: "spray", area: "Limpieza", assignee: "Carlos Ruiz", priority: "media", status: "completada" },
    { id: "t6", title: "Socialización de cachorros", description: "Dedicar tiempo de interacción y socialización.", icon: "heart", area: "Bienestar", assignee: "Laura Díaz", priority: "media", status: "en progreso" },
    { id: "t7", title: "Revisión de salud general", description: "Revisar estado de salud y comportamiento de cada cachorro.", icon: "clipboard", area: "Salud", assignee: "Dr. Pérez", priority: "alta", status: "pendiente" },
    { id: "t8", title: "Actualizar fotos para catálogo", description: "Tomar fotos individuales y grupales de los cachorros.", icon: "camera", area: "Marketing", assignee: "Diego Mora", priority: "baja", status: "aceptada" },
  ];
}

export function getTasks(): Task[] {
  if (typeof window === "undefined") return seedTasks();
  try {
    const raw = window.localStorage.getItem(TASKS_KEY);
    if (!raw) {
      const seed = seedTasks();
      window.localStorage.setItem(TASKS_KEY, JSON.stringify(seed));
      return seed;
    }
    return JSON.parse(raw) as Task[];
  } catch {
    return seedTasks();
  }
}

export function setTaskStatus(id: string, status: TaskStatus): Task[] {
  const tasks = getTasks().map((t) => (t.id === id ? { ...t, status } : t));
  if (typeof window !== "undefined") window.localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  return tasks;
}

// ---- Pedidos ----
export type OrderStatus = "nuevo" | "pagado" | "enviado" | "entregado";
export type Order = {
  id: string;
  customer: string;
  product: string;
  total: number;
  channel: "web" | "whatsapp";
  status: OrderStatus;
  date: string;
};
export function getOrders(): Order[] {
  return [
    { id: "PED-1042", customer: "Valeria Martínez", product: "Bulldog Francés Black & Tan", total: 4500000, channel: "web", status: "pagado", date: daysAgo(0) },
    { id: "PED-1041", customer: "Diego Fernández", product: "Pomerania mini", total: 4200000, channel: "whatsapp", status: "enviado", date: daysAgo(1) },
    { id: "PED-1040", customer: "Natalia Gómez", product: "Golden Retriever", total: 3300000, channel: "web", status: "entregado", date: daysAgo(3) },
    { id: "PED-1039", customer: "José Eduardo", product: "Teckel Dachshund", total: 3000000, channel: "whatsapp", status: "nuevo", date: daysAgo(0) },
    { id: "PED-1038", customer: "Laura Valentina", product: "Husky Siberiano", total: 3500000, channel: "web", status: "pagado", date: daysAgo(2) },
  ];
}

// ---- Empleados ----
export type Employee = { id: string; name: string; role: string; phone: string; status: "activo" | "inactivo" };
export function getEmployees(): Employee[] {
  return [
    { id: "e1", name: "María Gómez", role: "Grooming / Estética", phone: "+57 300 111 2233", status: "activo" },
    { id: "e2", name: "Carlos Ruiz", role: "Limpieza y caniles", phone: "+57 301 222 3344", status: "activo" },
    { id: "e3", name: "Ana Torres", role: "Nutrición", phone: "+57 302 333 4455", status: "activo" },
    { id: "e4", name: "Dr. Pérez", role: "Veterinario", phone: "+57 303 444 5566", status: "activo" },
    { id: "e5", name: "Laura Díaz", role: "Bienestar animal", phone: "+57 304 555 6677", status: "activo" },
    { id: "e6", name: "Diego Mora", role: "Marketing / Fotografía", phone: "+57 305 666 7788", status: "inactivo" },
  ];
}

// ---- Turnos ----
export type Shift = { id: string; employee: string; day: string; from: string; to: string };
export function getShifts(): Shift[] {
  return [
    { id: "s1", employee: "María Gómez", day: "Lunes", from: "08:00", to: "16:00" },
    { id: "s2", employee: "Carlos Ruiz", day: "Lunes", from: "07:00", to: "15:00" },
    { id: "s3", employee: "Ana Torres", day: "Martes", from: "08:00", to: "14:00" },
    { id: "s4", employee: "Dr. Pérez", day: "Miércoles", from: "09:00", to: "13:00" },
    { id: "s5", employee: "Laura Díaz", day: "Jueves", from: "10:00", to: "18:00" },
    { id: "s6", employee: "Diego Mora", day: "Viernes", from: "08:00", to: "12:00" },
  ];
}

// ---- Proveedores ----
export type Supplier = { id: string; name: string; category: string; contact: string; phone: string };
export function getSuppliers(): Supplier[] {
  return [
    { id: "p1", name: "Distribuidora Canina S.A.", category: "Alimento", contact: "Pedro Salas", phone: "+57 310 100 2030" },
    { id: "p2", name: "VetSupplies Colombia", category: "Insumos veterinarios", contact: "Marta Niño", phone: "+57 311 200 3040" },
    { id: "p3", name: "Grooming Pro", category: "Estética y baño", contact: "Sofía Ríos", phone: "+57 312 300 4050" },
    { id: "p4", name: "Transporte PetExpress", category: "Logística / envíos", contact: "Andrés Gil", phone: "+57 313 400 5060" },
  ];
}

// ---- Categorías ----
export type Category = { id: string; name: string; count: number };
export function getCategories(): Category[] {
  const inv = getInventory();
  return [
    { id: "c1", name: "Pequeños", count: inv.filter((p) => p.size === "pequeno").length },
    { id: "c2", name: "Medianos", count: inv.filter((p) => p.size === "mediano").length },
    { id: "c3", name: "Grandes", count: inv.filter((p) => p.size === "grande").length },
  ];
}

// ---- Descuentos ----
export type Discount = { id: string; code: string; percent: number; status: "activo" | "expirado" };
export function getDiscounts(): Discount[] {
  return [
    { id: "d1", code: "BIENVENIDA10", percent: 10, status: "activo" },
    { id: "d2", code: "ENVIOGRATIS", percent: 0, status: "activo" },
    { id: "d3", code: "NAVIDAD20", percent: 20, status: "expirado" },
  ];
}

// ---- Eventos ----
export type EventItem = { id: string; title: string; date: string; type: string };
export function getEvents(): EventItem[] {
  return [
    { id: "ev1", title: "Jornada de vacunación", date: daysAgo(-3), type: "Salud" },
    { id: "ev2", title: "Entrega de camada Bulldog", date: daysAgo(-7), type: "Entrega" },
    { id: "ev3", title: "Sesión de fotos para catálogo", date: daysAgo(-1), type: "Marketing" },
  ];
}

// ---- Plantillas de mensajes ----
export type Template = { id: string; title: string; body: string };
export function getTemplates(): Template[] {
  return [
    { id: "m1", title: "Saludo inicial", body: "¡Hola! 🐾 Gracias por escribir a Puppies House Pet Shop. ¿En qué raza estás interesado(a)?" },
    { id: "m2", title: "Disponibilidad", body: "Sí, ese cachorro sigue disponible. Te comparto fotos y video en vivo. ¿Te gustaría reservarlo?" },
    { id: "m3", title: "Garantías", body: "Todos nuestros cachorros incluyen carnet de vacunación, certificado de pureza y desparasitación al día." },
    { id: "m4", title: "Envíos", body: "Hacemos envíos nacionales e internacionales con métodos de pago seguros. ¿A qué ciudad sería?" },
  ];
}

// ---- Disponibilidad ----
export type Availability = { id: string; label: string; slots: number; taken: number };
export function getAvailability(): Availability[] {
  return [
    { id: "a1", label: "Visitas presenciales (Lun-Vie)", slots: 10, taken: 6 },
    { id: "a2", label: "Videollamadas de presentación", slots: 8, taken: 3 },
    { id: "a3", label: "Entregas programadas", slots: 5, taken: 2 },
  ];
}

// ---- Auth (demo, solo de fachada en el navegador) ----
const ADMIN_PASSWORD = "puppies2026";

export function signIn(password: string): boolean {
  if (password !== ADMIN_PASSWORD) return false;
  if (typeof window !== "undefined") window.localStorage.setItem(AUTH_KEY, "1");
  return true;
}

export function signOut() {
  if (typeof window !== "undefined") window.localStorage.removeItem(AUTH_KEY);
}

export function isAuthed(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(AUTH_KEY) === "1";
}

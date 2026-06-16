import { supabase } from "./supabase";
import { products as seed, type Product } from "@/data/products";

// Mapeo entre la fila de la base (snake_case) y el tipo Product (camelCase).
type Row = {
  id: string;
  name: string;
  breed: string | null;
  size: string | null;
  price: number | null;
  status: string | null;
  image: string | null;
  age_weeks: number | null;
  sex: string | null;
  color: string | null;
  vaccinated: boolean | null;
  dewormed: boolean | null;
  stock: number | null;
  description: string | null;
  featured: boolean | null;
  sort: number | null;
  pay_link: string | null;
  images: string[] | null;
  created_at: string | null;
};

function rowToProduct(r: Row): Product {
  return {
    id: r.id,
    name: r.name,
    breed: r.breed || "",
    size: (r.size as Product["size"]) || "pequeno",
    price: r.price ?? 0,
    status: (r.status as Product["status"]) || "disponible",
    image: r.image || "",
    ageWeeks: r.age_weeks ?? 8,
    sex: (r.sex as Product["sex"]) || "macho",
    color: r.color || "",
    vaccinated: r.vaccinated ?? true,
    dewormed: r.dewormed ?? true,
    stock: r.stock ?? 0,
    description: r.description || "",
    featured: r.featured ?? false,
    payLink: r.pay_link || "",
    images: Array.isArray(r.images) ? r.images : [],
    createdAt: r.created_at || "",
  };
}

function productToRow(p: Partial<Product>, sort?: number) {
  const row: Record<string, unknown> = {};
  if (p.id !== undefined) row.id = p.id;
  if (p.name !== undefined) row.name = p.name;
  if (p.breed !== undefined) row.breed = p.breed;
  if (p.size !== undefined) row.size = p.size;
  if (p.price !== undefined) row.price = p.price;
  if (p.status !== undefined) row.status = p.status;
  if (p.image !== undefined) row.image = p.image;
  if (p.ageWeeks !== undefined) row.age_weeks = p.ageWeeks;
  if (p.sex !== undefined) row.sex = p.sex;
  if (p.color !== undefined) row.color = p.color;
  if (p.vaccinated !== undefined) row.vaccinated = p.vaccinated;
  if (p.dewormed !== undefined) row.dewormed = p.dewormed;
  if (p.stock !== undefined) row.stock = p.stock;
  if (p.description !== undefined) row.description = p.description;
  if (p.featured !== undefined) row.featured = p.featured;
  if (p.payLink !== undefined) row.pay_link = p.payLink;
  if (p.images !== undefined) row.images = p.images;
  if (sort !== undefined) row.sort = sort;
  return row;
}

// Lee el catálogo desde Supabase. Si la tabla está vacía o falla, usa la semilla local.
export async function fetchCatalog(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("sort", { ascending: true })
    .order("created_at", { ascending: true });
  if (error || !data || data.length === 0) return seed;
  return (data as Row[]).map(rowToProduct);
}

export async function updateProductDb(id: string, patch: Partial<Product>): Promise<void> {
  const { error } = await supabase.from("products").update(productToRow(patch)).eq("id", id);
  if (error) throw error;
}

export async function addProductDb(): Promise<Product> {
  const id = `p${Date.now()}`;
  const base: Product = {
    id,
    name: "Nuevo cachorro",
    breed: "Bulldog Francés",
    size: "pequeno",
    price: 3000000,
    status: "disponible",
    image: "",
    ageWeeks: 8,
    sex: "macho",
    color: "",
    vaccinated: true,
    dewormed: true,
    stock: 1,
    description: "",
    featured: false,
  };
  const { error } = await supabase.from("products").insert(productToRow(base, -Date.now()));
  if (error) throw error;
  return base;
}

export async function deleteProductDb(id: string): Promise<void> {
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) throw error;
}

// Siembra el catálogo inicial si la tabla está vacía (requiere sesión admin).
export async function seedCatalogIfEmpty(): Promise<Product[]> {
  const { count } = await supabase.from("products").select("id", { count: "exact", head: true });
  if (count && count > 0) return fetchCatalog();
  const rows = seed.map((p, i) => productToRow(p, i));
  const { error } = await supabase.from("products").insert(rows);
  if (error) throw error;
  return fetchCatalog();
}

// Sube una imagen al bucket "catalog" y devuelve la URL pública.
export async function uploadImage(file: File, prefix: string): Promise<string> {
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
  const path = `${prefix}-${Date.now()}.${ext}`;
  const { error } = await supabase.storage.from("catalog").upload(path, file, {
    upsert: true,
    contentType: file.type || "image/jpeg",
  });
  if (error) throw error;
  const { data } = supabase.storage.from("catalog").getPublicUrl(path);
  return data.publicUrl;
}

export const uploadCatalogImage = (file: File, productId: string) => uploadImage(file, productId);

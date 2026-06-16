import { supabase } from "./supabase";

export type Post = {
  id: string;
  title: string;
  excerpt: string;
  body: string;
  image: string;
  sort: number;
};

export const seedPosts: Post[] = [
  {
    id: "post1",
    title: "Cómo recibir a tu cachorro en casa",
    excerpt: "Los primeros días son clave. Te damos los mejores consejos para una adaptación feliz y segura.",
    body: "Prepara un espacio tranquilo, con su camita, agua fresca y juguetes. Mantén la rutina de alimentación que traía y preséntale la casa poco a poco. La paciencia y el cariño son la mejor bienvenida para tu nuevo compañero.",
    image: "https://images.unsplash.com/photo-1591769225440-811ad7d6eab3?w=1000&q=80",
    sort: 0,
  },
  {
    id: "post2",
    title: "Calendario de vacunas y desparasitación",
    excerpt: "Todo lo que debes saber para mantener a tu cachorro sano desde el primer día.",
    body: "Nuestros cachorros se entregan con su carnet de vacunación y esquema de desparasitación al día. Continúa el plan con tu veterinario de confianza para garantizar una vida larga y saludable.",
    image: "https://images.unsplash.com/photo-1612195583950-b8fd34c87093?w=1000&q=80",
    sort: 1,
  },
  {
    id: "post3",
    title: "Envíos seguros a todo el país y el exterior",
    excerpt: "Conoce cómo entregamos tu mascota de forma confiable y segura, nacional e internacional.",
    body: "Contamos con experiencia en envíos nacionales e internacionales y servicio contra entrega. Coordinamos cada detalle para que tu cachorro llegue sano y feliz hasta la puerta de tu casa.",
    image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=1000&q=80",
    sort: 2,
  },
];

type Row = { id: string; title: string | null; excerpt: string | null; body: string | null; image: string | null; sort: number | null };

function rowToPost(r: Row): Post {
  return {
    id: r.id,
    title: r.title || "",
    excerpt: r.excerpt || "",
    body: r.body || "",
    image: r.image || "",
    sort: r.sort ?? 0,
  };
}

export async function fetchPosts(): Promise<Post[]> {
  const { data, error } = await supabase.from("blog_posts").select("*").order("sort", { ascending: true });
  if (error || !data || data.length === 0) return seedPosts;
  return (data as Row[]).map(rowToPost);
}

export async function updatePost(id: string, patch: Partial<Post>): Promise<void> {
  const { error } = await supabase.from("blog_posts").update(patch).eq("id", id);
  if (error) throw error;
}

export async function seedBlogIfEmpty(): Promise<Post[]> {
  const { count } = await supabase.from("blog_posts").select("id", { count: "exact", head: true });
  if (count && count > 0) return fetchPosts();
  const { error } = await supabase.from("blog_posts").insert(seedPosts);
  if (error) throw error;
  return fetchPosts();
}

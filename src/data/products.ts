// Catálogo semilla de cachorros. En producción esto vendrá de Supabase.
export type Size = "pequeno" | "mediano" | "grande";
export type ProductStatus = "disponible" | "reservado" | "vendido";

export type Product = {
  id: string;
  name: string;
  breed: string;
  size: Size;
  price: number;
  status: ProductStatus;
  image: string;
  ageWeeks: number;
  sex: "macho" | "hembra";
  color: string;
  vaccinated: boolean;
  dewormed: boolean;
  stock: number;
  description: string;
  featured?: boolean;
};

// Fotos de Unsplash (libres) de cachorros.
const img = {
  golden: "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=800&q=80",
  poodle: "https://images.unsplash.com/photo-1591769225440-811ad7d6eab3?w=800&q=80",
  bulldog: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&q=80",
  husky: "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=800&q=80",
  shihtzu: "https://images.unsplash.com/photo-1582456891925-a53965520520?w=800&q=80",
  beagle: "https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=800&q=80",
  pomeranian: "https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?w=800&q=80",
  labrador: "https://images.unsplash.com/photo-1591160690555-5debfba289f0?w=800&q=80",
  frenchie: "https://images.unsplash.com/photo-1620189507195-68309c04c4d0?w=800&q=80",
  corgi: "https://images.unsplash.com/photo-1612536057832-2ff7ead58194?w=800&q=80",
  dachshund: "https://images.unsplash.com/photo-1612195583950-b8fd34c87093?w=800&q=80",
  chihuahua: "https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800&q=80",
  germanshepherd: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=800&q=80",
  schnauzer: "https://images.unsplash.com/photo-1559190394-df5a28aab5c5?w=800&q=80",
  maltese: "https://images.unsplash.com/photo-1607923432780-7a9c30adcb72?w=800&q=80",
  yorkshire: "https://images.unsplash.com/photo-1591946614720-90a587da4a36?w=800&q=80",
  rottweiler: "https://images.unsplash.com/photo-1567752881298-894bb81f9379?w=800&q=80",
  boxer: "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=800&q=80",
  pug: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800&q=80",
  cocker: "https://images.unsplash.com/photo-1597633425046-08f5110420b5?w=800&q=80",
};

export const products: Product[] = [
  {
    id: "bulldog-frances-blue",
    name: "Bulldog Francés Blue",
    breed: "Bulldog Francés",
    size: "pequeno",
    price: 4500000,
    status: "disponible",
    image: img.frenchie,
    ageWeeks: 8,
    sex: "macho",
    color: "Blue (gris)",
    vaccinated: true,
    dewormed: true,
    stock: 2,
    featured: true,
    description:
      "Bulldog Francés color Blue, compacto y sociable. Línea genética de exposición, criado con responsabilidad.",
  },
  {
    id: "bulldog-frances-black-tan",
    name: "Bulldog Francés Black & Tan",
    breed: "Bulldog Francés",
    size: "pequeno",
    price: 4800000,
    status: "disponible",
    image: img.bulldog,
    ageWeeks: 7,
    sex: "hembra",
    color: "Black & Tan",
    vaccinated: true,
    dewormed: true,
    stock: 1,
    featured: true,
    description:
      "Hembra Bulldog Francés Black & Tan de 7 semanas. Estructura compacta, carácter tranquilo y muy familiar.",
  },
  {
    id: "bulldog-frances-blue-merle",
    name: "Bulldog Francés Blue Merle & Tan",
    breed: "Bulldog Francés",
    size: "pequeno",
    price: 5500000,
    status: "disponible",
    image: img.frenchie,
    ageWeeks: 7,
    sex: "hembra",
    color: "Blue Merle & Tan",
    vaccinated: true,
    dewormed: true,
    stock: 1,
    featured: true,
    description:
      "Bulldog Francés Blue Merle & Tan, patrón exótico y ojos claros. Ejemplar de alto valor genético.",
  },
  {
    id: "bulldog-frances-lilac",
    name: "Bulldog Francés Lilac",
    breed: "Bulldog Francés",
    size: "pequeno",
    price: 6000000,
    status: "disponible",
    image: img.bulldog,
    ageWeeks: 9,
    sex: "macho",
    color: "Lilac",
    vaccinated: true,
    dewormed: true,
    stock: 1,
    description:
      "Bulldog Francés Lilac, una de las tonalidades más cotizadas. Pelaje uniforme y excelente fenotipo.",
  },
  {
    id: "bulldog-frances-pied",
    name: "Bulldog Francés Pied",
    breed: "Bulldog Francés",
    size: "pequeno",
    price: 4200000,
    status: "reservado",
    image: img.frenchie,
    ageWeeks: 10,
    sex: "hembra",
    color: "Pied (blanco/atigrado)",
    vaccinated: true,
    dewormed: true,
    stock: 0,
    description:
      "Bulldog Francés Pied, sociable y juguetón. Ideal como compañero para la vida en ciudad.",
  },
  {
    id: "teckel-dapple",
    name: "Teckel Dachshund Dapple",
    breed: "Teckel / Dachshund",
    size: "pequeno",
    price: 3000000,
    status: "disponible",
    image: img.dachshund,
    ageWeeks: 7,
    sex: "hembra",
    color: "Dapple (arlequín)",
    vaccinated: true,
    dewormed: true,
    stock: 2,
    featured: true,
    description:
      "Teckel (Dachshund) miniatura patrón Dapple, ojos azules. Valiente, juguetón y muy apegado a su familia.",
  },
  {
    id: "teckel-cream",
    name: "Teckel Dachshund Cream Dapple",
    breed: "Teckel / Dachshund",
    size: "pequeno",
    price: 3200000,
    status: "disponible",
    image: img.dachshund,
    ageWeeks: 7,
    sex: "macho",
    color: "Cream Dapple",
    vaccinated: true,
    dewormed: true,
    stock: 2,
    featured: true,
    description:
      "Teckel miniatura Cream Dapple de pelo largo. Tonalidad clara poco común y temperamento dulce.",
  },
  {
    id: "teckel-black-tan",
    name: "Teckel Dachshund Black & Tan",
    breed: "Teckel / Dachshund",
    size: "pequeno",
    price: 2900000,
    status: "disponible",
    image: img.dachshund,
    ageWeeks: 8,
    sex: "macho",
    color: "Black & Tan pelo largo",
    vaccinated: true,
    dewormed: true,
    stock: 3,
    description:
      "Teckel Black & Tan de pelo largo, silueta clásica inconfundible. Compañero fiel y divertido.",
  },
  {
    id: "teckel-chocolate",
    name: "Teckel Dachshund Chocolate",
    breed: "Teckel / Dachshund",
    size: "pequeno",
    price: 3100000,
    status: "disponible",
    image: img.dachshund,
    ageWeeks: 9,
    sex: "hembra",
    color: "Chocolate & Tan",
    vaccinated: true,
    dewormed: true,
    stock: 1,
    description:
      "Teckel Chocolate & Tan, pelaje brillante y mirada tierna. Cariñoso y excelente con niños.",
  },
  {
    id: "pomerania",
    name: "Pomerania",
    breed: "Pomerania",
    size: "pequeno",
    price: 4200000,
    status: "disponible",
    image: img.pomeranian,
    ageWeeks: 10,
    sex: "hembra",
    color: "Naranja",
    vaccinated: true,
    dewormed: true,
    stock: 2,
    description:
      "Pomerania peludo y alegre, pequeño en tamaño y enorme en personalidad. Adorable y leal.",
  },
  {
    id: "pug",
    name: "Pug (Carlino)",
    breed: "Pug",
    size: "pequeno",
    price: 4000000,
    status: "disponible",
    image: img.pug,
    ageWeeks: 9,
    sex: "macho",
    color: "Beige",
    vaccinated: true,
    dewormed: true,
    stock: 2,
    description:
      "Pug encantador y sociable, de gesto inconfundible. Compañero tranquilo ideal para apartamento.",
  },
  {
    id: "caniche-toy",
    name: "Caniche Toy",
    breed: "Caniche / Poodle",
    size: "pequeno",
    price: 4500000,
    status: "disponible",
    image: img.poodle,
    ageWeeks: 9,
    sex: "hembra",
    color: "Marrón",
    vaccinated: true,
    dewormed: true,
    stock: 2,
    description:
      "Caniche Toy hipoalergénico, cariñoso y muy fácil de entrenar. Perfecto para apartamento.",
  },
];

export const categories: { key: Size | "todos"; label: string }[] = [
  { key: "todos", label: "Todos" },
  { key: "pequeno", label: "Perros Pequeños" },
  { key: "mediano", label: "Perros Medianos" },
  { key: "grande", label: "Perros Grandes" },
];

export const sizeLabel: Record<Size, string> = {
  pequeno: "Pequeño",
  mediano: "Mediano",
  grande: "Grande",
};

export const statusLabel: Record<ProductStatus, string> = {
  disponible: "Disponible",
  reservado: "Reservado",
  vendido: "Vendido",
};

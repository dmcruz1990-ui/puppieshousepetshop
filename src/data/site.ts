// Configuración central del sitio. Edita aquí los datos del negocio.
export const site = {
  name: "Puppies House Pet Shop",
  shortName: "Puppies House",
  tagline: "Huellitas de Amor",
  description:
    "Cachorros de raza pura, sanos y criados con amor en Colombia. Reserva tu compañero ideal con entrega segura a domicilio.",
  city: "Valledupar",
  country: "Colombia",
  // Número de WhatsApp en formato internacional sin "+" ni espacios.
  whatsapp: "573000000000",
  email: "hola@puppieshouse.co",
  instagram: "https://instagram.com/puppieshousepetshop",
  // Moneda
  currency: "COP",
  shippingBanner: "Entregas a domicilio en toda Colombia — Envíos seguros y responsables",
} as const;

export function whatsappLink(message: string) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${site.whatsapp}?text=${text}`;
}

export function formatCOP(value: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
}

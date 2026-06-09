// Configuración central del sitio. Edita aquí los datos del negocio.
export const site = {
  name: "Puppies House Pet Shop",
  shortName: "Puppies House",
  tagline: "Huellitas de Amor",
  description:
    "Cachorros de raza pura, sanos y criados con amor. Compra segura con garantía de salud, fenotipo y genotipo de la raza. Envíos nacionales e internacionales.",
  // Mensaje de bienvenida (tomado del sitio oficial)
  welcome:
    "¡Hola, bienvenido! Ya puedes visitar nuestra tienda online y comprar directamente a través de la web. Respetamos la ley de bienestar animal y te asesoramos sobre cómo comprar tu cachorro legalmente.",
  guarantee:
    "Al adquirir un cachorro con nosotros tienes la tranquilidad de que tu compra es segura: te damos todas las garantías en cuanto a salud, fenotipo y genotipo de la raza.",
  city: "Valledupar",
  country: "Colombia",
  // Número de WhatsApp en formato internacional sin "+" ni espacios.
  // TODO: reemplazar por el número real del negocio.
  whatsapp: "573000000000",
  email: "info@puppieshousepetshop.com",
  website: "https://puppieshousepetshop.com",
  // Redes sociales oficiales
  social: {
    facebook: "https://www.facebook.com/puppyin.house",
    instagram: "https://www.instagram.com/puppyhouse2024",
    tiktok: "https://www.tiktok.com/@puppies.house.pet",
    directory: "https://tulocalvirtual.com/trabajo/puppies-house-petshop/",
  },
  // Moneda
  currency: "COP",
  shippingBanner: "Envíos a todo destino ✈️ — nacionales e internacionales, con diferentes métodos de pago",
  // Lo que incluye cada cachorro
  includes: [
    "Carnet de vacunación",
    "Certificado de pureza de raza",
    "Esquema de desparasitación al día",
    "Guía básica de cuidados",
  ],
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

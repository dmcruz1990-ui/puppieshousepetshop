import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Catalog from "@/components/Catalog";
import BlogSection from "@/components/BlogSection";
import InterestForm from "@/components/InterestForm";
import Footer from "@/components/Footer";
import { Shield, Truck, Heart, Whatsapp, Check } from "@/components/icons";
import { products } from "@/data/products";
import { site, whatsappLink } from "@/data/site";

export default function Home() {
  return (
    <main className="min-h-screen bg-cream">
      <Navbar />

      {/* HERO con foto de fondo editable */}
      <Hero />

      {/* CATÁLOGO */}
      <Catalog products={products} />

      {/* CONFIANZA */}
      <section className="border-y border-brand-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="grid gap-6 sm:grid-cols-3">
            <Feature icon={<Shield className="w-6 h-6" />} title="Compra segura y garantizada" text="Garantía de salud, fenotipo y genotipo de la raza. Tu compra es 100% segura." />
            <Feature icon={<Truck className="w-6 h-6" />} title="Envíos a todo destino" text="Experiencia en envíos nacionales e internacionales, con diferentes métodos de pago." />
            <Feature icon={<Heart className="w-6 h-6" />} title="Compra legal y responsable" text="Respetamos la ley de bienestar animal y te asesoramos para comprar tu cachorro legalmente." />
          </div>

          {/* Lo que incluye cada cachorro */}
          <div className="mt-10 rounded-3xl bg-brand-50 p-6 sm:p-8">
            <h3 className="text-center font-serif text-2xl font-bold text-brand-900">
              Cada cachorro incluye
            </h3>
            <ul className="mx-auto mt-6 grid max-w-3xl gap-4 sm:grid-cols-2">
              {site.includes.map((item) => (
                <li key={item} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                    <Check className="w-4 h-4" />
                  </span>
                  <span className="font-medium text-brand-800">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ENVÍOS INTERNACIONALES */}
      <section className="bg-grape-700">
        <div className="mx-auto max-w-7xl px-4 py-12 text-center text-white">
          <span className="inline-flex items-center gap-2 rounded-full bg-grape-600 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
            ✈️ {site.shippingNote}
          </span>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl font-bold">Entregamos tu mascota a todo destino</h2>
          <p className="mx-auto mt-2 max-w-2xl text-grape-100">
            Experiencia en envíos nacionales e internacionales, de forma confiable y segura, con
            diferentes métodos de pago y servicio contra entrega.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {site.countries.map((c) => (
              <span key={c.name} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium ring-1 ring-white/20">
                <span className="text-lg">{c.flag}</span> {c.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FORMULARIO / CRM */}
      <InterestForm />

      {/* BLOG (parte de abajo) */}
      <BlogSection />

      <Footer />

      {/* BOTÓN FLOTANTE WHATSAPP */}
      <a
        href={whatsappLink("¡Hola Puppies House! 🐾 Quiero información sobre los cachorros disponibles.")}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-3.5 font-semibold text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 transition"
        aria-label="Escríbenos por WhatsApp"
      >
        <Whatsapp className="w-6 h-6" />
        <span className="hidden sm:inline">Escríbenos</span>
      </a>
    </main>
  );
}

function Feature({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-100 text-brand-700">
        {icon}
      </span>
      <h3 className="mt-4 font-serif text-xl font-bold text-brand-900">{title}</h3>
      <p className="mt-1.5 text-sm text-brand-500">{text}</p>
    </div>
  );
}

import Navbar from "@/components/Navbar";
import Catalog from "@/components/Catalog";
import InterestForm from "@/components/InterestForm";
import Footer from "@/components/Footer";
import { Paw, Shield, Truck, Heart, Whatsapp, Check } from "@/components/icons";
import { products } from "@/data/products";
import { site, whatsappLink } from "@/data/site";

export default function Home() {
  return (
    <main className="min-h-screen bg-cream">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 pt-10 pb-6 text-center sm:pt-14">
          <p className="font-semibold uppercase tracking-[0.2em] text-brand-500 text-xs sm:text-sm">
            Nuestros Cachorros
          </p>
          <h1 className="mt-2 font-serif text-5xl sm:text-7xl font-bold text-brand-950">
            Catálogo
          </h1>
          <div className="mt-3 flex justify-center text-brand-400">
            <Paw className="w-6 h-6" />
          </div>
          <p className="mx-auto mt-3 max-w-2xl text-base sm:text-lg text-brand-600 text-balance">
            Cachorros de raza pura, sanos y criados con amor. Disponibles para reservar.
            ¡Encuentra tu compañero ideal!
          </p>
        </div>
      </section>

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

      {/* FORMULARIO / CRM */}
      <InterestForm />

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

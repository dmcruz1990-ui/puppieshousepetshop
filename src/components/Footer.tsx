import Link from "next/link";
import { site, whatsappLink } from "@/data/site";
import { Paw, Whatsapp } from "./icons";

export default function Footer() {
  return (
    <footer className="border-t border-brand-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid place-items-center w-10 h-10 rounded-full border-2 border-brand-500 text-brand-600">
                <Paw className="w-5 h-5" />
              </span>
              <span className="font-serif text-lg font-bold text-brand-900">{site.name}</span>
            </div>
            <p className="mt-3 text-sm text-brand-500">{site.description}</p>
          </div>
          <div>
            <h4 className="font-semibold text-brand-900">Navegación</h4>
            <ul className="mt-3 space-y-2 text-sm text-brand-500">
              <li><a href="#catalogo" className="hover:text-brand-800">Catálogo</a></li>
              <li><a href="#contacto" className="hover:text-brand-800">Contacto</a></li>
              <li><Link href="/admin" className="hover:text-brand-800">Panel Admin</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-brand-900">Contacto</h4>
            <ul className="mt-3 space-y-2 text-sm text-brand-500">
              <li>{site.city}, {site.country}</li>
              <li>{site.email}</li>
              <li>
                <a href={whatsappLink("Hola, quiero información sobre los cachorros 🐾")} className="inline-flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700">
                  <Whatsapp className="w-4 h-4" /> Escríbenos por WhatsApp
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-brand-900">Compromiso</h4>
            <p className="mt-3 text-sm text-brand-500">
              Cachorros sanos, criados con amor y entregados con responsabilidad. Tu nuevo mejor
              amigo te espera.
            </p>
          </div>
        </div>
        <div className="mt-10 border-t border-brand-100 pt-6 text-center text-xs text-brand-400">
          © {new Date().getFullYear()} {site.name}. Hecho con 🐾 en {site.country}.
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { site, whatsappLink } from "@/data/site";
import BrandLogo from "./BrandLogo";
import { Whatsapp, Facebook, Instagram, TikTok } from "./icons";

export default function Footer() {
  return (
    <footer className="border-t border-brand-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <BrandLogo size={40} />
              <span className="font-serif text-lg font-bold text-brand-900">{site.name}</span>
            </div>
            <p className="mt-3 text-sm text-brand-500">{site.description}</p>
            <div className="mt-4 flex items-center gap-3">
              <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="grid h-9 w-9 place-items-center rounded-full bg-brand-100 text-brand-700 hover:bg-brand-800 hover:text-white transition">
                <Facebook className="w-4 h-4" />
              </a>
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid h-9 w-9 place-items-center rounded-full bg-brand-100 text-brand-700 hover:bg-brand-800 hover:text-white transition">
                <Instagram className="w-4 h-4" />
              </a>
              <a href={site.social.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="grid h-9 w-9 place-items-center rounded-full bg-brand-100 text-brand-700 hover:bg-brand-800 hover:text-white transition">
                <TikTok className="w-4 h-4" />
              </a>
            </div>
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
              <li><a href={`mailto:${site.email}`} className="hover:text-brand-800">{site.email}</a></li>
              <li><a href={site.website} target="_blank" rel="noopener noreferrer" className="hover:text-brand-800">puppieshousepetshop.com</a></li>
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
              Respetamos la ley de bienestar animal y te asesoramos para comprar tu cachorro
              legalmente, con garantía de salud, fenotipo y genotipo de la raza.
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

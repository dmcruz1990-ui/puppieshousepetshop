import { PageHeader, Card } from "@/components/admin/ui";
import LogoUploader from "@/components/admin/LogoUploader";
import { site } from "@/data/site";

export default function ConfiguracionPage() {
  const rows: [string, string][] = [
    ["Nombre del negocio", site.name],
    ["Eslogan", site.tagline],
    ["Ciudad", `${site.city}, ${site.country}`],
    ["WhatsApp", `+${site.whatsapp}`],
    ["Correo", site.email],
    ["Sitio web", site.website],
    ["Instagram", site.social.instagram],
    ["Facebook", site.social.facebook],
    ["TikTok", site.social.tiktok],
  ];
  return (
    <div>
      <PageHeader title="Configuración" subtitle="Datos generales del negocio" />
      <div className="p-6 space-y-6">
        <LogoUploader />
        <Card className="p-0 overflow-hidden">
          <ul className="divide-y divide-brand-50">
            {rows.map(([k, v]) => (
              <li key={k} className="flex flex-wrap items-center justify-between gap-2 px-5 py-3.5">
                <span className="text-sm font-medium text-brand-500">{k}</span>
                <span className="text-sm text-brand-900 break-all">{v}</span>
              </li>
            ))}
          </ul>
        </Card>
        <p className="mt-4 text-xs text-brand-400">
          Estos datos se editan en <code className="rounded bg-brand-100 px-1.5 py-0.5">src/data/site.ts</code> (o desde el backend cuando se conecte Supabase).
        </p>
      </div>
    </div>
  );
}

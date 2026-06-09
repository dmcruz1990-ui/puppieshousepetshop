import { PageHeader, Placeholder } from "@/components/admin/ui";

export default function FuncionesPage() {
  return (
    <div>
      <PageHeader title="Funciones" subtitle="Activa o desactiva módulos del sistema" />
      <Placeholder title="Funciones del sistema" text="Aquí podrás activar módulos como pagos en línea, reseñas, blog y más. Disponible al conectar el backend (Supabase)." />
    </div>
  );
}

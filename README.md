# 🐾 Puppies House Pet Shop

La plataforma de venta de cachorros — **landing pública + panel administrativo + CRM de leads para remarketing**.

> Versión de prueba (MVP). Funciona **100% con datos semilla**, sin necesidad de base de datos. Lista para conectar Supabase y desplegar en Vercel cuando se desee.

---

## ✨ Qué incluye

### Página pública (`/`)
- Catálogo de cachorros con **filtros por tamaño** (pequeños / medianos / grandes)
- Ordenar por precio, vista **cuadrícula / lista**
- Estados: disponible / reservado / vendido
- Botón **Reservar por WhatsApp** (cada clic registra un lead)
- **Formulario de interés** (captura de leads para remarketing)
- Botón flotante de WhatsApp, sección de confianza, diseño responsive

### Panel Admin (`/admin`)
- **Dashboard**: ventas del mes, ingresos totales, disponibilidad, leads, gráfico de ventas
- **Ventas**: historial con ticket promedio y canal
- **Inventario**: stock, valorización y alertas de bajo stock
- **CRM / Leads**: prospectos de WhatsApp y formulario, cambio de estado del embudo
  (nuevo → contactado → negociando → cerrado) y botón **Contactar por WhatsApp** para remarketing

Acceso protegido por contraseña. **Demo: `puppies2026`**

---

## 🚀 Cómo correr localmente

```bash
npm install
npm run dev      # http://localhost:3000
```

Build de producción:

```bash
npm run build && npm run start
```

## ⚙️ Configuración

Copia `.env.example` a `.env.local` y ajusta:

- `ADMIN_PASSWORD` — contraseña del panel `/admin`

Edita los datos del negocio (nombre, **número de WhatsApp**, ciudad) en
[`src/data/site.ts`](src/data/site.ts) y el catálogo en
[`src/data/products.ts`](src/data/products.ts).

> ⚠️ **Importante:** cambia `whatsapp` en `src/data/site.ts` por el número real
> (formato internacional sin `+`, ej. `573001234567`).

---

## 🧱 Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS** — paleta café/crema del diseño oficial
- Capa de datos en memoria (`src/lib/store.ts`), **intercambiable por Supabase**

## 🗺️ Próximos pasos (cuando se apruebe)

1. **Supabase**: persistencia real de catálogo, ventas y leads (tablas + RLS).
2. **Vercel**: despliegue con dominio propio y variables de entorno.
3. **Remarketing**: pixel de Meta/Google + exportación de leads.
4. Autenticación de empleados, gestión de pedidos y más módulos del diseño.

# 🐾 Puppies House Pet Shop

La plataforma de venta de cachorros — **landing pública + panel administrativo + CRM de leads para remarketing**.

> Versión de prueba (MVP). Funciona **100% con datos semilla**, sin necesidad de base de datos. Lista para conectar Supabase y desplegar en Vercel cuando se desee.

## 🌍 Demo en vivo (GitHub Pages)

**https://dmcruz1990-ui.github.io/puppieshousepetshop/**

Se publica automáticamente con GitHub Actions en cada push (workflow en `.github/workflows/deploy.yml`).

> ⚠️ **Demo estática:** GitHub Pages no tiene servidor, así que esta versión corre 100% en el
> navegador. Los leads se guardan en `localStorage` (por navegador) y el login del panel es solo
> de fachada (contraseña demo `puppies2026`). Para un panel **real y seguro** con datos
> compartidos entre dispositivos se necesita Vercel + Supabase (siguiente fase).

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

- Contraseña demo del panel `/admin`: `puppies2026` (definida en `src/lib/clientStore.ts`).

Edita los datos del negocio (nombre, **número de WhatsApp**, ciudad) en
[`src/data/site.ts`](src/data/site.ts) y el catálogo en
[`src/data/products.ts`](src/data/products.ts).

> ⚠️ **Importante:** cambia `whatsapp` en `src/data/site.ts` por el número real
> (formato internacional sin `+`, ej. `573001234567`).

---

## 🧱 Stack

- **Next.js 15** (App Router, export estático) + **React 19** + **TypeScript**
- **Tailwind CSS** — paleta café/crema del diseño oficial
- Capa de datos en el navegador (`src/lib/clientStore.ts`), **intercambiable por Supabase**
- Despliegue automático a **GitHub Pages** vía GitHub Actions

## 🗺️ Próximos pasos (cuando se apruebe)

1. **Supabase**: persistencia real de catálogo, ventas y leads (tablas + RLS).
2. **Vercel**: despliegue con dominio propio y variables de entorno.
3. **Remarketing**: pixel de Meta/Google + exportación de leads.
4. Autenticación de empleados, gestión de pedidos y más módulos del diseño.

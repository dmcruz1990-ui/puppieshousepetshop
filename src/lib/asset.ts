// Prefija rutas de archivos locales con el basePath de GitHub Pages.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function asset(path: string) {
  if (path.startsWith("http")) return path;
  return `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
}

import { cookies } from "next/headers";

export const AUTH_COOKIE = "phps_admin";

// Contraseña del panel. Configurable con la variable de entorno ADMIN_PASSWORD.
export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || "puppies2026";
}

// Token simple para la cookie de sesión (versión de prueba).
function token() {
  return `ok-${getAdminPassword()}`;
}

export async function isAuthenticated() {
  const store = await cookies();
  return store.get(AUTH_COOKIE)?.value === token();
}

export async function signIn(password: string) {
  if (password !== getAdminPassword()) return false;
  const store = await cookies();
  store.set(AUTH_COOKIE, token(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return true;
}

export async function signOut() {
  const store = await cookies();
  store.delete(AUTH_COOKIE);
}

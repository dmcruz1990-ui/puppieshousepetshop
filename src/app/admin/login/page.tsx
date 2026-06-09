"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Paw } from "@/components/icons";
import { site } from "@/data/site";
import { signIn } from "@/lib/clientStore";

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (signIn(password)) {
      router.push("/admin");
    } else {
      setError("Contraseña incorrecta. Intenta de nuevo.");
      setLoading(false);
    }
  };

  return (
    <main className="grid min-h-screen place-items-center bg-brand-950 px-4">
      <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-xl">
        <div className="flex flex-col items-center text-center">
          <span className="grid h-14 w-14 place-items-center rounded-full border-2 border-brand-500 text-brand-600">
            <Paw className="w-7 h-7" />
          </span>
          <h1 className="mt-4 font-serif text-2xl font-bold text-brand-900">Panel Admin</h1>
          <p className="text-sm text-brand-400">{site.name}</p>
        </div>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-brand-700 mb-1">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              placeholder="••••••••"
              className="w-full rounded-xl border border-brand-200 px-4 py-2.5 outline-none focus:border-brand-500"
            />
          </div>
          {error && <p className="text-sm text-rose-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-brand-800 px-5 py-3 font-semibold text-white hover:bg-brand-900 transition disabled:opacity-60"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
        <p className="mt-4 text-center text-xs text-brand-400">
          Demo: contraseña <code className="rounded bg-brand-50 px-1.5 py-0.5">puppies2026</code>
        </p>
        <Link href="/" className="mt-4 block text-center text-sm text-brand-500 hover:text-brand-800">
          ← Volver al sitio
        </Link>
      </div>
    </main>
  );
}

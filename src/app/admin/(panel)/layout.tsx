"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthed } from "@/lib/clientStore";
import Sidebar from "@/components/admin/Sidebar";

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isAuthed()) {
      router.replace("/admin/login");
    } else {
      setReady(true);
    }
  }, [router]);

  if (!ready) {
    return (
      <div className="grid min-h-screen place-items-center bg-brand-50/40 text-brand-400">
        Cargando…
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-brand-50/40">
      <Sidebar />
      <div className="flex-1 overflow-x-hidden">{children}</div>
    </div>
  );
}

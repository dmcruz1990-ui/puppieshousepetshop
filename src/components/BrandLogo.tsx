"use client";

import { useEffect, useState } from "react";
import { getLogo } from "@/lib/clientStore";
import { Paw } from "./icons";

export default function BrandLogo({ size = 44 }: { size?: number }) {
  const [logo, setLogo] = useState<string | null>(null);
  useEffect(() => setLogo(getLogo()), []);

  if (logo) {
    return (
      <img
        src={logo}
        alt="Logo"
        className="shrink-0 rounded-xl object-cover"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <span
      className="grid shrink-0 place-items-center rounded-full border-2 border-accent-500 text-accent-600"
      style={{ width: size, height: size }}
    >
      <Paw style={{ width: size * 0.5, height: size * 0.5 }} />
    </span>
  );
}

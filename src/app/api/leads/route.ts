import { NextResponse } from "next/server";
import { addLead, getLeads, updateLeadStatus, type LeadSource, type LeadStatus } from "@/lib/store";
import { isAuthenticated } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const source: LeadSource = body.source === "whatsapp" ? "whatsapp" : "formulario";
    const lead = addLead({
      name: (body.name || "Interesado web").toString().slice(0, 120),
      phone: (body.phone || "—").toString().slice(0, 60),
      email: body.email ? body.email.toString().slice(0, 120) : undefined,
      productId: body.productId,
      productName: body.productName,
      message: body.message ? body.message.toString().slice(0, 500) : undefined,
      source,
    });
    return NextResponse.json({ ok: true, lead });
  } catch {
    return NextResponse.json({ ok: false, error: "Solicitud inválida" }, { status: 400 });
  }
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  return NextResponse.json({ leads: getLeads() });
}

export async function PATCH(req: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const body = await req.json().catch(() => ({}));
  const lead = updateLeadStatus(body.id, body.status as LeadStatus);
  if (!lead) return NextResponse.json({ ok: false }, { status: 404 });
  return NextResponse.json({ ok: true, lead });
}

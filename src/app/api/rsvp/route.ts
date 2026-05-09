import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { name, phone, attending } = await req.json();
    if (!name || !phone || typeof attending !== "boolean") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }
    await prisma.guest.upsert({
      where:  { phone: phone.trim() },
      update: { attending },
      create: { name: name.trim(), phone: phone.trim(), attending },
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { name, phone, attending } = await req.json();
    if (!name || !phone || typeof attending !== "boolean") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const existing = await prisma.guest.findFirst({ where: { phone: phone.trim() } });

    if (existing) {
      await prisma.guest.update({
        where: { id: existing.id },
        data: { name: name.trim(), attending },
      });
    } else {
      await prisma.guest.create({
        data: { name: name.trim(), phone: phone.trim(), attending, userId: null },
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

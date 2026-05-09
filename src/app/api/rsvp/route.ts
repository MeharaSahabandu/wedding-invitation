import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { name, phone, attending } = await req.json();

  if (!name || !phone || typeof attending !== "boolean") {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const existing = await prisma.guest.findUnique({ where: { phone } });
  if (existing) {
    return NextResponse.json({ error: "Already responded" }, { status: 409 });
  }

  const guest = await prisma.guest.create({
    data: { name, phone, attending },
  });

  return NextResponse.json({ name: guest.name, attending: guest.attending });
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const guests = await prisma.guest.findMany({
    orderBy: { createdAt: "asc" },
  });
  return NextResponse.json(guests);
}

export async function POST(req: Request) {
  const { name, slug } = await req.json();
  if (!name || !slug) {
    return NextResponse.json({ error: "Name and slug required" }, { status: 400 });
  }
  const guest = await prisma.guest.create({ data: { name, slug } });
  return NextResponse.json(guest, { status: 201 });
}

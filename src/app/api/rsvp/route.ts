import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { slug, attending } = await req.json();

  if (typeof slug !== "string" || typeof attending !== "boolean") {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const guest = await prisma.guest.update({
    where: { slug },
    data: { attending, respondedAt: new Date() },
  });

  return NextResponse.json({ name: guest.name, attending: guest.attending });
}

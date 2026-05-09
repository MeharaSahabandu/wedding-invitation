import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const guests = await prisma.guest.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(guests);
}

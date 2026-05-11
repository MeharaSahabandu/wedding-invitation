export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";

export async function GET() {
  const url = process.env.DATABASE_URL ?? "NOT SET";
  const masked = url.replace(/:([^:@]+)@/, ":***@");
  return NextResponse.json({ db: masked });
}

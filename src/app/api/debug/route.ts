export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";

export async function GET() {
  const mask = (s: string) => s.replace(/:([^:@]+)@/, ":***@");
  return NextResponse.json({
    DATABASE_URL: mask(process.env.DATABASE_URL ?? "NOT SET"),
    SUPABASE_DB_URL: mask(process.env.SUPABASE_DB_URL ?? "NOT SET"),
  });
}

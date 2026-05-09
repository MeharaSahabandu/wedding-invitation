import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import * as XLSX from "xlsx";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

    const buffer = Buffer.from(await file.arrayBuffer());
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet);

    if (rows.length === 0) return NextResponse.json({ error: "Excel file is empty" }, { status: 400 });

    const keys = Object.keys(rows[0]);
    const nameKey  = keys.find((k) => k.toLowerCase() === "name");
    const phoneKey = keys.find((k) => k.toLowerCase() === "phone");

    if (!nameKey || !phoneKey) {
      return NextResponse.json({ error: `Columns "Name" and "Phone" are required. Found: ${keys.join(", ")}` }, { status: 400 });
    }

    let imported = 0;
    let skipped  = 0;

    for (const row of rows) {
      const name  = String(row[nameKey]  ?? "").trim();
      const phone = String(row[phoneKey] ?? "").trim();
      if (!name || !phone) { skipped++; continue; }
      try {
        await prisma.guest.upsert({
          where:  { phone },
          update: { name },
          create: { name, phone, attending: null },
        });
        imported++;
      } catch { skipped++; }
    }

    return NextResponse.json({ imported, skipped });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to process file" }, { status: 500 });
  }
}

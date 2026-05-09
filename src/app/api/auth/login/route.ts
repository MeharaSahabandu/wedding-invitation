import { NextRequest, NextResponse } from "next/server";
const USERS = [{ phone: "012", email: "", password: "012" }];
export async function POST(req: NextRequest) {
  const { identifier, password } = await req.json();
  const user = USERS.find((u) => (u.phone === identifier || u.email === identifier) && u.password === password);
  if (!user) return NextResponse.json({ error: "Invalid phone/email or password." }, { status: 401 });
  const res = NextResponse.json({ ok: true });
  res.cookies.set("pantora_auth", "true", { httpOnly: true, path: "/", maxAge: 60 * 60 * 24 * 7, sameSite: "lax" });
  return res;
}

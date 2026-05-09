import { NextRequest, NextResponse } from "next/server";
export function middleware(req: NextRequest) {
  const auth = req.cookies.get("pantora_auth");
  const { pathname } = req.nextUrl;
  if (!auth && pathname !== "/login") return NextResponse.redirect(new URL("/login", req.url));
  if (auth && pathname === "/login") return NextResponse.redirect(new URL("/", req.url));
  return NextResponse.next();
}
export const config = { matcher: ["/", "/dashboard/:path*", "/login"] };

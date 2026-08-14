import { NextRequest, NextResponse } from "next/server";
import { isLocale, type Locale } from "@/lib/i18n";

const COOKIE = "portfolio_locale";
function fromLanguage(value: string | null): Locale {
  const language = (value ?? "").toLowerCase();
  if (language.includes("pt-br")) return "pt-br";
  if (language.startsWith("es")) return "es";
  return "en";
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const firstSegment = pathname.split("/")[1];
  if (isLocale(firstSegment)) {
    const response = NextResponse.next();
    response.cookies.set(COOKIE, firstSegment, { path: "/", sameSite: "lax", maxAge: 60 * 60 * 24 * 365 });
    return response;
  }
  if (pathname === "/" || pathname === "/cases" || pathname.startsWith("/cases/")) {
    const locale = isLocale(request.cookies.get(COOKIE)?.value ?? "") ? request.cookies.get(COOKIE)!.value as Locale : fromLanguage(request.headers.get("accept-language"));
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = { matcher: ["/", "/cases/:path*"] };

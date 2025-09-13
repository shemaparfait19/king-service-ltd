import { NextResponse, type NextRequest } from "next/server";
import { i18n } from "./i18n-config";

const handleI18nRouting = (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;

  // Do not apply i18n routing for admin pages, API routes, or static files
  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next")
  ) {
    return NextResponse.next();
  }

  // Handle root path specifically
  if (pathname === "/") {
    const locale = i18n.defaultLocale;
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = i18n.defaultLocale;
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }

  return NextResponse.next();
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const res = NextResponse.next();
  res.headers.set("x-next-url", pathname);

  // Check if the request is for a static file in the public folder
  if (
    pathname.startsWith("/_next") || // Ignore Next.js internals
    pathname.startsWith("/api") || // Ignore API routes
    /\.(.*)$/.test(pathname) // Ignore static files (e.g., .png, .ico)
  ) {
    return res;
  }

  // Apply i18n routing to all other paths
  const i18nResponse = handleI18nRouting(request);
  if (i18nResponse) {
    i18nResponse.headers.set("x-next-url", pathname);
    return i18nResponse;
  }

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

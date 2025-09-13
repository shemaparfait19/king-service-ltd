

import { NextResponse, type NextRequest } from 'next/server';
import { i18n } from './i18n-config';

const handleI18nRouting = (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;
  
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = i18n.defaultLocale;
    return NextResponse.redirect(
      new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
    );
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the request is for a static file in the public folder
  // and not a page route.
  if (
    pathname.startsWith('/_next') || // Ignore Next.js internals
    pathname.startsWith('/api') || // Ignore API routes
    /\.(.*)$/.test(pathname) // Ignore static files (e.g., .png, .ico)
  ) {
    return NextResponse.next();
  }
  
  // Apply i18n routing to all other paths
  return handleI18nRouting(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     *
     * This has been simplified to allow the middleware to handle public files correctly.
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

import { NextResponse, type NextRequest } from 'next/server';
import { i18n } from './i18n-config';

const handleI18nRouting = (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;

  // Skip i18n routing for API routes, Next.js specific files, and static assets
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/images') ||
    pathname.endsWith('favicon.ico')
  ) {
    return NextResponse.next();
  }

  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = i18n.defaultLocale;
    return NextResponse.redirect(
      new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`, request.url)
    );
  }

  return NextResponse.next();
}


export function middleware(request: NextRequest) {
  // The i18n routing is now the only logic needed here, as the matcher handles exclusions.
  return handleI18nRouting(request);
}

export const config = {
  // This matcher will run the middleware on all paths EXCEPT for those that start with:
  // - api/
  // - _next/static
  // - _next/image
  // - admin
  // - or have a file extension (e.g., .ico, .png)
  matcher: ['/((?!api|_next/static|_next/image|admin|.*\\..*).*)'],
};

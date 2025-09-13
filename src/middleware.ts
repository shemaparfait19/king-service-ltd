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
  const pathname = request.nextUrl.pathname;
  
  // Skip middleware for admin pages
  if (pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  // Apply i18n routing logic
  return handleI18nRouting(request);
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images|admin).*)'],
};

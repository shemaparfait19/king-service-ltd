
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
  const sessionCookie = request.cookies.get('session');
  const pathname = request.nextUrl.pathname;

  // If trying to access any admin page (except login) without a session, redirect to login
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // If trying to access login page with a session, redirect to admin dashboard
  if (pathname.startsWith('/admin/login')) {
    if (sessionCookie) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }
  
  // Handle i18n routing for non-admin, non-api routes
  const isApiRoute = pathname.startsWith('/api');
  const isNextInternal = pathname.startsWith('/_next');
  const isAsset = pathname.includes('.'); // a simplified check for assets like .ico, .png, etc.
  const isAdminRoute = pathname.startsWith('/admin');

  if (!isApiRoute && !isNextInternal && !isAsset && !isAdminRoute) {
    return handleI18nRouting(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Skip middleware for admin pages
  if (pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  // Other middleware logic can go here if needed in the future.

  return NextResponse.next();
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images).*)'],
};

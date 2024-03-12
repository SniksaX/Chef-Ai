// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { middlewareCheck } from './utils/UserData';

export async function middleware(request: NextRequest) {
    const sessionCookie = request.cookies.get('session');
    try {
      const response = await middlewareCheck(sessionCookie);
      if (response?.success) {
        const nextResponse = NextResponse.next();        
        return nextResponse;
      } else {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch (error) {
      console.error("Authentication check error:", error);
      return NextResponse.redirect(new URL("/error", request.url));
    }
  }

export const config = {
    matcher: ['/home', '/history', '/shoppinglist'],
  };

// export const config = {
//     matcher: [
//         '/dashboard/:path*', // Protect all routes under /dashboard
//         '/profile', // Protect the /profile route
//         // Add more protected routes as needed
//         {
//             source: '/((?!login|api|_next/static|_next/image|favicon.ico).*)',
//             missing: [
//                 { type: 'header', key: 'next-router-prefetch' },
//                 { type: 'header', key: 'purpose', value: 'prefetch' },
//             ],
//         },
//     ],
// };
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
    const sessionToken = request.cookies.get('sessionToken');

    // Assuming an async function to verify token validity; pseudocode here for illustration
    // const isValidSession = await verifySessionToken(sessionToken);

    // For demonstration, we'll consider any sessionToken presence as valid
    const isValidSession = Boolean(sessionToken);

    if (!isValidSession && !request.nextUrl.pathname.startsWith('/login')) {
        const url = request.nextUrl.clone();
        url.pathname = '/login';
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/dashboard/:path*', // Protect all routes under /dashboard
        '/profile', // Protect the /profile route
        // Add more protected routes as needed
        {
            source: '/((?!login|api|_next/static|_next/image|favicon.ico).*)',
            missing: [
                { type: 'header', key: 'next-router-prefetch' },
                { type: 'header', key: 'purpose', value: 'prefetch' },
            ],
        },
    ],
};
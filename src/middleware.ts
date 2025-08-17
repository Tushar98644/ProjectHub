"use server";

import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const publicRoutes = ["/sign-in"];

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const sessionCookie = getSessionCookie(request);

    if (sessionCookie && publicRoutes.some(route => pathname.startsWith(route))) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    const isPublic = publicRoutes.some(route => pathname.startsWith(route));
    if (!isPublic && !sessionCookie) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|api/auth|sign-in|sign-up).*)",
        "/sign-in",
    ],
};

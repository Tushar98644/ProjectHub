"use server";

import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import { auth } from "@/config/auth/server";
import { headers } from "next/headers";

const publicRoutes = ["/sign-in"];
const adminRoutes = ["/admin"];

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const sessionCookie = getSessionCookie(request);

    // let sessionEmail: any;

    // if (sessionCookie) {
    //   const session = await auth.api.getSession({
    //     headers:  await headers()
    //   });
    //   sessionEmail = session?.user?.email;
    //  }

    if (
        sessionCookie &&
        publicRoutes.some(route => pathname.startsWith(route))
    ) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    const isPublic = publicRoutes.some(route => pathname.startsWith(route));
    if (!isPublic && !sessionCookie) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    // const isAdmin = sessionEmail === process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    // if (sessionCookie && !isAdmin && adminRoutes.some(route => pathname.startsWith(route))) {
    //   return NextResponse.redirect(request.url);
    // }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|api/auth|sign-in|sign-up).*)",
        "/sign-in",
    ],
};

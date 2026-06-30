import { NextResponse } from "next/server";

const SESSION_COOKIE = "aura-session";

const publicRoutes = ["/sign-in", "/sign-up"];

export default function proxy(req) {
  const { pathname } = req.nextUrl;
  const session = req.cookies.get(SESSION_COOKIE)?.value;

  const isPublicRoute = publicRoutes.includes(pathname);

  if (!session && !isPublicRoute) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if (session && isPublicRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api/payments|api|_next/static|_next/image|.*\\.png$).*)"],
};

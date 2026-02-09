import { type NextRequest, NextResponse } from "next/server";

const authPaths = ["/login", "/register"];
const publicPaths = ["/"];

const isAuthPath = (path: string): boolean => {
  return authPaths.includes(path);
};

const isPublicPath = (path: string): boolean => {
  return publicPaths.includes(path);
};

export default function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token =
    req.cookies.get("access_token")?.value ||
    req.headers.get("authorization")?.replace("Bearer", "");

  if (isAuthPath(pathname)) {
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  }

  if (!isPublicPath(pathname)) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|images|uploads|fonts|api|assets).*)"],
};

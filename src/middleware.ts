import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define public paths
  const isPublicPath =
    path === "/login" || path === "/signup" || path === "/verifyemail";

  // Get token from cookies
  const token = request.cookies.get("token")?.value;

  if (isPublicPath) {
    // Redirect logged-in users from public paths to the home page
    if (token) {
      try {
        jwt.verify(token, process.env.JWT_SECRET!);
        return NextResponse.redirect(new URL("/", request.url));
      } catch {
        // If the token is invalid, let them access public paths
        return NextResponse.next();
      }
    }
    return NextResponse.next(); // Allow access to public paths
  }

  // For private paths, verify the token
  if (!token) {
    // Redirect to login if no token is present
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    return NextResponse.next(); // Allow access to private paths
  } catch {
    // Redirect to login if the token is invalid
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/((?!_next|api|static|favicon.ico).*)", // Apply to all except static files and API routes
  ],
};

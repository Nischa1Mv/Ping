import { jwtVerify } from "jose";
import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const path = request.nextUrl.pathname;

  // Exclude the login page from the redirect logic to avoid a loop
  if (path === "/login" || path === "/signup" || path === "/verifyemail") {
    return NextResponse.next();
  }

  // If no token is found, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    await jwtVerify(token, secret); // Validate the token
    return NextResponse.next();
  } catch (error: any) {
    if (error.code === "ERR_JWT_EXPIRED") {
      console.log("JWT expired, deleting token");

      // Delete the expired token cookie
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("token"); // Clear the token cookie

      return response;
    }

    console.error("JWT Verification Error:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/((?!_next|api|static|favicon.ico).*)"], // Apply to all except static files and API routes
};

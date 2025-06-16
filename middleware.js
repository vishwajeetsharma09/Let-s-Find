import { NextResponse } from "next/server";
import app from "./app";

export const config = { matcher: "/welcome" };

export async function middleware() {
  // Use environment variables instead of edge-config
  const greeting = process.env.VERCEL_GREETING || "Welcome";
  
  // NextResponse.json requires at least Next v13.1 or
  // enabling experimental.allowMiddlewareResponseBody in next.config.js
  return NextResponse.json(app);
}

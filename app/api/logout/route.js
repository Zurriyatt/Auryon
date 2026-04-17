import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const cookieStore = req.cookies; // not needed actually for deletion
    const token = req.cookies.get("authToken");

    if (!token) {
      return NextResponse.json(
        { success: false, error: "User already logged out" },
        { status: 400 }
      );
    }
    // Create response and delete cookie
    const response = NextResponse.json({ success: true, loggedIn: false });
    response.cookies.delete("authToken");

    return response;
  } catch (err) {
    console.error("Logout failed:", err);
    return NextResponse.json({ success: false, loggedIn: false });
  }
}

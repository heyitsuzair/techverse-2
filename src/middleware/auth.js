import { verifyAccessToken } from "@/lib/auth/jwt";
import { validateAuthHeader } from "@/lib/auth/token-utils";
import { NextResponse } from "next/server";

/**
 * Middleware to protect API routes
 * Usage: import and use in your API route handlers
 */
export async function requireAuth(request) {
  try {
    // Validate and extract token
    const { token, error: tokenError } = validateAuthHeader(request);

    if (tokenError) {
      return {
        error: NextResponse.json({ error: tokenError }, { status: 401 }),
        user: null,
      };
    }

    // Verify token
    let decoded;
    try {
      decoded = verifyAccessToken(token);
    } catch (error) {
      return {
        error: NextResponse.json(
          { error: "Invalid or expired token" },
          { status: 401 }
        ),
        user: null,
      };
    }

    return {
      error: null,
      user: decoded,
    };
  } catch (error) {
    return {
      error: NextResponse.json(
        { error: "Authentication failed" },
        { status: 401 }
      ),
      user: null,
    };
  }
}

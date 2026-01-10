import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyGoogleToken } from "@/lib/auth/google";
import { generateTokens } from "@/lib/auth/jwt";
import { sendWelcomeEmail } from "@/lib/email/mailer";

export async function POST(request) {
  try {
    const body = await request.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json(
        { error: "Google token is required" },
        { status: 400 }
      );
    }

    // Verify Google token
    const googleUser = await verifyGoogleToken(token);

    // Check if user exists
    let user = await prisma.user.findUnique({
      where: { email: googleUser.email },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        points: true,
        profileImage: true,
        googleId: true,
        createdAt: true,
      },
    });

    let isNewUser = false;

    if (!user) {
      // Create new user
      user = await prisma.user.create({
        data: {
          email: googleUser.email,
          name: googleUser.name,
          profileImage: googleUser.picture,
          googleId: googleUser.googleId,
          emailVerified: googleUser.emailVerified,
          points: 100, // Welcome bonus
        },
        select: {
          id: true,
          email: true,
          name: true,
          phone: true,
          points: true,
          profileImage: true,
          googleId: true,
          createdAt: true,
        },
      });

      isNewUser = true;

      // Send welcome email (non-blocking)
      sendWelcomeEmail(googleUser.email, googleUser.name).catch((error) => {
        console.error("Failed to send welcome email:", error);
      });
    } else {
      // Update Google ID if not set
      if (!user.googleId) {
        user = await prisma.user.update({
          where: { id: user.id },
          data: {
            googleId: googleUser.googleId,
            profileImage: googleUser.picture || user.profileImage,
          },
          select: {
            id: true,
            email: true,
            name: true,
            phone: true,
            points: true,
            profileImage: true,
            googleId: true,
            createdAt: true,
          },
        });
      }
    }

    // Generate tokens
    const tokens = generateTokens(user);

    return NextResponse.json({
      success: true,
      message: isNewUser ? "User registered successfully" : "Login successful",
      user,
      isNewUser,
      ...tokens,
    });
  } catch (error) {
    console.error("Google OAuth error:", error);
    return NextResponse.json(
      { error: "Failed to authenticate with Google" },
      { status: 500 }
    );
  }
}

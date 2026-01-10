import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAccessToken } from "@/lib/auth/jwt";
import { validateAuthHeader } from "@/lib/auth/token-utils";
import { createCheckoutSession } from "@/lib/stripe";

/**
 * POST /api/payments/create-session
 * Create a Stripe checkout session for purchasing points
 */
export async function POST(request) {
  try {
    // Validate and extract token
    const { token, error: tokenError } = validateAuthHeader(request);

    if (tokenError) {
      return NextResponse.json({ error: tokenError }, { status: 401 });
    }

    // Verify token
    let decoded;
    try {
      decoded = verifyAccessToken(token);
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { packageId } = body;

    if (!packageId) {
      return NextResponse.json(
        { error: "Package ID is required" },
        { status: 400 }
      );
    }

    // Get package details
    const pointPackage = await prisma.pointPackage.findUnique({
      where: { id: packageId, isActive: true },
    });

    if (!pointPackage) {
      return NextResponse.json(
        { error: "Package not found or inactive" },
        { status: 404 }
      );
    }

    // Get user details for better checkout experience
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { email: true, name: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Calculate total points (package points + bonus)
    const totalPoints = pointPackage.points + pointPackage.bonusPoints;

    // Create success and cancel URLs
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const successUrl = `${baseUrl}/payments/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${baseUrl}/payments/cancel`;

    // Create Stripe checkout session
    const session = await createCheckoutSession({
      packageId: pointPackage.id,
      userId: decoded.id,
      amount: pointPackage.price,
      packageName: pointPackage.name,
      points: totalPoints,
      successUrl,
      cancelUrl,
    });

    // Create pending payment record in database
    await prisma.payment.create({
      data: {
        userId: decoded.id,
        packageId: pointPackage.id,
        stripeSessionId: session.id,
        amount: pointPackage.price,
        currency: "usd",
        pointsPurchased: totalPoints,
        status: "pending",
        metadata: {
          packageName: pointPackage.name,
          userEmail: user.email,
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Checkout session created successfully",
        sessionId: session.id,
        sessionUrl: session.url,
        package: {
          id: pointPackage.id,
          name: pointPackage.name,
          price: pointPackage.price,
          points: totalPoints,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create payment session error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

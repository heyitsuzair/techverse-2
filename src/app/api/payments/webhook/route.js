import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyWebhookSignature } from "@/lib/stripe";

/**
 * POST /api/payments/webhook
 * Handle Stripe webhook events
 * This endpoint should be registered in your Stripe Dashboard
 */
export async function POST(request) {
  try {
    // Get the raw body as text for signature verification
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "Missing stripe-signature header" },
        { status: 400 }
      );
    }

    // Verify webhook signature
    let event;
    try {
      event = verifyWebhookSignature(body, signature);
    } catch (error) {
      console.error("Webhook signature verification failed:", error.message);
      return NextResponse.json(
        { error: "Webhook signature verification failed" },
        { status: 400 }
      );
    }

    // Handle different event types
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutSessionCompleted(event.data.object);
        break;

      case "checkout.session.expired":
        await handleCheckoutSessionExpired(event.data.object);
        break;

      case "payment_intent.succeeded":
        await handlePaymentIntentSucceeded(event.data.object);
        break;

      case "payment_intent.payment_failed":
        await handlePaymentIntentFailed(event.data.object);
        break;

      case "charge.refunded":
        await handleChargeRefunded(event.data.object);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook handler error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}

/**
 * Handle successful checkout session
 */
async function handleCheckoutSessionCompleted(session) {
  try {
    const { id: sessionId, metadata, payment_intent } = session;

    // Find the payment record
    const payment = await prisma.payment.findUnique({
      where: { stripeSessionId: sessionId },
      include: { user: true },
    });

    if (!payment) {
      console.error(`Payment not found for session: ${sessionId}`);
      return;
    }

    // Update payment status and add payment intent ID
    await prisma.payment.update({
      where: { id: payment.id },
      data: {
        status: "completed",
        stripePaymentIntentId: payment_intent,
        completedAt: new Date(),
      },
    });

    // Add points to user's account
    await prisma.user.update({
      where: { id: payment.userId },
      data: {
        points: {
          increment: payment.pointsPurchased,
        },
      },
    });

    console.log(
      `Payment completed: ${payment.id}, added ${payment.pointsPurchased} points to user ${payment.userId}`
    );
  } catch (error) {
    console.error("Error handling checkout.session.completed:", error);
    throw error;
  }
}

/**
 * Handle expired checkout session
 */
async function handleCheckoutSessionExpired(session) {
  try {
    const { id: sessionId } = session;

    await prisma.payment.updateMany({
      where: { stripeSessionId: sessionId, status: "pending" },
      data: { status: "failed" },
    });

    console.log(`Checkout session expired: ${sessionId}`);
  } catch (error) {
    console.error("Error handling checkout.session.expired:", error);
  }
}

/**
 * Handle successful payment intent
 */
async function handlePaymentIntentSucceeded(paymentIntent) {
  try {
    const { id: paymentIntentId } = paymentIntent;

    await prisma.payment.updateMany({
      where: { stripePaymentIntentId: paymentIntentId },
      data: {
        status: "completed",
        completedAt: new Date(),
      },
    });

    console.log(`Payment intent succeeded: ${paymentIntentId}`);
  } catch (error) {
    console.error("Error handling payment_intent.succeeded:", error);
  }
}

/**
 * Handle failed payment intent
 */
async function handlePaymentIntentFailed(paymentIntent) {
  try {
    const { id: paymentIntentId } = paymentIntent;

    await prisma.payment.updateMany({
      where: { stripePaymentIntentId: paymentIntentId },
      data: { status: "failed" },
    });

    console.log(`Payment intent failed: ${paymentIntentId}`);
  } catch (error) {
    console.error("Error handling payment_intent.payment_failed:", error);
  }
}

/**
 * Handle charge refunded
 */
async function handleChargeRefunded(charge) {
  try {
    const { payment_intent: paymentIntentId, amount_refunded } = charge;

    // Find the payment
    const payment = await prisma.payment.findFirst({
      where: { stripePaymentIntentId: paymentIntentId },
    });

    if (!payment) {
      console.error(`Payment not found for payment intent: ${paymentIntentId}`);
      return;
    }

    // Update payment status
    await prisma.payment.update({
      where: { id: payment.id },
      data: { status: "refunded" },
    });

    // Deduct points from user (if they still have enough)
    await prisma.user.update({
      where: { id: payment.userId },
      data: {
        points: {
          decrement: payment.pointsPurchased,
        },
      },
    });

    console.log(
      `Refund processed: ${payment.id}, deducted ${payment.pointsPurchased} points from user ${payment.userId}`
    );
  } catch (error) {
    console.error("Error handling charge.refunded:", error);
  }
}

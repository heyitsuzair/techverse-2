import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not defined in environment variables");
}

// Initialize Stripe with secret key
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-12-18.acacia",
});

/**
 * Create a Stripe Checkout session for purchasing points
 * @param {Object} params
 * @param {string} params.packageId - Point package ID
 * @param {string} params.userId - User ID
 * @param {number} params.amount - Amount in dollars
 * @param {string} params.packageName - Package name
 * @param {number} params.points - Total points (including bonus)
 * @param {string} params.successUrl - Redirect URL on success
 * @param {string} params.cancelUrl - Redirect URL on cancel
 * @returns {Promise<Stripe.Checkout.Session>}
 */
export async function createCheckoutSession({
  packageId,
  userId,
  amount,
  packageName,
  points,
  successUrl,
  cancelUrl,
}) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: packageName,
              description: `${points} Exchange Points`,
              images: [], // Add your logo/product image URL here if needed
            },
            unit_amount: Math.round(amount * 100), // Convert dollars to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        userId,
        packageId,
        points: points.toString(),
      },
      customer_email: undefined, // Optional: pass user email if available
    });

    return session;
  } catch (error) {
    console.error("Error creating Stripe checkout session:", error);
    throw new Error("Failed to create payment session");
  }
}

/**
 * Verify Stripe webhook signature
 * @param {string} payload - Raw request body
 * @param {string} signature - Stripe signature header
 * @returns {Stripe.Event}
 */
export function verifyWebhookSignature(payload, signature) {
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    throw new Error("STRIPE_WEBHOOK_SECRET is not defined");
  }

  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    return event;
  } catch (error) {
    console.error("Webhook signature verification failed:", error.message);
    throw new Error("Invalid webhook signature");
  }
}

/**
 * Get payment intent details
 * @param {string} paymentIntentId
 * @returns {Promise<Stripe.PaymentIntent>}
 */
export async function getPaymentIntent(paymentIntentId) {
  try {
    return await stripe.paymentIntents.retrieve(paymentIntentId);
  } catch (error) {
    console.error("Error retrieving payment intent:", error);
    throw new Error("Failed to retrieve payment details");
  }
}

/**
 * Create a refund for a payment
 * @param {string} paymentIntentId
 * @param {number} amount - Optional amount in dollars to refund
 * @returns {Promise<Stripe.Refund>}
 */
export async function createRefund(paymentIntentId, amount = null) {
  try {
    const refundData = {
      payment_intent: paymentIntentId,
    };

    if (amount) {
      refundData.amount = Math.round(amount * 100); // Convert to cents
    }

    return await stripe.refunds.create(refundData);
  } catch (error) {
    console.error("Error creating refund:", error);
    throw new Error("Failed to create refund");
  }
}

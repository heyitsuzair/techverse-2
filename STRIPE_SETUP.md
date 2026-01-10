# Stripe Payment Setup Guide

## Required Environment Variables

Add these environment variables to your `.env` file:

```bash
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# App Configuration (required for payment redirects)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Getting Your Stripe Keys

### 1. Stripe Secret Key

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Click **Developers** in the left sidebar
3. Click **API keys**
4. Copy your **Secret key** (starts with `sk_test_` for test mode)
5. Add it to `.env` as `STRIPE_SECRET_KEY`

⚠️ **Important**: Never commit your secret key to version control!

### 2. Stripe Webhook Secret

1. Go to [Stripe Dashboard > Developers > Webhooks](https://dashboard.stripe.com/webhooks)
2. Click **Add endpoint**
3. Enter your webhook URL:
   - **Development**: `http://localhost:3000/api/payments/webhook`
   - **Production**: `https://yourdomain.com/api/payments/webhook`
4. Click **Select events** and choose:
   - `checkout.session.completed`
   - `checkout.session.expired`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `charge.refunded`
5. Click **Add endpoint**
6. Click **Reveal** under **Signing secret**
7. Copy the webhook secret (starts with `whsec_`)
8. Add it to `.env` as `STRIPE_WEBHOOK_SECRET`

## Testing Webhooks Locally

For local development, use Stripe CLI to forward webhooks:

### Install Stripe CLI

```bash
# macOS
brew install stripe/stripe-cli/stripe

# Windows
scoop bucket add stripe https://github.com/stripe/scoop-stripe-cli.git
scoop install stripe

# Linux
wget -O /tmp/stripe.tar.gz https://github.com/stripe/stripe-cli/releases/latest/download/stripe_<VERSION>_linux_x86_64.tar.gz
tar -xvf /tmp/stripe.tar.gz -C /usr/local/bin
```

### Login to Stripe CLI

```bash
stripe login
```

### Forward Webhooks to Local Server

```bash
stripe listen --forward-to localhost:3000/api/payments/webhook
```

This command will output a webhook signing secret. Use this for local testing:

```bash
STRIPE_WEBHOOK_SECRET=whsec_xxxxx_from_stripe_cli
```

### Test Payment Flow

```bash
# Trigger a test payment success
stripe trigger checkout.session.completed
```

## Database Setup

### 1. Run Migration

Create the database tables for payments:

```bash
npx prisma migrate dev --name add_payment_tables
```

### 2. Seed Packages

Populate the database with the 3 point packages:

```bash
node prisma/seed-packages.js
```

This will create:
- **Starter Pack**: $9.99 - 500 points (6 months)
- **Popular Pack**: $19.99 - 1,200 points (12 months) - Best Value
- **Bulk Pack**: $44.99 - 3,000 points (18 months) - Save 25%

### 3. Install Stripe Package

```bash
npm install stripe
```

## API Endpoints

### 1. Get Point Packages
```http
GET /api/payments/packages
Authorization: Bearer <token> (optional)
```

Returns all available packages and user's current points (if authenticated).

### 2. Create Payment Session
```http
POST /api/payments/create-session
Authorization: Bearer <token>
Content-Type: application/json

{
  "packageId": "pkg-uuid-123"
}
```

Returns a Stripe checkout URL. Redirect user to `sessionUrl` to complete payment.

### 3. Payment Webhook
```http
POST /api/payments/webhook
stripe-signature: <signature>
Content-Type: application/json
```

Automatically called by Stripe. Handles:
- Payment success → adds points to user
- Payment failure → marks payment as failed
- Refund → deducts points from user

### 4. Get Payment History
```http
GET /api/payments/history?page=1&limit=10&status=completed
Authorization: Bearer <token>
```

Returns user's payment transaction history with pagination.

## Payment Flow

1. **User selects package** → Frontend calls `GET /api/payments/packages`
2. **User clicks "Buy"** → Frontend calls `POST /api/payments/create-session`
3. **Redirect to Stripe** → User completes payment on Stripe Checkout
4. **Payment success** → Stripe calls webhook → Points added to user account
5. **User redirected back** → Success page with order confirmation

## Testing with Test Cards

Use these test card numbers in Stripe Checkout:

| Card Number | Scenario |
|-------------|----------|
| `4242 4242 4242 4242` | Success |
| `4000 0000 0000 9995` | Insufficient funds |
| `4000 0000 0000 0002` | Card declined |
| `4000 0025 0000 3155` | 3D Secure required |

- Use any future expiry date (e.g., 12/34)
- Use any 3-digit CVC
- Use any postal code

## Production Checklist

- [ ] Replace test keys with live keys (`sk_live_...`)
- [ ] Update webhook endpoint to production URL
- [ ] Enable live mode in Stripe Dashboard
- [ ] Set up proper error monitoring
- [ ] Configure webhook retry logic in Stripe Dashboard
- [ ] Add rate limiting to payment endpoints
- [ ] Set up email notifications for successful payments
- [ ] Review and test refund flow
- [ ] Ensure HTTPS is enabled on production domain
- [ ] Test all webhook events in production

## Security Best Practices

1. **Never expose secret keys** - Keep them server-side only
2. **Always verify webhook signatures** - Prevents fake webhook calls
3. **Use HTTPS in production** - Required for PCI compliance
4. **Implement rate limiting** - Prevent payment endpoint abuse
5. **Log all payment events** - For audit and debugging
6. **Handle idempotency** - Prevent duplicate charges
7. **Validate amounts** - Always verify prices match packages

## Troubleshooting

### Webhook not receiving events
- Check webhook URL is correct in Stripe Dashboard
- Verify STRIPE_WEBHOOK_SECRET matches Stripe Dashboard
- For local dev, ensure Stripe CLI is running
- Check server logs for signature verification errors

### Payment completed but points not added
- Check webhook logs in Stripe Dashboard
- Verify webhook handler is not throwing errors
- Check database for payment record status
- Review server console logs

### User redirected to cancel page
- User cancelled payment - This is normal
- Payment record will remain as "pending"
- No points are deducted

## Support

For Stripe-specific issues:
- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Support](https://support.stripe.com/)
- [Stripe Status Page](https://status.stripe.com/)

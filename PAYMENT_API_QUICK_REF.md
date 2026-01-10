# Payment APIs - Quick Reference

## 📦 Environment Variables Required

```bash
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🚀 Quick Setup

```bash
# 1. Install Stripe
npm install stripe

# 2. Run migration
npx prisma migrate dev --name add_payment_tables

# 3. Seed packages
node prisma/seed-packages.js

# 4. For local webhook testing
stripe listen --forward-to localhost:3000/api/payments/webhook
```

## 📍 API Endpoints

### 1. GET /api/payments/packages
Get all point packages + user's current points

**Auth**: Optional (returns current points if authenticated)

**Response**:
```json
{
  "success": true,
  "currentPoints": 1250,
  "packages": [
    {
      "id": "pkg-uuid",
      "name": "Popular Pack",
      "price": 19.99,
      "points": 1000,
      "bonusPoints": 200,
      "totalPoints": 1200,
      "features": ["1,200 Exchange Points", "Valid for 12 months"],
      "validityMonths": 12,
      "badge": "Best Value - Save 17%"
    }
  ]
}
```

---

### 2. POST /api/payments/create-session
Create Stripe checkout session

**Auth**: Required

**Request**:
```json
{
  "packageId": "pkg-uuid-123"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Checkout session created successfully",
  "sessionId": "cs_test_a1b2c3d4e5f6",
  "sessionUrl": "https://checkout.stripe.com/pay/cs_test_...",
  "package": {
    "id": "pkg-uuid-123",
    "name": "Popular Pack",
    "price": 19.99,
    "points": 1200
  }
}
```

**Usage**:
```javascript
const response = await fetch('/api/payments/create-session', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ packageId: 'pkg-uuid' })
});

const data = await response.json();
// Redirect user to data.sessionUrl
window.location.href = data.sessionUrl;
```

---

### 3. POST /api/payments/webhook
Stripe webhook endpoint (automatic)

**Auth**: None (verified via Stripe signature)

**Handled Events**:
- ✅ `checkout.session.completed` - Payment success → adds points
- ❌ `checkout.session.expired` - Session expired → marks failed
- ✅ `payment_intent.succeeded` - Payment confirmed
- ❌ `payment_intent.payment_failed` - Payment failed
- 💰 `charge.refunded` - Refund processed → deducts points

---

### 4. GET /api/payments/history
Get user's payment history

**Auth**: Required

**Query Params**:
- `page` (default: 1)
- `limit` (default: 10)
- `status` (optional): pending, completed, failed, refunded

**Response**:
```json
{
  "success": true,
  "payments": [
    {
      "id": "payment-uuid",
      "packageName": "Popular Pack",
      "amount": 19.99,
      "currency": "usd",
      "pointsPurchased": 1200,
      "status": "completed",
      "createdAt": "2026-01-10T10:00:00.000Z",
      "completedAt": "2026-01-10T10:01:30.000Z",
      "package": {
        "id": "pkg-uuid",
        "name": "Popular Pack",
        "basePoints": 1000,
        "bonusPoints": 200
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 5,
    "totalPages": 1,
    "hasMore": false
  }
}
```

---

## 📦 Default Packages

After running seed script, you'll have:

| Package | Price | Points | Bonus | Total | Badge |
|---------|-------|--------|-------|-------|-------|
| Starter Pack | $9.99 | 500 | 0 | 500 | - |
| Popular Pack | $19.99 | 1,000 | 200 | 1,200 | Best Value - Save 17% |
| Bulk Pack | $44.99 | 2,500 | 500 | 3,000 | Save 25% |

---

## 🔄 Payment Flow

```
User → Select Package
  ↓
Frontend → POST /api/payments/create-session
  ↓
Get sessionUrl
  ↓
Redirect to Stripe Checkout
  ↓
User Completes Payment
  ↓
Stripe → POST /api/payments/webhook
  ↓
Backend → Add points to user
  ↓
Redirect user to success page
```

---

## 🧪 Test Cards

| Card Number | Result |
|-------------|--------|
| 4242 4242 4242 4242 | ✅ Success |
| 4000 0000 0000 9995 | ❌ Insufficient funds |
| 4000 0000 0000 0002 | ❌ Declined |

Use any future expiry (12/34), any CVC (123), any ZIP.

---

## 📊 Database Models

### PointPackage
```prisma
model PointPackage {
  id             String    @id @default(uuid())
  name           String
  description    String?
  price          Float
  points         Int
  bonusPoints    Int       @default(0)
  features       String[]
  validityMonths Int       @default(6)
  isActive       Boolean   @default(true)
  sortOrder      Int       @default(0)
  badge          String?
}
```

### Payment
```prisma
model Payment {
  id                    String       @id @default(uuid())
  userId                String
  packageId             String
  stripeSessionId       String       @unique
  stripePaymentIntentId String?
  amount                Float
  currency              String       @default("usd")
  pointsPurchased       Int
  status                String       @default("pending")
  metadata              Json?
  createdAt             DateTime     @default(now())
  completedAt           DateTime?
}
```

---

## 🔐 Security Notes

- ✅ Webhook signature verified on every request
- ✅ User points only updated after confirmed payment
- ✅ Idempotent operations (same webhook won't double-credit)
- ✅ Payment records created before Stripe redirect
- ✅ Secret keys never exposed to frontend

---

## 📝 Swagger Documentation

All endpoints documented at: `/api-docs`

Test directly in Swagger UI with "Try it out" button.

---

## 🐛 Common Issues

**Webhook not working locally?**
```bash
# Use Stripe CLI to forward webhooks
stripe listen --forward-to localhost:3000/api/payments/webhook

# Copy the webhook secret to .env
STRIPE_WEBHOOK_SECRET=whsec_from_cli_output
```

**Points not added after payment?**
- Check webhook logs in Stripe Dashboard
- Verify STRIPE_WEBHOOK_SECRET is correct
- Check server console for errors
- Confirm payment status in database

**Session expired?**
- Payment records remain as "pending"
- User can create new session anytime
- No points deducted

---

For complete setup guide, see: `STRIPE_SETUP.md`

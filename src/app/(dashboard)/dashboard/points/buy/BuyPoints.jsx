"use client";

import { useState } from "react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent,
  Button,
  Text,
  Badge,
  Input
} from "@/components/ui";
import { 
  Award,
  Check,
  CreditCard,
  CheckCircle2,
  ArrowLeft
} from "lucide-react";

// Mock Data
const PRICING_TIERS = [
  {
    id: 1,
    name: "Starter Pack",
    points: 500,
    price: 9.99,
    popular: false,
    features: ["500 Exchange Points", "Valid for 6 months", "Basic support"]
  },
  {
    id: 2,
    name: "Popular Pack",
    points: 1200,
    price: 19.99,
    popular: true,
    savings: "Best Value - Save 17%",
    features: ["1,200 Exchange Points", "Valid for 12 months", "Priority support", "Bonus: 200 extra points"]
  },
  {
    id: 3,
    name: "Bulk Pack",
    points: 3000,
    price: 44.99,
    popular: false,
    savings: "Save 25%",
    features: ["3,000 Exchange Points", "Valid for 18 months", "VIP support", "Bonus: 500 extra points", "Early access to new books"]
  }
];

export default function BuyPoints() {
  const [selectedTier, setSelectedTier] = useState(null);
  const [paymentStep, setPaymentStep] = useState("select"); // select, payment, success, failure
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handlePurchase = (e) => {
    e.preventDefault();
    // Simulate payment processing
    setTimeout(() => {
      // Random success/failure for demo
      const success = Math.random() > 0.3;
      setPaymentStep(success ? "success" : "failure");
    }, 1500);
  };

  // Success Screen
  if (paymentStep === "success") {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="pt-6 text-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <Text variant="h2" className="mb-2">Purchase Successful!</Text>
            <Text variant="body" className="text-zinc-600 mb-6">
              {selectedTier?.points} points have been added to your account
            </Text>

            <div className="bg-linear-to-br from-primary to-secondary text-primary-foreground rounded-lg p-6 mb-6">
              <Text variant="caption" className="opacity-90 mb-2">Your New Balance</Text>
              <Text variant="h1" className="text-primary-foreground">
                {1250 + selectedTier?.points} pts
              </Text>
            </div>

            <div className="bg-zinc-50 rounded-lg p-4 mb-6 text-left">
              <div className="flex justify-between mb-2">
                <Text variant="caption" className="text-zinc-600">Package</Text>
                <Text variant="body" className="font-semibold">{selectedTier?.name}</Text>
              </div>
              <div className="flex justify-between mb-2">
                <Text variant="caption" className="text-zinc-600">Points Purchased</Text>
                <Text variant="body">{selectedTier?.points} pts</Text>
              </div>
              <div className="flex justify-between">
                <Text variant="caption" className="text-zinc-600">Amount Paid</Text>
                <Text variant="body" className="font-semibold">${selectedTier?.price}</Text>
              </div>
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => {
                  setPaymentStep("select");
                  setSelectedTier(null);
                }}
              >
                Buy More
              </Button>
              <Button variant="primary" className="flex-1">
                Start Shopping
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Failure Screen
  if (paymentStep === "failure") {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="pt-6 text-center">
            <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-10 h-10 text-red-600" />
            </div>
            <Text variant="h2" className="mb-2">Payment Failed</Text>
            <Text variant="body" className="text-zinc-600 mb-6">
              There was an issue processing your payment. Please try again or use a different payment method.
            </Text>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-left">
              <Text variant="caption" className="text-red-800 font-semibold mb-2">
                Common reasons for payment failure:
              </Text>
              <ul className="space-y-1 text-sm text-red-700">
                <li>• Insufficient funds</li>
                <li>• Incorrect card details</li>
                <li>• Card expired or blocked</li>
                <li>• Bank declined the transaction</li>
              </ul>
            </div>

            <div className="flex gap-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setPaymentStep("select")}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
              <Button 
                variant="primary" 
                className="flex-1"
                onClick={() => setPaymentStep("payment")}
              >
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Payment Form
  if (paymentStep === "payment") {
    return (
      <div className="min-h-screen bg-zinc-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button 
            variant="ghost" 
            className="mb-6"
            onClick={() => setPaymentStep("select")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Packages
          </Button>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePurchase} className="space-y-4">
                    <div>
                      <Text variant="caption" className="mb-2">Card Number</Text>
                      <Input
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Text variant="caption" className="mb-2">Expiry Date</Text>
                        <Input
                          placeholder="MM/YY"
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Text variant="caption" className="mb-2">CVV</Text>
                        <Input
                          placeholder="123"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="bg-zinc-50 rounded-lg p-4 mt-6">
                      <Text variant="caption" className="text-zinc-600 text-xs mb-2">
                        🔒 Your payment information is secure and encrypted
                      </Text>
                    </div>

                    <Button type="submit" variant="primary" className="w-full mt-6">
                      Complete Purchase - ${selectedTier?.price}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <Text variant="body" className="font-semibold mb-1">
                        {selectedTier?.name}
                      </Text>
                      <Text variant="caption" className="text-zinc-600">
                        {selectedTier?.points} Exchange Points
                      </Text>
                    </div>
                    
                    <div className="h-px bg-zinc-200" />
                    
                    <div className="flex justify-between">
                      <Text variant="body" className="text-zinc-600">Subtotal</Text>
                      <Text variant="body">${selectedTier?.price}</Text>
                    </div>
                    <div className="flex justify-between">
                      <Text variant="body" className="text-zinc-600">Tax</Text>
                      <Text variant="body">$0.00</Text>
                    </div>
                    
                    <div className="h-px bg-zinc-200" />
                    
                    <div className="flex justify-between">
                      <Text variant="h4">Total</Text>
                      <Text variant="h4" className="text-primary">
                        ${selectedTier?.price}
                      </Text>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Package Selection (Default)
  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <Text variant="h1" className="mb-2 flex items-center justify-center gap-3">
            <Award className="w-8 h-8 text-amber-600" />
            Buy Exchange Points
          </Text>
          <Text variant="body" className="text-zinc-600">
            Choose a package and unlock more book exchanges
          </Text>
        </div>

        {/* Current Balance */}
        <Card className="max-w-md mx-auto mb-8 bg-linear-to-br from-primary to-secondary">
          <CardContent className="pt-6 text-center">
            <Text variant="caption" className="text-primary-foreground opacity-90 mb-2">
              Your Current Balance
            </Text>
            <Text variant="h1" className="text-primary-foreground mb-2">
              1,250 pts
            </Text>
            <Text variant="caption" className="text-white opacity-75">
              Enough for approximately 7 book exchanges
            </Text>
          </CardContent>
        </Card>

        {/* Pricing Tiers */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {PRICING_TIERS.map((tier) => (
            <Card 
              key={tier.id}
              className={`relative ${tier.popular ? 'border-2 border-primary shadow-lg' : ''}`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge variant="primary" className="px-4">Most Popular</Badge>
                </div>
              )}
              
              <CardContent className="pt-6">
                <div className="text-center mb-6">
                  <Text variant="h3" className="mb-2">{tier.name}</Text>
                  <div className="mb-2">
                    <Text variant="h1" className="text-primary inline">
                      ${tier.price}
                    </Text>
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Award className="w-5 h-5 text-amber-600" />
                    <Text variant="h4" className="text-amber-600">
                      {tier.points} points
                    </Text>
                  </div>
                  {tier.savings && (
                    <Badge variant="success" className="text-xs">{tier.savings}</Badge>
                  )}
                </div>

                <div className="space-y-3 mb-6">
                  {tier.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <Text variant="body" className="text-sm">{feature}</Text>
                    </div>
                  ))}
                </div>

                <Button 
                  variant={tier.popular ? "primary" : "outline"}
                  className="w-full"
                  onClick={() => {
                    setSelectedTier(tier);
                    setPaymentStep("payment");
                  }}
                >
                  Choose {tier.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Text variant="body" className="font-semibold mb-1">
                  How do exchange points work?
                </Text>
                <Text variant="body" className="text-zinc-600 text-sm">
                  Each book has a point value based on its condition and rarity. When you request a book, 
                  the required points are deducted from your balance.
                </Text>
              </div>
              <div>
                <Text variant="body" className="font-semibold mb-1">
                  Do points expire?
                </Text>
                <Text variant="body" className="text-zinc-600 text-sm">
                  Yes, points expire based on the package you purchase. Check each tier for validity period.
                </Text>
              </div>
              <div>
                <Text variant="body" className="font-semibold mb-1">
                  Can I earn points without buying?
                </Text>
                <Text variant="body" className="text-zinc-600 text-sm">
                  Yes! You earn points when others exchange your listed books. The better the condition, 
                  the more points you earn.
                </Text>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

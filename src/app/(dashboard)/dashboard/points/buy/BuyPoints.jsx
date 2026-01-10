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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center min-h-[calc(100vh-12rem)]">
          <Card className="max-w-md w-full">
            <CardContent className="pt-6 text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
              </div>
              <Text variant="h2" className="mb-2 text-xl sm:text-2xl">Purchase Successful!</Text>
              <Text variant="body" className="text-zinc-600 mb-4 sm:mb-6 text-sm sm:text-base">{selectedTier?.points} points have been added to your account
              </Text>

              <div className="bg-linear-to-br from-primary to-secondary text-primary-foreground rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
                <Text variant="caption" className="opacity-90 mb-2 text-xs sm:text-sm">Your New Balance</Text>
                <Text variant="h1" className="text-primary-foreground text-3xl sm:text-4xl">
                  {1250 + selectedTier?.points} pts
                </Text>
              </div>

              <div className="bg-zinc-50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 text-left">
                <div className="flex justify-between mb-2">
                  <Text variant="caption" className="text-zinc-600 text-xs sm:text-sm">Package</Text>
                  <Text variant="body" className="font-semibold text-sm sm:text-base">{selectedTier?.name}</Text>
                </div>
                <div className="flex justify-between mb-2">
                  <Text variant="caption" className="text-zinc-600 text-xs sm:text-sm">Points Purchased</Text>
                  <Text variant="body" className="text-sm sm:text-base">{selectedTier?.points} pts</Text>
                </div>
                <div className="flex justify-between">
                  <Text variant="caption" className="text-zinc-600 text-xs sm:text-sm">Amount Paid</Text>
                  <Text variant="body" className="font-semibold text-sm sm:text-base">${selectedTier?.price}</Text>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  variant="outline" 
                  className="w-full sm:flex-1"
                  onClick={() => {
                    setPaymentStep("select");
                    setSelectedTier(null);
                  }}
                >
                  Buy More
                </Button>
                <Button variant="primary" className="w-full sm:flex-1">
                  Start Shopping
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Failure Screen
  if (paymentStep === "failure") {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center min-h-[calc(100vh-12rem)]">
          <Card className="max-w-md w-full">
            <CardContent className="pt-6 text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <CreditCard className="w-8 h-8 sm:w-10 sm:h-10 text-red-600" />
              </div>
              <Text variant="h2" className="mb-2 text-xl sm:text-2xl">Payment Failed</Text>
              <Text variant="body" className="text-zinc-600 mb-4 sm:mb-6 text-sm sm:text-base">
                There was an issue processing your payment. Please try again or use a different payment method.
              </Text>

              <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 text-left">
                <Text variant="caption" className="text-red-800 font-semibold mb-2 text-xs sm:text-sm">
                  Common reasons for payment failure:
                </Text>
                <ul className="space-y-1 text-xs sm:text-sm text-red-700">
                  <li>• Insufficient funds</li>
                  <li>• Incorrect card details</li>
                  <li>• Card expired or blocked</li>
                  <li>• Bank declined the transaction</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  variant="outline" 
                  className="w-full sm:flex-1"
                  onClick={() => setPaymentStep("select")}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Go Back
                </Button>
                <Button 
                  variant="primary" 
                  className="w-full sm:flex-1"
                  onClick={() => setPaymentStep("payment")}
                >
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Payment Form
  if (paymentStep === "payment") {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button 
            variant="ghost" 
            className="mb-4 sm:mb-6"
            onClick={() => setPaymentStep("select")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Packages
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
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
    );
  }

  // Package Selection (Default)
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8 text-center">
          <Text variant="h1" className="mb-2 flex items-center justify-center gap-2 sm:gap-3 text-xl sm:text-2xl lg:text-3xl">
            <Award className="w-6 h-6 sm:w-8 sm:h-8 text-amber-600" />
            Buy Exchange Points
          </Text>
          <Text variant="body" className="text-zinc-600 text-sm sm:text-base">
            Choose a package and unlock more book exchanges
          </Text>
        </div>

        {/* Current Balance */}
        <Card className="max-w-md mx-auto mb-6 sm:mb-8 bg-linear-to-br from-primary to-secondary">
          <CardContent className="pt-4 sm:pt-6 pb-4 sm:pb-6 text-center">
            <Text variant="caption" className="text-primary-foreground opacity-90 mb-2 text-xs sm:text-sm">
              Your Current Balance
            </Text>
            <Text variant="h1" className="text-primary-foreground mb-2 text-3xl sm:text-4xl lg:text-5xl">
              1,250 pts
            </Text>
            <Text variant="caption" className="text-white opacity-75 text-xs sm:text-sm">
              Enough for approximately 7 book exchanges
            </Text>
          </CardContent>
        </Card>

        {/* Pricing Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {PRICING_TIERS.map((tier) => (
            <Card 
              key={tier.id}
              className={`relative ${tier.popular ? 'border-2 border-primary shadow-lg' : ''}`}
            >
              <CardContent className="pt-6">
                <div className="text-center mb-4 sm:mb-6">
                  <Text variant="h3" className="mb-2 text-lg sm:text-xl">{tier.name}</Text>
                  <div className="mb-2">
                    <Text variant="h1" className="text-primary inline text-2xl sm:text-3xl lg:text-4xl">
                      ${tier.price}
                    </Text>
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Award className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
                    <Text variant="h4" className="text-amber-600 text-base sm:text-lg">
                      {tier.points} points
                    </Text>
                  </div>
                  {tier.savings && (
                    <Badge variant="success" className="text-xs sm:text-sm">{tier.savings}</Badge>
                  )}
                </div>

                <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                  {tier.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <Text variant="body" className="text-xs sm:text-sm">{feature}</Text>
                    </div>
                  ))}
                </div>

                <Button 
                  variant={tier.popular ? "primary" : "outline"}
                  className="w-full text-xs sm:text-sm"
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
            <div className="space-y-3 sm:space-y-4">
              <div>
                <Text variant="body" className="font-semibold mb-1 text-sm sm:text-base">
                  How do exchange points work?
                </Text>
                <Text variant="body" className="text-zinc-600 text-xs sm:text-sm">
                  Each book has a point value based on its condition and rarity. When you request a book, 
                  the required points are deducted from your balance.
                </Text>
              </div>
              <div>
                <Text variant="body" className="font-semibold mb-1 text-sm sm:text-base">
                  Do points expire?
                </Text>
                <Text variant="body" className="text-zinc-600 text-xs sm:text-sm">
                  Yes, points expire based on the package you purchase. Check each tier for validity period.
                </Text>
              </div>
              <div>
                <Text variant="body" className="font-semibold mb-1 text-sm sm:text-base">
                  Can I earn points without buying?
                </Text>
                <Text variant="body" className="text-zinc-600 text-xs sm:text-sm">
                  Yes! You earn points when others exchange your listed books. The better the condition, 
                  the more points you earn.
                </Text>
              </div>
            </div>
          </CardContent>
        </Card>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent,
  Button,
  Text,
  Badge,
  Input,
  Spinner
} from "@/components/ui";
import { 
  Award,
  Check,
  CreditCard,
  CheckCircle2,
  ArrowLeft
} from "lucide-react";
import { getPackages, createCheckoutSession } from '@/lib/api/payments';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

export default function BuyPoints() {
  const { user } = useAuth();
  const [packages, setPackages] = useState([]);
  const [currentPoints, setCurrentPoints] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTier, setSelectedTier] = useState(null);
  const [purchasingPackageId, setPurchasingPackageId] = useState(null);
  
  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const data = await getPackages();
      setPackages(data.packages || []);
      setCurrentPoints(data.currentPoints);
    } catch (error) {
      console.error('Failed to fetch packages:', error);
      toast.error('Failed to load packages');
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async (pkg) => {
    try {
      setPurchasingPackageId(pkg.id);
      
      const data = await createCheckoutSession(pkg.id);
      
      // Redirect to Stripe checkout
      if (data.sessionUrl) {
        window.location.href = data.sessionUrl;
      } else {
        toast.error('Failed to create checkout session');
        setPurchasingPackageId(null);
      }
    } catch (error) {
      console.error('Failed to create checkout session:', error);
      toast.error(error.response?.data?.error || 'Failed to start checkout');
      setPurchasingPackageId(null);
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-center min-h-[calc(100vh-12rem)]">
        <Spinner size="lg" />
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
        {currentPoints !== null && (
          <Card className="max-w-md mx-auto mb-6 sm:mb-8 bg-linear-to-br from-primary to-secondary">
            <CardContent className="pt-4 sm:pt-6 pb-4 sm:pb-6 text-center">
              <Text variant="caption" className="text-primary-foreground opacity-90 mb-2 text-xs sm:text-sm">
                Your Current Balance
              </Text>
              <Text variant="h1" className="text-primary-foreground mb-2 text-3xl sm:text-4xl lg:text-5xl">
                {currentPoints?.toLocaleString() || 0} pts
              </Text>
              <Text variant="caption" className="text-white opacity-75 text-xs sm:text-sm">
                Enough for approximately {Math.floor(currentPoints / 100) || 0} book exchanges
              </Text>
            </CardContent>
          </Card>
        )}

        {/* Pricing Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {packages.map((pkg) => (
            <Card 
              key={pkg.id}
              className={`relative ${pkg.badge ? 'border-2 border-primary shadow-lg' : ''}`}
            >
              {pkg.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                  {pkg.badge}
                </div>
              )}
              <CardContent className="pt-6">
                <div className="text-center mb-4 sm:mb-6">
                  <Text variant="h3" className="mb-2 text-lg sm:text-xl">{pkg.name}</Text>
                  {pkg.description && (
                    <Text variant="caption" className="text-zinc-600 text-xs mb-3">
                      {pkg.description}
                    </Text>
                  )}
                  <div className="mb-2">
                    <Text variant="h1" className="text-primary inline text-2xl sm:text-3xl lg:text-4xl">
                      ${pkg.price}
                    </Text>
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Award className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
                    <Text variant="h4" className="text-amber-600 text-base sm:text-lg">
                      {pkg.totalPoints} points
                    </Text>
                  </div>
                  {pkg.bonusPoints > 0 && (
                    <Badge variant="success" className="text-xs sm:text-sm">
                      +{pkg.bonusPoints} Bonus Points
                    </Badge>
                  )}
                </div>

                <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                  {pkg.features && pkg.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <Text variant="body" className="text-xs sm:text-sm">{feature}</Text>
                    </div>
                  ))}
                </div>

                {pkg.validityMonths && (
                  <Text variant="caption" className="text-zinc-600 text-center block mb-4 text-xs sm:text-sm">
                    Valid for {pkg.validityMonths} month{pkg.validityMonths > 1 ? 's' : ''}
                  </Text>
                )}

                <Button 
                  variant={pkg.badge ? "primary" : "outline"}
                  className="w-full text-xs sm:text-sm"
                  onClick={() => handlePurchase(pkg)}
                  loading={purchasingPackageId === pkg.id}
                  disabled={purchasingPackageId !== null}
                >
                  {purchasingPackageId === pkg.id ? 'Processing...' : `Choose ${pkg.name}`}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {packages.length === 0 && !loading && (
          <div className="text-center py-12">
            <Text variant="body" className="text-zinc-500 text-lg">
              No packages available at the moment
            </Text>
          </div>
        )}

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

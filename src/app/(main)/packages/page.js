'use client';

import { useEffect, useState } from 'react';
import { getPackages, createCheckoutSession } from '@/lib/api/payments';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui';
import { Button } from '@/components/ui';
import { Spinner } from '@/components/ui';
import { toast } from 'sonner';

export default function PackagesPage() {
  const [packages, setPackages] = useState([]);
  const [currentPoints, setCurrentPoints] = useState(null);
  const [loading, setLoading] = useState(true);
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

  const handlePurchase = async (packageId) => {
    try {
      setPurchasingPackageId(packageId);
      
      const data = await createCheckoutSession(packageId);
      
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Choose Your Package
          </h1>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
            Purchase points to unlock premium features and expand your book exchange capabilities
          </p>
          {currentPoints !== null && (
            <div className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-primary/10 text-primary rounded-full font-semibold">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Current Points: {currentPoints}
            </div>
          )}
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <Card
              key={pkg.id}
              className={`relative transition-all hover:shadow-lg ${
                pkg.badge ? 'ring-2 ring-primary' : ''
              }`}
            >
              {/* Badge */}
              {pkg.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                  {pkg.badge}
                </div>
              )}

              <CardHeader className="text-center pt-8">
                <CardTitle>{pkg.name}</CardTitle>
                <CardDescription className="mt-2">
                  {pkg.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                {/* Price */}
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-foreground">
                    ${pkg.price}
                  </div>
                  <div className="text-sm text-zinc-500 mt-1">One-time payment</div>
                </div>

                {/* Points */}
                <div className="bg-zinc-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-zinc-600">Base Points</span>
                    <span className="font-semibold text-foreground">
                      {pkg.points}
                    </span>
                  </div>
                  {pkg.bonusPoints > 0 && (
                    <>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-zinc-600">Bonus Points</span>
                        <span className="font-semibold text-green-600">
                          +{pkg.bonusPoints}
                        </span>
                      </div>
                      <div className="border-t border-zinc-200 pt-2 mt-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-foreground">
                            Total Points
                          </span>
                          <span className="text-lg font-bold text-primary">
                            {pkg.totalPoints}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Features */}
                {pkg.features && pkg.features.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-foreground mb-3">
                      Features:
                    </h4>
                    <ul className="space-y-2">
                      {pkg.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <svg
                            className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span className="text-zinc-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Validity */}
                {pkg.validityMonths && (
                  <div className="text-center text-sm text-zinc-500 mb-6">
                    Valid for {pkg.validityMonths} month
                    {pkg.validityMonths > 1 ? 's' : ''}
                  </div>
                )}

                {/* Purchase Button */}
                <Button
                  variant={pkg.badge ? 'primary' : 'outline'}
                  className="w-full"
                  onClick={() => handlePurchase(pkg.id)}
                  loading={purchasingPackageId === pkg.id}
                  disabled={purchasingPackageId !== null}
                >
                  {purchasingPackageId === pkg.id
                    ? 'Processing...'
                    : 'Purchase Package'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {packages.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-zinc-500 text-lg">No packages available at the moment</p>
          </div>
        )}
      </div>
    </div>
  );
}

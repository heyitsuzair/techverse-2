"use client";

import { useState } from "react";
import { useRouterWithProgress } from "@/hooks";
import routes from "@/config/routes";
import { Card, Button, Text } from "@/components/ui";
import AddStallModal from "@/app/(main)/exchange-points/AddStallModal";
import { MapPin, CheckCircle2, ArrowLeft } from "lucide-react";

export default function AddStall() {
  const router = useRouterWithProgress();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [newStall, setNewStall] = useState(null);

  const handleSuccess = (stall) => {
    setNewStall(stall);
    setSubmitted(true);
    setIsModalOpen(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    router.push(routes.dashboard.stalls.myStalls);
  };

  if (submitted && newStall) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="max-w-md w-full">
          <div className="p-6 text-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <Text variant="h2" className="mb-2">
              Stall Created Successfully!
            </Text>
            <Text variant="body" className="text-zinc-600 mb-6">
              Your exchange point is now live and visible to other users.
            </Text>

            <div className="bg-zinc-50 rounded-lg p-4 mb-6 text-left">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <Text variant="h4" className="mb-1">
                    {newStall.name}
                  </Text>
                  <Text variant="body" className="text-zinc-600 text-sm">
                    {newStall.locationAddress}
                  </Text>
                  {newStall.operatingHours && (
                    <Text
                      variant="caption"
                      className="text-zinc-500 mt-1 block"
                    >
                      {newStall.operatingHours}
                    </Text>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setSubmitted(false);
                  setNewStall(null);
                  setIsModalOpen(true);
                }}
              >
                Add Another
              </Button>
              <Button
                className="flex-1"
                onClick={() => router.push(routes.dashboard.stalls.myStalls)}
              >
                View My Stalls
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push(routes.dashboard.stalls.myStalls)}
            className="flex items-center text-zinc-600 hover:text-zinc-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to My Stalls
          </button>
          <Text variant="h1" className="mb-2">
            Add Exchange Stall
          </Text>
          <Text variant="body" className="text-zinc-600">
            Create a physical location where users can exchange books
          </Text>
        </div>

        {/* Info Card */}
        <Card className="mb-8">
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <Text variant="h4" className="mb-2">
                  What is an Exchange Stall?
                </Text>
                <Text variant="body" className="text-zinc-600 mb-4">
                  Exchange stalls are physical locations where community members
                  can meet to exchange books. Your stall will appear on the map
                  for others to discover and visit.
                </Text>
                <ul className="space-y-2 text-sm text-zinc-600">
                  <li className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                    Visible to all users on the exchange points map
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                    Users can see available genres and contact you
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                    You can toggle availability anytime
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <Button
            size="lg"
            onClick={() => setIsModalOpen(true)}
            className="px-8"
          >
            <MapPin className="w-5 h-5 mr-2" />
            Create Exchange Stall
          </Button>
        </div>
      </div>

      {/* Add Stall Modal */}
      <AddStallModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSuccess={handleSuccess}
      />
    </div>
  );
}

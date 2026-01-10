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
  Textarea
} from "@/components/ui";
import { 
  BookOpen,
  User,
  MapPin,
  Award,
  AlertCircle,
  CheckCircle2,
  ArrowRight
} from "lucide-react";

// Mock Data
const MOCK_BOOK_REQUEST = {
  id: 1,
  title: "Moby Dick",
  author: "Herman Melville",
  genre: "Adventure",
  condition: "Excellent",
  owner: {
    name: "John Anderson",
    rating: 4.8,
    exchanges: 24,
    location: "Boston, MA"
  },
  pointsRequired: 180,
  userPoints: 1250
};

export default function ExchangeRequest() {
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    setConfirmed(true);
  };

  if (confirmed) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="pt-6 text-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <Text variant="h2" className="mb-2">Request Sent!</Text>
            <Text variant="body" className="text-zinc-600 mb-6">
              Your exchange request has been sent to {MOCK_BOOK_REQUEST.owner.name}. 
              You'll be notified when they respond.
            </Text>

            <div className="bg-zinc-50 rounded-lg p-4 mb-6 text-left">
              <Text variant="caption" className="text-zinc-600 mb-2">Request Summary</Text>
              <Text variant="h4" className="mb-1">{MOCK_BOOK_REQUEST.title}</Text>
              <Text variant="body" className="text-zinc-600 mb-3">by {MOCK_BOOK_REQUEST.author}</Text>
              <div className="flex items-center justify-between">
                <Text variant="caption" className="text-zinc-600">Points Reserved</Text>
                <Text variant="body" className="font-bold text-amber-600">
                  {MOCK_BOOK_REQUEST.pointsRequired} pts
                </Text>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1">
                View My Requests
              </Button>
              <Button variant="primary" className="flex-1">
                Back to Marketplace
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Text variant="h1" className="mb-2">
            Request Book Exchange
          </Text>
          <Text variant="body" className="text-zinc-600">
            Review the details and confirm your exchange request
          </Text>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {[
            { num: 1, label: "Review" },
            { num: 2, label: "Message" },
            { num: 3, label: "Confirm" }
          ].map((s, idx) => (
            <div key={s.num} className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                  step >= s.num ? "bg-primary text-primary-foreground" : "bg-zinc-200 text-zinc-600"
                }`}>
                  {s.num}
                </div>
                <Text variant="caption" className={step >= s.num ? "text-primary font-semibold" : "text-zinc-600"}>
                  {s.label}
                </Text>
              </div>
              {idx < 2 && <div className={`w-12 h-0.5 ${step > s.num ? "bg-primary" : "bg-zinc-200"}`} />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="pt-6">
                {/* Step 1: Review */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <Text variant="h3" className="mb-4">Book Details</Text>
                      <div className="flex gap-4 p-4 bg-zinc-50 rounded-lg">
                        <div className="w-24 h-32 bg-linear-to-br from-primary/10 to-secondary/10 rounded flex items-center justify-center flex-shrink-0">
                          <BookOpen className="w-12 h-12 text-primary" />
                        </div>
                        <div>
                          <Text variant="h3" className="mb-1">{MOCK_BOOK_REQUEST.title}</Text>
                          <Text variant="body" className="text-zinc-600 mb-3">
                            by {MOCK_BOOK_REQUEST.author}
                          </Text>
                          <div className="flex gap-2">
                            <Badge variant="default">{MOCK_BOOK_REQUEST.genre}</Badge>
                            <Badge variant="success">{MOCK_BOOK_REQUEST.condition}</Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Text variant="h3" className="mb-4">Owner Information</Text>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <User className="w-5 h-5 text-zinc-500" />
                          <div>
                            <Text variant="caption" className="text-zinc-600">Owner</Text>
                            <Text variant="body" className="font-semibold">
                              {MOCK_BOOK_REQUEST.owner.name}
                            </Text>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <MapPin className="w-5 h-5 text-zinc-500" />
                          <div>
                            <Text variant="caption" className="text-zinc-600">Location</Text>
                            <Text variant="body">{MOCK_BOOK_REQUEST.owner.location}</Text>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Award className="w-5 h-5 text-zinc-500" />
                          <div>
                            <Text variant="caption" className="text-zinc-600">Rating & Exchanges</Text>
                            <Text variant="body">
                              {MOCK_BOOK_REQUEST.owner.rating} ⭐ • {MOCK_BOOK_REQUEST.owner.exchanges} exchanges
                            </Text>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button onClick={() => setStep(2)} className="w-full">
                      Continue
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                )}

                {/* Step 2: Message */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <Text variant="h3" className="mb-2">Add a Message (Optional)</Text>
                      <Text variant="body" className="text-zinc-600 mb-4">
                        Introduce yourself or add any details about the exchange
                      </Text>
                      <Textarea
                        placeholder="Hi! I'm very interested in reading this book..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={6}
                      />
                    </div>

                    <div className="flex gap-3">
                      <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                        Back
                      </Button>
                      <Button onClick={() => setStep(3)} className="flex-1">
                        Continue
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 3: Confirm */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div>
                      <Text variant="h3" className="mb-4">Confirm Exchange Request</Text>
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                        <div className="flex gap-3">
                          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <Text variant="body" className="font-semibold text-amber-900 mb-1">
                              Points will be reserved
                            </Text>
                            <Text variant="caption" className="text-amber-800">
                              The required points will be reserved from your balance until the owner responds. 
                              If declined, points will be returned.
                            </Text>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 bg-zinc-50 rounded-lg p-4">
                        <div className="flex justify-between">
                          <Text variant="body" className="text-zinc-600">Book</Text>
                          <Text variant="body" className="font-semibold">{MOCK_BOOK_REQUEST.title}</Text>
                        </div>
                        <div className="flex justify-between">
                          <Text variant="body" className="text-zinc-600">Owner</Text>
                          <Text variant="body">{MOCK_BOOK_REQUEST.owner.name}</Text>
                        </div>
                        {message && (
                          <div className="pt-3 border-t border-zinc-200">
                            <Text variant="caption" className="text-zinc-600 mb-1">Your Message</Text>
                            <Text variant="body" className="text-sm italic">"{message}"</Text>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                        Back
                      </Button>
                      <Button variant="primary" onClick={handleConfirm} className="flex-1">
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Confirm Request
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Points Calculation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Text variant="caption" className="text-zinc-600">Your Current Balance</Text>
                    <Text variant="h3" className="text-green-600">
                      {MOCK_BOOK_REQUEST.userPoints} pts
                    </Text>
                  </div>

                  <div className="h-px bg-zinc-200" />

                  <div>
                    <Text variant="caption" className="text-zinc-600">Required for This Book</Text>
                    <Text variant="h3" className="text-amber-600">
                      {MOCK_BOOK_REQUEST.pointsRequired} pts
                    </Text>
                  </div>

                  <div className="h-px bg-zinc-200" />

                  <div>
                    <Text variant="caption" className="text-zinc-600">Balance After Exchange</Text>
                    <Text variant="h3" className={
                      MOCK_BOOK_REQUEST.userPoints - MOCK_BOOK_REQUEST.pointsRequired >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }>
                      {MOCK_BOOK_REQUEST.userPoints - MOCK_BOOK_REQUEST.pointsRequired} pts
                    </Text>
                  </div>

                  {MOCK_BOOK_REQUEST.userPoints < MOCK_BOOK_REQUEST.pointsRequired && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <Text variant="caption" className="text-red-800">
                        Insufficient points. You need {MOCK_BOOK_REQUEST.pointsRequired - MOCK_BOOK_REQUEST.userPoints} more points.
                      </Text>
                      <Button variant="primary" size="sm" className="w-full mt-2">
                        Buy Points
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

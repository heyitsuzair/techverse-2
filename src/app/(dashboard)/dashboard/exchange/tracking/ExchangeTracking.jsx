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
  Checkbox
} from "@/components/ui";
import { 
  Package,
  CheckCircle2,
  Clock,
  Truck,
  AlertCircle,
  MessageCircle,
  Flag
} from "lucide-react";

// Mock Data
const MOCK_EXCHANGE = {
  id: 1,
  book: {
    title: "Moby Dick",
    author: "Herman Melville",
    condition: "Excellent"
  },
  partner: {
    name: "John Anderson",
    rating: 4.8
  },
  status: "in_transit",
  requestedDate: "2026-01-05",
  approvedDate: "2026-01-06",
  shippedDate: "2026-01-07",
  estimatedDelivery: "2026-01-12",
  trackingNumber: "1Z999AA10123456784",
  timeline: [
    { id: 1, status: "Request Sent", date: "2026-01-05 10:30 AM", completed: true },
    { id: 2, status: "Request Approved", date: "2026-01-06 02:15 PM", completed: true },
    { id: 3, status: "Book Shipped", date: "2026-01-07 09:00 AM", completed: true },
    { id: 4, status: "In Transit", date: "Estimated: 2026-01-12", completed: false },
    { id: 5, status: "Delivered", date: "Pending", completed: false },
  ]
};

export default function ExchangeTracking() {
  const [conditionConfirmed, setConditionConfirmed] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Text variant="h1" className="mb-2 flex items-center gap-3">
            <Package className="w-8 h-8" />
            Track Exchange
          </Text>
          <Text variant="body" className="text-zinc-600">
            Monitor your book exchange and delivery status
          </Text>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status Card */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-24 bg-linear-to-br from-primary/10 to-secondary/10 rounded flex items-center justify-center flex-shrink-0">
                    <Package className="w-10 h-10 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <Text variant="h3" className="mb-1">{MOCK_EXCHANGE.book.title}</Text>
                        <Text variant="body" className="text-zinc-600">
                          by {MOCK_EXCHANGE.book.author}
                        </Text>
                      </div>
                      <Badge variant="warning">
                        <Truck className="w-3 h-3 mr-1" />
                        In Transit
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <Text variant="caption" className="text-zinc-600">Exchange Partner</Text>
                        <Text variant="body" className="font-semibold">
                          {MOCK_EXCHANGE.partner.name}
                        </Text>
                      </div>
                      <div>
                        <Text variant="caption" className="text-zinc-600">Tracking Number</Text>
                        <Text variant="body" className="font-mono text-sm">
                          {MOCK_EXCHANGE.trackingNumber}
                        </Text>
                      </div>
                      <div>
                        <Text variant="caption" className="text-zinc-600">Shipped On</Text>
                        <Text variant="body">{MOCK_EXCHANGE.shippedDate}</Text>
                      </div>
                      <div>
                        <Text variant="caption" className="text-zinc-600">Est. Delivery</Text>
                        <Text variant="body" className="text-primary font-semibold">
                          {MOCK_EXCHANGE.estimatedDelivery}
                        </Text>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Exchange Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {MOCK_EXCHANGE.timeline.map((item, index) => (
                    <div key={item.id} className="flex gap-4">
                      {/* Timeline Icon */}
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          item.completed 
                            ? "bg-green-100 text-green-600" 
                            : index === MOCK_EXCHANGE.timeline.findIndex(t => !t.completed)
                            ? "bg-primary/10 text-primary"
                            : "bg-zinc-100 text-zinc-400"
                        }`}>
                          {item.completed ? (
                            <CheckCircle2 className="w-5 h-5" />
                          ) : index === MOCK_EXCHANGE.timeline.findIndex(t => !t.completed) ? (
                            <Clock className="w-5 h-5" />
                          ) : (
                            <div className="w-3 h-3 rounded-full bg-zinc-400" />
                          )}
                        </div>
                        {index < MOCK_EXCHANGE.timeline.length - 1 && (
                          <div className={`w-0.5 h-12 ${
                            item.completed ? "bg-green-300" : "bg-zinc-200"
                          }`} />
                        )}
                      </div>

                      {/* Timeline Content */}
                      <div className="flex-1 pb-8">
                        <Text variant="h4" className={item.completed ? "text-zinc-900" : "text-zinc-500"}>
                          {item.status}
                        </Text>
                        <Text variant="caption" className="text-zinc-600">
                          {item.date}
                        </Text>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Exchange Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Confirm Condition */}
                  <div className="flex items-start gap-3 p-4 bg-zinc-50 rounded-lg">
                    <Checkbox
                      checked={conditionConfirmed}
                      onChange={(e) => setConditionConfirmed(e.target.checked)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <Text variant="body" className="font-semibold mb-1">
                        Confirm Book Condition
                      </Text>
                      <Text variant="caption" className="text-zinc-600">
                        I confirm that the book arrived in the condition described ({MOCK_EXCHANGE.book.condition})
                      </Text>
                    </div>
                  </div>

                  {/* Report Issue */}
                  <div className="flex items-start gap-3 p-4 border-2 border-red-200 bg-red-50 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <Text variant="body" className="font-semibold mb-1 text-red-900">
                        Report an Issue
                      </Text>
                      <Text variant="caption" className="text-red-800 mb-3">
                        If there's a problem with the condition, delivery, or exchange
                      </Text>
                      <Button variant="outline" size="sm" onClick={() => setShowReportModal(true)}>
                        <Flag className="w-4 h-4 mr-2" />
                        Report Issue
                      </Button>
                    </div>
                  </div>

                  {/* Complete Exchange */}
                  {conditionConfirmed && (
                    <Button variant="primary" className="w-full">
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Complete Exchange
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Chat Shortcut */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Communication
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Text variant="body" className="text-zinc-600 mb-4">
                  Chat with {MOCK_EXCHANGE.partner.name} about this exchange
                </Text>
                <Button variant="primary" className="w-full">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Open Chat
                </Button>
              </CardContent>
            </Card>

            {/* Exchange Details */}
            <Card>
              <CardHeader>
                <CardTitle>Exchange Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <Text variant="caption" className="text-zinc-600">Book Condition</Text>
                    <Badge variant="success" className="mt-1">
                      {MOCK_EXCHANGE.book.condition}
                    </Badge>
                  </div>
                  <div>
                    <Text variant="caption" className="text-zinc-600">Partner Rating</Text>
                    <div className="flex items-center gap-1 mt-1">
                      <Text variant="body" className="font-semibold">
                        {MOCK_EXCHANGE.partner.rating}
                      </Text>
                      <Text variant="body" className="text-amber-500">⭐</Text>
                    </div>
                  </div>
                  <div>
                    <Text variant="caption" className="text-zinc-600">Request Date</Text>
                    <Text variant="body" className="mt-1">{MOCK_EXCHANGE.requestedDate}</Text>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Help & Support */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <Text variant="body" className="text-zinc-600 mb-4 text-sm">
                  Contact support if you need assistance with your exchange
                </Text>
                <Button variant="outline" size="sm" className="w-full">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Report Issue Modal (Simple version) */}
        {showReportModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="max-w-md w-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  Report Issue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Text variant="body" className="text-zinc-600 mb-4">
                  This feature will allow you to report issues with the exchange. 
                  Our support team will review and assist you.
                </Text>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setShowReportModal(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button variant="primary" className="flex-1">
                    Submit Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

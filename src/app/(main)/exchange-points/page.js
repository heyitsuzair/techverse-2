"use client";

import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Input,
} from "@/components/ui";
import routes from "@/config/routes";
import { useRouterWithProgress } from "@/hooks";

const MOCK_EXCHANGE_POINTS = [
  {
    id: 1,
    name: "Central Library Exchange",
    address: "123 Main Street, New York, NY 10001",
    description:
      "Located at the main entrance. Safe, public area with seating.",
    hours: "Mon-Fri: 9AM-8PM, Sat-Sun: 10AM-6PM",
    activeExchanges: 23,
    rating: 4.9,
    coordinates: { lat: 40.7589, lng: -73.9851 },
    verified: true,
  },
  {
    id: 2,
    name: "Riverside Park Pavilion",
    address: "456 Riverside Drive, New York, NY 10025",
    description: "Outdoor pavilion with benches. Well-lit and monitored.",
    hours: "Daily: 8AM-10PM",
    activeExchanges: 18,
    rating: 4.7,
    coordinates: { lat: 40.7956, lng: -73.9716 },
    verified: true,
  },
  {
    id: 3,
    name: "Community Center Hub",
    address: "789 Broadway, New York, NY 10003",
    description: "Indoor lounge area. Coffee shop nearby.",
    hours: "Mon-Sat: 7AM-9PM, Sun: Closed",
    activeExchanges: 31,
    rating: 4.8,
    coordinates: { lat: 40.7282, lng: -73.9942 },
    verified: true,
  },
  {
    id: 4,
    name: "University Quad",
    address: "321 University Place, New York, NY 10003",
    description: "Popular student meetup spot. Multiple seating areas.",
    hours: "24/7 (Public Space)",
    activeExchanges: 45,
    rating: 4.6,
    coordinates: { lat: 40.7295, lng: -73.9965 },
    verified: true,
  },
  {
    id: 5,
    name: "Coffee House Exchange",
    address: "555 5th Avenue, New York, NY 10017",
    description: "Partner coffee shop. Purchase required for extended stays.",
    hours: "Daily: 6AM-11PM",
    activeExchanges: 27,
    rating: 4.9,
    coordinates: { lat: 40.7549, lng: -73.984 },
    verified: true,
  },
];

export default function ExchangePointsPage() {
  const router = useRouterWithProgress();
  const [view, setView] = useState("list"); // 'list' or 'map'
  const [searchQuery, setSearchQuery] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);

  const filteredPoints = MOCK_EXCHANGE_POINTS.filter(
    (point) =>
      point.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      point.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAction = () => {
    setShowLoginModal(true);
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Navigation */}
      <nav className="border-b border-zinc-200 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <button
            onClick={() => router.push(routes.home)}
            className="flex items-center gap-2"
          >
            <span className="text-2xl">📚</span>
            <h1 className="text-xl font-bold text-zinc-900">BooksExchange</h1>
          </button>
          <div className="flex gap-3">
            <Button
              variant="ghost"
              onClick={() => router.push(routes.marketplace)}
            >
              Marketplace
            </Button>
            <Button
              variant="ghost"
              onClick={() => router.push(routes.auth.signin)}
            >
              Login
            </Button>
            <Button onClick={() => router.push(routes.auth.signup)}>
              Sign Up
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Banner */}
      <div className="bg-green-50 border-b border-green-200">
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-4xl font-bold text-zinc-900 mb-4">
            📍 Physical Exchange Points
          </h2>
          <p className="text-lg text-zinc-600 mb-6">
            Safe, public locations for in-person book exchanges across your city
          </p>
          <Badge variant="success" size="lg">
            ✅ All locations verified and community-approved
          </Badge>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Controls */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                placeholder="Search by location name or address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <div className="flex gap-2">
                <Button
                  variant={view === "list" ? "primary" : "outline"}
                  onClick={() => setView("list")}
                >
                  📋 List View
                </Button>
                <Button
                  variant={view === "map" ? "primary" : "outline"}
                  onClick={() => setView("map")}
                >
                  🗺️ Map View
                </Button>
                <Button variant="outline" onClick={handleAction}>
                  + Add Location
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* View Toggle */}
        {view === "map" && (
          <Card className="mb-8">
            <CardContent className="p-0">
              <div className="relative bg-zinc-100 h-96 rounded-lg overflow-hidden">
                {/* Map Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-2xl mb-2">🗺️</p>
                    <p className="text-zinc-600 mb-4">Interactive Map View</p>
                    <p className="text-sm text-zinc-500">
                      Map integration would show all exchange points on an
                      interactive map
                    </p>
                  </div>
                </div>
                {/* Map markers simulation */}
                {filteredPoints.slice(0, 3).map((point, index) => (
                  <div
                    key={point.id}
                    className="absolute bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg cursor-pointer hover:scale-110 transition-transform"
                    style={{
                      left: `${20 + index * 25}%`,
                      top: `${30 + index * 15}%`,
                    }}
                  >
                    📍 {point.name.split(" ")[0]}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {filteredPoints.length}
              </div>
              <p className="text-sm text-zinc-600">Active Locations</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {filteredPoints.reduce((sum, p) => sum + p.activeExchanges, 0)}
              </div>
              <p className="text-sm text-zinc-600">Active Exchanges</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {filteredPoints.filter((p) => p.verified).length}
              </div>
              <p className="text-sm text-zinc-600">Verified Safe</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">4.8</div>
              <p className="text-sm text-zinc-600">Avg Rating</p>
            </CardContent>
          </Card>
        </div>

        {/* List View */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold text-zinc-900">All Locations</h3>
            <p className="text-zinc-600">
              Found{" "}
              <span className="font-semibold">{filteredPoints.length}</span>{" "}
              locations
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {filteredPoints.map((point) => (
              <Card
                key={point.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2 mb-2">
                        {point.name}
                        {point.verified && (
                          <Badge variant="success" size="sm">
                            ✓ Verified
                          </Badge>
                        )}
                      </CardTitle>
                      <p className="text-sm text-zinc-600">{point.address}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-lg">
                        ⭐ {point.rating}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-700 mb-4">{point.description}</p>

                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <span>🕐</span>
                      <span className="text-zinc-600">{point.hours}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>🔄</span>
                      <span className="text-zinc-600">
                        <span className="font-semibold">
                          {point.activeExchanges}
                        </span>{" "}
                        active exchanges
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={handleAction}
                    >
                      📍 Get Directions
                    </Button>
                    <Button size="sm" className="flex-1" onClick={handleAction}>
                      Schedule Exchange
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPoints.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-zinc-600 mb-4">
                No exchange points found
              </p>
              <Button variant="outline" onClick={() => setSearchQuery("")}>
                Clear Search
              </Button>
            </div>
          )}
        </div>

        {/* Info Section */}
        <Card className="mt-12 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle>About Exchange Points</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">🛡️ Safety First</h4>
                <p className="text-sm text-zinc-700">
                  All exchange points are verified public locations with good
                  lighting, security, and community presence. Always meet during
                  business hours.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">📝 How to Use</h4>
                <p className="text-sm text-zinc-700">
                  Agree on a location with your exchange partner. Schedule a
                  time that works for both. Bring your book and confirm the
                  exchange.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">⭐ Community Rated</h4>
                <p className="text-sm text-zinc-700">
                  Each location is rated by the community for safety,
                  convenience, and overall experience. Your feedback helps
                  others.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">➕ Add New Locations</h4>
                <p className="text-sm text-zinc-700">
                  Know a great public spot? Login to suggest new exchange
                  points. Community-approved locations are added regularly.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full">
            <CardContent className="p-8 text-center">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-2xl font-bold text-zinc-900 mb-4">
                Login Required
              </h3>
              <p className="text-zinc-600 mb-6">
                You need to be logged in to schedule exchanges or add new
                locations.
              </p>
              <div className="flex gap-3">
                <Button
                  className="flex-1"
                  onClick={() => router.push(routes.auth.signin)}
                >
                  Login
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => router.push(routes.auth.signup)}
                >
                  Sign Up
                </Button>
              </div>
              <Button
                variant="ghost"
                className="w-full mt-4"
                onClick={() => setShowLoginModal(false)}
              >
                Cancel
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { 
  Card, 
  CardContent,
  Button,
  Text,
  Input,
  Textarea
} from "@/components/ui";
import { 
  MapPin,
  Store,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  Navigation
} from "lucide-react";

export default function AddStall() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    stallName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    email: "",
    openingTime: "",
    closingTime: "",
    description: "",
    latitude: "",
    longitude: ""
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setFormData({
          ...formData,
          latitude: position.coords.latitude.toFixed(6),
          longitude: position.coords.longitude.toFixed(6)
        });
      });
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="pt-6 text-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <Text variant="h2" className="mb-2">Stall Registered!</Text>
            <Text variant="body" className="text-zinc-600 mb-6">
              Your exchange point has been successfully registered and will appear on the map after verification.
            </Text>

            <div className="bg-zinc-50 rounded-lg p-4 mb-6 text-left">
              <Text variant="caption" className="text-zinc-600 mb-2">Stall Details</Text>
              <Text variant="h4" className="mb-1">{formData.stallName}</Text>
              <Text variant="body" className="text-zinc-600 mb-2">{formData.address}</Text>
              <Text variant="caption" className="text-zinc-600">
                Verification typically takes 1-2 business days
              </Text>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setSubmitted(false)}>
                Add Another
              </Button>
              <Button variant="primary" className="flex-1">
                View Stalls
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Text variant="h1" className="mb-2 flex items-center gap-3">
            <Store className="w-8 h-8" />
            Register Exchange Point
          </Text>
          <Text variant="body" className="text-zinc-600">
            Add a physical location where users can exchange books
          </Text>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardContent className="pt-6 space-y-6">
              {/* Basic Information */}
              <div>
                <Text variant="h3" className="mb-4">Basic Information</Text>
                <div className="space-y-4">
                  <div>
                    <Text variant="caption" className="mb-2">Stall/Store Name *</Text>
                    <Input
                      placeholder="Enter the name of your stall or store"
                      value={formData.stallName}
                      onChange={(e) => handleChange("stallName", e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Text variant="caption" className="mb-2">Description</Text>
                    <Textarea
                      placeholder="Describe your exchange point, services offered, etc."
                      value={formData.description}
                      onChange={(e) => handleChange("description", e.target.value)}
                      rows={4}
                    />
                  </div>
                </div>
              </div>

              {/* Location Details */}
              <div>
                <Text variant="h3" className="mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Location Details
                </Text>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Text variant="caption" className="mb-2">Street Address *</Text>
                    <Input
                      placeholder="Enter street address"
                      value={formData.address}
                      onChange={(e) => handleChange("address", e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Text variant="caption" className="mb-2">City *</Text>
                    <Input
                      placeholder="City"
                      value={formData.city}
                      onChange={(e) => handleChange("city", e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Text variant="caption" className="mb-2">State *</Text>
                    <Input
                      placeholder="State"
                      value={formData.state}
                      onChange={(e) => handleChange("state", e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Text variant="caption" className="mb-2">Zip Code *</Text>
                    <Input
                      placeholder="Zip Code"
                      value={formData.zipCode}
                      onChange={(e) => handleChange("zipCode", e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Geo-location */}
              <div>
                <Text variant="h3" className="mb-4 flex items-center gap-2">
                  <Navigation className="w-5 h-5" />
                  Geo-location
                </Text>
                <div className="grid md:grid-cols-2 gap-4 mb-3">
                  <div>
                    <Text variant="caption" className="mb-2">Latitude</Text>
                    <Input
                      placeholder="40.7128"
                      value={formData.latitude}
                      onChange={(e) => handleChange("latitude", e.target.value)}
                    />
                  </div>
                  <div>
                    <Text variant="caption" className="mb-2">Longitude</Text>
                    <Input
                      placeholder="-74.0060"
                      value={formData.longitude}
                      onChange={(e) => handleChange("longitude", e.target.value)}
                    />
                  </div>
                </div>
                <Button type="button" variant="outline" size="sm" onClick={getCurrentLocation}>
                  <Navigation className="w-4 h-4 mr-2" />
                  Use Current Location
                </Button>
              </div>

              {/* Contact Information */}
              <div>
                <Text variant="h3" className="mb-4">Contact Information</Text>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Text variant="caption" className="mb-2 flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Phone Number *
                    </Text>
                    <Input
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Text variant="caption" className="mb-2 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address *
                    </Text>
                    <Input
                      type="email"
                      placeholder="contact@example.com"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div>
                <Text variant="h3" className="mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Business Hours
                </Text>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Text variant="caption" className="mb-2">Opening Time *</Text>
                    <Input
                      type="time"
                      value={formData.openingTime}
                      onChange={(e) => handleChange("openingTime", e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Text variant="caption" className="mb-2">Closing Time *</Text>
                    <Input
                      type="time"
                      value={formData.closingTime}
                      onChange={(e) => handleChange("closingTime", e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-zinc-200">
                <Button type="submit" variant="primary" className="w-full">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Register Exchange Point
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}

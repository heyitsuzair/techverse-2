"use client";

import { useState } from "react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent,
  Button,
  Text,
  Input,
  Badge,
  Textarea,
  Select,
  Checkbox
} from "@/components/ui";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  BookOpen,
  TrendingUp,
  Clock,
  Settings,
  Bell,
  Lock,
  Save,
  Edit2,
  CheckCircle2,
  Package
} from "lucide-react";

// Mock Data
const MOCK_USER_PROFILE = {
  name: "Sarah Johnson",
  email: "sarah.johnson@example.com",
  phone: "+1 (555) 123-4567",
  location: "New York, NY",
  bio: "Avid reader and book collector. Love sharing my favorite books with fellow readers!",
  memberSince: "January 2024",
  avatar: "SJ"
};

const MOCK_MY_BOOKS = [
  { id: 1, title: "The Great Gatsby", status: "Available", requests: 3 },
  { id: 2, title: "To Kill a Mockingbird", status: "Exchanged", requests: 0 },
  { id: 3, title: "1984", status: "Pending", requests: 1 },
];

const MOCK_EXCHANGE_HISTORY = [
  { id: 1, book: "Pride and Prejudice", partner: "John Doe", date: "2025-12-15", status: "Completed", points: 150 },
  { id: 2, book: "The Hobbit", partner: "Jane Smith", date: "2025-12-01", status: "Completed", points: 200 },
  { id: 3, book: "Animal Farm", partner: "Mike Brown", date: "2025-11-20", status: "Completed", points: 120 },
  { id: 4, book: "Brave New World", partner: "Emily White", date: "2025-11-10", status: "Cancelled", points: 0 },
];

const MOCK_POINTS_HISTORY = [
  { id: 1, type: "Earned", description: "Book exchange completed", date: "2025-12-15", amount: 150 },
  { id: 2, type: "Spent", description: "Requested 'Moby Dick'", date: "2025-12-10", amount: -180 },
  { id: 3, type: "Purchased", description: "Points package - Medium", date: "2025-12-05", amount: 500 },
  { id: 4, type: "Earned", description: "Book exchange completed", date: "2025-12-01", amount: 200 },
];

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState(MOCK_USER_PROFILE);

  const handleSave = () => {
    // Save logic here
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Text variant="h1" className="mb-2">
            Profile & Account
          </Text>
          <Text variant="body" className="text-zinc-600">
            Manage your profile, books, and account settings
          </Text>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-zinc-200 overflow-x-auto">
          {[
            { id: "profile", label: "Profile Info", icon: User },
            { id: "books", label: "My Books", icon: BookOpen },
            { id: "exchanges", label: "Exchange History", icon: TrendingUp },
            { id: "points", label: "Points History", icon: Package },
            { id: "settings", label: "Settings", icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                variant="ghost"
                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-zinc-600 hover:text-zinc-900"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </Button>
            );
          })}
        </div>

        {/* Profile Info Tab */}
        {activeTab === "profile" && (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Profile Information</CardTitle>
                    {!isEditing ? (
                      <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                        <Edit2 className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button onClick={() => setIsEditing(false)} variant="outline" size="sm">
                          Cancel
                        </Button>
                        <Button onClick={handleSave} variant="primary" size="sm">
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-24 h-24 rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground text-3xl font-bold">
                        {formData.avatar}
                      </div>
                      {isEditing && (
                        <Button variant="outline" size="sm">
                          Change Avatar
                        </Button>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Text variant="caption" className="mb-2 flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Full Name
                        </Text>
                        {isEditing ? (
                          <Input
                            value={formData.name}
                            onChange={(e) => handleChange("name", e.target.value)}
                          />
                        ) : (
                          <Text variant="body">{formData.name}</Text>
                        )}
                      </div>

                      <div>
                        <Text variant="caption" className="mb-2 flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          Email Address
                        </Text>
                        {isEditing ? (
                          <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                          />
                        ) : (
                          <Text variant="body">{formData.email}</Text>
                        )}
                      </div>

                      <div>
                        <Text variant="caption" className="mb-2 flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Phone Number
                        </Text>
                        {isEditing ? (
                          <Input
                            value={formData.phone}
                            onChange={(e) => handleChange("phone", e.target.value)}
                          />
                        ) : (
                          <Text variant="body">{formData.phone}</Text>
                        )}
                      </div>

                      <div>
                        <Text variant="caption" className="mb-2 flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          Location
                        </Text>
                        {isEditing ? (
                          <Input
                            value={formData.location}
                            onChange={(e) => handleChange("location", e.target.value)}
                          />
                        ) : (
                          <Text variant="body">{formData.location}</Text>
                        )}
                      </div>
                    </div>

                    <div>
                      <Text variant="caption" className="mb-2">
                        Bio
                      </Text>
                      {isEditing ? (
                        <Textarea
                          value={formData.bio}
                          onChange={(e) => handleChange("bio", e.target.value)}
                          rows={4}
                        />
                      ) : (
                        <Text variant="body">{formData.bio}</Text>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Account Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Text variant="caption" className="text-zinc-500 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Member Since
                      </Text>
                      <Text variant="h4">{formData.memberSince}</Text>
                    </div>
                    <div>
                      <Text variant="caption" className="text-zinc-500">Books Listed</Text>
                      <Text variant="h4">{MOCK_MY_BOOKS.length}</Text>
                    </div>
                    <div>
                      <Text variant="caption" className="text-zinc-500">Total Exchanges</Text>
                      <Text variant="h4">{MOCK_EXCHANGE_HISTORY.filter(e => e.status === "Completed").length}</Text>
                    </div>
                    <div>
                      <Text variant="caption" className="text-zinc-500">Current Points</Text>
                      <Text variant="h4" className="text-amber-600">1,250</Text>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* My Books Tab */}
        {activeTab === "books" && (
          <Card>
            <CardHeader>
              <CardTitle>My Books Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-zinc-200">
                      <th className="text-left py-3 px-4">
                        <Text variant="caption" className="font-semibold">Book Title</Text>
                      </th>
                      <th className="text-left py-3 px-4">
                        <Text variant="caption" className="font-semibold">Status</Text>
                      </th>
                      <th className="text-left py-3 px-4">
                        <Text variant="caption" className="font-semibold">Requests</Text>
                      </th>
                      <th className="text-right py-3 px-4">
                        <Text variant="caption" className="font-semibold">Actions</Text>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_MY_BOOKS.map((book) => (
                      <tr key={book.id} className="border-b border-zinc-100">
                        <td className="py-3 px-4">
                          <Text variant="body">{book.title}</Text>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant={
                            book.status === "Available" ? "success" :
                            book.status === "Pending" ? "warning" : "default"
                          }>
                            {book.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Text variant="body">{book.requests}</Text>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Exchange History Tab */}
        {activeTab === "exchanges" && (
          <Card>
            <CardHeader>
              <CardTitle>Exchange History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-zinc-200">
                      <th className="text-left py-3 px-4">
                        <Text variant="caption" className="font-semibold">Book</Text>
                      </th>
                      <th className="text-left py-3 px-4">
                        <Text variant="caption" className="font-semibold">Exchange Partner</Text>
                      </th>
                      <th className="text-left py-3 px-4">
                        <Text variant="caption" className="font-semibold">Date</Text>
                      </th>
                      <th className="text-left py-3 px-4">
                        <Text variant="caption" className="font-semibold">Status</Text>
                      </th>
                      <th className="text-right py-3 px-4">
                        <Text variant="caption" className="font-semibold">Points</Text>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_EXCHANGE_HISTORY.map((exchange) => (
                      <tr key={exchange.id} className="border-b border-zinc-100">
                        <td className="py-3 px-4">
                          <Text variant="body">{exchange.book}</Text>
                        </td>
                        <td className="py-3 px-4">
                          <Text variant="body">{exchange.partner}</Text>
                        </td>
                        <td className="py-3 px-4">
                          <Text variant="body" className="text-zinc-600">{exchange.date}</Text>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant={exchange.status === "Completed" ? "success" : "default"}>
                            {exchange.status === "Completed" && <CheckCircle2 className="w-3 h-3 mr-1" />}
                            {exchange.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Text variant="body" className={exchange.points > 0 ? "text-green-600" : "text-zinc-400"}>
                            {exchange.points > 0 ? `+${exchange.points}` : exchange.points}
                          </Text>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Points History Tab */}
        {activeTab === "points" && (
          <Card>
            <CardHeader>
              <CardTitle>Points Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-zinc-200">
                      <th className="text-left py-3 px-4">
                        <Text variant="caption" className="font-semibold">Type</Text>
                      </th>
                      <th className="text-left py-3 px-4">
                        <Text variant="caption" className="font-semibold">Description</Text>
                      </th>
                      <th className="text-left py-3 px-4">
                        <Text variant="caption" className="font-semibold">Date</Text>
                      </th>
                      <th className="text-right py-3 px-4">
                        <Text variant="caption" className="font-semibold">Amount</Text>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_POINTS_HISTORY.map((transaction) => (
                      <tr key={transaction.id} className="border-b border-zinc-100">
                        <td className="py-3 px-4">
                          <Badge variant={
                            transaction.type === "Earned" ? "success" :
                            transaction.type === "Spent" ? "warning" : "primary"
                          }>
                            {transaction.type}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Text variant="body">{transaction.description}</Text>
                        </td>
                        <td className="py-3 px-4">
                          <Text variant="body" className="text-zinc-600">{transaction.date}</Text>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Text variant="body" className={transaction.amount > 0 ? "text-green-600 font-semibold" : "text-red-600"}>
                            {transaction.amount > 0 ? `+${transaction.amount}` : transaction.amount}
                          </Text>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { id: "email", label: "Email Notifications", description: "Receive email updates about exchanges" },
                    { id: "push", label: "Push Notifications", description: "Get push notifications on your device" },
                    { id: "wishlist", label: "Wishlist Alerts", description: "Notify when wishlist books are available" },
                    { id: "messages", label: "Message Notifications", description: "Alerts for new messages" },
                  ].map((setting) => (
                    <div key={setting.id} className="flex items-start justify-between pb-4 border-b border-zinc-100 last:border-0">
                      <div>
                        <Text variant="body" className="font-medium">{setting.label}</Text>
                        <Text variant="caption" className="text-zinc-600">{setting.description}</Text>
                      </div>
                      <Checkbox defaultChecked className="mt-1" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Privacy & Security
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="pb-4 border-b border-zinc-100">
                    <Text variant="body" className="font-medium mb-2">Profile Visibility</Text>
                    <Select>
                      <option>Public</option>
                      <option>Private</option>
                      <option>Friends Only</option>
                    </Select>
                  </div>
                  <div className="pb-4 border-b border-zinc-100">
                    <Text variant="body" className="font-medium mb-2">Show Exchange History</Text>
                    <Checkbox defaultChecked />
                  </div>
                  <div className="pb-4 border-b border-zinc-100">
                    <Text variant="body" className="font-medium mb-2">Change Password</Text>
                    <Button variant="outline" size="sm" className="mt-2">
                      Update Password
                    </Button>
                  </div>
                  <div>
                    <Text variant="body" className="font-medium mb-2">Two-Factor Authentication</Text>
                    <Button variant="outline" size="sm" className="mt-2">
                      Enable 2FA
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

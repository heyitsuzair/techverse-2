"use client";

import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent,
  Button,
  Text,
  Badge,
  LinkWithProgress
} from "@/components/ui";
import routes from "@/config/routes";
import { 
  BookOpen, 
  Search, 
  FileText, 
  Bell, 
  TrendingUp,
  Award,
  Plus,
  ArrowRight,
  Clock,
  CheckCircle2,
  XCircle
} from "lucide-react";

// Mock Data
const MOCK_USER = {
  name: "Sarah Johnson",
  avatar: "SJ",
  level: "Gold Member",
  points: 1250,
  booksListed: 12,
  booksExchanged: 8,
  memberSince: "Jan 2024"
};

const MOCK_NOTIFICATIONS = [
  { id: 1, type: "success", message: "Your book 'The Great Gatsby' was requested by John", time: "5 min ago" },
  { id: 2, type: "info", message: "New book matching your wishlist is available", time: "1 hour ago" },
  { id: 3, type: "warning", message: "Exchange request pending approval", time: "3 hours ago" },
];

const MOCK_ACTIVITY = [
  { id: 1, action: "Listed", book: "To Kill a Mockingbird", time: "2 hours ago", status: "completed" },
  { id: 2, action: "Requested", book: "1984 by George Orwell", time: "1 day ago", status: "pending" },
  { id: 3, action: "Exchanged", book: "Pride and Prejudice", time: "2 days ago", status: "completed" },
  { id: 4, action: "Added to Wishlist", book: "The Catcher in the Rye", time: "3 days ago", status: "completed" },
  { id: 5, action: "Received", book: "The Hobbit", time: "5 days ago", status: "completed" },
];

const QUICK_ACTIONS = [
  { id: 1, title: "Add Book", icon: Plus, href: routes.dashboard.books.add, color: "bg-primary" },
  { id: 2, title: "Search Books", icon: Search, href: routes.marketplace, color: "bg-primary" },
  { id: 3, title: "My Requests", icon: FileText, href: routes.dashboard.exchange.tracking, color: "bg-secondary" },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Text variant="h1" className="mb-2">
            Welcome back, {MOCK_USER.name}!
          </Text>
          <Text variant="body" className="text-zinc-600">
            Here's what's happening with your book exchanges today
          </Text>
        </div>

        {/* Profile Snapshot & Points Balance */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Profile Card */}
          <Card className="lg:col-span-2">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground text-2xl font-bold">
                  {MOCK_USER.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Text variant="h3">{MOCK_USER.name}</Text>
                    <Badge variant="primary">{MOCK_USER.level}</Badge>
                  </div>
                  <Text variant="body" className="text-zinc-600 mb-4">
                    Member since {MOCK_USER.memberSince}
                  </Text>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Text variant="caption" className="text-zinc-500">Books Listed</Text>
                      <Text variant="h3" className="text-primary">{MOCK_USER.booksListed}</Text>
                    </div>
                    <div>
                      <Text variant="caption" className="text-zinc-500">Exchanged</Text>
                      <Text variant="h3" className="text-primary">{MOCK_USER.booksExchanged}</Text>
                    </div>
                    <div>
                      <Text variant="caption" className="text-zinc-500">Success Rate</Text>
                      <Text variant="h3" className="text-secondary">94%</Text>
                    </div>
                  </div>
                </div>
                <LinkWithProgress href={routes.dashboard.profile}>
                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
                </LinkWithProgress>
              </div>
            </CardContent>
          </Card>

          {/* Points Balance Card */}
          <Card className="bg-linear-to-br from-primary to-secondary text-primary-foreground">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-primary-foreground flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Points Balance
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <Text variant="h1" className="text-primary-foreground mb-4">
                {MOCK_USER.points}
              </Text>
              <LinkWithProgress href={routes.dashboard.points.buy}>
                <Button variant="outline" size="sm" className="!bg-primary-foreground text-primary border-primary-foreground hover:!bg-primary-foreground/90 w-full">
                  Buy More Points
                </Button>
              </LinkWithProgress>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <Text variant="h2" className="mb-4">
            Quick Actions
          </Text>
          <div className="grid md:grid-cols-3 gap-4">
            {QUICK_ACTIONS.map((action) => {
              const Icon = action.icon;
              return (
                <LinkWithProgress key={action.id} href={action.href}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <Text variant="h4">{action.title}</Text>
                        </div>
                        <ArrowRight className="w-5 h-5 text-zinc-400 group-hover:text-zinc-600 group-hover:translate-x-1 transition-all" />
                      </div>
                    </CardContent>
                  </Card>
                </LinkWithProgress>
              );
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Activity Feed */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Recent Activity
                  </CardTitle>
                  <LinkWithProgress href={routes.dashboard.profile}>
                    <Button variant="ghost" size="sm">
                      View All
                    </Button>
                  </LinkWithProgress>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {MOCK_ACTIVITY.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 pb-4 border-b border-zinc-100 last:border-0 last:pb-0">
                      {activity.status === "completed" ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                      ) : (
                        <Clock className="w-5 h-5 text-amber-500 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <Text variant="body" className="font-medium">
                          {activity.action}: <span className="text-zinc-600">{activity.book}</span>
                        </Text>
                        <Text variant="caption" className="text-zinc-500">
                          {activity.time}
                        </Text>
                      </div>
                      <Badge variant={activity.status === "completed" ? "success" : "warning"}>
                        {activity.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Notifications */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notifications
                  <Badge variant="primary" className="ml-auto">{MOCK_NOTIFICATIONS.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {MOCK_NOTIFICATIONS.map((notification) => (
                    <div key={notification.id} className="pb-4 border-b border-zinc-100 last:border-0 last:pb-0">
                      <div className="flex gap-2 mb-2">
                        {notification.type === "success" && (
                          <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        )}
                        {notification.type === "info" && (
                          <BookOpen className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        )}
                        {notification.type === "warning" && (
                          <Clock className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <Text variant="body" className="text-sm">
                            {notification.message}
                          </Text>
                          <Text variant="caption" className="text-zinc-500">
                            {notification.time}
                          </Text>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="ghost" size="sm" className="w-full mt-4">
                  View All Notifications
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

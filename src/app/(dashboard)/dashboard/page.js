import { Text, Card, CardHeader, CardTitle, CardContent } from "@/components/ui";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Text variant="h1" className="mb-8">
          Dashboard
        </Text>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <Text variant="h2">1,234</Text>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <Text variant="h2">567</Text>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <Text variant="h2">$12,345</Text>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Dashboard Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <Text variant="body">
              This is an example dashboard page in the (dashboard) route group.
              Pages in this group typically require authentication and are for
              authenticated users only.
            </Text>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

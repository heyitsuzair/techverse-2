import { Text, Card, CardHeader, CardTitle, CardContent } from "@/components/ui";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Text variant="h1" className="mb-8">
          Settings
        </Text>

        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <Text variant="body">
              This is a settings page within the dashboard route group. You can
              organize all authenticated pages under the (dashboard) group.
            </Text>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

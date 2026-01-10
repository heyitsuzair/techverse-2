import { Text } from "@/components/ui";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Text variant="h1" className="mb-6">
          About Us
        </Text>
        <Text variant="body" className="mb-4">
          This is an example page in the (main) route group. Pages in this group
          are public-facing and don't require authentication.
        </Text>
        <Text variant="body">
          You can organize your public pages like About, Contact, Features, etc.
          in this route group.
        </Text>
      </div>
    </div>
  );
}

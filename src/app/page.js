"use client";

import { Button, Card, CardContent, Badge } from "@/components/ui";
import { LinkWithProgress } from "@/components/ui";
import routes from "@/config/routes";
import { useRouterWithProgress } from "@/hooks";

const MOCK_FEATURED_BOOKS = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Classic Fiction",
    condition: "Good",
    points: 85,
    location: "New York, NY",
    imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Classic Fiction",
    condition: "Excellent",
    points: 95,
    location: "Los Angeles, CA",
    imageUrl: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400",
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    condition: "Fair",
    points: 75,
    location: "Chicago, IL",
    imageUrl:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400",
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    condition: "Good",
    points: 80,
    location: "Boston, MA",
    imageUrl:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400",
  },
];

const HOW_IT_WORKS = [
  {
    step: 1,
    title: "Browse Books",
    description:
      "Explore our community marketplace filled with books from readers like you.",
    icon: "📚",
  },
  {
    step: 2,
    title: "Request Exchange",
    description:
      "Find a book you love? Request an exchange using AI-calculated points.",
    icon: "🔄",
  },
  {
    step: 3,
    title: "Meet & Exchange",
    description:
      "Connect at physical exchange points or arrange direct meetups.",
    icon: "🤝",
  },
  {
    step: 4,
    title: "Share Your Story",
    description:
      "Scan the QR code and add your reading journey to the book's history.",
    icon: "📖",
  },
];

const WHY_BOOKSEXCHANGE = [
  {
    title: "Trust-Based Community",
    description:
      "AI-powered point system ensures fair exchanges based on book condition and rarity.",
    icon: "🛡️",
  },
  {
    title: "Physical Exchange Points",
    description: "Safe, public locations for book exchanges across your city.",
    icon: "📍",
  },
  {
    title: "Book History & Forums",
    description:
      "Every book has a story. Track its journey and join chapter discussions.",
    icon: "💬",
  },
  {
    title: "Sustainable Reading",
    description:
      "Give books a second life and reduce waste. Share the joy of reading.",
    icon: "🌱",
  },
];

export default function LandingPage() {
  const router = useRouterWithProgress();

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white">
      {/* Navigation */}
      <nav className="border-b border-zinc-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📚</span>
            <h1 className="text-xl font-bold text-zinc-900">BooksExchange</h1>
          </div>
          <div className="flex gap-3">
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

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Badge variant="primary" className="mb-6">
          🌟 Join 10,000+ Book Lovers
        </Badge>
        <h2 className="text-5xl font-bold text-zinc-900 mb-6 max-w-3xl mx-auto">
          Share Books, Build Community, Create Stories
        </h2>
        <p className="text-xl text-zinc-600 mb-8 max-w-2xl mx-auto">
          BooksExchange connects readers through a trust-based platform for
          exchanging physical books. Every book has a journey—be part of it.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" onClick={() => router.push(routes.auth.signup)}>
            Get Started Free
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => router.push(routes.marketplace)}
          >
            Explore Marketplace
          </Button>
        </div>
        <div className="mt-16 max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-zinc-200">
          <img
            src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200"
            alt="Books on shelves"
            className="w-full h-96 object-cover"
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-zinc-900 mb-4">
              How It Works
            </h3>
            <p className="text-lg text-zinc-600">
              Four simple steps to start your book exchange journey
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {HOW_IT_WORKS.map((item) => (
              <Card
                key={item.step}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                    {item.step}
                  </div>
                  <h4 className="text-xl font-semibold text-zinc-900 mb-2">
                    {item.title}
                  </h4>
                  <p className="text-zinc-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why BooksExchange */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-zinc-900 mb-4">
              Why BooksExchange?
            </h3>
            <p className="text-lg text-zinc-600">
              Built for readers, by readers
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {WHY_BOOKSEXCHANGE.map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h4 className="text-xl font-semibold text-zinc-900 mb-3">
                    {item.title}
                  </h4>
                  <p className="text-zinc-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-zinc-900 mb-4">
              Featured Books
            </h3>
            <p className="text-lg text-zinc-600 mb-8">
              Discover what's available in the community
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_FEATURED_BOOKS.map((book) => (
              <Card
                key={book.id}
                className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => router.push(routes.book.detail(book.id))}
              >
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-4">
                  <Badge variant="primary" size="sm" className="mb-2">
                    {book.points} Points
                  </Badge>
                  <h4 className="font-semibold text-zinc-900 mb-1">
                    {book.title}
                  </h4>
                  <p className="text-sm text-zinc-600 mb-2">{book.author}</p>
                  <div className="flex justify-between items-center text-xs text-zinc-500">
                    <span>{book.genre}</span>
                    <Badge variant="success" size="sm">
                      {book.condition}
                    </Badge>
                  </div>
                  <p className="text-xs text-zinc-500 mt-2">
                    📍 {book.location}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button
              variant="outline"
              size="lg"
              onClick={() => router.push(routes.marketplace)}
            >
              View All Books →
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary/10 to-secondary/10 py-20">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-zinc-900 mb-4">
            Ready to Start Exchanging?
          </h3>
          <p className="text-lg text-zinc-600 mb-8 max-w-2xl mx-auto">
            Join our community of book lovers. Sign up free and start
            discovering your next great read.
          </p>
          <Button size="lg" onClick={() => router.push(routes.auth.signup)}>
            Create Free Account
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">📚</span>
                <h4 className="font-bold text-lg">BooksExchange</h4>
              </div>
              <p className="text-zinc-400 text-sm">
                Building a sustainable reading community, one book at a time.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Explore</h5>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li>
                  <Button
                    variant="ghost"
                    onClick={() => router.push(routes.marketplace)}
                    className="hover:text-white transition-colors p-0 h-auto text-zinc-400"
                  >
                    Marketplace
                  </Button>
                </li>
                <li>
                  <Button
                    variant="ghost"
                    onClick={() => router.push(routes.forums.index)}
                    className="hover:text-white transition-colors p-0 h-auto text-zinc-400"
                  >
                    Forums
                  </Button>
                </li>
                <li>
                  <Button
                    variant="ghost"
                    onClick={() => router.push(routes.exchangePoints)}
                    className="hover:text-white transition-colors p-0 h-auto text-zinc-400"
                  >
                    Exchange Points
                  </Button>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Community</h5>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Legal</h5>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-zinc-800 mt-8 pt-8 text-center text-sm text-zinc-400">
            © 2026 BooksExchange. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

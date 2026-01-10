"use client";

import { BookOpen, Github, Twitter, Instagram, Mail } from "lucide-react";
import routes from "@/config/routes";
import { useRouterWithProgress } from "@/hooks";

export default function Footer() {
  const router = useRouterWithProgress();

  return (
    <footer className="bg-foreground text-background py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-bold text-lg">BooksExchange</h4>
            </div>
            <p className="text-muted text-sm leading-relaxed mb-4">
              Building a sustainable reading community, one book at a time.
              Share books, share stories, share the joy of reading.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-muted/20 hover:bg-primary rounded-lg flex items-center justify-center transition-all cursor-pointer group"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4 text-muted group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-muted/20 hover:bg-primary rounded-lg flex items-center justify-center transition-all cursor-pointer group"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 text-muted group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-muted/20 hover:bg-primary rounded-lg flex items-center justify-center transition-all cursor-pointer group"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4 text-muted group-hover:text-white transition-colors" />
              </a>
              <a
                href="mailto:hello@booksexchange.com"
                className="w-9 h-9 bg-muted/20 hover:bg-primary rounded-lg flex items-center justify-center transition-all cursor-pointer group"
                aria-label="Email"
              >
                <Mail className="w-4 h-4 text-muted group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Explore Section */}
          <div>
            <h5 className="font-semibold mb-4 text-background">Explore</h5>
            <ul className="space-y-2.5 text-sm text-muted">
              <li>
                <button
                  onClick={() => router.push(routes.marketplace)}
                  className="hover:text-background transition-colors cursor-pointer"
                >
                  Marketplace
                </button>
              </li>
              <li>
                <button
                  onClick={() => router.push(routes.forums.index)}
                  className="hover:text-background transition-colors cursor-pointer"
                >
                  Forums
                </button>
              </li>
              <li>
                <button
                  onClick={() => router.push(routes.exchangePoints)}
                  className="hover:text-background transition-colors cursor-pointer"
                >
                  Exchange Points
                </button>
              </li>
            </ul>
          </div>

          {/* Community Section */}
          <div>
            <h5 className="font-semibold mb-4 text-background">Community</h5>
            <ul className="space-y-2.5 text-sm text-muted">
              <li>
                <button
                  onClick={() => router.push(routes.about)}
                  className="hover:text-background transition-colors cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => router.push(routes.auth.signup)}
                  className="hover:text-background transition-colors cursor-pointer"
                >
                  Get Started
                </button>
              </li>
              <li>
                <button
                  onClick={() => router.push(routes.home)}
                  className="hover:text-background transition-colors cursor-pointer"
                >
                  How It Works
                </button>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h5 className="font-semibold mb-4 text-background">Support</h5>
            <ul className="space-y-2.5 text-sm text-muted">
              <li>
                <button
                  onClick={() => router.push(routes.home)}
                  className="hover:text-background transition-colors cursor-pointer"
                >
                  Help Center
                </button>
              </li>
              <li>
                <a
                  href="mailto:support@booksexchange.com"
                  className="hover:text-background transition-colors cursor-pointer"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <button
                  onClick={() => router.push(routes.auth.signin)}
                  className="hover:text-background transition-colors cursor-pointer"
                >
                  Sign In
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-muted-foreground/20 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted">
            <p>© 2026 BooksExchange. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <button
                onClick={() => router.push(routes.home)}
                className="hover:text-background transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => router.push(routes.home)}
                className="hover:text-background transition-colors cursor-pointer"
              >
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

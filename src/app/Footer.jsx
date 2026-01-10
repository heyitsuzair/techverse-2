"use client";

import { BookOpen } from "lucide-react";
import routes from "@/config/routes";
import { useRouterWithProgress } from "@/hooks";

export default function Footer() {
  const router = useRouterWithProgress();

  return (
    <footer className="bg-foreground text-background py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-bold text-lg">BooksExchange</h4>
            </div>
            <p className="text-muted text-sm leading-relaxed">
              Building a sustainable reading community, one book at a time.
            </p>
          </div>
          <div>
            <h5 className="font-semibold mb-3 text-background">Explore</h5>
            <ul className="space-y-2 text-sm text-muted">
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
          <div>
            <h5 className="font-semibold mb-3 text-background">Community</h5>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <a
                  href="#"
                  className="hover:text-background transition-colors cursor-pointer"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-background transition-colors cursor-pointer"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-background transition-colors cursor-pointer"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-3 text-background">Legal</h5>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <a
                  href="#"
                  className="hover:text-background transition-colors cursor-pointer"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-background transition-colors cursor-pointer"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-muted-foreground/20 pt-8 text-center text-sm text-muted">
          © 2026 BooksExchange. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

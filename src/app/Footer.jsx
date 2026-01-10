"use client";

import { BookOpen } from "lucide-react";
import routes from "@/config/routes";
import { useRouterWithProgress } from "@/hooks";

export default function Footer() {
  const router = useRouterWithProgress();

  return (
    <footer className="bg-slate-900 text-white py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-6 h-6" />
              <h4 className="font-bold text-lg">BooksExchange</h4>
            </div>
            <p className="text-slate-400 text-sm">
              Building a sustainable reading community, one book at a time.
            </p>
          </div>
          <div>
            <h5 className="font-semibold mb-3">Explore</h5>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button
                  onClick={() => router.push(routes.marketplace)}
                  className="hover:text-white transition-colors"
                >
                  Marketplace
                </button>
              </li>
              <li>
                <button
                  onClick={() => router.push(routes.forums.index)}
                  className="hover:text-white transition-colors"
                >
                  Forums
                </button>
              </li>
              <li>
                <button
                  onClick={() => router.push(routes.exchangePoints)}
                  className="hover:text-white transition-colors"
                >
                  Exchange Points
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-3">Community</h5>
            <ul className="space-y-2 text-sm text-slate-400">
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
            <ul className="space-y-2 text-sm text-slate-400">
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
        <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
          © 2026 BooksExchange. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

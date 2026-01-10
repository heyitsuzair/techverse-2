"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Menu, X, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui";
import routes from "@/config/routes";
import { useRouterWithProgress } from "@/hooks";
import { getFromLocalStorage } from "@/utils/localStorage";

const NAV_LINKS = [
  { label: "Marketplace", href: routes.marketplace },
  { label: "Exchange Points", href: routes.exchangePoints },
  { label: "Forums", href: routes.forums.index },
  { label: "About Us", href: routes.about },
];

export default function Navigation() {
  const router = useRouterWithProgress();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is authenticated
  useEffect(() => {
    const checkAuth = () => {
      const userData = getFromLocalStorage("techverse");
      if (userData && userData.accessToken) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuth();

    // Listen for storage changes (e.g., when user logs in/out in another tab)
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  return (
    <nav className="border-b border-border bg-card/90 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-18">
          {/* Logo */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => router.push(routes.home)}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <div className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-md">
              <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" />
            </div>
            <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              BooksExchange
            </h1>
          </motion.button>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Button
                key={link.href}
                variant="ghost"
                onClick={() => router.push(link.href)}
                className="text-sm hover:bg-muted hover:text-foreground cursor-pointer"
              >
                {link.label}
              </Button>
            ))}
          </div>

          {/* Auth Buttons - Desktop Only */}
          <div className="hidden lg:flex items-center gap-2 sm:gap-3">
            {isAuthenticated ? (
              <Button
                onClick={() => router.push(routes.dashboard.index)}
                className="text-sm md:text-base bg-linear-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-primary-foreground shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer flex items-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Button>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={() => router.push(routes.auth.signin)}
                  className="text-sm md:text-base hover:bg-muted cursor-pointer"
                >
                  Login
                </Button>
                <Button
                  onClick={() => router.push(routes.auth.signup)}
                  className="text-sm md:text-base bg-linear-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-primary-foreground shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-foreground" />
            ) : (
              <Menu className="w-5 h-5 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden border-t border-border overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => {
                      router.push(link.href);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-muted rounded-lg transition-colors text-foreground cursor-pointer"
                  >
                    {link.label}
                  </button>
                ))}

                {/* Auth Buttons in Mobile Menu */}
                <div className="pt-2 mt-2 border-t border-border space-y-2">
                  {isAuthenticated ? (
                    <button
                      onClick={() => {
                        router.push(routes.dashboard.index);
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 bg-linear-to-r from-primary to-secondary text-primary-foreground rounded-lg hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          router.push(routes.auth.signin);
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-muted rounded-lg transition-colors text-foreground cursor-pointer"
                      >
                        Login
                      </button>
                      <button
                        onClick={() => {
                          router.push(routes.auth.signup);
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-3 bg-linear-to-r from-primary to-secondary text-primary-foreground rounded-lg hover:shadow-lg transition-all cursor-pointer"
                      >
                        Sign Up
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

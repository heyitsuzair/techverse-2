"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui";
import routes from "@/config/routes";
import { useRouterWithProgress } from "@/hooks";

export default function Navigation() {
  const router = useRouterWithProgress();

  return (
    <nav className="border-b border-border bg-card/90 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-18">
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

          <div className="flex gap-2 sm:gap-3">
            <Button
              variant="ghost"
              onClick={() => router.push(routes.auth.signin)}
              className="text-sm md:text-base hover:bg-muted cursor-pointer"
            >
              Login
            </Button>
            <Button
              onClick={() => router.push(routes.auth.signup)}
              className="text-sm md:text-base bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-primary-foreground shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

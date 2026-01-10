"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui";
import routes from "@/config/routes";
import { useRouterWithProgress } from "@/hooks";

export default function Navigation() {
  const router = useRouterWithProgress();

  return (
    <nav className="border-b border-slate-200/60 bg-white/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <BookOpen className="w-8 h-8 text-primary" />
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            BooksExchange
          </h1>
        </motion.div>
        <div className="flex gap-3">
          <Button
            variant="ghost"
            onClick={() => router.push(routes.auth.signin)}
          >
            Login
          </Button>
          <Button
            onClick={() => router.push(routes.auth.signup)}
            className="shadow-md hover:shadow-lg transition-shadow"
          >
            Sign Up
          </Button>
        </div>
      </div>
    </nav>
  );
}

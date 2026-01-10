"use client";

import { motion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";
import { Button, Badge } from "@/components/ui";
import routes from "@/config/routes";
import { useRouterWithProgress } from "@/hooks";

export default function HeroSection() {
  const router = useRouterWithProgress();

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Badge variant="primary" className="mb-6 shadow-sm">
          <Star className="w-3 h-3 mr-1" />
          Join 10,000+ Book Lovers
        </Badge>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 mb-6 max-w-4xl mx-auto leading-tight">
          Share Books, Build Community, Create Stories
        </h2>
        <p className="text-lg sm:text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
          BooksExchange connects readers through a trust-based platform for
          exchanging physical books. Every book has a journey—be part of it.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            onClick={() => router.push(routes.auth.signup)}
            className="shadow-lg hover:shadow-xl transition-all"
          >
            Get Started Free
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => router.push(routes.marketplace)}
            className="shadow-md hover:shadow-lg transition-all"
          >
            Explore Marketplace
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-16 max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-2xl border border-slate-200"
      >
        <img
          src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200"
          alt="Books on shelves"
          className="w-full h-64 md:h-96 object-cover"
        />
      </motion.div>
    </section>
  );
}

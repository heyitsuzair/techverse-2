"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui";
import routes from "@/config/routes";
import { useRouterWithProgress } from "@/hooks";

export default function CTASection() {
  const router = useRouterWithProgress();

  return (
    <section className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Ready to Start Exchanging?
          </h3>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Join our community of book lovers. Sign up free and start
            discovering your next great read.
          </p>
          <Button
            size="lg"
            onClick={() => router.push(routes.auth.signup)}
            className="shadow-lg hover:shadow-xl transition-all"
          >
            Create Free Account
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

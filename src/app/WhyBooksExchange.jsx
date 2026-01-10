"use client";

import { motion } from "framer-motion";
import { Shield, MapPin, MessageSquare, Leaf } from "lucide-react";
import { Card, CardContent } from "@/components/ui";

const WHY_BOOKSEXCHANGE = [
  {
    title: "Trust-Based Community",
    description:
      "AI-powered point system ensures fair exchanges based on book condition and rarity.",
    icon: Shield,
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    title: "Physical Exchange Points",
    description: "Safe, public locations for book exchanges across your city.",
    icon: MapPin,
    color: "bg-purple-500/10 text-purple-600",
  },
  {
    title: "Book History & Forums",
    description:
      "Every book has a story. Track its journey and join chapter discussions.",
    icon: MessageSquare,
    color: "bg-orange-500/10 text-orange-600",
  },
  {
    title: "Sustainable Reading",
    description:
      "Give books a second life and reduce waste. Share the joy of reading.",
    icon: Leaf,
    color: "bg-green-500/10 text-green-600",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function WhyBooksExchange() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Why BooksExchange?
          </h3>
          <p className="text-lg text-slate-600">
            Built for readers, by readers
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto"
        >
          {WHY_BOOKSEXCHANGE.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div key={index} variants={itemVariants}>
                <Card className="hover:shadow-xl transition-all duration-300 border-slate-200 h-full group">
                  <CardContent className="p-6 md:p-8">
                    <div
                      className={`w-14 h-14 ${item.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-7 h-7" />
                    </div>
                    <h4 className="text-xl font-semibold text-slate-900 mb-3">
                      {item.title}
                    </h4>
                    <p className="text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

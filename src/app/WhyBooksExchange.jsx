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
    color: "bg-primary/10 text-primary",
  },
  {
    title: "Physical Exchange Points",
    description: "Safe, public locations for book exchanges across your city.",
    icon: MapPin,
    color: "bg-secondary/10 text-secondary",
  },
  {
    title: "Book History & Forums",
    description:
      "Every book has a story. Track its journey and join chapter discussions.",
    icon: MessageSquare,
    color: "bg-warning/10 text-warning",
  },
  {
    title: "Sustainable Reading",
    description:
      "Give books a second life and reduce waste. Share the joy of reading.",
    icon: Leaf,
    color: "bg-success/10 text-success",
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
    <section className="py-16 sm:py-20 md:py-24 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-block px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-medium mb-4">
            Our Platform
          </div>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4">
            Why BooksExchange?
          </h3>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground">
            Built for readers, by readers
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto"
        >
          {WHY_BOOKSEXCHANGE.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div key={index} variants={itemVariants}>
                <Card className="hover:shadow-xl transition-all duration-300 border-border h-full group bg-card cursor-pointer">
                  <CardContent className="p-5 sm:p-6 md:p-8 pt-6 sm:pt-7 md:pt-9">
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 ${item.color} rounded-xl flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold text-card-foreground mb-2 sm:mb-3 whitespace-normal">
                      {item.title}
                    </h4>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
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

"use client";

import { motion } from "framer-motion";
import { BookOpen, RefreshCw, Handshake, BookMarked } from "lucide-react";
import { Card, CardContent } from "@/components/ui";

const HOW_IT_WORKS = [
  {
    step: 1,
    title: "Browse Books",
    description:
      "Explore our community marketplace filled with books from readers like you.",
    icon: BookOpen,
    color: "from-blue-500 to-cyan-500",
  },
  {
    step: 2,
    title: "Request Exchange",
    description:
      "Find a book you love? Request an exchange using AI-calculated points.",
    icon: RefreshCw,
    color: "from-purple-500 to-pink-500",
  },
  {
    step: 3,
    title: "Meet & Exchange",
    description:
      "Connect at physical exchange points or arrange direct meetups.",
    icon: Handshake,
    color: "from-orange-500 to-red-500",
  },
  {
    step: 4,
    title: "Share Your Story",
    description:
      "Scan the QR code and add your reading journey to the book's history.",
    icon: BookMarked,
    color: "from-green-500 to-emerald-500",
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

export default function HowItWorks() {
  return (
    <section className="bg-white py-16 md:py-24 border-y border-slate-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            How It Works
          </h3>
          <p className="text-lg text-slate-600">
            Four simple steps to start your book exchange journey
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {HOW_IT_WORKS.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.step} variants={itemVariants}>
                <Card className="text-center hover:shadow-xl transition-all duration-300 border-slate-200 h-full group">
                  <CardContent className="p-6 md:p-8">
                    <div
                      className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl shadow-md">
                      {item.step}
                    </div>
                    <h4 className="text-xl font-semibold text-slate-900 mb-2">
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

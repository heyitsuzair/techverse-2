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
    <section className="relative bg-gradient-to-b from-white via-slate-50 to-white py-16 sm:py-20 md:py-24 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
            Simple Process
          </div>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-3 sm:mb-4">
            How It Works
          </h3>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto px-4">
            Four simple steps to start your book exchange journey
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
        >
          {HOW_IT_WORKS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.step} variants={itemVariants}>
                <Card className="relative text-center hover:shadow-2xl transition-all duration-300 border-slate-200 h-full group bg-white overflow-hidden">
                  {/* Decorative gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-indigo-50/0 group-hover:from-blue-50 group-hover:to-indigo-50 transition-all duration-300 -z-0"></div>

                  <CardContent className="relative p-6 md:p-8">
                    {/* Icon */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className={`w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}
                    >
                      <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    </motion.div>

                    {/* Step Number */}
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 font-bold text-base sm:text-xl shadow-md">
                      {item.step}
                    </div>

                    {/* Title */}
                    <h4 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                      {item.title}
                    </h4>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>

                  {/* Connection line for desktop */}
                  {index < HOW_IT_WORKS.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-slate-300 to-transparent"></div>
                  )}
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

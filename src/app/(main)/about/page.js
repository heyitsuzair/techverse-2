"use client";

import { motion } from "framer-motion";
import { BookOpen, Heart, Users, Globe, Sparkles, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui";
import Navigation from "@/app/Navigation";
import Footer from "@/app/Footer";

const FEATURES = [
  {
    icon: BookOpen,
    title: "Book Exchange",
    description:
      "Trade books with readers in your community using our AI-powered point system.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description:
      "Connect with fellow book lovers and build lasting reading relationships.",
  },
  {
    icon: Globe,
    title: "Physical Meetups",
    description:
      "Exchange books at verified physical locations across your city.",
  },
  {
    icon: Sparkles,
    title: "Book Journey",
    description:
      "Track each book's history through QR codes and reader stories.",
  },
  {
    icon: Heart,
    title: "Sustainable",
    description:
      "Give books a second life and contribute to sustainable reading.",
  },
  {
    icon: Shield,
    title: "Trust & Safety",
    description:
      "Fair exchanges guaranteed through our AI point calculation system.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12 sm:mb-16"
          >
            <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              About Us
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 sm:mb-6">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                BooksExchange
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              A community-driven platform connecting book lovers through
              physical exchanges, AI-powered fair trade, and the shared joy of
              reading.
            </p>
          </motion.div>

          {/* Mission Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12 sm:mb-16"
          >
            <Card className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 border-border">
              <CardContent className="p-6 sm:p-8 md:p-10">
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className="shrink-0 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
                    <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 mb-3 sm:mb-4">
                      Our Mission
                    </h2>
                    <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                      We believe every book has a story beyond its pages.
                      BooksExchange brings readers together to share their love
                      of books through fair, sustainable exchanges. Our
                      AI-powered point system ensures every trade is equitable,
                      while physical exchange points create safe spaces for book
                      lovers to connect in person.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-12 sm:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 text-center mb-8 sm:mb-12">
              What Makes Us Special
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {FEATURES.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-xl transition-all duration-300 border-border group cursor-pointer">
                      <CardContent className="p-5 sm:p-6">
                        <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
                          {feature.title}
                        </h3>
                        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* How It Started */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-white border-border">
              <CardContent className="p-6 sm:p-8 md:p-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 sm:mb-6">
                  How It Started
                </h2>
                <div className="space-y-4 text-base sm:text-lg text-slate-700 leading-relaxed">
                  <p>
                    BooksExchange was born from a simple idea: books deserve to
                    be read, not collect dust on shelves. We noticed that while
                    many people love reading, they often buy books only to read
                    them once and never touch them again.
                  </p>
                  <p>
                    We created a platform where readers can exchange books
                    fairly, discover new reads through a vibrant community, and
                    track the incredible journey of each book as it passes from
                    reader to reader.
                  </p>
                  <p>
                    Today, BooksExchange is more than just a book trading
                    platform—it's a movement toward sustainable reading,
                    community building, and keeping the magic of physical books
                    alive in a digital world.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}

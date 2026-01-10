"use client";

import { motion } from "framer-motion";
import { Sparkles, TrendingUp, Calendar, Book } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
} from "@/components/ui";

export default function AIPointBreakdown({ points = 85 }) {
  const breakdown = [
    {
      label: "Base Value (Rarity & Demand)",
      value: 45,
      icon: Book,
      color: "text-blue-600",
    },
    {
      label: "Condition Factor",
      value: 25,
      icon: Sparkles,
      color: "text-emerald-600",
    },
    {
      label: "Edition & Year",
      value: 15,
      icon: Calendar,
      color: "text-purple-600",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="border-primary/20 bg-gradient-to-br from-primary/5 via-white to-secondary/5 shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader className="border-b border-primary/10">
          <CardTitle className="flex items-center gap-2 text-slate-900">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            AI Point Calculation
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {breakdown.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 ${item.color} bg-opacity-10 rounded-lg flex items-center justify-center`}
                    >
                      <Icon className={`w-5 h-5 ${item.color}`} />
                    </div>
                    <span className="text-xs md:text-sm text-slate-700 font-medium">
                      {item.label}
                    </span>
                  </div>
                  <Badge variant="primary" size="sm" className="font-semibold md:font-bold text-xs w-20 flex items-center justify-center">
                    +{item.value} pts
                  </Badge>
                </motion.div>
              );
            })}

            <div className="border-t border-slate-200 pt-4 mt-4">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-primary" />
                  <span className="font-bold text-lg text-slate-900">
                    <span className="text-sm md:text-base">Total Exchange Points</span>
                  </span>
                </div>
                <span className="font-bold text-3xl text-primary">
                  {points} pts
                </span>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-600 mt-4 leading-relaxed">
            💡 Points are dynamically calculated using AI based on book rarity,
            condition, edition, and real-time market demand across our
            community.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

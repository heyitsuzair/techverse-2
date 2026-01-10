"use client";

import { motion } from "framer-motion";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { TrendingUp, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const pointsHistory = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Point Value",
      data: [75, 78, 82, 80, 85, 85],
      fill: true,
      backgroundColor: "rgba(99, 102, 241, 0.1)",
      borderColor: "rgb(99, 102, 241)",
      borderWidth: 3,
      tension: 0.4,
      pointBackgroundColor: "rgb(99, 102, 241)",
      pointBorderColor: "#fff",
      pointBorderWidth: 2,
      pointRadius: 5,
      pointHoverRadius: 7,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: "rgba(15, 23, 42, 0.9)",
      padding: 12,
      titleColor: "#fff",
      bodyColor: "#fff",
      borderColor: "rgba(99, 102, 241, 0.3)",
      borderWidth: 1,
      displayColors: false,
      callbacks: {
        label: function (context) {
          return `${context.parsed.y} Points`;
        },
      },
    },
  },
  scales: {
    y: {
      beginAtZero: false,
      min: 70,
      max: 90,
      grid: {
        color: "rgba(148, 163, 184, 0.1)",
      },
      ticks: {
        color: "#64748b",
        callback: function (value) {
          return value + " pts";
        },
      },
    },
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: "#64748b",
      },
    },
  },
};

export default function PointsChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card className="border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader className="border-b border-slate-100">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <TrendingUp className="w-5 h-5 text-primary" />
              Point Value Trend
            </CardTitle>
            <div className="flex items-center gap-2 text-sm text-emerald-600 font-medium">
              <Sparkles className="w-4 h-4" />
              +10 pts (6M)
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="h-64">
            <Line data={pointsHistory} options={chartOptions} />
          </div>
          <p className="text-xs text-slate-600 mt-4 text-center">
            💡 AI-tracked value based on demand, condition, and rarity over time
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

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
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";

// Register Chart.js components
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

export default function JourneyStats({ stats }) {
  // Distance traveled data
  const distanceData = {
    labels: stats.timeline.map((entry) => entry.location.split(",")[0]),
    datasets: [
      {
        label: "Cumulative Distance (miles)",
        data: stats.timeline.map((_, index) => {
          // Calculate cumulative distance
          return stats.timeline
            .slice(0, index + 1)
            .reduce((sum, entry) => sum + (entry.distanceFromPrevious || 0), 0);
        }),
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Readers over time data
  const readersData = {
    labels: stats.timeline.map((entry) => entry.date),
    datasets: [
      {
        label: "Total Readers",
        data: stats.timeline.map((_, index) => index + 1),
        borderColor: "rgb(16, 185, 129)",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 12,
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Distance Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="border-slate-200 shadow-lg">
          <CardHeader className="border-b border-slate-100">
            <CardTitle className="text-lg">Distance Traveled</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-64">
              <Line data={distanceData} options={chartOptions} />
            </div>
            <div className="mt-4 text-center">
              <p className="text-2xl font-bold text-primary">
                {stats.totalDistance} miles
              </p>
              <p className="text-sm text-slate-600">Total Journey Distance</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Readers Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="border-slate-200 shadow-lg">
          <CardHeader className="border-b border-slate-100">
            <CardTitle className="text-lg">Readers Over Time</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-64">
              <Line data={readersData} options={chartOptions} />
            </div>
            <div className="mt-4 text-center">
              <p className="text-2xl font-bold text-green-600">
                {stats.totalReaders} readers
              </p>
              <p className="text-sm text-slate-600">Total Reading Community</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

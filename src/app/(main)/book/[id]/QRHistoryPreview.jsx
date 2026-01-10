"use client";

import { motion } from "framer-motion";
import { History, MapPin, Star, Calendar, Eye } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Button,
} from "@/components/ui";

export default function QRHistoryPreview({ history = [], onViewFull }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <Card className="border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader className="border-b border-slate-100">
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <History className="w-5 h-5 text-primary" />
              Reading Journey
            </CardTitle>
            <Badge variant="primary" className="font-semibold">
              {history.length} Readers
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {history.map((entry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary text-white rounded-full flex items-center justify-center font-bold shadow-md shrink-0">
                  {entry.reader.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                    <p className="font-semibold text-slate-900">
                      {entry.reader}
                    </p>
                    <div className="flex items-center gap-1">
                      {[...Array(entry.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3 h-3 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{entry.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{entry.location}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <Button
            variant="outline"
            className="w-full mt-6 shadow-md hover:shadow-lg transition-all cursor-pointer"
            onClick={onViewFull}
          >
            <Eye className="w-4 h-4 mr-2" />
            View Full History & Add Your Story
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import { Card, CardContent, Badge, Button } from "@/components/ui";

const getConditionVariant = (condition) => {
  switch (condition) {
    case "Excellent":
      return "success";
    case "Good":
      return "warning";
    default:
      return "default";
  }
};

export default function BookCard({ book, onCardClick, onRequestClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className="overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer border-slate-200 group h-full"
        onClick={() => onCardClick(book.id)}
      >
        <div className="relative overflow-hidden">
          <img
            src={book.imageUrl}
            alt={book.title}
            className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {!book.available && (
            <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center">
              <Badge variant="danger" className="shadow-lg">
                Currently Unavailable
              </Badge>
            </div>
          )}
          <div className="absolute top-3 right-3">
            <Badge
              variant="primary"
              size="sm"
              className="shadow-lg font-semibold"
            >
              {book.points} Points
            </Badge>
          </div>
        </div>

        <CardContent className="p-5">
          <div className="flex justify-between items-start mb-3">
            <Badge
              variant={getConditionVariant(book.condition)}
              size="sm"
              className="font-medium"
            >
              {book.condition}
            </Badge>
          </div>

          <h4 className="font-bold text-slate-900 mb-1 line-clamp-1 text-lg group-hover:text-primary transition-colors">
            {book.title}
          </h4>
          <p className="text-sm text-slate-600 mb-3">{book.author}</p>

          <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
            <span className="font-medium bg-slate-100 px-2 py-1 rounded">
              {book.genre}
            </span>
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>{book.location.split(",")[0]}</span>
            </div>
          </div>

          <Button
            size="sm"
            className="w-full shadow-md hover:shadow-lg transition-all"
            disabled={!book.available}
            onClick={(e) => {
              e.stopPropagation();
              onRequestClick();
            }}
          >
            {book.available ? (
              <>
                Request Book
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            ) : (
              "Unavailable"
            )}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

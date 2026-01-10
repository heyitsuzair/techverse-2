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
        className="overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer border-border group h-full bg-card"
        onClick={() => onCardClick(book.id)}
      >
        <div className="relative overflow-hidden">
          <img
            src={book.imageUrl}
            alt={book.title}
            className="w-full h-48 sm:h-52 md:h-56 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {!book.available && (
            <div className="absolute inset-0 bg-foreground/70 backdrop-blur-sm flex items-center justify-center">
              <Badge
                variant="danger"
                className="shadow-lg bg-error text-error-foreground text-xs sm:text-sm"
              >
                Currently Unavailable
              </Badge>
            </div>
          )}
          <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
            <Badge
              variant="primary"
              size="sm"
              className="shadow-lg font-semibold bg-primary text-primary-foreground text-xs sm:text-sm"
            >
              {book.points} Points
            </Badge>
          </div>
        </div>

        <CardContent className="p-3 sm:p-4 md:p-5 pt-4 sm:pt-5 md:pt-6">
          <div className="flex justify-between items-start mb-2 sm:mb-3">
            <Badge
              variant={getConditionVariant(book.condition)}
              size="sm"
              className="font-medium text-xs sm:text-sm"
            >
              {book.condition}
            </Badge>
          </div>

          <h4 className="font-bold text-card-foreground mb-1 line-clamp-1 text-base sm:text-lg group-hover:text-primary transition-colors">
            {book.title}
          </h4>
          <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">{book.author}</p>

          <div className="flex items-center justify-between text-[10px] sm:text-xs text-muted-foreground mb-3 sm:mb-4">
            <span className="font-medium bg-muted px-2 py-1 rounded text-[10px] sm:text-xs">
              {book.genre}
            </span>
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span className="text-[10px] sm:text-xs">{book.location.split(",")[0]}</span>
            </div>
          </div>

          <Button
            size="sm"
            className="w-full shadow-md hover:shadow-lg transition-all bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-xs sm:text-sm py-2"
            disabled={!book.available}
            onClick={(e) => {
              e.stopPropagation();
              onRequestClick();
            }}
          >
            {book.available ? (
              <>
                Request Book
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
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

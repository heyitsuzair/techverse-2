"use client";

import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import { Card, CardContent, Badge, Button } from "@/components/ui";
import routes from "@/config/routes";
import { useRouterWithProgress } from "@/hooks";

const MOCK_FEATURED_BOOKS = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Classic Fiction",
    condition: "Good",
    points: 85,
    location: "New York, NY",
    imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Classic Fiction",
    condition: "Excellent",
    points: 95,
    location: "Los Angeles, CA",
    imageUrl: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400",
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    condition: "Fair",
    points: 75,
    location: "Chicago, IL",
    imageUrl:
      "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400",
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    condition: "Good",
    points: 80,
    location: "Boston, MA",
    imageUrl:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400",
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

export default function FeaturedBooks() {
  const router = useRouterWithProgress();

  return (
    <section className="bg-muted/30 py-16 sm:py-20 md:py-24 lg:py-28 border-y border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
            Trending Now
          </div>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 sm:mb-4">
            Featured Books
          </h3>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8">
            Discover what's available in the community
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {MOCK_FEATURED_BOOKS.map((book) => (
            <motion.div key={book.id} variants={itemVariants}>
              <Card
                className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border-border group bg-card"
                onClick={() => router.push(routes.book.detail(book.id))}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={book.imageUrl}
                    alt={book.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge
                      variant="primary"
                      size="sm"
                      className="shadow-lg bg-primary text-primary-foreground"
                    >
                      {book.points} Points
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4 sm:p-5">
                  <h4 className="font-bold text-card-foreground mb-1 line-clamp-1">
                    {book.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    {book.author}
                  </p>
                  <div className="flex justify-between items-center text-xs mb-3">
                    <span className="font-medium text-muted-foreground">
                      {book.genre}
                    </span>
                    <Badge
                      variant="success"
                      size="sm"
                      className="bg-success/10 text-success"
                    >
                      {book.condition}
                    </Badge>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3 mr-1" />
                    {book.location}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10 sm:mt-12"
        >
          <Button
            variant="outline"
            size="lg"
            onClick={() => router.push(routes.marketplace)}
            className="shadow-md hover:shadow-lg transition-all border-2 border-border hover:border-primary hover:bg-primary/5 cursor-pointer"
          >
            View All Books
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

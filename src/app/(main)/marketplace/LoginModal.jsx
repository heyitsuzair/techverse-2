"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, LogIn, UserPlus } from "lucide-react";
import { Card, CardContent, Button } from "@/components/ui";

export default function LoginModal({ isOpen, onClose, onLogin, onSignup }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-foreground/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", duration: 0.5 }}
          onClick={(e) => e.stopPropagation()}
        >
          <Card className="max-w-md w-full shadow-2xl border-border bg-card">
            <CardContent className="p-6 sm:p-8 text-center relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-lg"
              >
                <LogIn className="w-10 h-10 text-primary-foreground" />
              </motion.div>

              <h3 className="text-2xl font-bold text-card-foreground mb-3">
                Login Required
              </h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                You need to be logged in to request books and participate in
                exchanges. Join our community today!
              </p>

              <div className="space-y-3">
                <Button
                  className="w-full shadow-lg hover:shadow-xl transition-all bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-primary-foreground cursor-pointer"
                  size="lg"
                  onClick={onLogin}
                >
                  <LogIn className="w-5 h-5 mr-2" />
                  Login to Continue
                </Button>
                <Button
                  variant="outline"
                  className="w-full shadow-md hover:shadow-lg transition-all border-2 border-border hover:border-primary hover:bg-primary/5 cursor-pointer"
                  size="lg"
                  onClick={onSignup}
                >
                  <UserPlus className="w-5 h-5 mr-2" />
                  Create New Account
                </Button>
              </div>

              <button
                onClick={onClose}
                className="mt-6 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                Continue Browsing
              </button>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

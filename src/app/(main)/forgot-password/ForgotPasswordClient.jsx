"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Mail,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import { Button, Input, Card, CardContent, Spinner } from "@/components/ui";
import routes from "@/config/routes";
import { useRouterWithProgress } from "@/hooks";
import { forgotPassword } from "@/lib/api/auth";
import { toast } from "sonner";
import { forgotPasswordSchema } from "@/validationSchemas";

export default function ForgotPasswordClient() {
  const router = useRouterWithProgress();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setErrors({});

    // Validate using Yup schema
    try {
      await forgotPasswordSchema.validate(
        { email },
        { abortEarly: false }
      );
    } catch (validationError) {
      const newErrors = {};
      validationError.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      // Call the forgot password API
      const response = await forgotPassword(email);
      setSubmitted(true);
      toast.success("Reset link sent!", {
        description: response.message || "Check your email for the password reset link.",
      });
    } catch (error) {
      setErrors({ general: error.message });
      toast.error("Failed to send reset link", {
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <button
            onClick={() => router.push(routes.home)}
            className="inline-flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <BookOpen className="w-10 h-10 text-primary" />
            <h1 className="text-2xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              BooksExchange
            </h1>
          </button>
          <p className="text-slate-600">
            {submitted ? "Check your email" : "Reset your password"}
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-slate-200 shadow-2xl">
            <CardContent className="p-6 sm:p-8">
              {!submitted ? (
                <>
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Mail className="w-8 h-8 text-primary" />
                    </div>
                    <p className="text-sm text-slate-600">
                      Enter your email address and we'll send you a link to
                      reset your password.
                    </p>
                  </div>

                  {/* Error Alert */}
                  {errors.general && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                      {errors.general}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setErrors({});
                          }}
                          className={`pl-10 ${
                            errors.email ? "border-red-500" : ""
                          }`}
                          placeholder="you@example.com"
                        />
                      </div>
                      {errors.email && (
                        <p className="text-xs text-red-500 mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Spinner size="sm" className="mr-2" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Reset Link
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </Button>
                  </form>

                  {/* Back to Sign In */}
                  <div className="mt-6 text-center">
                    <button
                      type="button"
                      onClick={() => router.push(routes.auth.signin)}
                      className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-primary transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back to sign in
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </motion.div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    Check your email
                  </h3>
                  <p className="text-sm text-slate-600 mb-6">
                    We've sent a password reset link to{" "}
                    <span className="font-semibold text-slate-900">
                      {email}
                    </span>
                  </p>

                  <div className="bg-slate-50 rounded-lg p-4 mb-6">
                    <p className="text-xs text-slate-600 mb-2">
                      Didn't receive the email? Check your spam folder or
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-sm text-primary hover:underline font-medium cursor-pointer"
                    >
                      Try another email address
                    </button>
                  </div>

                  <Button
                    onClick={() => router.push(routes.auth.signin)}
                    variant="outline"
                    className="w-full"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to sign in
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        {!submitted && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center text-xs text-slate-500 mt-6"
          >
            Need help?{" "}
            <button className="underline hover:text-slate-700">
              Contact Support
            </button>
          </motion.p>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button, Input, Card, CardContent, Checkbox, Spinner } from "@/components/ui";
import routes from "@/config/routes";
import { useRouterWithProgress } from "@/hooks";
import { signIn, signInWithGoogle } from "@/lib/api/auth";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { signInSchema } from "@/validationSchemas";
import { GoogleLogin } from "@react-oauth/google";

export default function SigninClient() {
  const router = useRouterWithProgress();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setErrors({});
    
    // Validate using Yup schema
    try {
      await signInSchema.validate(
        { email, password },
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
      // Call the signin API
      const response = await signIn({ email, password });

      // Use the auth context to manage login state
      login(response.user, {
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
      });

      // Show success toast
      toast.success(response.message || "Login successful!", {
        description: `Welcome back, ${response.user.name}!`,
      });

      // Redirect to dashboard
      router.push(routes.dashboard.index);
    } catch (error) {
      setErrors({ general: error.message });
      toast.error("Login failed", {
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await signInWithGoogle(credentialResponse.credential);

      login(response.user, {
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
      });

      const message = response.isNewUser 
        ? "Account created successfully!" 
        : "Welcome back!";
      toast.success(message, {
        description: `Welcome to BooksExchange, ${response.user.name}!`,
      });

      router.push(routes.dashboard.index);
    } catch (error) {
      toast.error("Google signin failed", {
        description: error.message || "Please try again",
      });
    }
  };

  const handleGoogleError = () => {
    toast.error("Google signin failed", {
      description: "Please try again",
    });
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
            Welcome back! Sign in to your account
          </p>
        </motion.div>

        {/* Sign In Form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-slate-200 shadow-2xl">
            <CardContent className="p-6 sm:p-8">
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
                        setErrors({ ...errors, email: "" });
                      }}
                      className={`pl-10 ${
                        errors.email ? "border-red-500" : ""
                      }`}
                      placeholder="you@example.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setErrors({ ...errors, password: "" });
                      }}
                      className={`pl-10 pr-10 ${
                        errors.password ? "border-red-500" : ""
                      }`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Checkbox
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <span className="text-sm text-slate-600">Remember me</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => router.push(routes.auth.forgotPassword)}
                    className="text-sm text-primary hover:underline font-medium cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Spinner size="sm" className="mr-2" />
                      Signing In...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-3 bg-white text-slate-500">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Social Login */}
              <div className="w-full flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  text="continue_with"
                  shape="rectangular"
                  theme="outline"
                  size="large"
                  width="384"
                />
              </div>

              {/* Sign Up Link */}
              <p className="text-center text-sm text-slate-600 mt-6">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => router.push(routes.auth.signup)}
                  className="text-primary hover:underline font-semibold cursor-pointer"
                >
                  Sign up
                </button>
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-xs text-slate-500 mt-6"
        >
          By signing in, you agree to our{" "}
          <button className="underline hover:text-slate-700 cursor-pointer">
            Terms
          </button>{" "}
          and{" "}
          <button className="underline hover:text-slate-700 cursor-pointer">
            Privacy Policy
          </button>
        </motion.p>
      </div>
    </div>
  );
}

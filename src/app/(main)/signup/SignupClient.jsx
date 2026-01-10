"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  Phone,
} from "lucide-react";
import {
  Button,
  Input,
  Card,
  CardContent,
  Checkbox,
  Spinner,
} from "@/components/ui";
import routes from "@/config/routes";
import { useRouterWithProgress } from "@/hooks";
import { signUp, signInWithGoogle } from "@/lib/api/auth";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { signUpSchema } from "@/validationSchemas";
import { GoogleLogin } from "@react-oauth/google";
import { setInLocalStorage } from "@/utils/localStorage";

export default function SignupClient() {
  const router = useRouterWithProgress();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: "", general: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setErrors({});

    // Validate using Yup schema
    try {
      await signUpSchema.validate(
        {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          agreeTerms,
        },
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
      // Call the signup API
      const response = await signUp({
        email: formData.email,
        password: formData.password,
        name: formData.fullName,
        phone: formData.phone || undefined,
      });

      // Use the auth context to manage login state
      login(response.user, {
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
      });

      // Show success toast
      toast.success(response.message || "Account created successfully!", {
        description: `Welcome to BooksExchange, ${response.user.name}!`,
      });

      // Redirect to dashboard
      router.push(routes.dashboard.index);
    } catch (error) {
      setErrors({ general: error.message });
      toast.error("Signup failed", {
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      // Call backend API with Google ID token
      const response = await signInWithGoogle(credentialResponse.credential);

      // Use the auth context to manage login state
      login(response.user, {
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
      });

      // Show success toast
      const message = response.isNewUser
        ? "Account created successfully!"
        : "Welcome back!";
      toast.success(message, {
        description: `Welcome to BooksExchange, ${response.user.name}!`,
      });

      // Redirect to dashboard
      router.push(routes.dashboard.index);
    } catch (error) {
      toast.error("Google signup failed", {
        description: error.message || "Please try again",
      });
    }
  };

  const handleGoogleError = () => {
    toast.error("Google signup failed", {
      description: "Please try again",
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4 py-12">
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
          <p className="text-slate-600">Join our community of book lovers</p>
        </motion.div>

        {/* Sign Up Form */}
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

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* General Error */}
                {errors.general && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{errors.general}</p>
                  </div>
                )}

                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleChange("fullName", e.target.value)}
                      className={`pl-10 ${
                        errors.fullName ? "border-red-500" : ""
                      }`}
                      placeholder="John Doe"
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
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

                {/* Phone (Optional) */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Phone Number{" "}
                    <span className="text-slate-400 font-normal">
                      (Optional)
                    </span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      className="pl-10"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
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
                      value={formData.password}
                      onChange={(e) => handleChange("password", e.target.value)}
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

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleChange("confirmPassword", e.target.value)
                      }
                      className={`pl-10 pr-10 ${
                        errors.confirmPassword ? "border-red-500" : ""
                      }`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Terms Agreement */}
                <div>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <Checkbox
                      checked={agreeTerms}
                      onChange={(e) => {
                        setAgreeTerms(e.target.checked);
                        setErrors({ ...errors, terms: "" });
                      }}
                      className="mt-0.5"
                    />
                    <span className="text-sm text-slate-600">
                      I agree to the{" "}
                      <button
                        type="button"
                        className="text-primary hover:underline font-medium cursor-pointer"
                      >
                        Terms of Service
                      </button>{" "}
                      and{" "}
                      <button
                        type="button"
                        className="text-primary hover:underline font-medium cursor-pointer"
                      >
                        Privacy Policy
                      </button>
                    </span>
                  </label>
                  {errors.terms && (
                    <p className="text-xs text-red-500 mt-1">{errors.terms}</p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Spinner size="sm" className="mr-2" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
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
                    Or sign up with
                  </span>
                </div>
              </div>

              {/* Social Signup */}
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

              {/* Sign In Link */}
              <p className="text-center text-sm text-slate-600 mt-6">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => router.push(routes.auth.signin)}
                  className="text-primary hover:underline font-semibold cursor-pointer"
                >
                  Sign in
                </button>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

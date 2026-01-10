import { Spinner } from "./Spinner";

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  loading = false,
  type = "button",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

  const variants = {
    primary:
      "bg-primary text-primary-foreground hover:opacity-90 focus:ring-primary",
    secondary:
      "bg-secondary text-secondary-foreground hover:opacity-90 focus:ring-secondary",
    outline:
      "border-2 border-primary bg-transparent text-primary hover:bg-primary/10 focus:ring-primary",
    ghost: "bg-transparent text-zinc-900 hover:bg-zinc-100 focus:ring-primary",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };

  const sizes = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-base",
    lg: "h-12 px-6 text-lg",
  };

  const spinnerSize = {
    sm: "sm",
    md: "sm",
    lg: "md",
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Spinner size={spinnerSize[size]} />}
      {children}
    </button>
  );
}

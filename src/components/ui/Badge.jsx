export function Badge({
  children,
  variant = "default",
  size = "md",
  className = "",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center rounded-full font-medium";

  const variants = {
    default:
      "bg-zinc-100 text-zinc-800",
    primary:
      "bg-primary/10 text-primary",
    success:
      "bg-green-100 text-green-800",
    warning:
      "bg-yellow-100 text-yellow-800",
    danger:
      "bg-red-100 text-red-800",
    secondary:
      "bg-secondary/10 text-secondary",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-sm",
    lg: "px-3 py-1.5 text-base",
  };

  return (
    <span
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}

export function Alert({
  children,
  variant = "info",
  className = "",
  ...props
}) {
  const variants = {
    info: "bg-blue-50 border-blue-200 text-blue-800",
    success:
      "bg-green-50 border-green-200 text-green-800",
    warning:
      "bg-yellow-50 border-yellow-200 text-yellow-800",
    danger:
      "bg-red-50 border-red-200 text-red-800",
  };

  return (
    <div
      className={`
        rounded-lg border p-4
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}

export function AlertTitle({ children, className = "", ...props }) {
  return (
    <h4
      className={`font-semibold mb-1 ${className}`}
      {...props}
    >
      {children}
    </h4>
  );
}

export function AlertDescription({ children, className = "", ...props }) {
  return (
    <p className={`text-sm ${className}`} {...props}>
      {children}
    </p>
  );
}

export function Text({
  as: Component = "p",
  variant = "body",
  className = "",
  children,
  ...props
}) {
  const variants = {
    h1: "text-4xl font-bold tracking-tight text-zinc-900",
    h2: "text-3xl font-semibold tracking-tight text-zinc-900",
    h3: "text-2xl font-semibold text-zinc-900",
    h4: "text-xl font-semibold text-zinc-900",
    h5: "text-lg font-semibold text-zinc-900",
    h6: "text-base font-semibold text-zinc-900",
    body: "text-base text-zinc-700",
    small: "text-sm text-zinc-600",
    caption: "text-xs text-zinc-500",
    lead: "text-lg text-zinc-600",
  };

  const defaultTags = {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    h6: "h6",
    body: "p",
    small: "p",
    caption: "span",
    lead: "p",
  };

  const Tag = Component === "p" ? defaultTags[variant] || "p" : Component;

  return (
    <Tag className={`${variants[variant]} ${className}`} {...props}>
      {children}
    </Tag>
  );
}

export function Text({
  as: Component = "p",
  variant = "body",
  className = "",
  children,
  ...props
}) {
  const variants = {
    h1: "text-4xl font-bold tracking-tight text-foreground",
    h2: "text-3xl font-semibold tracking-tight text-foreground",
    h3: "text-2xl font-semibold text-foreground",
    h4: "text-xl font-semibold text-foreground",
    h5: "text-lg font-semibold text-foreground",
    h6: "text-base font-semibold text-foreground",
    body: "text-base text-foreground/70",
    small: "text-sm text-foreground/60",
    caption: "text-xs text-foreground/50",
    lead: "text-lg text-foreground/60",
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

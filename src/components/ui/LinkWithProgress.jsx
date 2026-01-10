"use client";

import NextLink from "next/link";
import { useRouterWithProgress } from "@/hooks";

export function LinkWithProgress({ href, children, className = "", ...props }) {
  const router = useRouterWithProgress();

  const handleClick = (e) => {
    // Only handle client-side navigation
    if (href.startsWith("/") && !href.startsWith("http")) {
      e.preventDefault();
      router.push(href);
    }
  };

  return (
    <NextLink
      href={href}
      onClick={handleClick}
      className={className}
      {...props}
    >
      {children}
    </NextLink>
  );
}

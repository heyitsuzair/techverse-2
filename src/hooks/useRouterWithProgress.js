"use client";

import { useRouter as useNextRouter } from "next/navigation";
import { useProgress } from "@bprogress/next";

export function useRouterWithProgress() {
  const router = useNextRouter();
  const { start, finish } = useProgress();

  const push = (href) => {
    start();
    router.push(href);
  };

  const replace = (href) => {
    start();
    router.replace(href);
  };

  const back = () => {
    start();
    router.back();
  };

  const forward = () => {
    start();
    router.forward();
  };

  const refresh = () => {
    start();
    router.refresh();
  };

  return {
    ...router,
    push,
    replace,
    back,
    forward,
    refresh,
  };
}

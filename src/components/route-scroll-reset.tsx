"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

export function RouteScrollReset() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    // Hash links retain their anchor target; full page changes start at the top.
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const frame = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}

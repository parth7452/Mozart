"use client";

import { useLayoutEffect } from "react";

/**
 * Tailwind rem units resolve against `html`, not a nested wrapper.
 * Toggle a class on <html> only while marketing routes are mounted so /desk stays 16px.
 */
export function MarketingHtmlZoom() {
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.add("marketing-zoom");
    return () => root.classList.remove("marketing-zoom");
  }, []);
  return null;
}

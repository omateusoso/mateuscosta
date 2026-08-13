"use client";

import { useEffect } from "react";

function scrollToHashTarget() {
  const id = window.location.hash.slice(1);
  if (!id) return;

  const target = document.getElementById(decodeURIComponent(id));
  if (!target) return;

  target.scrollIntoView({
    block: "start",
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
  });
}

export function HomeHashScroll() {
  useEffect(() => {
    const frame = window.requestAnimationFrame(scrollToHashTarget);
    window.addEventListener("hashchange", scrollToHashTarget);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", scrollToHashTarget);
    };
  }, []);

  return null;
}

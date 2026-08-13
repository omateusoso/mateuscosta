"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const LiquidEther = dynamic(() => import("@/components/effects/LiquidEther"), {
  ssr: false,
  loading: () => null,
});

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export function LandingBackground() {
  const [enabled, setEnabled] = useState(false);
  const [interactive, setInteractive] = useState(false);

  useEffect(() => {
    const pointerQuery = matchMedia("(hover: hover) and (pointer: fine)");
    const updateInteraction = () => setInteractive(pointerQuery.matches);
    const frame = requestAnimationFrame(() => {
      setEnabled(supportsWebGL() && !matchMedia("(prefers-reduced-motion: reduce)").matches);
      updateInteraction();
    });
    pointerQuery.addEventListener("change", updateInteraction);
    return () => {
      cancelAnimationFrame(frame);
      pointerQuery.removeEventListener("change", updateInteraction);
    };
  }, []);

  return (
    <div className="landing-background" aria-hidden="true">
      {enabled ? (
        <LiquidEther
          mouseForce={40}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          colors={["#2e0b6a", "#9876e8", "#9876e8"]}
          autoDemo
          autoSpeed={0.5}
          autoIntensity={1.4}
          interactive={interactive}
          isBounce={false}
          resolution={0.25}
          className="landing-background__liquid"
        />
      ) : null}
    </div>
  );
}

"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";

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
  const enabled = useSyncExternalStore(
    () => () => undefined,
    () => supportsWebGL() && !matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );

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
          autoIntensity={2.2}
          isBounce={false}
          resolution={0.5}
          className="landing-background__liquid"
        />
      ) : null}
    </div>
  );
}

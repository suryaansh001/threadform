"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

interface LoadingScreenProps {
  onLoadComplete: () => void;
}

export function LoadingScreen({ onLoadComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 12 + 5;
      });
    }, 180);

    // Fade out trigger
    const timer = setTimeout(() => {
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.8,
          onComplete: onLoadComplete,
        });
      }
    }, 4500);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, [onLoadComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-end pb-20 bg-transparent pointer-events-none"
    >
      <div className="w-56 h-0.5 bg-black/10 overflow-hidden rounded-full">
        <div
          className="h-full bg-black transition-all duration-300 ease-out rounded-full"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>

      <p className="mt-4 font-sans text-xs tracking-[0.3em] uppercase text-black/60 animate-pulse">
        Crafting your experience
      </p>
    </div>
  );
}

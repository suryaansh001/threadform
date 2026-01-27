"use client";

import { useEffect, useState, useRef } from "react";

const SCROLL_STAGES = [
  {
    subtext: "Design Without Limits",
    bgColor: "#f5f4f0",
  },
  {
    subtext: "What You Wear",
    bgColor: "#ffffff",
  },
  {
    subtext: "Everyday Rebels",
    bgColor: "#1a1a1a",
    textColor: "#ffffff", // Explicit text color override if needed, but let's check logic
  },
  {
    subtext: "Packed & Delivered",
    bgColor: "#d4c4b0",
  },
];

interface ScrollHeroProps {
  onScrollComplete: () => void;
  onScrollUpdate: (stage: number, progress: number) => void;
}

export function ScrollHero({ onScrollComplete, onScrollUpdate }: ScrollHeroProps) {
  const [currentStage, setCurrentStage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const accumulatedDelta = useRef(0);
  const totalStages = SCROLL_STAGES.length;

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isTransitioning) return;

      e.preventDefault();
      accumulatedDelta.current += e.deltaY;

      if (Math.abs(accumulatedDelta.current) > 50) {
        const direction = accumulatedDelta.current > 0 ? 1 : -1;

        if (direction > 0) {
          if (currentStage < totalStages - 1) {
            changeStage(currentStage + 1);
          } else {
            onScrollComplete();
          }
        } else {
          if (currentStage > 0) {
            changeStage(currentStage - 1);
          }
        }
        accumulatedDelta.current = 0;
      }
    };

    const changeStage = (newStage: number) => {
      setIsTransitioning(true);
      setCurrentStage(newStage);
      onScrollUpdate(newStage, 0); // Notify parent
      setTimeout(() => setIsTransitioning(false), 800);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [currentStage, isTransitioning, onScrollComplete, onScrollUpdate, totalStages]);

  const stage = SCROLL_STAGES[currentStage];
  const isLightBg = stage.bgColor === "#ffffff" || stage.bgColor === "#f5f4f0";

  return (
    <div
      className="fixed inset-0 z-40 transition-colors duration-1000 ease-in-out pointer-events-auto flex items-center justify-center pointer-events-none"
      style={{ backgroundColor: stage.bgColor }}
    >
      {/* We use pointer-events-none for the container so it doesn't block, 
            but we need to capture events? 
            Wait, I attached event listener to 'window'. 
            But visual overlay should pass clicks if any. 
            Actually, let's keep it blocking so user focuses on the intro.
        */}

      {/* Text overlay */}
      <div className="absolute bottom-32 text-center pointer-events-none">
        <h2 className={`font-serif text-4xl md:text-6xl tracking-tight transition-all duration-500 transform ${isTransitioning ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"} ${isLightBg ? "text-black" : "text-white"}`}>
          {stage.subtext}
        </h2>

        <p className={`mt-4 text-xs tracking-[0.3em] uppercase ${isLightBg ? "text-gray-500" : "text-white/60"}`}>
          Scroll to explore
        </p>
      </div>

      <div className="absolute bottom-10 left-10 text-sm font-mono opacity-50 mix-blend-difference text-white">
        {currentStage + 1} / {totalStages}
      </div>

      <div className="absolute bottom-10 right-10 pointer-events-auto">
        <button onClick={onScrollComplete} className="text-sm uppercase tracking-widest opacity-50 hover:opacity-100 mix-blend-difference text-white">
          Skip Intro
        </button>
      </div>
    </div>
  );
}

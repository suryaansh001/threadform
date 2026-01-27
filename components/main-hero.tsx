"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles } from "lucide-react";


const FEATURED_DESIGNS = [
  { id: 1, name: "Urban Explorer", color: "#1a1a1a" },
  { id: 2, name: "Sunset Dreams", color: "#8b2635" },
  { id: 3, name: "Ocean Breeze", color: "#2d3436" },
  { id: 4, name: "Desert Storm", color: "#d4c4b0" },
];

const PROMOS = [
  "New Drop: 20% Off This Week",
  "Free Shipping on Orders Over $49",
  "Limited Edition Prints Available",
];

export function MainHero() {
  const [activeDesign, setActiveDesign] = useState(0);
  const [promoIndex, setPromoIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPromoIndex((prev) => (prev + 1) % PROMOS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen pt-20 md:pt-24 overflow-hidden bg-background">
      {/* Promo Banner */}
      <div className="absolute top-16 md:top-20 left-0 right-0 neu-flat bg-primary text-primary-foreground py-2 text-center z-10">
        <p className="text-sm tracking-wider animate-fade-in">
          {PROMOS[promoIndex]}
        </p>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 pt-16 md:pt-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-12rem)]">
          {/* Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <Badge variant="secondary" className="mb-6 px-4 py-1.5">
              <Sparkles className="w-3 h-3 mr-2" />
              Premium Quality Prints
            </Badge>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-foreground mb-6 text-balance">
              Custom Graphic Tees.{" "}
              <span className="text-muted-foreground">Designed & Printed Just for You.</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              From your idea to premium fabric. Delivered to your doorstep in days.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <Button size="lg" className="text-base px-8 py-6">
                Shop Collections
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8 py-6 bg-transparent">
                Start Customizing
              </Button>
            </div>

            {/* Design Selector */}
            <div className="flex items-center gap-6 justify-center lg:justify-start">
              <span className="text-sm text-muted-foreground tracking-wide uppercase">
                Featured Designs:
              </span>
              <div className="flex gap-2">
                {FEATURED_DESIGNS.map((design, index) => (
                  <button
                    key={design.id}
                    type="button"
                    onClick={() => setActiveDesign(index)}
                    className={`w-8 h-8 rounded-full border-2 transition-neu hover-lift ${index === activeDesign
                      ? "border-foreground scale-110 neu-flat"
                      : "border-transparent hover:border-muted-foreground/50 clay-button"
                      }`}
                    style={{ backgroundColor: design.color }}
                    aria-label={`View ${design.name} design`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* 3D Preview */}
          <div className="order-1 lg:order-2 h-[50vh] lg:h-[70vh] relative">
            <div className="absolute inset-0 flex items-center justify-center p-8 clay-card rounded-3xl hover-lift transition-neu">
              <img
                src="/tshirt.png"
                alt="T-shirt Preview"
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
              <p className="text-sm text-muted-foreground">
                {FEATURED_DESIGNS[activeDesign].name}
              </p>
              <p className="text-xs text-muted-foreground/60 mt-1">
                Drag to rotate
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground tracking-widest uppercase">
          Scroll to explore
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-foreground/50 to-transparent" />
      </div>
    </section>
  );
}

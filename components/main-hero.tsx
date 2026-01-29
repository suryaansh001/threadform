"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, TrendingUp, Star, Users } from "lucide-react";

const FEATURED_DESIGNS = [
  { id: 1, name: "Urban Explorer", color: "#1a1a1a", category: "streetwear" },
  { id: 2, name: "Sunset Dreams", color: "#8b2635", category: "minimal" },
  { id: 3, name: "Ocean Breeze", color: "#2d3436", category: "typography" },
  { id: 4, name: "Desert Storm", color: "#d4c4b0", category: "anime" },
];

const PROMOS = [
  "New Drop: 20% Off This Week 🔥",
  "Free Shipping on Orders Over $49 📦",
  "Limited Edition Prints Available ⚡",
];

const CATEGORY_GRADIENTS: Record<string, string> = {
  streetwear: "from-slate-900 via-slate-800 to-slate-900",
  minimal: "from-rose-900 via-rose-800 to-rose-900",
  typography: "from-slate-800 via-slate-700 to-slate-800",
  anime: "from-amber-800 via-amber-700 to-amber-800",
};

export function MainHero() {
  const [activeDesign, setActiveDesign] = useState(0);
  const [promoIndex, setPromoIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPromoIndex((prev) => (prev + 1) % PROMOS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const currentCategory = FEATURED_DESIGNS[activeDesign].category;
  const gradientClass = CATEGORY_GRADIENTS[currentCategory];

  return (
    <section className="relative min-h-screen h-screen flex items-center overflow-hidden">
      {/* Dynamic Background Gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-5 dark:opacity-10 transition-all duration-1000`}
      />
      
      {/* Promo Banner */}
      <div className="absolute top-16 md:top-20 left-0 right-0 neu-flat bg-primary text-primary-foreground py-2 text-center z-10">
        <p className="text-sm tracking-wider animate-fade-in font-medium">
          {PROMOS[promoIndex]}
        </p>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left space-y-8">
            <div className="space-y-6">
              <Badge variant="secondary" className="px-4 py-2 text-sm inline-flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Premium DTG Printing
              </Badge>

              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-foreground text-balance leading-[0.95]">
                Custom Graphic Tees.{" "}
                <span className="text-muted-foreground block mt-2">Your Design.</span>
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
                From your idea to premium fabric. Free design tools, vibrant colors, delivered in 5-7 days.
              </p>
            </div>

            {/* CTAs with Micro-interactions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/">
                <Button
                  size="lg"
                  className="text-base px-8 py-6 h-14 group"
                >
                  Shop All Collections
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="#custom">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base px-8 py-6 h-14 bg-transparent"
                >
                  Start Customizing
                </Button>
              </Link>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-8 justify-center lg:justify-start pt-4">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full clay-card flex items-center justify-center text-xs font-semibold border-2 border-background"
                    >
                      <Users className="w-5 h-5 text-muted-foreground" />
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <div className="font-semibold text-foreground">12,500+ Happy Customers</div>
                  <div className="text-muted-foreground text-xs">Rated 4.9/5</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 clay-card px-4 py-3 rounded-full">
                <TrendingUp className="w-4 h-4 text-success" />
                <span className="text-sm font-semibold">Best Sellers This Week</span>
              </div>
            </div>

            {/* Design Selector */}
            <div className="flex items-center gap-6 justify-center lg:justify-start pt-4">
              <span className="text-sm text-muted-foreground tracking-wide uppercase font-medium">
                Featured:
              </span>
              <div className="flex gap-3">
                {FEATURED_DESIGNS.map((design, index) => (
                  <button
                    key={design.id}
                    type="button"
                    onClick={() => setActiveDesign(index)}
                    className={`w-12 h-12 rounded-full border-3 transition-all duration-300 hover-lift relative group ${
                      index === activeDesign
                        ? "border-foreground scale-110 neu-flat shadow-xl"
                        : "border-transparent hover:border-muted-foreground/50 clay-button"
                    }`}
                    style={{ backgroundColor: design.color }}
                    aria-label={`View ${design.name} design`}
                  >
                    {index === activeDesign && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-success rounded-full flex items-center justify-center">
                        <Star className="w-2.5 h-2.5 text-white fill-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 3D Preview - Interactive */}
          <div className="order-1 lg:order-2 h-[60vh] lg:h-[75vh] relative group">
            <div className="absolute inset-0 flex items-center justify-center p-8 clay-card rounded-3xl hover-lift transition-all duration-500 cursor-grab active:cursor-grabbing">
              {/* 3D Model Container - Placeholder for actual 3D viewer */}
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src="/tshirt.png"
                  alt={`${FEATURED_DESIGNS[activeDesign].name} T-shirt Preview`}
                  className="w-full h-full object-contain drop-shadow-2xl transition-all duration-700 group-hover:scale-105"
                  style={{
                    filter: `hue-rotate(${activeDesign * 30}deg)`,
                  }}
                />
                
                {/* Interactive Hint */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="clay-card px-6 py-3 rounded-full">
                    <p className="text-sm text-foreground font-medium">
                      🖱️ Drag to rotate • Scroll to zoom
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Design Info Badge */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 glass-panel px-6 py-3 rounded-full shadow-xl backdrop-blur-xl">
              <p className="text-sm font-semibold text-foreground">
                {FEATURED_DESIGNS[activeDesign].name}
              </p>
              <p className="text-xs text-muted-foreground text-center mt-0.5">
                Premium Cotton • $29.99
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce">
        <span className="text-xs text-muted-foreground tracking-widest uppercase font-medium">
          Explore Collections
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-foreground/50 via-foreground/25 to-transparent" />
      </div>
    </section>
  );
}

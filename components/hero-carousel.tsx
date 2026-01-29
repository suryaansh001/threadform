"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, TrendingUp, Star } from "lucide-react";

const CAROUSEL_SLIDES = [
  {
    id: 1,
    title: "Custom Graphic Tees.",
    subtitle: "Your Design.",
    description: "From your idea to premium fabric. Free design tools, vibrant colors, delivered in 5-7 days.",
    cta: "Shop All Collections",
    ctaLink: "/",
    secondaryCta: "Start Customizing",
    secondaryLink: "#custom",
    badge: "Premium DTG Printing",
    gradient: "from-slate-900 via-slate-800 to-slate-900",
    image: "/tshirt.png",
    price: "$29.99",
  },
  {
    id: 2,
    title: "New Arrivals.",
    subtitle: "Fresh Designs Weekly.",
    description: "Exclusive drops from top designers. Limited quantities, unique styles that stand out.",
    cta: "Shop New Arrivals",
    ctaLink: "/new-arrivals",
    secondaryCta: "View Lookbook",
    secondaryLink: "/lookbook",
    badge: "20% Off This Week",
    gradient: "from-rose-900 via-rose-800 to-rose-900",
    image: "/tshirt.png",
    price: "$34.99",
  },
  {
    id: 3,
    title: "Streetwear Collection.",
    subtitle: "Urban Essentials.",
    description: "Bold graphics inspired by street culture. Express yourself with designs that make a statement.",
    cta: "Explore Streetwear",
    ctaLink: "/streetwear",
    secondaryCta: "See Best Sellers",
    secondaryLink: "/best-sellers",
    badge: "Trending Now 🔥",
    gradient: "from-amber-900 via-amber-800 to-amber-900",
    image: "/tshirt.png",
    price: "$32.99",
  },
  {
    id: 4,
    title: "Free Shipping.",
    subtitle: "Orders Over $49.",
    description: "No minimums on custom designs. Fast delivery, premium packaging, satisfaction guaranteed.",
    cta: "Start Shopping",
    ctaLink: "/",
    secondaryCta: "Learn More",
    secondaryLink: "/shipping",
    badge: "Limited Time Offer",
    gradient: "from-slate-800 via-slate-700 to-slate-800",
    image: "/tshirt.png",
    price: "$29.99",
  },
];

export function HeroCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);
  }, []);

  const goToSlide = (index: number) => {
    setActiveSlide(index);
    setIsAutoPlaying(false);
  };

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const currentSlide = CAROUSEL_SLIDES[activeSlide];

  return (
    <section className="relative min-h-screen h-screen flex items-center overflow-hidden">
      {/* Dynamic Background Gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${currentSlide.gradient} opacity-5 dark:opacity-10 transition-all duration-1000`}
      />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 pt-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content - Animated */}
          <div className="order-2 lg:order-1 text-center lg:text-left space-y-8">
            <div className="space-y-6 animate-in fade-in slide-in-from-left-5 duration-700" key={`content-${activeSlide}`}>
              <Badge variant="secondary" className="px-4 py-2 text-sm inline-flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                {currentSlide.badge}
              </Badge>

              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-foreground text-balance leading-[0.95]">
                {currentSlide.title}{" "}
                <span className="text-muted-foreground block mt-2">{currentSlide.subtitle}</span>
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {currentSlide.description}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-in fade-in slide-in-from-left-5 duration-700 delay-150" key={`cta-${activeSlide}`}>
              <Link href={currentSlide.ctaLink}>
                <Button
                  size="lg"
                  className="text-base px-8 py-6 h-14 group"
                >
                  {currentSlide.cta}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href={currentSlide.secondaryLink}>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base px-8 py-6 h-14 bg-transparent"
                >
                  {currentSlide.secondaryCta}
                </Button>
              </Link>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-8 justify-center lg:justify-start pt-4 animate-in fade-in duration-700 delay-300">
              <div className="flex items-center gap-2 clay-card px-4 py-3 rounded-full">
                <TrendingUp className="w-4 h-4 text-success" />
                <span className="text-sm font-semibold">Best Sellers This Week</span>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-accent text-accent" />
                ))}
                <span className="text-sm ml-2 text-muted-foreground">4.9/5 (1,250)</span>
              </div>
            </div>
          </div>

          {/* 3D Preview - Animated */}
          <div className="order-1 lg:order-2 h-[60vh] lg:h-[75vh] relative group">
            <div
              className="absolute inset-0 flex items-center justify-center p-8 clay-card rounded-3xl hover-lift transition-all duration-500 animate-in fade-in zoom-in duration-700"
              key={`image-${activeSlide}`}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={currentSlide.image}
                  alt={`${currentSlide.title} Preview`}
                  className="w-full h-full object-contain drop-shadow-2xl transition-all duration-700 group-hover:scale-105"
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
            
            {/* Price Badge */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 glass-panel px-6 py-3 rounded-full shadow-xl backdrop-blur-xl">
              <p className="text-sm font-semibold text-foreground">
                Premium Cotton • {currentSlide.price}
              </p>
            </div>
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            onMouseEnter={() => setIsAutoPlaying(false)}
            className="clay-button p-3 rounded-full hover-lift transition-all focus-ring"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dot Indicators */}
          <div className="flex items-center gap-2">
            {CAROUSEL_SLIDES.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all rounded-full focus-ring ${
                  index === activeSlide
                    ? "w-12 h-3 bg-foreground"
                    : "w-3 h-3 bg-foreground/30 hover:bg-foreground/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            onMouseEnter={() => setIsAutoPlaying(false)}
            className="clay-button p-3 rounded-full hover-lift transition-all focus-ring"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

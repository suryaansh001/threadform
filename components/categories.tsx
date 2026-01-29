"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles } from "lucide-react";

const CATEGORIES = [
  {
    id: "streetwear",
    name: "Streetwear",
    description: "Urban-inspired bold graphics",
    color: "#1a1a1a",
    count: 48,
    trending: true,
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean lines, maximum impact",
    color: "#8b2635",
    count: 52,
    trending: false,
  },
  {
    id: "anime",
    name: "Anime",
    description: "Japanese pop culture designs",
    color: "#2d3436",
    count: 36,
    trending: true,
  },
  {
    id: "typography",
    name: "Typography",
    description: "Statement text & quotes",
    color: "#5f4b32",
    count: 44,
    trending: false,
  },
  {
    id: "abstract",
    name: "Abstract",
    description: "Artistic geometric patterns",
    color: "#2c5f6f",
    count: 29,
    trending: false,
  },
  {
    id: "custom",
    name: "Custom Builder",
    description: "Design your own masterpiece",
    color: "#d4c4b0",
    count: null,
    trending: false,
  },
];

export function Categories() {
  const router = useRouter();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleCategoryClick = (categoryId: string) => {
    // Animate transition
    document.body.style.opacity = "0.95";
    setTimeout(() => {
      router.push(`/${categoryId}`);
      document.body.style.opacity = "1";
    }, 200);
  };

  return (
    <section className="py-20 md:py-32 bg-secondary/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 clay-card px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold text-muted-foreground">
              Featured Collections
            </span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight">
            Shop by Style
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Curated collections from streetwear to minimalism.<br />Find your aesthetic.
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {CATEGORIES.map((category, index) => (
            <div
              key={category.id}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl cursor-pointer"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
              onMouseEnter={() => setHoveredId(category.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => handleCategoryClick(category.id)}
            >
              {/* Background with Tilt & Scale Effect */}
              <div
                className={`absolute inset-0 transition-all duration-700 ease-out ${
                  hoveredId === category.id
                    ? "scale-110 rotate-2"
                    : "scale-100 rotate-0"
                }`}
                style={{
                  backgroundColor: category.color,
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
              </div>

              {/* Dark Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-500 ${
                hoveredId === category.id ? "opacity-100" : "opacity-90"
              }`} />

              {/* Glassmorphism Card Overlay */}
              <div className={`absolute inset-0 glass-panel opacity-0 transition-opacity duration-500 ${
                hoveredId === category.id ? "opacity-100" : ""
              }`} />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 text-white">
                <div className={`transform transition-all duration-500 ${
                  hoveredId === category.id
                    ? "-translate-y-3 scale-105"
                    : "translate-y-0 scale-100"
                }`}>
                  <div className="flex items-center gap-2 mb-3">
                    {category.count && (
                      <span className="text-sm text-white/70 font-medium">
                        {category.count} Products
                      </span>
                    )}
                    {category.trending && (
                      <span className="text-xs bg-accent/90 text-white px-2 py-1 rounded-full font-semibold backdrop-blur-sm">
                        Trending
                      </span>
                    )}
                  </div>
                  
                  <h3 className="font-serif text-3xl md:text-4xl mb-2 leading-tight">
                    {category.name}
                  </h3>
                  
                  <p className="text-sm md:text-base text-white/90 mb-4 leading-relaxed">
                    {category.description}
                  </p>
                  
                  <div className={`inline-flex items-center text-sm font-medium tracking-wider uppercase transition-all duration-300 ${
                    hoveredId === category.id ? "gap-3" : "gap-2"
                  }`}>
                    <span>Explore Collection</span>
                    <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${
                      hoveredId === category.id ? "translate-x-2" : "translate-x-0"
                    }`} />
                  </div>
                </div>
              </div>

              {/* Hover Border Glow */}
              <div className={`absolute inset-0 rounded-2xl border-2 border-white/30 transition-opacity duration-500 ${
                hoveredId === category.id ? "opacity-100" : "opacity-0"
              }`} />
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12 md:mt-16">
          <Link href="/collections">
            <button className="clay-button px-8 py-4 rounded-full text-foreground font-semibold hover-lift transition-all duration-300 group">
              <span>View All Collections</span>
              <ArrowRight className="inline w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

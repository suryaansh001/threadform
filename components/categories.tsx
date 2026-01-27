"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CATEGORIES = [
  {
    id: "men",
    name: "Men",
    description: "Bold designs for the modern man",
    color: "#1a1a1a",
    count: 48,
  },
  {
    id: "women",
    name: "Women",
    description: "Statement pieces that stand out",
    color: "#8b2635",
    count: 52,
  },
  {
    id: "unisex",
    name: "Unisex",
    description: "Designs for everyone",
    color: "#d4c4b0",
    count: 36,
  },
  {
    id: "custom",
    name: "Custom Builder",
    description: "Create your own masterpiece",
    color: "#2d3436",
    count: null,
  },
];

export function Categories() {
  return (
    <section className="py-20 md:py-32 bg-secondary">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            Shop by Category
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Find your perfect fit from our curated collections
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={`#${category.id}`}
              className="group relative aspect-[4/5] overflow-hidden"
            >
              {/* Background */}
              <div
                className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundColor: category.color }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <div className="transform transition-transform duration-300 group-hover:-translate-y-2">
                  {category.count && (
                    <p className="text-sm text-white/70 mb-1">
                      {category.count} Products
                    </p>
                  )}
                  <h3 className="font-serif text-2xl md:text-3xl mb-2">
                    {category.name}
                  </h3>
                  <p className="text-sm text-white/80 mb-4">
                    {category.description}
                  </p>
                  <span className="inline-flex items-center text-sm font-medium tracking-wider uppercase">
                    Explore
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { Award, Leaf, Heart, Zap } from "lucide-react";

const VALUES = [
  {
    icon: Award,
    title: "Premium Quality",
    description: "180-220 GSM combed cotton for ultimate comfort and durability",
  },
  {
    icon: Leaf,
    title: "Eco-Conscious",
    description: "Water-based inks and sustainable packaging practices",
  },
  {
    icon: Heart,
    title: "Made with Love",
    description: "Every design tells a story, every piece is made to last",
  },
  {
    icon: Zap,
    title: "Fast Production",
    description: "On-demand printing means fresher products, less waste",
  },
];

export function AboutBrand() {
  return (
    <section id="about" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div>
            <p className="text-sm tracking-widest uppercase text-muted-foreground mb-4">
              About the Brand
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 text-balance">
              We Design What You Wear
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                THREADFORM was born from a simple belief: everyone deserves to wear 
                something that speaks to who they are. We are not just another 
                print-on-demand shop. We are a design studio, a creative collective, 
                and your partner in self-expression.
              </p>
              <p>
                Every graphic in our collection is original artwork created by our 
                in-house team and independent artists. From bold street-style statements 
                to subtle minimalist prints, we create for the rebels, the dreamers, 
                and everyone in between.
              </p>
            </div>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-2 gap-6">
            {VALUES.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="p-6 bg-secondary rounded-lg"
                >
                  <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

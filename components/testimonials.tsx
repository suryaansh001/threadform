"use client";

import { useState, useEffect } from "react";
import { Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "The quality is insane. I have ordered from so many print-on-demand sites, and THREADFORM is by far the best. The fabric feels premium, and the print hasn't faded after dozens of washes.",
    author: "Alex Chen",
    location: "Los Angeles, CA",
  },
  {
    id: 2,
    quote:
      "Finally, a brand that gets it. Original designs, fast shipping, and the custom builder let me create exactly what I envisioned. This is my go-to for graphic tees now.",
    author: "Sarah Mitchell",
    location: "Brooklyn, NY",
  },
  {
    id: 3,
    quote:
      "I designed a custom tee for my band using their builder. The 3D preview was spot-on, and the final product looked even better. We have ordered 50 more since.",
    author: "Marcus Johnson",
    location: "Austin, TX",
  },
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 md:py-32 bg-muted">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Quote Icon */}
          <Quote className="w-12 h-12 mx-auto text-muted-foreground/30 mb-8" />

          {/* Testimonial Content */}
          <div className="relative min-h-[200px] flex items-center justify-center">
            {TESTIMONIALS.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ${
                  index === activeIndex
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4 pointer-events-none"
                }`}
              >
                <blockquote className="font-serif text-xl md:text-2xl lg:text-3xl text-foreground leading-relaxed mb-8 text-balance">
                  "{testimonial.quote}"
                </blockquote>
                <cite className="not-italic">
                  <p className="font-semibold text-foreground">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.location}
                  </p>
                </cite>
              </div>
            ))}
          </div>

          {/* Dots Navigation */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === activeIndex
                    ? "bg-foreground w-8"
                    : "bg-foreground/30 hover:bg-foreground/50"
                }`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

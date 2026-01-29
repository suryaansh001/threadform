"use client";

import { Pencil, CheckCircle, Printer, Package, Truck } from "lucide-react";

const STEPS = [
  {
    icon: Pencil,
    title: "Design",
    description: "Choose from our collection or create your own unique design",
  },
  {
    icon: CheckCircle,
    title: "Approve",
    description: "Preview your design on our 3D model and make adjustments",
  },
  {
    icon: Printer,
    title: "Print",
    description: "We use premium DTG printing for vibrant, lasting colors",
  },
  {
    icon: Package,
    title: "Pack",
    description: "Each piece is carefully inspected and eco-packaged",
  },
  {
    icon: Truck,
    title: "Deliver",
    description: "Fast shipping to your doorstep within 5-7 business days",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 md:py-32 bg-secondary">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From idea to doorstep in five simple steps
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-16 left-0 right-0 h-0.5 bg-border" />

          {/* Steps */}
          <div className="grid md:grid-cols-5 gap-8 md:gap-4">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="relative text-center">
                  {/* Icon Circle */}
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full clay-card mb-6 relative z-20">
                    <Icon className="w-7 h-7 text-foreground" />
                  </div>

                  {/* Step Number */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-7 h-7 rounded-full bg-foreground text-background text-xs font-bold flex items-center justify-center z-30 shadow-lg">
                    {index + 1}
                  </div>

                  {/* Content */}
                  <h3 className="font-semibold text-lg text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
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

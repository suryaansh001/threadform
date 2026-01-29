"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const LOOKBOOK_COLLECTIONS = [
  {
    id: 1,
    season: "Spring 2026",
    title: "Urban Renaissance",
    description: "Where street culture meets classical art. Bold statements for the modern rebel.",
    image: "/tshirt.png",
    items: 12,
  },
  {
    id: 2,
    season: "Winter 2026",
    title: "Midnight Tales",
    description: "Dark aesthetics with vibrant pops. Stories told through fabric and ink.",
    image: "/tshirt.png",
    items: 15,
  },
  {
    id: 3,
    season: "Summer 2025",
    title: "Coastal Dreams",
    description: "Breezy vibes and ocean-inspired graphics. Laid-back luxury redefined.",
    image: "/tshirt.png",
    items: 10,
  },
];

export default function LookbookPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Lookbook</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Explore our seasonal collections and discover how to style your favorite pieces
            </p>
          </div>
        </section>

        {/* Collections */}
        <section className="container mx-auto px-6 py-16">
          <div className="space-y-12">
            {LOOKBOOK_COLLECTIONS.map((collection) => (
              <div
                key={collection.id}
                className="group relative overflow-hidden rounded-3xl border border-border hover:border-primary/50 transition-all duration-500"
              >
                <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
                  <div className="flex flex-col justify-center">
                    <span className="text-sm font-medium text-primary mb-2">
                      {collection.season}
                    </span>
                    <h2 className="text-4xl font-bold text-foreground mb-4">
                      {collection.title}
                    </h2>
                    <p className="text-lg text-muted-foreground mb-6">
                      {collection.description}
                    </p>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">
                        {collection.items} pieces
                      </span>
                      <Link
                        href="/new-arrivals"
                        className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
                      >
                        View Collection
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

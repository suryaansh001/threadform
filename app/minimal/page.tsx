"use client";

import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { ProductGrid } from "@/components/product-grid";
import { ProductFilters } from "@/components/product-filters";
import { ProductSort } from "@/components/product-sort";
import { Footer } from "@/components/footer";

export default function MinimalPage() {
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState("featured");

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative h-[300px] bg-gradient-to-br from-gray-100 via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.1),transparent_50%)]" />
          </div>
          <div className="container mx-auto px-6 h-full flex flex-col justify-center relative z-10">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">Minimal</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Clean lines, maximum impact. Timeless designs that speak through simplicity.
            </p>
          </div>
        </section>

        {/* Products with Filters */}
        <section className="container mx-auto px-6 py-12">
          <div className="flex gap-8">
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <ProductFilters onFilterChange={setFilters} />
            </aside>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-6 gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Minimal Collection</h2>
                  <p className="text-muted-foreground mt-1">52 products</p>
                </div>
                <ProductSort onSortChange={setSortBy} currentSort={sortBy} />
              </div>
              <ProductGrid initialCategory="minimal" sortBy={sortBy} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

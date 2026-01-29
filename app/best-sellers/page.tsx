"use client";

import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { ProductGrid } from "@/components/product-grid";
import { ProductFilters } from "@/components/product-filters";
import { ProductSort } from "@/components/product-sort";
import { Footer } from "@/components/footer";
import { TrendingUp } from "lucide-react";

export default function BestSellersPage() {
  const [selectedFilters, setSelectedFilters] = useState({
    colors: [],
    sizes: [],
    styles: [],
    fit: [],
    priceRange: [0, 100],
  });
  const [sortBy, setSortBy] = useState("best-selling");

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative h-[300px] bg-gradient-to-br from-amber-900 via-orange-900 to-red-900 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
          </div>
          <div className="container mx-auto px-6 h-full flex flex-col justify-center relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-10 h-10 text-white" />
              <h1 className="text-5xl md:text-6xl font-bold text-white">Best Sellers</h1>
            </div>
            <p className="text-xl text-gray-100 max-w-2xl">
              Our most popular designs loved by thousands of customers worldwide
            </p>
          </div>
        </section>

        {/* Products with Filters */}
        <section className="container mx-auto px-6 py-12">
          <div className="flex gap-8">
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <ProductFilters selectedFilters={selectedFilters} onFiltersChange={setSelectedFilters} />
            </aside>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-6 gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Top Products</h2>
                  <p className="text-muted-foreground mt-1">Customer favorites across all categories</p>
                </div>
                <ProductSort value={sortBy} onChange={setSortBy} />
              </div>
              <ProductGrid section="best-sellers" filters={selectedFilters} sortBy={sortBy} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

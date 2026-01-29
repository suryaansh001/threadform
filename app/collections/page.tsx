"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Categories } from "@/components/categories";
import { ProductGrid } from "@/components/product-grid";

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              All Collections
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Explore our complete range of curated designs across all categories
            </p>
          </div>
        </section>

        {/* Categories */}
        <Categories />

        {/* All Products */}
        <section className="py-16">
          <ProductGrid
            title="All Products"
            subtitle="Browse our complete collection"
          />
        </section>
      </main>
      <Footer />
    </div>
  );
}

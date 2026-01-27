"use client";

import { useState } from "react";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PRODUCTS, type Product } from "@/lib/data";

const CATEGORIES = ["All", "Men", "Women", "Unisex", "New Arrivals", "Sale"];

import { useCart } from "@/components/cart-provider";

interface ProductGridProps {
  title?: string;
  subtitle?: string;
  initialCategory?: string;
}

export function ProductGrid({
  title = "Shop Our Collection",
  subtitle = "Original designs, premium quality, delivered to your door",
  initialCategory = "All",
}: ProductGridProps) {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [visibleCount, setVisibleCount] = useState(8);
  const { addToCart } = useCart();

  const filteredProducts = PRODUCTS.filter((product) => {
    if (activeCategory === "All") return true;
    if (activeCategory === "New Arrivals") return product.isNew;
    if (activeCategory === "Sale") return product.isSale;
    return product.category === activeCategory;
  });

  const handleQuickAdd = (product: Product, color: string) => {
    addToCart(product, color);
  };

  return (
    <section id="shop" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4 text-balance">
            {title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Category Tabs */}
        <Tabs
          value={activeCategory}
          onValueChange={setActiveCategory}
          className="mb-10"
        >
          <TabsList className="w-full justify-start overflow-x-auto flex-nowrap bg-transparent gap-2 h-auto p-0">
            {CATEGORIES.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="text-sm tracking-wide uppercase data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-2 rounded-none border border-border data-[state=active]:border-primary"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {filteredProducts.slice(0, visibleCount).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickAdd={handleQuickAdd}
            />
          ))}
        </div>

        {/* Load More */}
        {visibleCount < filteredProducts.length && (
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setVisibleCount((prev) => prev + 4)}
              className="bg-transparent"
            >
              Load More
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

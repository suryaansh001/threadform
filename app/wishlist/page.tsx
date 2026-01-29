"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ProductCard } from "@/components/product-card";
import { Heart } from "lucide-react";

const MOCK_WISHLIST = [
  {
    id: "1",
    name: "Minimalist Wave",
    price: 29.99,
    image: "/tshirt.png",
    category: "Minimal",
    colors: ["#1a1a1a", "#ffffff", "#d4c4b0"],
  },
  {
    id: "2",
    name: "Urban Graffiti",
    price: 34.99,
    image: "/tshirt.png",
    category: "Streetwear",
    colors: ["#1a1a1a", "#8b2635", "#ffffff"],
  },
  {
    id: "3",
    name: "Anime Legend",
    price: 32.99,
    image: "/tshirt.png",
    category: "Anime",
    colors: ["#ffffff", "#1a1a1a", "#2d3436"],
  },
];

export default function WishlistPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20 min-h-[80vh]">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-2">
              <Heart className="w-8 h-8 text-primary" />
              <h1 className="text-4xl font-bold text-foreground">Your Wishlist</h1>
            </div>
            <p className="text-muted-foreground mb-8">Save your favorite designs for later</p>

            {MOCK_WISHLIST.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {MOCK_WISHLIST.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Heart className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Your wishlist is empty
                </h3>
                <p className="text-muted-foreground mb-6">
                  Start adding items you love to your wishlist
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

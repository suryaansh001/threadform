"use client";

import { Navigation } from "@/components/navigation";
import { ProductGrid } from "@/components/product-grid";
import { Footer } from "@/components/footer";
import { useCart } from "@/components/cart-provider";

export default function MenPage() {
    const { cartCount } = useCart();

    return (
        <div className="min-h-screen bg-background">
            <Navigation />
            <main className="pt-20">
                <ProductGrid
                    title="Men's Collection"
                    subtitle="Built for the everyday rebel."
                    initialCategory="Men"
                />
            </main>
            <Footer />
        </div>
    );
}

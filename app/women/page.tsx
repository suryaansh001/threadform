"use client";

import { Navigation } from "@/components/navigation";
import { ProductGrid } from "@/components/product-grid";
import { Footer } from "@/components/footer";
import { useCart } from "@/components/cart-provider";

export default function WomenPage() {
    const { cartCount } = useCart();

    return (
        <div className="min-h-screen bg-background">
            <Navigation />
            <main className="pt-20">
                <ProductGrid
                    title="Women's Collection"
                    subtitle="Elegance meets street style."
                    initialCategory="Women"
                />
            </main>
            <Footer />
        </div>
    );
}

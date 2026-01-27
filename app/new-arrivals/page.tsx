"use client";

import { Navigation } from "@/components/navigation";
import { ProductGrid } from "@/components/product-grid";
import { Footer } from "@/components/footer";
import { useCart } from "@/components/cart-provider";

export default function NewArrivalsPage() {
    const { cartCount } = useCart();

    return (
        <div className="min-h-screen bg-background">
            <Navigation />
            <main className="pt-20">
                <ProductGrid
                    title="New Drop"
                    subtitle="Fresh from the lab. Get them before they're gone."
                    initialCategory="New Arrivals"
                />
            </main>
            <Footer />
        </div>
    );
}

"use client";

import { useCart } from "@/components/cart-provider";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { Trash2, ArrowRight } from "lucide-react";

export default function CartPage() {
    const { items, removeFromCart, total, cartCount, clearCart } = useCart();

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navigation />

            <main className="flex-grow pt-32 pb-20 container mx-auto px-4 md:px-6 lg:px-8">
                <h1 className="font-serif text-4xl mb-8">Your Cart</h1>

                {items.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-muted-foreground text-lg mb-8">
                            Your cart is currently empty.
                        </p>
                        <Link href="/">
                            <Button size="lg">Start Shopping</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-8">
                            {items.map((item) => (
                                <div
                                    key={`${item.id}-${item.color}-${item.size}`}
                                    className="flex gap-6 py-6 border-b border-border last:border-0"
                                >
                                    <div className="w-24 h-32 bg-muted rounded overflow-hidden flex-shrink-0">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-contain p-2 mix-blend-multiply"
                                        />
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-medium text-lg">{item.name}</h3>
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    Size: {item.size} | Color:{" "}
                                                    <span
                                                        className="inline-block w-3 h-3 rounded-full border border-border ml-1 align-middle"
                                                        style={{ backgroundColor: item.color }}
                                                    />
                                                </p>
                                            </div>
                                            <p className="font-medium">${item.price.toFixed(2)}</p>
                                        </div>
                                        <div className="mt-4 flex justify-between items-center">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm">Qty: {item.quantity}</span>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                                                onClick={() => removeFromCart(item.id, item.color, item.size)}
                                            >
                                                <Trash2 className="w-4 h-4 mr-2" />
                                                Remove
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="flex justify-end">
                                <Button variant="ghost" onClick={clearCart} className="text-muted-foreground">Clear Cart</Button>
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-muted/30 p-6 rounded-lg sticky top-32">
                                <h2 className="font-serif text-xl mb-6">Order Summary</h2>
                                <div className="space-y-4 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Shipping</span>
                                        <span>Free</span>
                                    </div>
                                    <div className="border-t border-border pt-4 flex justify-between font-medium text-lg">
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>
                                <Button className="w-full mt-8" size="lg">
                                    Checkout <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}

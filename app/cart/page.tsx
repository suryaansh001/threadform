"use client";

import { useState } from "react";
import { useCart } from "@/components/cart-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { Trash2, ArrowRight, Minus, Plus } from "lucide-react";

const SIZES = ["XS", "S", "M", "L", "XL", "2XL"];

export default function CartPage() {
    const { items, removeFromCart, total, cartCount, clearCart, updateQuantity, updateItemColor, updateItemSize } = useCart();

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
                        <div className="lg:col-span-2 space-y-6">
                            {items.map((item) => (
                                <div
                                    key={`${item.id}-${item.color}-${item.size}`}
                                    className="clay-card rounded-2xl p-6 hover-lift transition-neu"
                                >
                                    <div className="flex gap-6">
                                        <div className="w-24 h-32 bg-muted rounded overflow-hidden flex-shrink-0">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-contain p-2"
                                            />
                                        </div>
                                        <div className="flex-grow space-y-4">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-medium text-lg text-foreground">{item.name}</h3>
                                                    <p className="text-sm text-muted-foreground mt-1">
                                                        ${item.price.toFixed(2)} each
                                                    </p>
                                                </div>
                                                <p className="font-semibold text-lg text-foreground">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </p>
                                            </div>

                                            {/* Edit Controls */}
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                                {/* Size Selector */}
                                                <div className="space-y-1">
                                                    <label className="text-xs font-medium text-muted-foreground">
                                                        Size
                                                    </label>
                                                    <Select
                                                        value={item.size || "M"}
                                                        onValueChange={(newSize) =>
                                                            updateItemSize(
                                                                item.id,
                                                                item.color,
                                                                item.size || "M",
                                                                newSize
                                                            )
                                                        }
                                                    >
                                                        <SelectTrigger className="h-9 bg-background">
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {SIZES.map((size) => (
                                                                <SelectItem key={size} value={size}>
                                                                    {size}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                {/* Color Selector */}
                                                <div className="space-y-1">
                                                    <label className="text-xs font-medium text-muted-foreground">
                                                        Color
                                                    </label>
                                                    <div className="flex items-center gap-2 p-2 bg-background border border-border rounded-md h-9">
                                                        <input
                                                            type="color"
                                                            value={item.color}
                                                            onChange={(e) =>
                                                                updateItemColor(
                                                                    item.id,
                                                                    item.color,
                                                                    item.size || "M",
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="w-6 h-6 rounded cursor-pointer border-0"
                                                        />
                                                        <span className="text-xs text-muted-foreground flex-1">
                                                            {item.color}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Quantity Controls */}
                                                <div className="space-y-1">
                                                    <label className="text-xs font-medium text-muted-foreground">
                                                        Quantity
                                                    </label>
                                                    <div className="flex items-center gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="h-9 w-9 p-0"
                                                            onClick={() =>
                                                                updateQuantity(
                                                                    item.id,
                                                                    item.color,
                                                                    item.size || "M",
                                                                    Math.max(1, item.quantity - 1)
                                                                )
                                                            }
                                                        >
                                                            <Minus className="w-4 h-4" />
                                                        </Button>
                                                        <Input
                                                            type="number"
                                                            min="1"
                                                            value={item.quantity}
                                                            onChange={(e) =>
                                                                updateQuantity(
                                                                    item.id,
                                                                    item.color,
                                                                    item.size || "M",
                                                                    parseInt(e.target.value) || 1
                                                                )
                                                            }
                                                            className="h-9 w-16 text-center bg-background"
                                                        />
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="h-9 w-9 p-0"
                                                            onClick={() =>
                                                                updateQuantity(
                                                                    item.id,
                                                                    item.color,
                                                                    item.size || "M",
                                                                    item.quantity + 1
                                                                )
                                                            }
                                                        >
                                                            <Plus className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Remove Button */}
                                            <div className="flex justify-end">
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
                                </div>
                            ))}

                            <div className="flex justify-end">
                                <Button variant="ghost" onClick={clearCart} className="text-muted-foreground">Clear Cart</Button>
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="lg:col-span-1">
                            <div className="clay-card rounded-2xl p-6 sticky top-32 hover-lift transition-neu">
                                <h2 className="font-serif text-xl mb-6 text-foreground">Order Summary</h2>
                                <div className="space-y-4 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span className="text-foreground">${total.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Shipping</span>
                                        <span className="text-foreground">Free</span>
                                    </div>
                                    <div className="border-t border-border pt-4 flex justify-between font-medium text-lg">
                                        <span className="text-foreground">Total</span>
                                        <span className="text-foreground">${total.toFixed(2)}</span>
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

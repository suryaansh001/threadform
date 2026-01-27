"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

export interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    color: string;
    size?: string;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (product: any, color: string, size?: string) => void;
    removeFromCart: (itemId: string, color: string, size?: string) => void;
    updateQuantity: (itemId: string, color: string, size: string, newQuantity: number) => void;
    updateItemColor: (itemId: string, oldColor: string, size: string, newColor: string) => void;
    updateItemSize: (itemId: string, color: string, oldSize: string, newSize: string) => void;
    clearCart: () => void;
    cartCount: number;
    total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem("threadform-cart");
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
        setIsInitialized(true);
    }, []);

    // Save to localStorage whenever items change
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem("threadform-cart", JSON.stringify(items));
        }
    }, [items, isInitialized]);

    const addToCart = (product: any, color: string, size: string = "M") => {
        setItems((prev) => {
            const existingItemIndex = prev.findIndex(
                (item) => item.id === product.id && item.color === color && item.size === size
            );

            if (existingItemIndex > -1) {
                const newItems = [...prev];
                newItems[existingItemIndex].quantity += 1;
                return newItems;
            } else {
                return [
                    ...prev,
                    {
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        color,
                        size,
                        quantity: 1,
                    },
                ];
            }
        });
        toast.success("Added to cart");
    };

    const updateQuantity = (itemId: string, color: string, size: string, newQuantity: number) => {
        if (newQuantity < 1) return;
        setItems((prev) =>
            prev.map((item) =>
                item.id === itemId && item.color === color && item.size === size
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    const updateItemColor = (itemId: string, oldColor: string, size: string, newColor: string) => {
        setItems((prev) => {
            // Find the item to update
            const itemToUpdate = prev.find(
                (item) => item.id === itemId && item.color === oldColor && item.size === size
            );
            if (!itemToUpdate) return prev;

            // Check if there's already an item with the NEW color
            const existingItemIndex = prev.findIndex(
                (item) => item.id === itemId && item.color === newColor && item.size === size
            );

            let newItems = [...prev];

            if (existingItemIndex > -1) {
                // Merge: Remove old, add quantity to new
                newItems = newItems.filter(
                    (item) => !(item.id === itemId && item.color === oldColor && item.size === size)
                );
                newItems[existingItemIndex] = {
                    ...newItems[existingItemIndex],
                    quantity: newItems[existingItemIndex].quantity + itemToUpdate.quantity,
                };
            } else {
                // No collision: Just update color
                newItems = newItems.map((item) =>
                    item.id === itemId && item.color === oldColor && item.size === size
                        ? { ...item, color: newColor }
                        : item
                );
            }
            return newItems;
        });
    };

    const updateItemSize = (itemId: string, color: string, oldSize: string, newSize: string) => {
        setItems((prev) => {
            const itemToUpdate = prev.find(
                (item) => item.id === itemId && item.color === color && item.size === oldSize
            );
            if (!itemToUpdate) return prev;

            const existingItemIndex = prev.findIndex(
                (item) => item.id === itemId && item.color === color && item.size === newSize
            );

            let newItems = [...prev];

            if (existingItemIndex > -1) {
                // Merge quantities
                newItems = newItems.filter(
                    (item) => !(item.id === itemId && item.color === color && item.size === oldSize)
                );
                newItems[existingItemIndex] = {
                    ...newItems[existingItemIndex],
                    quantity: newItems[existingItemIndex].quantity + itemToUpdate.quantity,
                };
            } else {
                // Just update size
                newItems = newItems.map((item) =>
                    item.id === itemId && item.color === color && item.size === oldSize
                        ? { ...item, size: newSize }
                        : item
                );
            }
            return newItems;
        });
    };

    const removeFromCart = (itemId: string, color: string, size: string = "M") => {
        setItems((prev) =>
            prev.filter((item) => !(item.id === itemId && item.color === color && item.size === size))
        );
    };

    const clearCart = () => {
        setItems([]);
    };

    const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <CartContext.Provider
            value={{ items, addToCart, removeFromCart, updateQuantity, updateItemColor, updateItemSize, clearCart, cartCount, total }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}

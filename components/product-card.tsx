"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingBag, Eye } from "lucide-react";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  colors: string[];
  category: string;
  isNew?: boolean;
  isSale?: boolean;
  image: string;
  hoverImage?: string;
}

interface ProductCardProps {
  product: Product;
  onQuickAdd?: (product: Product, color: string) => void;
}

export function ProductCard({ product, onQuickAdd }: ProductCardProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <article
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] bg-muted overflow-hidden mb-4">
        {/* Placeholder for product image */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-105 bg-white"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-4 mix-blend-multiply"
          />
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <Badge className="bg-foreground text-background text-xs">New</Badge>
          )}
          {product.isSale && discount > 0 && (
            <Badge variant="destructive" className="text-xs">
              -{discount}%
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={() => setIsWishlisted(!isWishlisted)}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all ${isWishlisted
              ? "bg-accent text-accent-foreground"
              : "bg-background/80 hover:bg-background text-foreground"
            }`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
        </button>

        {/* Quick Actions */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-3 bg-background/90 backdrop-blur-sm transform transition-transform duration-300 ${isHovered ? "translate-y-0" : "translate-y-full"
            }`}
        >
          <div className="flex gap-2">
            <Button
              size="sm"
              className="flex-1"
              onClick={() => onQuickAdd?.(product, selectedColor)}
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Quick Add
            </Button>
            <Button size="sm" variant="outline" className="bg-transparent">
              <Eye className="w-4 h-4" />
              <span className="sr-only">Quick View</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground uppercase tracking-wider">
          {product.category}
        </p>
        <h3 className="font-medium text-foreground">{product.name}</h3>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Color Swatches */}
        <div className="flex items-center gap-1.5 pt-1">
          {product.colors.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => setSelectedColor(color)}
              className={`w-5 h-5 rounded-full border transition-all ${selectedColor === color
                  ? "border-foreground ring-1 ring-foreground ring-offset-1 ring-offset-background"
                  : "border-border hover:border-muted-foreground"
                }`}
              style={{ backgroundColor: color }}
              aria-label={`Select ${color} color`}
            />
          ))}
        </div>
      </div>
    </article>
  );
}

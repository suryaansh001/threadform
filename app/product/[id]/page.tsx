"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { PRODUCTS } from "@/lib/data";
import { useCart } from "@/components/cart-provider";
import { ShoppingBag, Heart, Share2, ChevronLeft } from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  
  const product = PRODUCTS.find((p) => p.id === params.id);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || "#ffffff");
  const [selectedSize, setSelectedSize] = useState("M");
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Button onClick={() => router.push("/")}>Go Home</Button>
        </div>
      </div>
    );
  }

  // Mock multiple images (would come from backend)
  const images = [
    product.image,
    product.hoverImage || product.image,
    product.image,
    product.image,
  ];

  const SIZES = ["XS", "S", "M", "L", "XL", "2XL"];

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square clay-card rounded-2xl overflow-hidden hover-lift transition-neu">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-contain p-8"
              />
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-3">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square clay-card rounded-xl overflow-hidden border-2 transition-neu hover-lift ${
                    selectedImage === index
                      ? "border-foreground neu-pressed"
                      : "border-transparent hover:border-muted-foreground"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-contain p-2"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex gap-2 mb-3">
                {product.isNew && (
                  <Badge className="bg-foreground text-background">New</Badge>
                )}
                {product.isSale && discount > 0 && (
                  <Badge variant="destructive">-{discount}% Sale</Badge>
                )}
                <Badge variant="outline">{product.category}</Badge>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-serif mb-4">
                {product.name}
              </h1>

              <div className="flex items-center gap-3">
                {product.originalPrice && (
                  <span className="text-2xl text-muted-foreground line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-3xl font-bold">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-sm">
              <p className="text-muted-foreground">
                Premium quality t-shirt made with 100% organic cotton. Designed for comfort and style,
                this piece features a modern fit and durable construction that will last for years.
                Perfect for everyday wear or special occasions.
              </p>
            </div>

            {/* Color Selection */}
            <div className="space-y-3">
              <h3 className="font-medium">Color</h3>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-12 h-12 rounded-full border-2 transition-all ${
                      selectedColor === color
                        ? "border-foreground ring-2 ring-foreground ring-offset-2"
                        : "border-border hover:border-muted-foreground"
                    }`}
                    style={{ backgroundColor: color }}
                    aria-label={`Select color ${color}`}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <h3 className="font-medium">Size</h3>
              <div className="flex flex-wrap gap-2">
                {SIZES.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    onClick={() => setSelectedSize(size)}
                    className="min-w-[60px]"
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="border-t border-b border-border py-6 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium">Material:</span>
                <span className="text-muted-foreground">100% Organic Cotton</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium">Weight:</span>
                <span className="text-muted-foreground">180 GSM</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium">Care:</span>
                <span className="text-muted-foreground">Machine washable</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium">Shipping:</span>
                <span className="text-muted-foreground">Free delivery on orders over $50</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button
                size="lg"
                className="flex-1"
                onClick={() => {
                  addToCart(product, selectedColor);
                  // Optionally show a toast notification
                }}
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => setIsWishlisted(!isWishlisted)}
              >
                <Heart
                  className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`}
                />
              </Button>

              <Button size="lg" variant="outline">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {/* Additional Info */}
            <div className="text-sm text-muted-foreground space-y-1">
              <p>✓ Free returns within 30 days</p>
              <p>✓ 1-year warranty</p>
              <p>✓ Ethically sourced materials</p>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-16 md:mt-24">
          <h2 className="text-2xl md:text-3xl font-serif mb-8">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {PRODUCTS.slice(0, 4).map((relatedProduct) => (
              <div
                key={relatedProduct.id}
                className="cursor-pointer group"
                onClick={() => router.push(`/product/${relatedProduct.id}`)}
              >
                <div className="aspect-square bg-muted rounded-lg overflow-hidden mb-3">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform"
                  />
                </div>
                <h3 className="font-medium mb-1">{relatedProduct.name}</h3>
                <p className="text-sm font-semibold">${relatedProduct.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

"use client";

import React from "react"

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Upload, Type, ImageIcon, Ruler, ShoppingBag } from "lucide-react";

import { Scene } from "@/components/3d/Scene";
import { TShirt } from "@/components/3d/TShirt";
import { Decal, Text, useTexture } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { useCart } from "@/components/cart-provider";

const COLORS = [
  { name: "White", value: "#ffffff" },
  { name: "Black", value: "#1a1a1a" },
  { name: "Beige", value: "#d4c4b0" },
  { name: "Burgundy", value: "#8b2635" },
  { name: "Charcoal", value: "#2d3436" },
  { name: "Navy", value: "#1e3a5f" },
  { name: "Forest", value: "#2d4a3e" },
  { name: "Sand", value: "#c2b280" },
  { name: "Dusty Rose", value: "#c4a4a4" },
  { name: "Steel", value: "#71797E" },
];

const SIZES = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];
const FABRICS = [
  { name: "180 GSM Cotton", price: 0 },
  { name: "200 GSM Premium", price: 5 },
  { name: "220 GSM Heavy", price: 8 },
];

const FONTS = [
  "Geist Bold",
  "Inter Bold",
  "Playfair Display",
  "Bebas Neue",
  "Montserrat",
];

function DecalImage({ url }: { url: string }) {
  const texture = useLoader(THREE.TextureLoader, url);
  return (
    <Decal
      position={[0, 0.05, 0.15]}
      rotation={[0, 0, 0]}
      scale={0.3}
      map={texture}
    />
  );
}

function CustomShirtPreview({
  color,
  text,
  font,
  image
}: {
  color: string;
  text: string;
  font: string;
  image: string | null;
}) {
  return (
    <TShirt color={color} scale={0.02}>
      {image && (
        <DecalImage url={image} />
      )}
      {text && (
        <Text
          position={[0, -0.1, 0.15]}
          fontSize={0.15}
          color={color === "#ffffff" || color === "#d4c4b0" || color === "#c2b280" ? "#1a1a1a" : "#ffffff"}
          anchorX="center"
          anchorY="middle"
          maxWidth={0.5}
          textAlign="center"
        >
          {text}
        </Text>
      )}
    </TShirt>
  );
}

export function CustomBuilder() {
  const [color, setColor] = useState(COLORS[0].value);
  const [size, setSize] = useState("M");
  const [fabric, setFabric] = useState(FABRICS[0].name);
  const [customText, setCustomText] = useState("");
  const [fontSize, setFontSize] = useState([24]);
  const [selectedFont, setSelectedFont] = useState(FONTS[0]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addToCart } = useCart();

  const fabricPrice = FABRICS.find((f) => f.name === fabric)?.price || 0;
  const basePrice = 34.99;
  const customizationPrice = customText || uploadedImage ? 5.99 : 0;
  const totalPrice = basePrice + fabricPrice + customizationPrice;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="custom" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            Custom T-Shirt Builder
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Design your own masterpiece. Upload your art or add custom text.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* 3D Preview */}
          <div className="order-1 lg:order-2">
            <div className="sticky top-24">
              <div className="aspect-square bg-muted dark:bg-muted/50 rounded-lg overflow-hidden border border-border flex items-center justify-center relative">
                <Scene className="w-full h-full" cameraPosition={[0, 0, 3.5]}>
                  <CustomShirtPreview
                    color={color}
                    text={customText}
                    font={selectedFont}
                    image={uploadedImage}
                  />
                </Scene>
                {/* Reset View Button or Controls could go here */}
              </div>
            </div>
          </div>

          {/* Customization Panel */}
          <div className="order-2 lg:order-1 space-y-8">
            <Tabs defaultValue="design" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="design" className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">Design</span>
                </TabsTrigger>
                <TabsTrigger value="text" className="flex items-center gap-2">
                  <Type className="w-4 h-4" />
                  <span className="hidden sm:inline">Text</span>
                </TabsTrigger>
                <TabsTrigger value="options" className="flex items-center gap-2">
                  <Ruler className="w-4 h-4" />
                  <span className="hidden sm:inline">Options</span>
                </TabsTrigger>
              </TabsList>

              {/* Design Tab */}
              <TabsContent value="design" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Upload Your Design</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div
                      className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-muted-foreground transition-colors"
                      onClick={() => fileInputRef.current?.click()}
                      onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
                      role="button"
                      tabIndex={0}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                      <Upload className="w-10 h-10 mx-auto text-muted-foreground mb-4" />
                      <p className="text-foreground font-medium mb-1">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-sm text-muted-foreground">
                        PNG, JPG up to 10MB
                      </p>
                    </div>
                    {uploadedImage && (
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-muted rounded overflow-hidden">
                          <img
                            src={uploadedImage || "/placeholder.svg"}
                            alt="Uploaded design"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setUploadedImage(null)}
                        >
                          Remove
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Color Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">T-Shirt Color</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-3">
                      {COLORS.map((c) => (
                        <button
                          key={c.value}
                          type="button"
                          onClick={() => setColor(c.value)}
                          className={`w-10 h-10 rounded-full border-2 transition-all ${color === c.value
                            ? "border-foreground ring-2 ring-foreground ring-offset-2 ring-offset-background"
                            : "border-border hover:border-muted-foreground"
                            }`}
                          style={{ backgroundColor: c.value }}
                          aria-label={`Select ${c.name}`}
                          title={c.name}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Text Tab */}
              <TabsContent value="text" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Add Custom Text</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="custom-text">Your Text</Label>
                      <Input
                        id="custom-text"
                        placeholder="Enter your text here"
                        value={customText}
                        onChange={(e) => setCustomText(e.target.value)}
                        maxLength={50}
                      />
                      <p className="text-xs text-muted-foreground">
                        {customText.length}/50 characters
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label>Font</Label>
                      <Select value={selectedFont} onValueChange={setSelectedFont}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select font" />
                        </SelectTrigger>
                        <SelectContent>
                          {FONTS.map((font) => (
                            <SelectItem key={font} value={font}>
                              {font}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Font Size: {fontSize}px</Label>
                      <Slider
                        value={fontSize}
                        onValueChange={setFontSize}
                        min={12}
                        max={48}
                        step={1}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Options Tab */}
              <TabsContent value="options" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Size & Fabric</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label>Size</Label>
                      <div className="flex flex-wrap gap-2">
                        {SIZES.map((s) => (
                          <Button
                            key={s}
                            type="button"
                            variant={size === s ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSize(s)}
                          >
                            {s}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Fabric Quality</Label>
                      <Select value={fabric} onValueChange={setFabric}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select fabric" />
                        </SelectTrigger>
                        <SelectContent>
                          {FABRICS.map((f) => (
                            <SelectItem key={f.name} value={f.name}>
                              {f.name} {f.price > 0 && `(+$${f.price})`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Price Summary */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Base price</span>
                    <span>${basePrice.toFixed(2)}</span>
                  </div>
                  {fabricPrice > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Fabric upgrade</span>
                      <span>+${fabricPrice.toFixed(2)}</span>
                    </div>
                  )}
                  {customizationPrice > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Customization</span>
                      <span>+${customizationPrice.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="h-px bg-border my-3" />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <Button size="lg" className="w-full" onClick={() => {
                  // Create a custom product object
                  const customProduct = {
                    id: `custom-${Date.now()}`, // simple unique id gen
                    name: "Custom T-Shirt Design",
                    price: totalPrice,
                    image: "/tshirt.png", // Or the uploaded image if we want to get fancy with blob storage, but sticking to fallback for now since persistence is local only.
                    isCustom: true
                  };
                  addToCart(customProduct, color, size);
                }}>
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

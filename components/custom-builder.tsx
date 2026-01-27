"use client";

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
  "Arial",
  "Georgia",
  "Impact",
  "Courier New",
  "Comic Sans MS",
];

export function CustomBuilder() {
  const [color, setColor] = useState("#ffffff");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [customText, setCustomText] = useState("");
  const [selectedFont, setSelectedFont] = useState(FONTS[0]);
  const [fontSize, setFontSize] = useState([24]);
  const [size, setSize] = useState("M");
  const [fabric, setFabric] = useState(FABRICS[0].name);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addToCart } = useCart();

  // Calculate pricing
  const basePrice = 29.99;
  const fabricPrice = FABRICS.find((f) => f.name === fabric)?.price || 0;
  const customizationPrice = (uploadedImage ? 10 : 0) + (customText ? 5 : 0);
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

  // Get text color based on shirt color for contrast
  const getTextColor = () => {
    const darkColors = ["#1a1a1a", "#2d3436", "#1e3a5f", "#2d4a3e", "#8b2635"];
    return darkColors.includes(color) ? "#ffffff" : "#1a1a1a";
  };

  return (
    <section id="customize" className="py-20 md:py-32 bg-muted/50">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            Design Your Own
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Create a unique t-shirt with your own design, text, and style preferences
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Preview Panel */}
          <div className="order-1 lg:order-2">
            <div className="sticky top-24">
              <div className="clay-card rounded-2xl p-8 hover-lift transition-neu">
                {/* Simple 2D T-Shirt Preview */}
                <div className="relative w-full aspect-square flex items-center justify-center neu-pressed rounded-2xl"
                     style={{ backgroundColor: color }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src="/tshirt.png"
                      alt="T-Shirt Preview"
                      className="w-full h-full object-contain mix-blend-multiply opacity-20"
                    />
                  </div>
                  
                  {/* Uploaded Image */}
                  {uploadedImage && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img
                        src={uploadedImage}
                        alt="Custom design"
                        className="w-1/2 h-1/2 object-contain"
                      />
                    </div>
                  )}
                  
                  {/* Custom Text */}
                  {customText && (
                    <div
                      className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 text-center max-w-xs"
                      style={{
                        color: getTextColor(),
                        fontFamily: selectedFont,
                        fontSize: `${fontSize[0]}px`,
                        fontWeight: "bold",
                      }}
                    >
                      {customText}
                    </div>
                  )}
                </div>
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
                            src={uploadedImage}
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
                          className={`w-10 h-10 rounded-full border-2 transition-all ${
                            color === c.value
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
                      <Label>Font Size: {fontSize[0]}px</Label>
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

                <Button
                  size="lg"
                  className="w-full"
                  onClick={() => {
                    const customProduct = {
                      id: `custom-${Date.now()}`,
                      name: "Custom T-Shirt Design",
                      price: totalPrice,
                      colors: [color],
                      category: "Custom",
                      image: "/tshirt.png",
                    };
                    addToCart(customProduct, color);
                  }}
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Add to Cart - ${totalPrice.toFixed(2)}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PRODUCTS } from "@/lib/data";
import { Plus, Edit, Trash2, Package, Users, DollarSign, ShoppingCart, X, Percent, Tags } from "lucide-react";

export default function AdminPage() {
  const [products, setProducts] = useState(PRODUCTS);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [showDiscountForm, setShowDiscountForm] = useState(false);
  const [showMassDiscount, setShowMassDiscount] = useState(false);
  
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "Men",
    colors: ["#ffffff"],
  });

  const [discountForm, setDiscountForm] = useState({
    productId: "",
    discountPercent: "",
  });

  const [massDiscountForm, setMassDiscountForm] = useState({
    productIds: "",
    discountPercent: "",
  });

  const [imageInputs, setImageInputs] = useState([""]);

  // Mock statistics
  const stats = {
    totalProducts: products.length,
    totalOrders: 142,
    totalRevenue: 5234.56,
    totalCustomers: 89,
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) return;

    const filteredImages = imageInputs.filter(img => img.trim() !== "");

    const product = {
      id: String(products.length + 1),
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      colors: newProduct.colors,
      category: newProduct.category,
      image: filteredImages[0] || "/tshirt.png",
      images: filteredImages.length > 0 ? filteredImages : ["/tshirt.png"],
    };

    setProducts([...products, product]);
    setNewProduct({
      name: "",
      price: "",
      category: "Men",
      colors: ["#ffffff"],
    });
    setImageInputs([""]);
    setIsAddingProduct(false);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleApplyDiscount = () => {
    if (!discountForm.productId || !discountForm.discountPercent) return;

    const discount = parseFloat(discountForm.discountPercent);
    setProducts(products.map(p => {
      if (p.id === discountForm.productId) {
        const originalPrice = p.originalPrice || p.price;
        const newPrice = originalPrice * (1 - discount / 100);
        return {
          ...p,
          originalPrice: originalPrice,
          price: newPrice,
          isSale: true,
        };
      }
      return p;
    }));

    setDiscountForm({ productId: "", discountPercent: "" });
    setShowDiscountForm(false);
  };

  const handleApplyMassDiscount = () => {
    if (!massDiscountForm.productIds || !massDiscountForm.discountPercent) return;

    const ids = massDiscountForm.productIds.split(",").map(id => id.trim());
    const discount = parseFloat(massDiscountForm.discountPercent);

    setProducts(products.map(p => {
      if (ids.includes(p.id)) {
        const originalPrice = p.originalPrice || p.price;
        const newPrice = originalPrice * (1 - discount / 100);
        return {
          ...p,
          originalPrice: originalPrice,
          price: newPrice,
          isSale: true,
        };
      }
      return p;
    }));

    setMassDiscountForm({ productIds: "", discountPercent: "" });
    setShowMassDiscount(false);
  };

  const addImageInput = () => {
    setImageInputs([...imageInputs, ""]);
  };

  const removeImageInput = (index: number) => {
    setImageInputs(imageInputs.filter((_, i) => i !== index));
  };

  const updateImageInput = (index: number, value: string) => {
    const newInputs = [...imageInputs];
    newInputs[index] = value;
    setImageInputs(newInputs);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 mt-16">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-serif mb-2 text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your store products and orders</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProducts}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCustomers}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="discounts">Discounts</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Product Management</CardTitle>
                    <CardDescription>
                      Add, edit, or remove products from your store
                    </CardDescription>
                  </div>
                  <Button onClick={() => setIsAddingProduct(!isAddingProduct)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Product
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Add Product Form */}
                {isAddingProduct && (
                  <div className="clay-card rounded-2xl p-6 space-y-4 hover-lift transition-neu">
                    <h3 className="font-semibold text-foreground">New Product</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="product-name">Product Name</Label>
                        <Input
                          id="product-name"
                          value={newProduct.name}
                          onChange={(e) =>
                            setNewProduct({ ...newProduct, name: e.target.value })
                          }
                          placeholder="Enter product name"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="product-price">Price ($)</Label>
                        <Input
                          id="product-price"
                          type="number"
                          step="0.01"
                          value={newProduct.price}
                          onChange={(e) =>
                            setNewProduct({ ...newProduct, price: e.target.value })
                          }
                          placeholder="0.00"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="product-category">Category</Label>
                        <Select
                          value={newProduct.category}
                          onValueChange={(value) =>
                            setNewProduct({ ...newProduct, category: value })
                          }
                        >
                          <SelectTrigger id="product-category">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Men">Men</SelectItem>
                            <SelectItem value="Women">Women</SelectItem>
                            <SelectItem value="Unisex">Unisex</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Multiple Image Inputs */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>Product Images (up to 10)</Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={addImageInput}
                          disabled={imageInputs.length >= 10}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Image
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {imageInputs.map((img, index) => (
                          <div key={index} className="flex gap-2">
                            <Input
                              placeholder="/tshirt.png or image URL"
                              value={img}
                              onChange={(e) => updateImageInput(index, e.target.value)}
                            />
                            {imageInputs.length > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeImageInput(index)}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={handleAddProduct}>Add Product</Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setIsAddingProduct(false);
                          setImageInputs([""]);
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}

                {/* Products List */}
                <div className="space-y-4">
                  <div className="grid grid-cols-6 gap-4 p-4 bg-muted rounded-lg font-semibold text-sm">
                    <div>Name</div>
                    <div>Category</div>
                    <div>Price</div>
                    <div>Sale</div>
                    <div>Colors</div>
                    <div className="text-right">Actions</div>
                  </div>

                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="grid grid-cols-6 gap-4 p-4 clay-card rounded-2xl items-center hover-lift transition-neu"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 object-contain bg-muted rounded"
                        />
                        <span className="font-medium text-foreground">{product.name}</span>
                      </div>
                      <div className="text-foreground">{product.category}</div>
                      <div className="text-foreground">
                        {product.originalPrice && (
                          <span className="text-xs line-through text-muted-foreground mr-1">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                        <span className="font-semibold">${product.price.toFixed(2)}</span>
                      </div>
                      <div>
                        {product.isSale && (
                          <span className="text-xs bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 px-2 py-1 rounded">
                            Sale
                          </span>
                        )}
                      </div>
                      <div className="flex gap-1">
                        {product.colors.slice(0, 3).map((color, idx) => (
                          <div
                            key={idx}
                            className="w-6 h-6 rounded-full border border-border"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                        {product.colors.length > 3 && (
                          <span className="text-sm text-muted-foreground">
                            +{product.colors.length - 3}
                          </span>
                        )}
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Discounts Tab */}
          <TabsContent value="discounts" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Percent className="w-4 h-4" />
                    Single Product Discount
                  </CardTitle>
                  <CardDescription>
                    Apply discount to a specific product
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {!showDiscountForm ? (
                    <Button onClick={() => setShowDiscountForm(true)} variant="outline" className="w-full">
                      <Percent className="w-4 h-4 mr-2" />
                      Apply Discount
                    </Button>
                  ) : (
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label>Select Product</Label>
                        <Select
                          value={discountForm.productId}
                          onValueChange={(value) =>
                            setDiscountForm({ ...discountForm, productId: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Choose product" />
                          </SelectTrigger>
                          <SelectContent>
                            {products.map((p) => (
                              <SelectItem key={p.id} value={p.id}>
                                {p.name} (${p.price})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Discount %</Label>
                        <Input
                          type="number"
                          placeholder="10"
                          value={discountForm.discountPercent}
                          onChange={(e) =>
                            setDiscountForm({ ...discountForm, discountPercent: e.target.value })
                          }
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleApplyDiscount} size="sm">Apply</Button>
                        <Button onClick={() => setShowDiscountForm(false)} variant="outline" size="sm">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Tags className="w-4 h-4" />
                    Mass Discount by IDs
                  </CardTitle>
                  <CardDescription>
                    Apply discount to multiple products at once
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {!showMassDiscount ? (
                    <Button onClick={() => setShowMassDiscount(true)} variant="outline" className="w-full">
                      <Tags className="w-4 h-4 mr-2" />
                      Apply Mass Discount
                    </Button>
                  ) : (
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label>Product IDs (comma-separated)</Label>
                        <Input
                          placeholder="1, 2, 3"
                          value={massDiscountForm.productIds}
                          onChange={(e) =>
                            setMassDiscountForm({ ...massDiscountForm, productIds: e.target.value })
                          }
                        />
                        <p className="text-xs text-muted-foreground">
                          Example: 1, 2, 3 (applies to products with these IDs)
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label>Discount %</Label>
                        <Input
                          type="number"
                          placeholder="10"
                          value={massDiscountForm.discountPercent}
                          onChange={(e) =>
                            setMassDiscountForm({ ...massDiscountForm, discountPercent: e.target.value })
                          }
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleApplyMassDiscount} size="sm">Apply</Button>
                        <Button onClick={() => setShowMassDiscount(false)} variant="outline" size="sm">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>View and manage customer orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-5 gap-4 p-4 bg-muted rounded-lg font-semibold text-sm">
                    <div>Order ID</div>
                    <div>Customer</div>
                    <div>Amount</div>
                    <div>Status</div>
                    <div>Date</div>
                  </div>
                  
                  {/* Mock orders */}
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="grid grid-cols-5 gap-4 p-4 border border-border rounded-lg items-center bg-card"
                    >
                      <div className="font-mono text-sm text-foreground">#{1000 + i}</div>
                      <div className="text-foreground">Customer {i}</div>
                      <div className="font-semibold text-foreground">${(Math.random() * 100 + 20).toFixed(2)}</div>
                      <div>
                        <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                          Completed
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Jan {20 + i}, 2026
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Customers Tab */}
          <TabsContent value="customers">
            <Card>
              <CardHeader>
                <CardTitle>Customer List</CardTitle>
                <CardDescription>Manage your customer database</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-4 gap-4 p-4 bg-muted rounded-lg font-semibold text-sm">
                    <div>Name</div>
                    <div>Email</div>
                    <div>Orders</div>
                    <div>Total Spent</div>
                  </div>
                  
                  {/* Mock customers */}
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="grid grid-cols-4 gap-4 p-4 border border-border rounded-lg items-center bg-card"
                    >
                      <div className="font-medium text-foreground">Customer {i}</div>
                      <div className="text-muted-foreground">customer{i}@example.com</div>
                      <div className="text-foreground">{Math.floor(Math.random() * 10 + 1)}</div>
                      <div className="font-semibold text-foreground">${(Math.random() * 500 + 50).toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}

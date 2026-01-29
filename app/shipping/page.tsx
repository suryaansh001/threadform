"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Package, Truck, MapPin, Clock } from "lucide-react";

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20 min-h-[80vh]">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-foreground mb-2">Shipping Information</h1>
            <p className="text-muted-foreground mb-12">Fast, reliable delivery to your door</p>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="glass-panel p-6 rounded-xl border border-border">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Truck className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Standard Shipping</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      5-7 business days
                    </p>
                    <p className="text-2xl font-bold text-foreground">Free on orders $49+</p>
                  </div>
                </div>
              </div>

              <div className="glass-panel p-6 rounded-xl border border-border">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Express Shipping</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      2-3 business days
                    </p>
                    <p className="text-2xl font-bold text-foreground">$9.99</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <Package className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-semibold text-foreground">Order Processing</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  All orders are processed within 1-2 business days. Orders are not shipped or delivered on weekends or holidays.
                  If we are experiencing a high volume of orders, shipments may be delayed by a few days.
                </p>
              </section>

              <section>
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-semibold text-foreground">Shipping Destinations</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We currently ship to addresses within the United States and Canada. International shipping coming soon!
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                    United States (all 50 states)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                    Canada
                  </li>
                </ul>
              </section>

              <section className="glass-panel p-6 rounded-xl border border-border bg-primary/5">
                <h3 className="font-semibold text-foreground mb-2">Track Your Order</h3>
                <p className="text-sm text-muted-foreground">
                  Once your order ships, you'll receive a confirmation email with a tracking number.
                  Use this number to track your package in real-time.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Package, Clock, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

const MOCK_ORDERS = [
  {
    id: "ORD-2026-001",
    date: "Jan 25, 2026",
    status: "delivered",
    total: 89.97,
    items: 3,
    trackingNumber: "TRK123456789",
  },
  {
    id: "ORD-2026-002",
    date: "Jan 28, 2026",
    status: "processing",
    total: 34.99,
    items: 1,
    trackingNumber: null,
  },
  {
    id: "ORD-2026-003",
    date: "Jan 15, 2026",
    status: "shipped",
    total: 64.98,
    items: 2,
    trackingNumber: "TRK987654321",
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "delivered":
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    case "shipped":
      return <Package className="w-5 h-5 text-blue-500" />;
    case "processing":
      return <Clock className="w-5 h-5 text-yellow-500" />;
    case "cancelled":
      return <XCircle className="w-5 h-5 text-red-500" />;
    default:
      return <Clock className="w-5 h-5" />;
  }
};

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20 min-h-[80vh]">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-foreground mb-2">Your Orders</h1>
            <p className="text-muted-foreground mb-8">Track and manage your purchases</p>

            <div className="space-y-4">
              {MOCK_ORDERS.map((order) => (
                <div
                  key={order.id}
                  className="glass-panel p-6 rounded-xl border border-border hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        {getStatusIcon(order.status)}
                        <h3 className="font-semibold text-foreground">{order.id}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">Placed on {order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-foreground">${order.total}</p>
                      <p className="text-sm text-muted-foreground">{order.items} items</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary capitalize">
                      {order.status}
                    </span>
                    {order.trackingNumber && (
                      <span className="text-xs text-muted-foreground">
                        Tracking: {order.trackingNumber}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <Link
                      href={`/orders/${order.id}`}
                      className="clay-button px-4 py-2 rounded-lg text-sm font-medium hover-lift"
                    >
                      View Details
                    </Link>
                    {order.trackingNumber && (
                      <button className="px-4 py-2 rounded-lg text-sm font-medium border border-border hover:border-primary/50 transition-colors">
                        Track Package
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

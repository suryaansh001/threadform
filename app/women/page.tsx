"use client";

import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { ProductGrid } from "@/components/product-grid";
import { ProductFilters } from "@/components/product-filters";
import { ProductSort } from "@/components/product-sort";
import { Footer } from "@/components/footer";
import { Sparkles, TrendingUp, Tag, Clock } from "lucide-react";
import Link from "next/link";

const CATEGORY_SECTIONS = [
  {
    id: "new-arrivals",
    title: "New Arrivals",
    icon: Sparkles,
    badge: "Just In",
    count: 28,
    description: "Fresh styles this week"
  },
  {
    id: "best-sellers",
    title: "Best Sellers",
    icon: TrendingUp,
    badge: "Hot",
    count: 22,
    description: "Customer favorites"
  },
  {
    id: "on-sale",
    title: "On Sale",
    icon: Tag,
    badge: "Up to 50% Off",
    count: 36,
    description: "Limited time offers"
  },
  {
    id: "trending",
    title: "Trending Now",
    icon: Clock,
    badge: "Popular",
    count: 19,
    description: "What's hot right now"
  }
];

export default function WomenPage() {
    const [activeSection, setActiveSection] = useState("all");
    const [filters, setFilters] = useState({});
    const [sortBy, setSortBy] = useState("featured");

    return (
        <div className="min-h-screen bg-background">
            <Navigation />
            <main className="pt-20">
                {/* Hero Banner */}
                <section className="relative h-[300px] bg-gradient-to-br from-rose-900 via-pink-900 to-purple-900 overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
                    </div>
                    <div className="container mx-auto px-6 h-full flex flex-col justify-center relative z-10">
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                            Women's Collection
                        </h1>
                        <p className="text-xl text-gray-100 max-w-2xl">
                            Elegance meets street style. Discover designs that blend comfort with confidence.
                        </p>
                    </div>
                </section>

                {/* Category Quick Links */}
                <section className="border-b border-border">
                    <div className="container mx-auto px-6 py-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {CATEGORY_SECTIONS.map((section) => {
                                const Icon = section.icon;
                                return (
                                    <button
                                        key={section.id}
                                        onClick={() => setActiveSection(section.id)}
                                        className={`group relative p-6 rounded-2xl border transition-all duration-300 ${
                                            activeSection === section.id
                                                ? "border-primary bg-primary/5 shadow-lg"
                                                : "border-border bg-card hover:border-primary/50 hover:shadow-md"
                                        }`}
                                    >
                                        <div className="flex flex-col items-center text-center space-y-3">
                                            <div className={`p-3 rounded-xl transition-colors ${
                                                activeSection === section.id
                                                    ? "bg-primary/10 text-primary"
                                                    : "bg-secondary text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                                            }`}>
                                                <Icon className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-foreground mb-1">
                                                    {section.title}
                                                </h3>
                                                <p className="text-sm text-muted-foreground mb-2">
                                                    {section.description}
                                                </p>
                                                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                                                    {section.badge}
                                                </span>
                                                <p className="text-xs text-muted-foreground mt-2">
                                                    {section.count} items
                                                </p>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                        <button
                            onClick={() => setActiveSection("all")}
                            className={`mt-4 px-6 py-2 rounded-lg border transition-all ${
                                activeSection === "all"
                                    ? "border-primary bg-primary/5 text-primary"
                                    : "border-border hover:border-primary/50"
                            }`}
                        >
                            View All
                        </button>
                    </div>
                </section>

                {/* Products with Filters */}
                <section className="container mx-auto px-6 py-12">
                    <div className="flex gap-8">
                        {/* Filters Sidebar - Desktop */}
                        <aside className="hidden lg:block w-72 flex-shrink-0">
                            <ProductFilters onFilterChange={setFilters} />
                        </aside>

                        {/* Main Content */}
                        <div className="flex-1 min-w-0">
                            {/* Toolbar */}
                            <div className="flex items-center justify-between mb-6 gap-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-foreground">
                                        {activeSection === "all" 
                                            ? "All Women's Products"
                                            : CATEGORY_SECTIONS.find(s => s.id === activeSection)?.title
                                        }
                                    </h2>
                                    <p className="text-muted-foreground mt-1">
                                        Discover our latest collection
                                    </p>
                                </div>
                                <ProductSort onSortChange={setSortBy} currentSort={sortBy} />
                            </div>

                            {/* Product Grid */}
                            <ProductGrid
                                initialCategory="Women"
                                section={activeSection}
                                sortBy={sortBy}
                            />
                        </div>
                    </div>
                </section>

                {/* Featured CTA */}
                <section className="container mx-auto px-6 py-16">
                    <Link 
                        href="/custom-builder"
                        className="block group relative p-12 rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-primary/20 hover:border-primary/40 transition-all duration-500 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.1),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative z-10 text-center">
                            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                                Design Your Own
                            </h3>
                            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                                Create a unique piece with our custom builder. Choose colors, add designs, and make it yours.
                            </p>
                            <span className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium group-hover:shadow-lg transition-shadow">
                                Start Designing
                                <Sparkles className="w-4 h-4" />
                            </span>
                        </div>
                    </Link>
                </section>
            </main>
            <Footer />
        </div>
    );
}

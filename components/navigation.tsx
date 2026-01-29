"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag, Search, User, LogOut, Package, Heart, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { useCart } from "@/components/cart-provider";

const NAV_LINKS = [
  { href: "/", label: "Shop" },
  { href: "/men", label: "Men" },
  { href: "/women", label: "Women" },
  { href: "/new-arrivals", label: "New Arrivals" },
  { href: "#custom", label: "Custom Builder" },
  { href: "#about", label: "About" },
];

const SEARCH_SUGGESTIONS = [
  "Graphic Tees",
  "Streetwear",
  "Minimal Design",
  "Anime Prints",
  "Typography Shirts",
  "Oversized Fit",
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredSuggestions = SEARCH_SUGGESTIONS.filter(item =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 clay-card backdrop-blur-2xl border-b border-white/20 dark:border-white/10 transition-all duration-300 ${
        scrolled ? "h-14 md:h-16" : "h-16 md:h-20"
      }`}
    >
      <nav className="container mx-auto px-4 md:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link
            href="/"
            className={`font-serif tracking-tight text-foreground transition-all duration-300 ${
              scrolled ? "text-lg md:text-xl" : "text-xl md:text-2xl"
            }`}
          >
            THREADFORM
          </Link>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8 relative">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSearch(true)}
                onBlur={() => setTimeout(() => setShowSearch(false), 200)}
                className="pl-10 pr-4"
                aria-label="Search products"
              />
            </div>
            
            {/* Search Suggestions Dropdown */}
            {showSearch && searchQuery && filteredSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 glass-panel rounded-xl shadow-2xl overflow-hidden z-50">
                {filteredSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className="w-full text-left px-4 py-3 hover:bg-secondary/50 transition-colors text-sm"
                    onClick={() => {
                      setSearchQuery(suggestion);
                      setShowSearch(false);
                    }}
                  >
                    <Search className="inline w-3 h-3 mr-2 text-muted-foreground" />
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm tracking-wide uppercase text-muted-foreground hover:text-foreground transition-colors focus-ring"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setShowSearch(!showSearch)}
              aria-label="Toggle search"
            >
              <Search className="w-5 h-5" />
            </Button>

            {/* Profile Dropdown */}
            <div className="relative hidden md:block">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                aria-label="User profile"
                aria-expanded={showProfileMenu}
              >
                <User className="w-5 h-5" />
              </Button>
              
              {showProfileMenu && (
                <div className="absolute right-0 top-full mt-2 w-56 glass-panel rounded-xl shadow-2xl overflow-hidden z-50">
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/50 transition-colors"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <User className="w-4 h-4" />
                    <span className="text-sm">My Profile</span>
                  </Link>
                  <Link
                    href="/orders"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/50 transition-colors"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <Package className="w-4 h-4" />
                    <span className="text-sm">My Orders</span>
                  </Link>
                  <Link
                    href="/wishlist"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/50 transition-colors"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">Wishlist</span>
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/50 transition-colors"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <Settings className="w-4 h-4" />
                    <span className="text-sm">Settings</span>
                  </Link>
                  <div className="border-t border-border"></div>
                  <button
                    className="flex items-center gap-3 px-4 py-3 hover:bg-destructive/10 transition-colors w-full text-left text-destructive"
                    onClick={() => {
                      setShowProfileMenu(false);
                      // Add logout logic
                    }}
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm">Logout</span>
                  </button>
                </div>
              )}
            </div>

            <ThemeToggle />

            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative focus-ring">
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center font-semibold animate-in zoom-in">
                    {cartCount}
                  </span>
                )}
                <span className="sr-only">Cart ({cartCount} items)</span>
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden focus-ring">
                  <Menu className="w-5 h-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-96 p-0">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between p-6 border-b border-border">
                    <span className="font-serif text-xl">Menu</span>
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon">
                        <X className="w-5 h-5" />
                        <span className="sr-only">Close menu</span>
                      </Button>
                    </SheetClose>
                  </div>
                  <nav className="flex-1 p-6">
                    <ul className="space-y-4">
                      {NAV_LINKS.map((link) => (
                        <li key={link.href}>
                          <SheetClose asChild>
                            <Link
                              href={link.href}
                              className="block py-2 text-lg tracking-wide text-foreground hover:text-accent transition-colors min-h-12 flex items-center"
                            >
                              {link.label}
                            </Link>
                          </SheetClose>
                        </li>
                      ))}
                    </ul>
                  </nav>
                  <div className="p-6 border-t border-border space-y-3">
                    <Link href="/profile" className="block">
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <User className="w-4 h-4 mr-2" />
                        My Account
                      </Button>
                    </Link>
                    <Link href="/orders" className="block">
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Package className="w-4 h-4 mr-2" />
                        Orders
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
        {/* Mobile Search Bar */}
        {showSearch && (
          <div className="lg:hidden py-3 border-t border-border/50 animate-in slide-in-from-top">
            <Input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
              autoFocus
              aria-label="Search products"
            />
          </div>
        )}
      </nav>
    </header>
  );
}

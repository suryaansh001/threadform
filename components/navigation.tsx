"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
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

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { cartCount } = useCart();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="font-serif text-xl md:text-2xl tracking-tight text-foreground"
          >
            THREADFORM
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm tracking-wide uppercase text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="w-5 h-5" />
              <span className="sr-only">Search</span>
            </Button>

            <Button variant="ghost" size="icon" className="hidden md:flex">
              <User className="w-5 h-5" />
              <span className="sr-only">Account</span>
            </Button>

            <ThemeToggle />

            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
                <span className="sr-only">Cart ({cartCount} items)</span>
              </Button>
            </Link>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
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
                              className="block py-2 text-lg tracking-wide text-foreground hover:text-accent transition-colors"
                            >
                              {link.label}
                            </Link>
                          </SheetClose>
                        </li>
                      ))}
                    </ul>
                  </nav>
                  <div className="p-6 border-t border-border">
                    <div className="flex gap-4">
                      <Button variant="outline" className="flex-1 bg-transparent">
                        <Search className="w-4 h-4 mr-2" />
                        Search
                      </Button>
                      <Button variant="outline" className="flex-1 bg-transparent">
                        <User className="w-4 h-4 mr-2" />
                        Account
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}

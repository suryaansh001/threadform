"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Instagram, Twitter, Facebook, Youtube, ArrowRight } from "lucide-react";

const FOOTER_LINKS = {
  Shop: [
    { label: "All Products", href: "#shop" },
    { label: "Men", href: "#men" },
    { label: "Women", href: "#women" },
    { label: "New Arrivals", href: "#new-arrivals" },
    { label: "Sale", href: "#sale" },
  ],
  Support: [
    { label: "Size Guide", href: "#size-guide" },
    { label: "Shipping Info", href: "#shipping" },
    { label: "Returns", href: "#returns" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ],
  Company: [
    { label: "About Us", href: "#about" },
    { label: "Careers", href: "#careers" },
    { label: "Press", href: "#press" },
    { label: "Sustainability", href: "#sustainability" },
  ],
};

const SOCIAL_LINKS = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Youtube, href: "#", label: "Youtube" },
];

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-2">
            <Link href="/" className="font-serif text-2xl tracking-tight">
              THREADFORM
            </Link>
            <p className="mt-4 text-primary-foreground/70 leading-relaxed max-w-sm">
              Premium graphic t-shirts designed, printed, and delivered to your 
              doorstep. Join our community of everyday rebels.
            </p>

            {/* Newsletter */}
            <div className="mt-8">
              <p className="text-sm font-medium mb-3">
                Subscribe for 10% off your first order
              </p>
              <form className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
                />
                <Button
                  type="submit"
                  variant="secondary"
                  size="icon"
                  className="shrink-0"
                >
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Social Links */}
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((social) => {
              const Icon = social.icon;
              return (
                <Link
                  key={social.label}
                  href={social.href}
                  className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
                  aria-label={social.label}
                >
                  <Icon className="w-4 h-4" />
                </Link>
              );
            })}
          </div>

          {/* Copyright & Legal */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-primary-foreground/60">
            <span>© 2026 THREADFORM. All rights reserved.</span>
            <span className="hidden sm:inline">|</span>
            <Link href="#privacy" className="hover:text-primary-foreground">
              Privacy Policy
            </Link>
            <Link href="#terms" className="hover:text-primary-foreground">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

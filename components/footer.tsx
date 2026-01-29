"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  ArrowRight,
  CheckCircle,
  Mail,
} from "lucide-react";

const FOOTER_LINKS = {
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
    { label: "Sustainability", href: "/sustainability" },
  ],
  Help: [
    { label: "Customer Support", href: "/support" },
    { label: "Shipping & Delivery", href: "/shipping" },
    { label: "Returns & Exchanges", href: "/returns" },
    { label: "Size Guide", href: "/size-guide" },
    { label: "Track Order", href: "/track" },
  ],
  Discover: [
    { label: "Blog", href: "/blog" },
    { label: "Lookbook", href: "/lookbook" },
    { label: "Design Gallery", href: "/gallery" },
    { label: "Community", href: "/community" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Accessibility", href: "/accessibility" },
  ],
};

const SOCIAL_LINKS = [
  { icon: Instagram, href: "https://instagram.com", label: "Instagram", color: "#E4405F" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter", color: "#1DA1F2" },
  { icon: Facebook, href: "https://facebook.com", label: "Facebook", color: "#4267B2" },
  { icon: Youtube, href: "https://youtube.com", label: "YouTube", color: "#FF0000" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    // Simulate subscription
    setSubscribed(true);
    setTimeout(() => {
      setEmail("");
      setSubscribed(false);
    }, 3000);
  };

  return (
    <footer className="bg-primary text-primary-foreground relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-foreground rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-foreground rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-20 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <Link
                href="/"
                className="font-serif text-3xl tracking-tight hover:opacity-80 transition-opacity focus-ring"
              >
                THREADFORM
              </Link>
              <p className="mt-4 text-primary-foreground/80 leading-relaxed max-w-sm text-sm">
                Premium graphic t-shirts designed, printed, and delivered with care.
                Join 12,500+ satisfied customers worldwide.
              </p>
            </div>

            {/* Newsletter */}
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-semibold uppercase tracking-wider">
                  Newsletter
                </h3>
                <p className="text-sm text-primary-foreground/70">
                  Get 10% off your first order + exclusive drops
                </p>
              </div>

              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground/50" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={subscribed}
                    className={`pl-10 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-primary-foreground/50 ${
                      error ? "border-destructive" : ""
                    }`}
                    aria-label="Email address for newsletter"
                  />
                  {subscribed && (
                    <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-success animate-in zoom-in" />
                  )}
                </div>

                {error && <p className="text-xs text-destructive">{error}</p>}

                <Button
                  type="submit"
                  variant="secondary"
                  className="w-full group"
                  disabled={subscribed}
                >
                  {subscribed ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Subscribed!
                    </>
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>

              <p className="text-xs text-primary-foreground/60">
                By subscribing, you agree to our Privacy Policy and consent to receive
                updates.
              </p>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h3 className="font-semibold text-sm uppercase tracking-wider">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors inline-block focus-ring"
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
        <div className="mt-16 pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social Links with Glow Effect */}
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-3 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-all duration-300 hover-lift focus-ring"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5 relative z-10" />
                    {/* Glow Effect */}
                    <div
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"
                      style={{ backgroundColor: social.color }}
                    />
                  </Link>
                );
              })}
            </div>

            {/* Copyright & Legal */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-primary-foreground/60">
              <span>© 2026 THREADFORM. All rights reserved.</span>
              <span className="hidden sm:inline">•</span>
              <Link
                href="/privacy"
                className="hover:text-primary-foreground transition-colors focus-ring"
              >
                Privacy
              </Link>
              <span className="hidden sm:inline">•</span>
              <Link
                href="/terms"
                className="hover:text-primary-foreground transition-colors focus-ring"
              >
                Terms
              </Link>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-8 text-xs text-primary-foreground/50">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>30-Day Returns</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Free Shipping $49+</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Secure Checkout</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Eco-Friendly Packaging</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

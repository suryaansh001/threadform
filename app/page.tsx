"use client";

import { Navigation } from "@/components/navigation";
import { HeroCarousel } from "@/components/hero-carousel";
import { Categories } from "@/components/categories";
import { ProductGrid } from "@/components/product-grid";
import { MediaSections } from "@/components/media-sections";
import { CustomBuilder } from "@/components/custom-builder";
import { HowItWorks } from "@/components/how-it-works";
import { Testimonials } from "@/components/testimonials";
import { AboutBrand } from "@/components/about-brand";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative selection:bg-black selection:text-white">
      <Navigation />

      <main>
        <HeroCarousel />

        <Categories />

        <ProductGrid
          title="Shop Our Collection"
          subtitle="Original designs, premium quality, delivered to your door"
        />

        <MediaSections />

        <HowItWorks />

        <CustomBuilder />

        <Testimonials />

        <AboutBrand />
      </main>

      <Footer />
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { LoadingScreen } from "@/components/loading-screen";
import { ScrollHero } from "@/components/scroll-hero";
import { Navigation } from "@/components/navigation";
import { MainHero } from "@/components/main-hero";
import { Categories } from "@/components/categories";
import { ProductGrid } from "@/components/product-grid";
import { CustomBuilder } from "@/components/custom-builder";
import { HowItWorks } from "@/components/how-it-works";
import { Testimonials } from "@/components/testimonials";
import { AboutBrand } from "@/components/about-brand";
import { Footer } from "@/components/footer";
import { Experience, AppMode } from "@/components/Experience";

export default function Home() {
  const [appState, setAppState] = useState<AppMode>("loading");
  const [scrollStage, setScrollStage] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cartCount] = useState(0);

  // Check if user has seen the intro before (optional: disabled for dev/demo)
  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem("threadform-intro-seen");
    if (hasSeenIntro) {
      setAppState("main");
    }
  }, []);

  const handleLoadComplete = () => {
    setAppState("scroll-hero");
  };

  const handleScrollUpdate = (stage: number, progress: number) => {
    setScrollStage(stage);
    setScrollProgress(progress);
  };

  const handleScrollComplete = () => {
    setAppState("main");
    sessionStorage.setItem("threadform-intro-seen", "true");
  };

  return (
    <div className="min-h-screen bg-background relative selection:bg-black selection:text-white">
      {/* Shared 3D Experience (Background) */}
      <Experience
        appMode={appState}
        scrollStage={scrollStage}
        scrollProgress={scrollProgress}
      />

      {/* UI Layers */}

      {/* Loading Screen UI Overlay */}
      {appState === "loading" && (
        <LoadingScreen onLoadComplete={handleLoadComplete} />
      )}

      {/* Scroll Hero UI Overlay */}
      {appState === "scroll-hero" && (
        <ScrollHero
          onScrollUpdate={handleScrollUpdate}
          onScrollComplete={handleScrollComplete}
        />
      )}

      {/* Main Website Content */}
      <div
        className={`transition-opacity duration-1000 ${appState === "main" ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none fixed inset-0 overflow-hidden"}`}
      >
        <Navigation />

        <main>
          {/* MainHero - visual placeholder wrapper since 3D is in background */}
          <MainHero />

          <Categories />

          <ProductGrid
            title="Shop Our Collection"
            subtitle="Original designs, premium quality, delivered to your door"
          />

          <HowItWorks />

          <CustomBuilder />

          <Testimonials />

          <AboutBrand />
        </main>

        <Footer />
      </div>
    </div>
  );
}

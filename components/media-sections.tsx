"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

interface MediaSection {
  id: string;
  type: "image" | "video";
  src: string;
  title: string;
  description: string;
  cta?: string;
  ctaLink?: string;
  position?: "left" | "right";
  autoplay?: boolean;
  loop?: boolean;
}

const MEDIA_SECTIONS: MediaSection[] = [
  {
    id: "summer-collection",
    type: "video",
    src: "/videos/summer-promo.mp4", // Placeholder - add your video
    title: "Summer Collection 2026",
    description: "Lightweight fabrics, bold colors, endless possibilities. Discover our latest seasonal drops.",
    cta: "Shop Summer Collection",
    ctaLink: "/summer",
    position: "left",
    autoplay: true,
    loop: true,
  },
  {
    id: "custom-builder",
    type: "image",
    src: "/images/custom-builder-preview.jpg", // Placeholder
    title: "Design Your Own",
    description: "Use our intuitive builder to create custom graphics. Upload images, add text, choose colors.",
    cta: "Start Creating",
    ctaLink: "/builder",
    position: "right",
  },
  {
    id: "behind-scenes",
    type: "video",
    src: "/videos/printing-process.mp4", // Placeholder
    title: "Premium DTG Printing",
    description: "See how we transform your designs into high-quality prints using state-of-the-art technology.",
    cta: "Learn Our Process",
    ctaLink: "/process",
    position: "left",
    autoplay: true,
    loop: true,
  },
  {
    id: "community",
    type: "image",
    src: "/images/community-grid.jpg", // Placeholder
    title: "Join Our Community",
    description: "12,500+ creators sharing their designs. Get inspired, share your work, earn rewards.",
    cta: "Explore Gallery",
    ctaLink: "/gallery",
    position: "right",
  },
];

function VideoPlayer({ src, autoplay = false, loop = true }: { src: string; autoplay?: boolean; loop?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && autoplay) {
          video.play();
          setIsPlaying(true);
        } else {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [autoplay]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="relative w-full h-full group">
      <video
        ref={videoRef}
        className="w-full h-full object-cover rounded-2xl"
        loop={loop}
        muted={isMuted}
        playsInline
        preload="metadata"
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Video Controls Overlay */}
      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center">
        <div className="flex items-center gap-4">
          <button
            onClick={togglePlay}
            className="clay-button p-4 rounded-full hover-lift"
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6 ml-1" />
            )}
          </button>
          
          <button
            onClick={toggleMute}
            className="clay-button p-4 rounded-full hover-lift"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? (
              <VolumeX className="w-6 h-6" />
            ) : (
              <Volume2 className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Playing Indicator */}
      {isPlaying && (
        <div className="absolute top-4 right-4 glass-panel px-3 py-1.5 rounded-full">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium">Playing</span>
          </div>
        </div>
      )}
    </div>
  );
}

function MediaSectionItem({ section }: { section: MediaSection }) {
  const isLeft = section.position === "left";

  return (
    <div className="py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${isLeft ? "" : "lg:grid-flow-dense"}`}>
          {/* Media */}
          <div className={`${isLeft ? "lg:order-1" : "lg:order-2 lg:col-start-2"} h-[400px] md:h-[600px]`}>
            {section.type === "video" ? (
              <VideoPlayer
                src={section.src}
                autoplay={section.autoplay}
                loop={section.loop}
              />
            ) : (
              <div className="relative w-full h-full clay-card rounded-2xl overflow-hidden group hover-lift transition-all duration-500">
                <img
                  src={section.src}
                  alt={section.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className={`${isLeft ? "lg:order-2" : "lg:order-1"} space-y-6 text-center lg:text-left`}>
            <div className="space-y-4">
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight">
                {section.title}
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
                {section.description}
              </p>
            </div>

            {section.cta && section.ctaLink && (
              <div>
                <Link href={section.ctaLink}>
                  <Button size="lg" className="text-base px-8 py-6 h-14">
                    {section.cta}
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function MediaSections() {
  return (
    <section className="bg-secondary/30">
      {MEDIA_SECTIONS.map((section, index) => (
        <div key={section.id}>
          <MediaSectionItem section={section} />
          {index < MEDIA_SECTIONS.length - 1 && (
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
              <div className="border-t border-border/30" />
            </div>
          )}
        </div>
      ))}
    </section>
  );
}

"use client";

import { useState } from "react";
import { Filter, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const FILTER_OPTIONS = {
  colors: [
    { name: "Black", value: "#000000", count: 45 },
    { name: "White", value: "#FFFFFF", count: 38 },
    { name: "Navy", value: "#001f3f", count: 28 },
    { name: "Gray", value: "#808080", count: 34 },
    { name: "Red", value: "#FF4136", count: 22 },
    { name: "Blue", value: "#0074D9", count: 25 },
  ],
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  styles: [
    { name: "Streetwear", count: 48 },
    { name: "Minimal", count: 52 },
    { name: "Anime", count: 36 },
    { name: "Typography", count: 44 },
    { name: "Abstract", count: 29 },
  ],
  fits: ["Regular", "Oversized", "Slim", "Relaxed"],
};

interface ProductFiltersProps {
  onFilterChange: (filters: any) => void;
}

export function ProductFilters({ onFilterChange }: ProductFiltersProps) {
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedFits, setSelectedFits] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [expandedSections, setExpandedSections] = useState({
    colors: true,
    sizes: true,
    styles: true,
    fits: true,
    price: true,
  });

  const toggleColor = (color: string) => {
    const updated = selectedColors.includes(color)
      ? selectedColors.filter((c) => c !== color)
      : [...selectedColors, color];
    setSelectedColors(updated);
    onFilterChange({ colors: updated });
  };

  const toggleSize = (size: string) => {
    const updated = selectedSizes.includes(size)
      ? selectedSizes.filter((s) => s !== size)
      : [...selectedSizes, size];
    setSelectedSizes(updated);
    onFilterChange({ sizes: updated });
  };

  const toggleStyle = (style: string) => {
    const updated = selectedStyles.includes(style)
      ? selectedStyles.filter((s) => s !== style)
      : [...selectedStyles, style];
    setSelectedStyles(updated);
    onFilterChange({ styles: updated });
  };

  const clearFilters = () => {
    setSelectedColors([]);
    setSelectedSizes([]);
    setSelectedStyles([]);
    setSelectedFits([]);
    setPriceRange([0, 100]);
    onFilterChange({});
  };

  const activeFiltersCount =
    selectedColors.length +
    selectedSizes.length +
    selectedStyles.length +
    selectedFits.length;

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const FiltersContent = () => (
    <div className="space-y-8">
      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-foreground">
              Active Filters ({activeFiltersCount})
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-xs"
            >
              Clear All
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedColors.map((color) => (
              <Badge
                key={color}
                variant="secondary"
                className="pl-2 pr-1 py-1 gap-1"
              >
                <div
                  className="w-3 h-3 rounded-full border border-border"
                  style={{ backgroundColor: color }}
                />
                <button
                  onClick={() => toggleColor(color)}
                  className="hover:text-foreground"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
            {selectedSizes.map((size) => (
              <Badge key={size} variant="secondary" className="pr-1 gap-1">
                {size}
                <button
                  onClick={() => toggleSize(size)}
                  className="hover:text-foreground"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Colors */}
      <div className="space-y-4">
        <button
          onClick={() => toggleSection("colors")}
          className="flex items-center justify-between w-full text-left focus-ring"
        >
          <h3 className="text-sm font-semibold text-foreground">Colors</h3>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              expandedSections.colors ? "rotate-180" : ""
            }`}
          />
        </button>
        {expandedSections.colors && (
          <div className="grid grid-cols-6 gap-3">
            {FILTER_OPTIONS.colors.map((color) => (
              <button
                key={color.name}
                onClick={() => toggleColor(color.value)}
                className={`w-10 h-10 rounded-full border-2 transition-all hover-lift ${
                  selectedColors.includes(color.value)
                    ? "border-foreground scale-110 shadow-lg"
                    : "border-border hover:border-foreground/50"
                }`}
                style={{ backgroundColor: color.value }}
                title={`${color.name} (${color.count})`}
                aria-label={`Filter by ${color.name}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Sizes */}
      <div className="space-y-4">
        <button
          onClick={() => toggleSection("sizes")}
          className="flex items-center justify-between w-full text-left focus-ring"
        >
          <h3 className="text-sm font-semibold text-foreground">Sizes</h3>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              expandedSections.sizes ? "rotate-180" : ""
            }`}
          />
        </button>
        {expandedSections.sizes && (
          <div className="grid grid-cols-3 gap-2">
            {FILTER_OPTIONS.sizes.map((size) => (
              <button
                key={size}
                onClick={() => toggleSize(size)}
                className={`clay-button px-4 py-2 rounded-lg text-sm font-medium transition-all hover-lift ${
                  selectedSizes.includes(size)
                    ? "bg-foreground text-background border-foreground"
                    : "hover:border-foreground/50"
                }`}
                aria-label={`Filter by size ${size}`}
              >
                {size}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Styles */}
      <div className="space-y-4">
        <button
          onClick={() => toggleSection("styles")}
          className="flex items-center justify-between w-full text-left focus-ring"
        >
          <h3 className="text-sm font-semibold text-foreground">Style</h3>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              expandedSections.styles ? "rotate-180" : ""
            }`}
          />
        </button>
        {expandedSections.styles && (
          <div className="space-y-2">
            {FILTER_OPTIONS.styles.map((style) => (
              <label
                key={style.name}
                className="flex items-center justify-between py-2 cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selectedStyles.includes(style.name)}
                    onChange={() => toggleStyle(style.name)}
                    className="w-4 h-4 rounded border-border focus:ring-ring focus:ring-2"
                  />
                  <span className="text-sm text-foreground group-hover:text-accent transition-colors">
                    {style.name}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {style.count}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="space-y-4">
        <button
          onClick={() => toggleSection("price")}
          className="flex items-center justify-between w-full text-left focus-ring"
        >
          <h3 className="text-sm font-semibold text-foreground">Price</h3>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              expandedSections.price ? "rotate-180" : ""
            }`}
          />
        </button>
        {expandedSections.price && (
          <div className="space-y-4">
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              min={0}
              max={100}
              step={5}
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">${priceRange[0]}</span>
              <span className="text-muted-foreground">${priceRange[1]}</span>
            </div>
          </div>
        )}
      </div>

      {/* Fit */}
      <div className="space-y-4">
        <button
          onClick={() => toggleSection("fits")}
          className="flex items-center justify-between w-full text-left focus-ring"
        >
          <h3 className="text-sm font-semibold text-foreground">Fit</h3>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              expandedSections.fits ? "rotate-180" : ""
            }`}
          />
        </button>
        {expandedSections.fits && (
          <div className="grid grid-cols-2 gap-2">
            {FILTER_OPTIONS.fits.map((fit) => (
              <button
                key={fit}
                onClick={() => {
                  const updated = selectedFits.includes(fit)
                    ? selectedFits.filter((f) => f !== fit)
                    : [...selectedFits, fit];
                  setSelectedFits(updated);
                }}
                className={`clay-button px-3 py-2 rounded-lg text-sm transition-all hover-lift ${
                  selectedFits.includes(fit)
                    ? "bg-foreground text-background"
                    : ""
                }`}
              >
                {fit}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-24 clay-card p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filters
            </h2>
            {activeFiltersCount > 0 && (
              <Badge variant="secondary">{activeFiltersCount}</Badge>
            )}
          </div>
          <FiltersContent />
        </div>
      </div>

      {/* Mobile Filter Sheet */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="lg:hidden w-full">
            <Filter className="w-4 h-4 mr-2" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-full sm:w-96">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <FiltersContent />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

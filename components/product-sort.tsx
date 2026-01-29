"use client";

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export type SortOption = {
  label: string;
  value: string;
  description?: string;
};

const SORT_OPTIONS: SortOption[] = [
  { label: "Featured", value: "featured", description: "Our top picks" },
  { label: "Best Selling", value: "best-selling", description: "Most popular" },
  { label: "Newest", value: "newest", description: "Latest arrivals" },
  { label: "Price: Low to High", value: "price-asc", description: "Lowest first" },
  { label: "Price: High to Low", value: "price-desc", description: "Highest first" },
  { label: "Name: A-Z", value: "name-asc", description: "Alphabetical" },
  { label: "Name: Z-A", value: "name-desc", description: "Reverse alphabetical" },
  { label: "Rating", value: "rating", description: "Highest rated" },
];

interface ProductSortProps {
  onSortChange: (sortValue: string) => void;
  currentSort?: string;
}

export function ProductSort({ onSortChange, currentSort = "featured" }: ProductSortProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState(currentSort);

  const handleSortChange = (value: string) => {
    setSelectedSort(value);
    onSortChange(value);
    setIsOpen(false);
  };

  const currentOption = SORT_OPTIONS.find((opt) => opt.value === selectedSort) || SORT_OPTIONS[0];

  return (
    <>
      {/* Desktop Dropdown */}
      <div className="hidden md:block relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="clay-button px-4 py-2.5 rounded-xl flex items-center gap-3 min-w-[200px] justify-between hover-lift transition-all focus-ring"
          aria-label="Sort products"
          aria-expanded={isOpen}
        >
          <div className="flex flex-col items-start">
            <span className="text-xs text-muted-foreground">Sort by</span>
            <span className="text-sm font-medium">{currentOption.label}</span>
          </div>
          <ChevronsUpDown className="w-4 h-4 text-muted-foreground" />
        </button>

        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown Menu */}
            <div className="absolute right-0 top-full mt-2 w-72 glass-panel rounded-xl shadow-2xl z-50 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSortChange(option.value)}
                  className={`w-full px-4 py-3 flex items-center justify-between hover:bg-secondary/50 transition-colors text-left ${
                    selectedSort === option.value ? "bg-secondary/30" : ""
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">
                      {option.label}
                    </span>
                    {option.description && (
                      <span className="text-xs text-muted-foreground">
                        {option.description}
                      </span>
                    )}
                  </div>
                  {selectedSort === option.value && (
                    <Check className="w-4 h-4 text-accent" />
                  )}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Mobile Sheet */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="md:hidden w-full">
            <ChevronsUpDown className="w-4 h-4 mr-2" />
            Sort: {currentOption.label}
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[400px]">
          <SheetHeader>
            <SheetTitle>Sort Products</SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-2">
            {SORT_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSortChange(option.value)}
                className={`w-full px-4 py-3 rounded-xl flex items-center justify-between transition-colors ${
                  selectedSort === option.value
                    ? "bg-foreground text-background"
                    : "clay-button hover:bg-secondary/50"
                }`}
              >
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium">{option.label}</span>
                  {option.description && (
                    <span className="text-xs opacity-70">{option.description}</span>
                  )}
                </div>
                {selectedSort === option.value && (
                  <Check className="w-4 h-4" />
                )}
              </button>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export interface Product {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    colors: string[];
    category: string;
    isNew?: boolean;
    isSale?: boolean;
    image: string;
    hoverImage?: string;
    description?: string;
    images?: string[]; // Multiple product images
}

export const PRODUCTS: Product[] = [
    {
        id: "1",
        name: "Urban Explorer Tee",
        price: 39.99,
        colors: ["#1a1a1a", "#ffffff", "#2d3436"],
        category: "Men",
        isNew: true,
        image: "/tshirt.png",
    },
    {
        id: "2",
        name: "Sunset Dreams Tee",
        price: 34.99,
        originalPrice: 44.99,
        colors: ["#8b2635", "#d4c4b0", "#1a1a1a"],
        category: "Women",
        isSale: true,
        image: "/tshirt.png",
    },
    {
        id: "3",
        name: "Ocean Breeze Tee",
        price: 42.99,
        colors: ["#2d3436", "#ffffff", "#d4c4b0"],
        category: "Unisex",
        isNew: true,
        image: "/tshirt.png",
    },
    {
        id: "4",
        name: "Desert Storm Tee",
        price: 36.99,
        colors: ["#d4c4b0", "#1a1a1a", "#8b2635"],
        category: "Men",
        image: "/tshirt.png",
    },
    {
        id: "5",
        name: "Midnight Rebel Tee",
        price: 38.99,
        colors: ["#1a1a1a", "#2d3436"],
        category: "Women",
        isNew: true,
        image: "/tshirt.png",
    },
    {
        id: "6",
        name: "Vintage Vibes Tee",
        price: 29.99,
        originalPrice: 39.99,
        colors: ["#d4c4b0", "#ffffff", "#1a1a1a"],
        category: "Unisex",
        isSale: true,
        image: "/tshirt.png",
    },
    {
        id: "7",
        name: "Neon Nights Tee",
        price: 44.99,
        colors: ["#1a1a1a", "#8b2635", "#2d3436"],
        category: "Men",
        image: "/tshirt.png",
    },
    {
        id: "8",
        name: "Pastel Dreams Tee",
        price: 37.99,
        colors: ["#f5f4f0", "#d4c4b0", "#ffffff"],
        category: "Women",
        isNew: true,
        image: "/tshirt.png",
    },
];

export const ALL_COLORS = [
    { name: "White", value: "#ffffff" },
    { name: "Black", value: "#1a1a1a" },
    { name: "Beige", value: "#d4c4b0" },
    { name: "Burgundy", value: "#8b2635" },
    { name: "Charcoal", value: "#2d3436" },
    { name: "Navy", value: "#1e3a5f" },
    { name: "Forest", value: "#2d4a3e" },
    { name: "Sand", value: "#c2b280" },
    { name: "Dusty Rose", value: "#c4a4a4" },
    { name: "Steel", value: "#71797E" },
];

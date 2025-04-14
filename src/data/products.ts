
import { Product } from '@/types';

export const products: Product[] = [
  {
    id: "1",
    name: "Minimalist Ceramic Vase",
    brand: "Pure Home",
    category: "Home Decor",
    price: 45,
    images: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=1887&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599751449128-eb7249c3d6b1?q=80&w=1887&auto=format&fit=crop",
    ],
    description: "This elegantly crafted ceramic vase features clean lines and a subtle matte finish. Perfect for displaying dried botanicals or standing alone as a sculptural piece.",
    details: [
      "Handcrafted ceramic",
      "Matte finish",
      "Dimensions: 12\" H x 6\" W",
      "Water-resistant interior",
      "Wipe clean with damp cloth"
    ],
    isFeatured: true,
    isBestseller: true
  },
  {
    id: "2",
    name: "Organic Cotton Throw Blanket",
    brand: "Cozy Living",
    category: "Textiles",
    price: 68,
    images: [
      "https://images.unsplash.com/photo-1584346133934-2a9290ace4a2?q=80&w=1887&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f36?q=80&w=1887&auto=format&fit=crop",
    ],
    description: "Wrap yourself in comfort with our organic cotton throw blanket. Featuring a subtle herringbone pattern and fringed edges for a touch of texture.",
    details: [
      "100% GOTS certified organic cotton",
      "Dimensions: 50\" x 60\"",
      "Herringbone weave pattern",
      "Fringed edges",
      "Machine washable cold, tumble dry low"
    ],
    isFeatured: true,
    isNewArrival: true
  },
  {
    id: "3",
    name: "Hand-poured Soy Candle",
    brand: "Luminous",
    category: "Home Fragrance",
    price: 32,
    images: [
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=1887&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1632852588902-c14168c09711?q=80&w=1887&auto=format&fit=crop",
    ],
    description: "Our signature hand-poured soy candle blends notes of sandalwood, vetiver, and warm vanilla for a grounding, comforting atmosphere.",
    details: [
      "100% soy wax",
      "Cotton wick",
      "50-hour burn time",
      "Reusable glass container",
      "Phthalate-free fragrance oils"
    ],
    isNewArrival: true
  },
  {
    id: "4",
    name: "Artisanal Ceramic Mug Set",
    brand: "Clay Studio",
    category: "Tableware",
    price: 58,
    images: [
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=1887&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=1887&auto=format&fit=crop",
    ],
    description: "Set of four uniquely handcrafted ceramic mugs in complementary neutral tones. Each piece features subtle variations that highlight their artisanal quality.",
    details: [
      "Set of 4 mugs",
      "Handmade stoneware",
      "12 oz capacity each",
      "Microwave and dishwasher safe",
      "Lead-free glazes"
    ],
    isBestseller: true
  },
  {
    id: "5",
    name: "Brass Table Lamp",
    brand: "Lumière",
    category: "Lighting",
    price: 139,
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1887&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=1887&auto=format&fit=crop",
    ],
    description: "This sleek brass table lamp combines modern design with vintage inspiration. Features an adjustable arm and warm-toned fabric shade.",
    details: [
      "Solid brass construction",
      "Linen fabric shade",
      "Adjustable arm",
      "In-line switch",
      "LED compatible (bulb not included)"
    ],
    isBestseller: true,
    isFeatured: true
  },
  {
    id: "6",
    name: "Natural Linen Napkin Set",
    brand: "Table Essentials",
    category: "Tableware",
    price: 42,
    images: [
      "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=1887&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1532443603613-61ef824b8b83?q=80&w=1887&auto=format&fit=crop",
    ],
    description: "Set of four stone-washed linen napkins with mitered corners. These versatile napkins add natural texture to any table setting.",
    details: [
      "Set of 4 napkins",
      "100% European flax linen",
      "20\" x 20\" dimensions",
      "Stone-washed for softness",
      "Machine washable, tumble dry low"
    ],
    isNewArrival: true
  },
  {
    id: "7",
    name: "Modern Wall Clock",
    brand: "Timepiece",
    category: "Home Decor",
    price: 89,
    images: [
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?q=80&w=1887&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507474380656-a09bfccb7a07?q=80&w=1887&auto=format&fit=crop",
    ],
    description: "Minimalist wall clock with a solid oak frame and clean face design. Silent quartz movement ensures precise timekeeping without ticking noise.",
    details: [
      "12\" diameter",
      "Solid oak frame",
      "Silent quartz movement",
      "Requires 1 AA battery (included)",
      "Wall mount hardware included"
    ],
    isFeatured: true
  },
  {
    id: "8",
    name: "Handwoven Storage Basket",
    brand: "Organized Living",
    category: "Storage",
    price: 64,
    images: [
      "https://images.unsplash.com/photo-1595751866979-de6e9d606220?q=80&w=1887&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f36?q=80&w=1887&auto=format&fit=crop",
    ],
    description: "This handwoven basket combines practicality with artisanal beauty. Perfect for storing blankets, toys, or as a stylish planter cover.",
    details: [
      "Handwoven seagrass",
      "Cotton rope handles",
      "16\" diameter x 14\" height",
      "Sturdy construction",
      "Wipe clean with damp cloth"
    ],
    isBestseller: true
  }
];

export const categories = [
  { id: "1", name: "Home Decor", slug: "home-decor" },
  { id: "2", name: "Textiles", slug: "textiles" },
  { id: "3", name: "Home Fragrance", slug: "home-fragrance" },
  { id: "4", name: "Tableware", slug: "tableware" },
  { id: "5", name: "Lighting", slug: "lighting" },
  { id: "6", name: "Storage", slug: "storage" }
];

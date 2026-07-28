export interface ProductColor {
  name: string;
  hex: string;
  bgClass: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  originalPrice: number;
  discountedPrice: number;
  rating: number;
  reviewCount: number;
  primaryImage: string;
  hoverImage: string;
  galleryImages?: string[];
  tag: string;
  tagColor?: string;
  sizes: string[];
  outOfStockSizes?: string[];
  colors?: ProductColor[];
  inStock: boolean;
  isNewArrival?: boolean;
  isBestseller?: boolean;
  description?: string;
  fabricCare?: string[];
  shippingReturns?: string;
}

export interface Category {
  id: string;
  title: string;
  itemCount: string;
  image: string;
  link: string;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  title: string;
  comment: string;
  verifiedBuyer: boolean;
  purchasedItem: string;
  date: string;
}

export const CATEGORIES_DATA: Category[] = [
  {
    id: "cat-1",
    title: "Dresses & Jumpsuits",
    itemCount: "140+ Items",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
    link: "/shop?category=Dresses",
  },
  {
    id: "cat-2",
    title: "Tops & Workwear Shirts",
    itemCount: "95+ Items",
    image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&q=80",
    link: "/shop?category=Tops%20%26%20Shirts",
  },
  {
    id: "cat-3",
    title: "Trousers & Pants",
    itemCount: "70+ Items",
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&q=80",
    link: "/shop?category=Trousers%20%26%20Pants",
  },
  {
    id: "cat-4",
    title: "Accessories & Bags",
    itemCount: "50+ Items",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
    link: "/shop?category=Accessories",
  },
];

export const PRODUCTS_DATA: Product[] = [
  {
    id: "prod-1",
    name: "Victoria Emerald Linen Wrap Dress",
    category: "Dresses",
    originalPrice: 11990,
    discountedPrice: 8990,
    rating: 4.9,
    reviewCount: 38,
    primaryImage: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
    hoverImage: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=1200&q=85",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=1200&q=85",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=85",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1200&q=85",
    ],
    tag: "25% OFF",
    tagColor: "bg-red-100 text-red-800 border-red-200",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    outOfStockSizes: ["XS", "XXL"],
    colors: [
      { name: "Emerald Green", hex: "#046307", bgClass: "bg-emerald-800" },
      { name: "Midnight Black", hex: "#000000", bgClass: "bg-black" },
      { name: "Champagne Gold", hex: "#D4AF37", bgClass: "bg-amber-600" },
    ],
    inStock: true,
    isNewArrival: true,
    isBestseller: true,
    description: "Crafted from premium 100% pure Italian-grade flax linen, the Victoria Wrap Dress delivers timeless sophistication tailored for Sri Lanka's tropical climate. Featuring a flattering cinch waist tie, elegant flared sleeves, and breathable weave, this versatile piece flows seamlessly from afternoon High Teas to evening garden soirees.",
    fabricCare: [
      "100% Organic Pure Flax Linen",
      "Hand wash or mild machine wash cold with similar colors",
      "Line dry in shade to preserve vibrant emerald tone",
      "Warm iron inside-out while damp for smooth finish",
    ],
    shippingReturns: "Islandwide Cash on Delivery (COD) available. Standard delivery within 24-48 hours in Colombo & Suburbs, 2-3 working days islandwide. 7-Day hassle-free exchanges with door-to-door courier swap.",
  },
  {
    id: "prod-2",
    name: "Aurelia Gold-Button Tailored Blazer",
    category: "Tops & Shirts",
    originalPrice: 17990,
    discountedPrice: 14990,
    rating: 5.0,
    reviewCount: 42,
    primaryImage: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
    hoverImage: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1200&q=85",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1200&q=85",
      "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=1200&q=85",
    ],
    tag: "NEW ARRIVAL",
    tagColor: "bg-amber-100 text-amber-900 border-amber-300",
    sizes: ["S", "M", "L", "XL"],
    outOfStockSizes: ["XL"],
    colors: [
      { name: "Ivory White", hex: "#FFFFFF", bgClass: "bg-stone-100 border border-gray-300" },
      { name: "Navy Blue", hex: "#0A192F", bgClass: "bg-blue-950" },
    ],
    inStock: true,
    isNewArrival: true,
    description: "Command attention in the boardroom with the Aurelia Tailored Blazer. Detailed with polished crest gold-embossed buttons, structured shoulder pads, and breathable lightweight lining designed for Colombo office humidity.",
    fabricCare: [
      "Poly-Viscose Blend with Breathable Cotton Lining",
      "Dry clean recommended for structural longevity",
      "Do not bleach or tumble dry",
    ],
    shippingReturns: "Islandwide Cash on Delivery (COD) available. Standard delivery within 24-48 hours in Colombo & Suburbs, 2-3 working days islandwide.",
  },
  {
    id: "prod-3",
    name: "Monaco Italian Linen Shirt - Off White",
    category: "Men's Apparel",
    originalPrice: 9490,
    discountedPrice: 7490,
    rating: 4.8,
    reviewCount: 29,
    primaryImage: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80",
    hoverImage: "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=1200&q=85",
      "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=1200&q=85",
    ],
    tag: "POPULAR",
    tagColor: "bg-stone-200 text-stone-900 border-stone-300",
    sizes: ["S", "M", "L", "XL", "XXL"],
    outOfStockSizes: [],
    colors: [
      { name: "Off White", hex: "#FAFAFA", bgClass: "bg-stone-100 border border-gray-300" },
      { name: "Sand Beige", hex: "#C2B280", bgClass: "bg-stone-400" },
      { name: "Sky Blue", hex: "#87CEEB", bgClass: "bg-sky-400" },
    ],
    inStock: true,
    isBestseller: true,
    description: "The quintessential tropical staple. Light, crisp, and effortlessly suave, the Monaco Linen Shirt features a relaxed resort collar, shell buttons, and a moisture-wicking weave.",
    fabricCare: [
      "100% Breathable Linen",
      "Machine wash gentle cold",
      "Warm iron inside-out",
    ],
    shippingReturns: "Islandwide Cash on Delivery available. Express shipping within Colombo in 24h.",
  },
  {
    id: "prod-4",
    name: "Sienna High-Waist Pleated Midi Skirt",
    category: "Trousers & Pants",
    originalPrice: 8990,
    discountedPrice: 6990,
    rating: 4.7,
    reviewCount: 19,
    primaryImage: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&q=80",
    hoverImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=1200&q=85",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&q=85",
    ],
    tag: "22% OFF",
    tagColor: "bg-red-100 text-red-800 border-red-200",
    sizes: ["XS", "S", "M", "L"],
    outOfStockSizes: ["XS"],
    colors: [
      { name: "Terracotta", hex: "#E07A5F", bgClass: "bg-amber-800" },
      { name: "Classic Navy", hex: "#000080", bgClass: "bg-blue-900" },
    ],
    inStock: true,
    description: "Fluid accordion pleats meet high-waisted tailoring. Movement-rich silhouette perfect for evening dining or smart casual office dress codes.",
    fabricCare: [
      "Premium Pleated Chiffon & Satin Blend",
      "Hand wash cold to preserve sharp pleat edges",
      "Steam iron only",
    ],
    shippingReturns: "Islandwide COD available. 7-day hassle-free exchange policy.",
  },
  {
    id: "prod-5",
    name: "Celeste Satin Cowl Neck Evening Midi",
    category: "Dresses",
    originalPrice: 13990,
    discountedPrice: 11490,
    rating: 4.9,
    reviewCount: 51,
    primaryImage: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80",
    hoverImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=1200&q=85",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=85",
    ],
    tag: "HOT SELLER",
    tagColor: "bg-amber-100 text-amber-900 border-amber-300",
    sizes: ["XS", "S", "M", "L", "XL"],
    outOfStockSizes: ["XL"],
    colors: [
      { name: "Emerald Green", hex: "#046307", bgClass: "bg-emerald-800" },
      { name: "Ruby Red", hex: "#9B111E", bgClass: "bg-red-800" },
    ],
    inStock: true,
    isBestseller: true,
    description: "Exude red-carpet glamour in the Celeste Satin Evening Dress. Delicate cowl neckline with adjustable cross-back spaghetti straps for custom security and silhouette.",
    fabricCare: [
      "100% Mulberry Silk-Touch Satin",
      "Hand wash gently with silk detergent",
    ],
    shippingReturns: "Islandwide COD available. Fast 24-hour Colombo delivery.",
  },
  {
    id: "prod-6",
    name: "Milan Tailored Wide-Leg Trousers",
    category: "Trousers & Pants",
    originalPrice: 10990,
    discountedPrice: 8490,
    rating: 4.8,
    reviewCount: 33,
    primaryImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
    hoverImage: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&q=85",
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=1200&q=85",
    ],
    tag: "WORKWEAR",
    tagColor: "bg-blue-100 text-blue-900 border-blue-200",
    sizes: ["S", "M", "L", "XL", "XXL"],
    outOfStockSizes: ["XXL"],
    colors: [
      { name: "Charcoal Black", hex: "#1C1C1C", bgClass: "bg-stone-900" },
      { name: "Nude Camel", hex: "#C19A6B", bgClass: "bg-amber-700" },
    ],
    inStock: true,
    description: "Sleek high-rise wide-leg pants crafted with front pleats and side slant pockets. Structural precision tailored for all-day workplace elegance.",
    fabricCare: [
      "Crease-Resistant Crepe Stretch",
      "Machine wash inside out on delicate cycle",
    ],
    shippingReturns: "Islandwide COD available. 7-day door-to-door swap.",
  },
  {
    id: "prod-7",
    name: "Sri Lankan Silk Touch Designer Scarf",
    category: "Accessories",
    originalPrice: 4990,
    discountedPrice: 3490,
    rating: 5.0,
    reviewCount: 16,
    primaryImage: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80",
    hoverImage: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1200&q=85",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1200&q=85",
    ],
    tag: "30% OFF",
    tagColor: "bg-red-100 text-red-800 border-red-200",
    sizes: ["One Size"],
    outOfStockSizes: [],
    colors: [
      { name: "Gold Floral", hex: "#FFD700", bgClass: "bg-amber-400" },
    ],
    inStock: true,
    description: "Vibrant botanical motifs inspired by Ceylon heritage. Perfect accent piece for neck ties, handbag handles, or hair styling.",
    fabricCare: [
      "100% Silk Touch Micro-Polyester",
      "Hand wash cold only",
    ],
    shippingReturns: "Islandwide COD available.",
  },
  {
    id: "prod-8",
    name: "Riviera Linen Short Sleeve Button Up",
    category: "Men's Apparel",
    originalPrice: 7990,
    discountedPrice: 5990,
    rating: 4.6,
    reviewCount: 22,
    primaryImage: "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=800&q=80",
    hoverImage: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=1200&q=85",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=1200&q=85",
    ],
    tag: "NEW SEASON",
    tagColor: "bg-amber-100 text-amber-900 border-amber-300",
    sizes: ["S", "M", "L", "XL"],
    outOfStockSizes: [],
    colors: [
      { name: "Olive Green", hex: "#556B2F", bgClass: "bg-lime-900" },
      { name: "Off White", hex: "#FAFAFA", bgClass: "bg-stone-100 border border-gray-300" },
    ],
    inStock: true,
    isNewArrival: true,
    description: "Relaxed short-sleeve resort button-up featuring Cuban collar detail and lightweight linen blend.",
    fabricCare: [
      "Linen Cotton Blend",
      "Machine wash cold",
    ],
    shippingReturns: "Islandwide COD available.",
  },
];

export const REVIEWS_DATA: Review[] = [
  {
    id: "rev-1",
    author: "Dinuka Perera",
    location: "Colombo 07",
    rating: 5,
    title: "Absolutely Stunning Quality!",
    comment: "The Victoria Linen Dress exceeded my expectations. The tailoring is pristine and Cash on Delivery arrived in Colombo within 24 hours!",
    verifiedBuyer: true,
    purchasedItem: "Victoria Emerald Linen Wrap Dress",
    date: "2 days ago",
  },
  {
    id: "rev-2",
    author: "Nishani Jayasinghe",
    location: "Kandy",
    rating: 5,
    title: "Perfect Workwear Fit",
    comment: "Finding elegant office blazers in Sri Lanka used to be difficult until I found Fashion Galleria. Beautiful fabric and great customer care.",
    verifiedBuyer: true,
    purchasedItem: "Aurelia Gold-Button Blazer",
    date: "1 week ago",
  },
  {
    id: "rev-3",
    author: "Kavinda De Silva",
    location: "Galle",
    rating: 5,
    title: "Exceptional Linen Shirts",
    comment: "The Monaco linen shirt is super breathable for coastal weather. Fits true to size and delivery to Galle was completely smooth.",
    verifiedBuyer: true,
    purchasedItem: "Monaco Italian Linen Shirt",
    date: "2 weeks ago",
  },
  {
    id: "rev-4",
    author: "Amaya Fernando",
    location: "Negombo",
    rating: 5,
    title: "Loved the 7-Day Exchange Service",
    comment: "I needed a size UK 10 instead of UK 8. Customer care arranged a door-to-door courier exchange without any hassle. Highly recommended!",
    verifiedBuyer: true,
    purchasedItem: "Celeste Satin Cowl Neck Midi",
    date: "3 weeks ago",
  },
];

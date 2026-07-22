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
  tag: string;
  tagColor?: string;
  sizes: string[];
  inStock: boolean;
  isNewArrival?: boolean;
  isBestseller?: boolean;
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
    link: "#dresses",
  },
  {
    id: "cat-2",
    title: "Tops & Workwear Shirts",
    itemCount: "95+ Items",
    image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&q=80",
    link: "#tops",
  },
  {
    id: "cat-3",
    title: "Trousers & Pants",
    itemCount: "70+ Items",
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&q=80",
    link: "#trousers",
  },
  {
    id: "cat-4",
    title: "Accessories & Bags",
    itemCount: "50+ Items",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
    link: "#accessories",
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
    primaryImage: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80",
    tag: "25% OFF",
    tagColor: "bg-red-100 text-red-800 border-red-200",
    sizes: ["UK 6", "UK 8", "UK 10", "UK 12", "UK 14"],
    inStock: true,
    isNewArrival: true,
    isBestseller: true,
  },
  {
    id: "prod-2",
    name: "Aurelia Gold-Button Tailored Blazer",
    category: "Tops & Shirts",
    originalPrice: 17990,
    discountedPrice: 14990,
    rating: 5.0,
    reviewCount: 42,
    primaryImage: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80",
    tag: "NEW ARRIVAL",
    tagColor: "bg-amber-100 text-amber-900 border-amber-300",
    sizes: ["UK 8", "UK 10", "UK 12", "UK 14"],
    inStock: true,
    isNewArrival: true,
  },
  {
    id: "prod-3",
    name: "Monaco Italian Linen Shirt - Off White",
    category: "Men's Apparel",
    originalPrice: 9490,
    discountedPrice: 7490,
    rating: 4.8,
    reviewCount: 29,
    primaryImage: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=600&q=80",
    tag: "POPULAR",
    tagColor: "bg-stone-200 text-stone-900 border-stone-300",
    sizes: ["S", "M", "L", "XL", "XXL"],
    inStock: true,
    isBestseller: true,
  },
  {
    id: "prod-4",
    name: "Sienna High-Waist Pleated Midi Skirt",
    category: "Trousers & Pants",
    originalPrice: 8990,
    discountedPrice: 6990,
    rating: 4.7,
    reviewCount: 19,
    primaryImage: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80",
    tag: "22% OFF",
    tagColor: "bg-red-100 text-red-800 border-red-200",
    sizes: ["UK 8", "UK 10", "UK 12"],
    inStock: true,
  },
  {
    id: "prod-5",
    name: "Celeste Satin Cowl Neck Evening Midi",
    category: "Dresses",
    originalPrice: 13990,
    discountedPrice: 11490,
    rating: 4.9,
    reviewCount: 51,
    primaryImage: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80",
    tag: "HOT SELLER",
    tagColor: "bg-amber-100 text-amber-900 border-amber-300",
    sizes: ["UK 6", "UK 8", "UK 10", "UK 12"],
    inStock: true,
    isBestseller: true,
  },
  {
    id: "prod-6",
    name: "Milan Tailored Wide-Leg Trousers",
    category: "Trousers & Pants",
    originalPrice: 10990,
    discountedPrice: 8490,
    rating: 4.8,
    reviewCount: 33,
    primaryImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&q=80",
    tag: "WORKWEAR",
    tagColor: "bg-blue-100 text-blue-900 border-blue-200",
    sizes: ["UK 8", "UK 10", "UK 12", "UK 14"],
    inStock: true,
  },
  {
    id: "prod-7",
    name: "Sri Lankan Silk Touch Designer Scarf",
    category: "Accessories",
    originalPrice: 4990,
    discountedPrice: 3490,
    rating: 5.0,
    reviewCount: 16,
    primaryImage: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
    tag: "30% OFF",
    tagColor: "bg-red-100 text-red-800 border-red-200",
    sizes: ["One Size"],
    inStock: true,
  },
  {
    id: "prod-8",
    name: "Riviera Linen Short Sleeve Button Up",
    category: "Men's Apparel",
    originalPrice: 7990,
    discountedPrice: 5990,
    rating: 4.6,
    reviewCount: 22,
    primaryImage: "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&q=80",
    tag: "NEW SEASON",
    tagColor: "bg-amber-100 text-amber-900 border-amber-300",
    sizes: ["S", "M", "L", "XL"],
    inStock: true,
    isNewArrival: true,
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

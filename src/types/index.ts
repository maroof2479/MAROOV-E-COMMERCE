
export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  images: string[];
  description: string;
  details: string[];
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isBestseller?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

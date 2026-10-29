export type CategorySlug = "smart-phones" | "smart-watches" | "headphones" | "laptops" | "gaming" | "tablets";

export type Category = {
  slug: CategorySlug;
  name: string;
  image: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  category: CategorySlug;
  image: string;
  price: number;
  oldPrice?: number;
  rating: number;
  tags: string[];
  sku: string;
  stock: number;
  weightKg: number;
  dimensions: string;
  year: number;
  manual: string;
  refundPolicy: string;
};

export type ProductSort = "featured" | "price-asc" | "price-desc" | "name";

export type ProductQuery = {
  search?: string;
  category?: CategorySlug;
  onSale?: boolean;
  sort?: ProductSort;
  page?: number;
  pageSize?: number;
};

export type ProductPage = {
  items: Product[];
  total: number;
  page: number;
  pageCount: number;
};

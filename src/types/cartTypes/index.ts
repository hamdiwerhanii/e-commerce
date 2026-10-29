import type { Product } from "@/types/productTypes";

export type CartItem = {
  productId: string;
  quantity: number;
};

export type CartState = {
  items: CartItem[];
};

export type CartLine = CartItem & {
  product: Product;
  lineTotal: number;
};

export type CartTotals = {
  itemCount: number;
  subtotal: number;
  shipping: number;
  total: number;
};

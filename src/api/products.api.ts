import { CATEGORIES } from "@/modules/products/consts/categories.data";
import { PRODUCTS } from "@/modules/products/consts/products.data";
import { queryProducts } from "@/modules/products/utils/products.utils";
import type { Category, Product, ProductPage, ProductQuery } from "@/types/productTypes";

export const productsApi = {
  list: (query?: ProductQuery): ProductPage => queryProducts(PRODUCTS, query),
  all: (): Product[] => PRODUCTS,
  getById: (id: string): Product | undefined => PRODUCTS.find((product) => product.id === id),
  related: (product: Product, limit = 4): Product[] =>
    PRODUCTS.filter((item) => item.category === product.category && item.id !== product.id).slice(
      0,
      limit,
    ),
};

export const categoriesApi = {
  list: (): (Category & { productCount: number })[] =>
    CATEGORIES.map((category) => ({
      ...category,
      productCount: PRODUCTS.filter((product) => product.category === category.slug).length,
    })),
  getBySlug: (slug: string): Category | undefined =>
    CATEGORIES.find((category) => category.slug === slug),
};

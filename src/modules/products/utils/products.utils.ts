import type { Product, ProductPage, ProductQuery, ProductSort } from "@/types/productTypes";

export const DEFAULT_PAGE_SIZE = 8;

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim();

const matchesSearch = (product: Product, search: string) => {
  const terms = normalize(search).split(/\s+/).filter(Boolean);
  const haystack = normalize(
    [product.name, product.category.replace("-", " "), ...product.tags].join(" "),
  );
  return terms.every((term) => haystack.includes(term));
};

const SORTERS: Record<ProductSort, (a: Product, b: Product) => number> = {
  featured: (a, b) => Number(a.id) - Number(b.id),
  "price-asc": (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
  name: (a, b) => a.name.localeCompare(b.name),
};

export const isOnSale = (product: Product): boolean =>
  product.oldPrice !== undefined && product.oldPrice > product.price;

export const discountPercent = (product: Product): number =>
  isOnSale(product) ? Math.round((1 - product.price / (product.oldPrice ?? product.price)) * 100) : 0;

export const queryProducts = (products: Product[], query: ProductQuery = {}): ProductPage => {
  const pageSize = query.pageSize ?? DEFAULT_PAGE_SIZE;

  const filtered = products
    .filter((product) => !query.category || product.category === query.category)
    .filter((product) => !query.onSale || isOnSale(product))
    .filter((product) => !query.search || matchesSearch(product, query.search))
    .sort(SORTERS[query.sort ?? "featured"]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const page = Math.min(Math.max(1, query.page ?? 1), pageCount);

  return {
    items: filtered.slice((page - 1) * pageSize, page * pageSize),
    total: filtered.length,
    page,
    pageCount,
  };
};

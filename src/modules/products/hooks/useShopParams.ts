import { useSearchParams } from "react-router";

import type { ProductSort } from "@/types/productTypes";

const SORTS: ProductSort[] = ["featured", "price-asc", "price-desc", "name"];

export const useShopParams = () => {
  const [params, setParams] = useSearchParams();

  const sortParam = params.get("sort") as ProductSort | null;
  const pageParam = Number(params.get("page"));

  const update = (changes: Record<string, string | null>) => {
    const next = new URLSearchParams(params);
    for (const [key, value] of Object.entries(changes)) {
      if (value) next.set(key, value);
      else next.delete(key);
    }
    if (!("page" in changes)) next.delete("page");
    setParams(next);
  };

  return {
    search: params.get("q") ?? "",
    deals: params.get("deals") === "1",
    sort: sortParam && SORTS.includes(sortParam) ? sortParam : "featured",
    page: Number.isInteger(pageParam) && pageParam > 0 ? pageParam : 1,
    setSort: (sort: ProductSort) => update({ sort: sort === "featured" ? null : sort }),
    setDeals: (deals: boolean) => update({ deals: deals ? "1" : null }),
    setPage: (page: number) => update({ page: page > 1 ? String(page) : null }),
    clearSearch: () => update({ q: null }),
  };
};

import { SearchX } from "lucide-react";

import { productsApi } from "@/api/products.api";
import { ProductGrid } from "@/modules/products/components/ProductGrid";
import { ShopToolbar } from "@/modules/products/components/ShopToolbar";
import { useShopParams } from "@/modules/products/hooks/useShopParams";
import { Breadcrumbs, EmptyState, Pagination } from "@/shared/components";
import { useDocumentTitle } from "@/shared/hooks";

export const ShopRoot = () => {
  const params = useShopParams();
  const result = productsApi.list({
    search: params.search,
    onSale: params.deals,
    sort: params.sort,
    page: params.page,
  });
  useDocumentTitle(params.deals ? "Deals" : "Shop");

  return (
    <>
      <Breadcrumbs items={[{ label: params.deals ? "Deals" : "Shop" }]} />
      <section className="mx-4 my-16 sm:mx-10">
        <h1 className="mb-6 text-4xl font-medium text-navy">
          {params.deals ? "Today's deals" : "All products"}
        </h1>
        <ShopToolbar
          total={result.total}
          search={params.search}
          sort={params.sort}
          deals={params.deals}
          onSortChange={params.setSort}
          onDealsChange={params.setDeals}
          onClearSearch={params.clearSearch}
        />
        {result.items.length > 0 ? (
          <ProductGrid products={result.items} headingLevel={2} />
        ) : (
          <EmptyState
            icon={<SearchX aria-hidden className="size-9" />}
            title="No products found"
            description="Try another word, or browse all our products."
            action={{ label: "Browse all products", to: "/shop" }}
          />
        )}
      </section>
      <Pagination page={result.page} pageCount={result.pageCount} onPageChange={params.setPage} />
    </>
  );
};

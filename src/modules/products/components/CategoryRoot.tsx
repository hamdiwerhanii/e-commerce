import { useParams } from "react-router";

import { categoriesApi, productsApi } from "@/api/products.api";
import { ProductGrid } from "@/modules/products/components/ProductGrid";
import { ShopToolbar } from "@/modules/products/components/ShopToolbar";
import { useShopParams } from "@/modules/products/hooks/useShopParams";
import { Breadcrumbs, NotFound, Pagination } from "@/shared/components";
import { useDocumentTitle } from "@/shared/hooks";

export const CategoryRoot = () => {
  const { slug = "" } = useParams();
  const category = categoriesApi.getBySlug(slug);
  const params = useShopParams();
  useDocumentTitle(category?.name ?? "Category not found");

  if (!category) return <NotFound />;

  const result = productsApi.list({
    category: category.slug,
    sort: params.sort,
    page: params.page,
  });

  return (
    <>
      <Breadcrumbs items={[{ label: "Categories", to: "/categories" }, { label: category.name }]} />
      <section className="mx-4 my-16 sm:mx-10">
        <h1 className="mb-6 text-4xl font-medium text-navy">{category.name}</h1>
        <ShopToolbar
          total={result.total}
          search=""
          sort={params.sort}
          onSortChange={params.setSort}
          onClearSearch={params.clearSearch}
        />
        <ProductGrid products={result.items} headingLevel={2} />
      </section>
      <Pagination page={result.page} pageCount={result.pageCount} onPageChange={params.setPage} />
    </>
  );
};

import { useParams } from "react-router";

import { categoriesApi, productsApi } from "@/api/products.api";
import { ProductDetails } from "@/modules/products/components/ProductDetails";
import { ProductGrid } from "@/modules/products/components/ProductGrid";
import { ProductTabs } from "@/modules/products/components/ProductTabs";
import { Breadcrumbs, NotFound } from "@/shared/components";
import { useDocumentTitle } from "@/shared/hooks";

export const ProductRoot = () => {
  const { id = "" } = useParams();
  const product = productsApi.getById(id);
  useDocumentTitle(product?.name ?? "Product not found");

  if (!product) return <NotFound />;

  const category = categoriesApi.getBySlug(product.category);
  const related = productsApi.related(product);

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Shop", to: "/shop" },
          { label: category?.name ?? product.category, to: `/categories/${product.category}` },
          { label: product.name },
        ]}
      />
      <ProductDetails key={product.id} product={product} />
      <ProductTabs product={product} />
      {related.length > 0 && (
        <section aria-labelledby="related-title" className="mx-4 my-20 sm:mx-10">
          <h2 id="related-title" className="mb-8 text-3xl font-medium text-navy">
            You may also <span className="text-brand">like</span>
          </h2>
          <ProductGrid products={related} />
        </section>
      )}
    </>
  );
};

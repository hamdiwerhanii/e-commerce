import { productsApi } from "@/api/products.api";
import { ProductGrid } from "@/modules/products/components/ProductGrid";
import { ButtonLink } from "@/shared/components/Button";

export const FeaturedProducts = () => (
  <section aria-labelledby="featured-title" className="mx-4 my-24 sm:mx-10">
    <h2 id="featured-title" className="mb-10 text-4xl font-medium text-navy">
      Featured <span className="text-brand">Products</span>
    </h2>
    <ProductGrid products={productsApi.list({ pageSize: 8 }).items} />
    <div className="mt-12 flex justify-center">
      <ButtonLink to="/shop">Show all products</ButtonLink>
    </div>
  </section>
);

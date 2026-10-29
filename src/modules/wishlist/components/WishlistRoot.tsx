import { Heart } from "lucide-react";

import { ProductGrid } from "@/modules/products/components/ProductGrid";
import { useWishlist } from "@/modules/wishlist/hooks/useWishlist";
import { Breadcrumbs, EmptyState } from "@/shared/components";
import { useDocumentTitle } from "@/shared/hooks";

export const WishlistRoot = () => {
  const { products } = useWishlist();
  useDocumentTitle("Wishlist");

  return (
    <>
      <Breadcrumbs items={[{ label: "Wishlist" }]} />
      {products.length === 0 ? (
        <EmptyState
          titleAs="h1"
          icon={<Heart aria-hidden className="size-9" />}
          title="Your wishlist is empty"
          description="Tap the heart on any product to save it for later."
          action={{ label: "Browse products", to: "/shop" }}
        />
      ) : (
        <section className="mx-4 my-16 sm:mx-10">
          <h1 className="mb-10 text-4xl font-medium text-navy">Your wishlist</h1>
          <ProductGrid products={products} headingLevel={2} />
        </section>
      )}
    </>
  );
};

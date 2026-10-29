import { ShoppingCart } from "lucide-react";

import { CartLineItem } from "@/modules/cart/components/CartLineItem";
import { CartSummary } from "@/modules/cart/components/CartSummary";
import { useCart } from "@/modules/cart/hooks/useCart";
import { Breadcrumbs, Button, ButtonLink, EmptyState } from "@/shared/components";
import { useDocumentTitle } from "@/shared/hooks";

export const CartRoot = () => {
  const { lines, totals, clear } = useCart();
  useDocumentTitle("Cart");

  return (
    <>
      <Breadcrumbs items={[{ label: "Cart" }]} />
      {lines.length === 0 ? (
        <EmptyState
          titleAs="h1"
          icon={<ShoppingCart aria-hidden className="size-9" />}
          title="Your cart is empty"
          description="Find something you love and add it to your cart."
          action={{ label: "Start shopping", to: "/shop" }}
        />
      ) : (
        <section className="mx-4 my-16 grid gap-10 sm:mx-10 lg:grid-cols-[1fr_22rem]">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h1 className="text-4xl font-medium text-navy">Your cart</h1>
              <Button variant="soft" size="sm" onClick={clear}>
                Empty cart
              </Button>
            </div>
            <ul>
              {lines.map((line) => (
                <CartLineItem key={line.productId} line={line} />
              ))}
            </ul>
          </div>
          <CartSummary totals={totals}>
            <ButtonLink to="/checkout" className="w-full">
              Go to checkout
            </ButtonLink>
          </CartSummary>
        </section>
      )}
    </>
  );
};

import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router";

import { CartSummary } from "@/modules/cart/components/CartSummary";
import { useCart } from "@/modules/cart/hooks/useCart";
import { CheckoutForm } from "@/modules/checkout/components/CheckoutForm";
import type { CheckoutFormValues } from "@/modules/checkout/schemas/checkoutSchema";
import { orderPlaced } from "@/modules/checkout/store/orderSlice";
import { Breadcrumbs, EmptyState } from "@/shared/components";
import { useAppDispatch, useDocumentTitle } from "@/shared/hooks";

const orderNumber = () => {
  const [value = 0] = crypto.getRandomValues(new Uint32Array(1));
  return `EC-${String(value % 1_000_000).padStart(6, "0")}`;
};

export const CheckoutRoot = () => {
  const { lines, totals, clear } = useCart();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useDocumentTitle("Checkout");

  const placeOrder = (shipping: CheckoutFormValues) => {
    dispatch(
      orderPlaced({
        number: orderNumber(),
        placedAt: new Date().toISOString(),
        shipping,
        lines,
        totals,
      }),
    );
    clear();
    navigate("/order-confirmation", { replace: true });
  };

  return (
    <>
      <Breadcrumbs items={[{ label: "Cart", to: "/cart" }, { label: "Checkout" }]} />
      {lines.length === 0 ? (
        <EmptyState
          titleAs="h1"
          icon={<ShoppingCart aria-hidden className="size-9" />}
          title="Nothing to check out"
          description="Your cart is empty. Add a product first."
          action={{ label: "Start shopping", to: "/shop" }}
        />
      ) : (
        <section className="mx-4 my-16 grid gap-10 sm:mx-10 lg:grid-cols-[1fr_22rem]">
          <div>
            <h1 className="mb-8 text-4xl font-medium text-navy">Checkout</h1>
            <CheckoutForm onSubmit={placeOrder} />
          </div>
          <CartSummary totals={totals} />
        </section>
      )}
    </>
  );
};

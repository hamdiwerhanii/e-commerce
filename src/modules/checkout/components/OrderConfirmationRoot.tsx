import { CircleCheck, PackageSearch } from "lucide-react";

import { formatPrice } from "@/shared/utils/format.utils";
import { ButtonLink, EmptyState } from "@/shared/components";
import { useAppSelector, useDocumentTitle } from "@/shared/hooks";

export const OrderConfirmationRoot = () => {
  const order = useAppSelector((state) => state.order.lastOrder);
  useDocumentTitle("Order confirmed");

  if (!order) {
    return (
      <EmptyState
        titleAs="h1"
        icon={<PackageSearch aria-hidden className="size-9" />}
        title="No recent order"
        description="Orders you place will be confirmed here."
        action={{ label: "Go shopping", to: "/shop" }}
      />
    );
  }

  return (
    <section className="mx-auto my-20 max-w-2xl px-4 text-center">
      <CircleCheck aria-hidden className="mx-auto size-16 text-green-600" />
      <h1 className="mt-6 text-4xl font-medium text-navy">
        Thank you, {order.shipping.fullName.split(" ")[0]}!
      </h1>
      <p className="mt-3 text-slate-500">
        Your order <strong className="text-navy">{order.number}</strong> was placed. A confirmation
        would be sent to {order.shipping.email} in a real store.
      </p>
      <ul className="mt-10 rounded-3xl bg-slate-50 p-6 text-left">
        {order.lines.map((line) => (
          <li
            key={line.productId}
            className="flex justify-between border-b border-slate-200 py-2 last:border-0"
          >
            <span>
              {line.product.name} × {line.quantity}
            </span>
            <span className="font-semibold">{formatPrice(line.lineTotal)}</span>
          </li>
        ))}
        <li className="flex justify-between pt-4 text-lg font-bold text-navy">
          <span>Total paid on delivery</span>
          <span>{formatPrice(order.totals.total)}</span>
        </li>
      </ul>
      <ButtonLink to="/shop" className="mt-10">
        Continue shopping
      </ButtonLink>
    </section>
  );
};

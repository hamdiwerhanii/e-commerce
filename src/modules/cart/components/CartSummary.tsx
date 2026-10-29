import type { ReactNode } from "react";

import { formatPrice } from "@/shared/utils/format.utils";
import { SITE } from "@/shared/constants/site";
import type { CartTotals } from "@/types/cartTypes";

export const CartSummary = ({ totals, children }: { totals: CartTotals; children?: ReactNode }) => {
  const missing = SITE.freeShippingFrom - totals.subtotal;

  return (
    <aside aria-label="Order summary" className="rounded-3xl bg-slate-50 p-6">
      <h2 className="mb-4 text-xl font-bold text-navy">Order summary</h2>
      <dl className="space-y-2 text-slate-600">
        <div className="flex justify-between">
          <dt>
            Subtotal ({totals.itemCount} {totals.itemCount === 1 ? "item" : "items"})
          </dt>
          <dd>{formatPrice(totals.subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt>Shipping</dt>
          <dd>{totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)}</dd>
        </div>
        <div className="flex justify-between border-t border-slate-200 pt-3 text-lg font-bold text-navy">
          <dt>Total</dt>
          <dd>{formatPrice(totals.total)}</dd>
        </div>
      </dl>
      {missing > 0 && totals.subtotal > 0 && (
        <p className="mt-3 text-sm text-slate-500">
          Add {formatPrice(missing)} more to get free shipping.
        </p>
      )}
      {children && <div className="mt-6">{children}</div>}
    </aside>
  );
};

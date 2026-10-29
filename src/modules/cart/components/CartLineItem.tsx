import { Trash2 } from "lucide-react";
import { Link } from "react-router";

import { formatPrice } from "@/shared/utils/format.utils";
import { QuantityStepper } from "@/modules/cart/components/QuantityStepper";
import { useCart } from "@/modules/cart/hooks/useCart";
import type { CartLine } from "@/types/cartTypes";

export const CartLineItem = ({ line, compact = false }: { line: CartLine; compact?: boolean }) => {
  const cart = useCart();
  const { product } = line;

  return (
    <li className="flex items-center gap-4 border-b border-slate-100 py-4 last:border-0">
      <img
        src={product.image}
        alt=""
        width={80}
        height={80}
        className="size-16 shrink-0 rounded-2xl border border-slate-100 object-contain sm:size-20"
      />
      <div className="min-w-0 flex-1">
        <Link to={`/products/${product.id}`} className="block truncate font-semibold text-navy hover:text-brand">
          {product.name}
        </Link>
        <p className="text-sm text-slate-500">
          {formatPrice(product.price)}
          {compact && ` × ${line.quantity}`}
        </p>
        {!compact && (
          <div className="mt-2">
            <QuantityStepper
              value={line.quantity}
              onChange={(quantity) => cart.setQuantity(product.id, quantity)}
              label={`Quantity of ${product.name}`}
            />
          </div>
        )}
      </div>
      <p className="font-bold text-navy">{formatPrice(line.lineTotal)}</p>
      <button
        type="button"
        onClick={() => cart.remove(product.id)}
        aria-label={`Remove ${product.name} from cart`}
        className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-full text-slate-400 hover:bg-red-50 hover:text-red-600"
      >
        <Trash2 aria-hidden className="size-4" />
      </button>
    </li>
  );
};

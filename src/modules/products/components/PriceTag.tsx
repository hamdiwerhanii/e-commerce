import { cn } from "@/lib/utils";
import { formatPrice } from "@/shared/utils/format.utils";
import { isOnSale } from "@/modules/products/utils/products.utils";
import type { Product } from "@/types/productTypes";

export const PriceTag = ({ product, large = false }: { product: Product; large?: boolean }) => (
  <p className="flex items-baseline gap-2">
    {isOnSale(product) && (
      <del className="text-slate-400">
        <span className="sr-only">Was </span>
        {formatPrice(product.oldPrice ?? product.price)}
      </del>
    )}
    <span className={cn("font-bold text-navy", large ? "text-3xl" : "text-xl")}>
      {isOnSale(product) && <span className="sr-only">Now </span>}
      {formatPrice(product.price)}
    </span>
  </p>
);

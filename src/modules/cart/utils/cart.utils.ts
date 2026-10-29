import { productsApi } from "@/api/products.api";
import { SITE } from "@/shared/constants/site";
import type { CartItem, CartLine, CartTotals } from "@/types/cartTypes";

export const toCartLines = (items: CartItem[]): CartLine[] =>
  items.flatMap((item) => {
    const product = productsApi.getById(item.productId);
    return product ? [{ ...item, product, lineTotal: product.price * item.quantity }] : [];
  });

export const computeTotals = (lines: CartLine[]): CartTotals => {
  const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);
  const shipping = subtotal === 0 || subtotal >= SITE.freeShippingFrom ? 0 : SITE.shippingFee;
  return {
    itemCount: lines.reduce((sum, line) => sum + line.quantity, 0),
    subtotal,
    shipping,
    total: subtotal + shipping,
  };
};

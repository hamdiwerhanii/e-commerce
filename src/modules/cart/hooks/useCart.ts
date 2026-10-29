import { useMemo } from "react";
import { toast } from "react-toastify";

import { addToCart, clearCart, removeFromCart, setQuantity } from "@/modules/cart/store/cartSlice";
import { computeTotals, toCartLines } from "@/modules/cart/utils/cart.utils";
import { useAppDispatch, useAppSelector } from "@/shared/hooks";
import type { Product } from "@/types/productTypes";

export const useCart = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);

  const lines = useMemo(() => toCartLines(items), [items]);
  const totals = useMemo(() => computeTotals(lines), [lines]);

  return {
    lines,
    totals,
    add: (product: Product, quantity = 1) => {
      dispatch(addToCart({ productId: product.id, quantity }));
      toast.success(`${product.name} was added to your cart.`);
    },
    setQuantity: (productId: string, quantity: number) =>
      dispatch(setQuantity({ productId, quantity })),
    remove: (productId: string) => dispatch(removeFromCart(productId)),
    clear: () => dispatch(clearCart()),
  };
};

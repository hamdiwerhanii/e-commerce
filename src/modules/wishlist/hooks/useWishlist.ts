import { useMemo } from "react";

import { productsApi } from "@/api/products.api";
import { removeFromWishlist, toggleWishlist } from "@/modules/wishlist/store/wishlistSlice";
import { useAppDispatch, useAppSelector } from "@/shared/hooks";
import type { Product } from "@/types/productTypes";

export const useWishlist = () => {
  const dispatch = useAppDispatch();
  const productIds = useAppSelector((state) => state.wishlist.productIds);

  const products = useMemo(
    () =>
      productIds.flatMap((id) => {
        const product = productsApi.getById(id);
        return product ? [product] : [];
      }),
    [productIds],
  );

  return {
    products,
    count: products.length,
    has: (productId: string) => productIds.includes(productId),
    toggle: (product: Product) => dispatch(toggleWishlist(product.id)),
    remove: (productId: string) => dispatch(removeFromWishlist(productId)),
  };
};

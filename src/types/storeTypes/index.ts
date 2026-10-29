import type { CartState } from "@/types/cartTypes";
import type { WishlistState } from "@/types/wishlistTypes";

export type PersistedState = {
  cart: CartState;
  wishlist: WishlistState;
};

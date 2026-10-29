import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { productsApi } from "@/api/products.api";
import { cartReducer, MAX_QUANTITY } from "@/modules/cart/store/cartSlice";
import { orderReducer } from "@/modules/checkout/store/orderSlice";
import { wishlistReducer } from "@/modules/wishlist/store/wishlistSlice";
import type { PersistedState } from "@/types/storeTypes";

const STORAGE_KEY = "e-commerce:v2";

const rootReducer = combineReducers({
  cart: cartReducer,
  wishlist: wishlistReducer,
  order: orderReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const isKnownProduct = (id: unknown): id is string =>
  typeof id === "string" && productsApi.getById(id) !== undefined;

export const loadPersistedState = (raw: string | null): Partial<PersistedState> => {
  if (!raw) return {};
  try {
    const data = JSON.parse(raw) as Partial<PersistedState>;
    const items = Array.isArray(data.cart?.items) ? data.cart.items : [];
    const productIds = Array.isArray(data.wishlist?.productIds) ? data.wishlist.productIds : [];
    return {
      cart: {
        items: items
          .filter(
            (item) =>
              isKnownProduct(item?.productId) &&
              Number.isInteger(item.quantity) &&
              item.quantity >= 1 &&
              item.quantity <= MAX_QUANTITY,
          )
          .map(({ productId, quantity }) => ({ productId, quantity })),
      },
      wishlist: { productIds: [...new Set(productIds.filter(isKnownProduct))] },
    };
  } catch {
    return {};
  }
};

const readStorage = (): string | null => {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};

export const createStore = (preloadedState: Partial<RootState> = loadPersistedState(readStorage())) => {
  const store = configureStore({ reducer: rootReducer, preloadedState });

  store.subscribe(() => {
    const { cart, wishlist } = store.getState();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ cart, wishlist }));
    } catch {
      return;
    }
  });

  return store;
};

export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = AppStore["dispatch"];

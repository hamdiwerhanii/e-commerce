import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { WishlistState } from "@/types/wishlistTypes";

const initialState: WishlistState = { productIds: [] };

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist(state, action: PayloadAction<string>) {
      state.productIds = state.productIds.includes(action.payload)
        ? state.productIds.filter((id) => id !== action.payload)
        : [...state.productIds, action.payload];
    },
    removeFromWishlist(state, action: PayloadAction<string>) {
      state.productIds = state.productIds.filter((id) => id !== action.payload);
    },
  },
});

export const { toggleWishlist, removeFromWishlist } = wishlistSlice.actions;
export const wishlistReducer = wishlistSlice.reducer;

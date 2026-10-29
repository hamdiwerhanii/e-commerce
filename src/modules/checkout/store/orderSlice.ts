import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { Order, OrderState } from "@/types/orderTypes";

const initialState: OrderState = { lastOrder: null };

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    orderPlaced(state, action: PayloadAction<Order>) {
      state.lastOrder = action.payload;
    },
  },
});

export const { orderPlaced } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;

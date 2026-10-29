import {
  addToCart,
  cartReducer,
  clearCart,
  MAX_QUANTITY,
  removeFromCart,
  setQuantity,
} from "@/modules/cart/store/cartSlice";
import { computeTotals, toCartLines } from "@/modules/cart/utils/cart.utils";

const empty = cartReducer(undefined, { type: "init" });

describe("cart reducer", () => {
  it("adds a product and merges repeated adds into one line", () => {
    let state = cartReducer(empty, addToCart({ productId: "8" }));
    state = cartReducer(state, addToCart({ productId: "8", quantity: 2 }));
    expect(state.items).toEqual([{ productId: "8", quantity: 3 }]);
  });

  it("never goes below 1 or above the maximum", () => {
    let state = cartReducer(empty, addToCart({ productId: "8", quantity: 50 }));
    expect(state.items[0]?.quantity).toBe(MAX_QUANTITY);
    state = cartReducer(state, setQuantity({ productId: "8", quantity: 0 }));
    expect(state.items[0]?.quantity).toBe(1);
  });

  it("removes a line and clears the cart", () => {
    let state = cartReducer(empty, addToCart({ productId: "1" }));
    state = cartReducer(state, addToCart({ productId: "2" }));
    state = cartReducer(state, removeFromCart("1"));
    expect(state.items.map((item) => item.productId)).toEqual(["2"]);
    expect(cartReducer(state, clearCart()).items).toEqual([]);
  });
});

describe("cart totals", () => {
  it("prices every line from the catalog, not from stored prices", () => {
    const lines = toCartLines([
      { productId: "8", quantity: 2 },
      { productId: "unknown", quantity: 1 },
    ]);
    expect(lines).toHaveLength(1);
    expect(lines[0]?.lineTotal).toBe(1798);
  });

  it("charges shipping only under the free shipping threshold", () => {
    const cheap = computeTotals([
      { productId: "x", quantity: 1, lineTotal: 50, product: {} as never },
    ]);
    expect(cheap).toMatchObject({ subtotal: 50, shipping: 15, total: 65 });

    const big = computeTotals(toCartLines([{ productId: "8", quantity: 1 }]));
    expect(big).toMatchObject({ itemCount: 1, subtotal: 899, shipping: 0, total: 899 });

    expect(computeTotals([])).toMatchObject({ subtotal: 0, shipping: 0, total: 0 });
  });
});

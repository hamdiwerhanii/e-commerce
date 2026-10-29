import { addToCart } from "@/modules/cart/store/cartSlice";
import { createStore, loadPersistedState } from "@/lib/store";

describe("persisted state", () => {
  it("keeps only valid cart lines and known wishlist products", () => {
    const raw = JSON.stringify({
      cart: {
        items: [
          { productId: "8", quantity: 2, price: 1 },
          { productId: "999", quantity: 1 },
          { productId: "2", quantity: 0 },
          { productId: "3", quantity: 1.5 },
          { productId: "4", quantity: 500 },
        ],
      },
      wishlist: { productIds: ["1", "1", "nope"] },
    });

    expect(loadPersistedState(raw)).toEqual({
      cart: { items: [{ productId: "8", quantity: 2 }] },
      wishlist: { productIds: ["1"] },
    });
  });

  it("ignores broken or missing data", () => {
    expect(loadPersistedState(null)).toEqual({});
    expect(loadPersistedState("{not json")).toEqual({});
    expect(loadPersistedState(JSON.stringify({ cart: "oops" }))).toEqual({
      cart: { items: [] },
      wishlist: { productIds: [] },
    });
  });

  it("saves the cart and wishlist to localStorage", () => {
    const store = createStore({});
    store.dispatch(addToCart({ productId: "8" }));
    const saved = JSON.parse(localStorage.getItem("e-commerce:v2") ?? "{}");
    expect(saved.cart.items).toEqual([{ productId: "8", quantity: 1 }]);
    expect(saved).not.toHaveProperty("order");
  });
});

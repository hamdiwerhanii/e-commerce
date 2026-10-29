import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderApp } from "../helpers";

describe("product page", () => {
  it("adds the chosen quantity to the cart with a toast naming the product", async () => {
    const user = userEvent.setup();
    const { store } = renderApp("/products/8");

    expect(
      await screen.findByRole("heading", { level: 1, name: "PlayStation 5" }),
    ).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Increase quantity" }));
    await user.click(
      within(screen.getByRole("main")).getByRole("button", { name: /^Add to cart$/ }),
    );

    expect(store.getState().cart.items).toEqual([{ productId: "8", quantity: 2 }]);
    expect(await screen.findByText("PlayStation 5 was added to your cart.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cart, 2 items" })).toBeInTheDocument();
  });

  it("shows the correct information instead of repeating the dimensions", async () => {
    const user = userEvent.setup();
    renderApp("/products/2");

    await user.click(await screen.findByRole("tab", { name: "Information" }));
    const panel = screen.getByRole("tabpanel");
    expect(within(panel).getByText("2024")).toBeInTheDocument();
    expect(within(panel).getByText("Up to 14 days")).toBeInTheDocument();
    expect(within(panel).getAllByText("14.8 × 7.2 × 0.8 cm")).toHaveLength(1);
  });

  it("shows a not-found page instead of crashing for unknown products", async () => {
    renderApp("/products/about");
    expect(
      await screen.findByRole("heading", { name: "We couldn't find that page" }),
    ).toBeInTheDocument();
  });

  it("redirects old links to the new addresses", async () => {
    const { router } = renderApp("/gadgets/quick/Laptops");
    await waitFor(() => expect(router.state.location.pathname).toBe("/categories/laptops"));
    expect(await screen.findByRole("heading", { level: 1, name: "Laptops" })).toBeInTheDocument();
  });
});

describe("shop page", () => {
  it("filters products from the search query in the URL", async () => {
    renderApp("/shop?q=laptop");
    expect(await screen.findByText(/2 products/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Silver Laptop" })).toBeInTheDocument();
  });

  it("offers a way out when nothing matches", async () => {
    renderApp("/shop?q=zzzz");
    expect(await screen.findByRole("heading", { name: "No products found" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Browse all products" })).toHaveAttribute(
      "href",
      "/shop",
    );
  });

  it("paginates the full catalog", async () => {
    const user = userEvent.setup();
    renderApp("/shop");
    expect(await screen.findAllByRole("article")).toHaveLength(8);
    await user.click(screen.getByRole("button", { name: "Page 2" }));
    expect(await screen.findAllByRole("article")).toHaveLength(4);
  });
});

describe("checkout", () => {
  it("validates the form, then places the order and empties the cart", async () => {
    const user = userEvent.setup();
    const { store } = renderApp("/checkout", {
      cart: { items: [{ productId: "8", quantity: 1 }] },
    });

    await user.click(await screen.findByRole("button", { name: "Place order" }));
    expect(await screen.findByText("Enter your full name")).toBeInTheDocument();
    expect(screen.getByText("Enter a valid email address")).toBeInTheDocument();

    await user.type(screen.getByLabelText("Full name"), "Hamdi Werhani");
    await user.type(screen.getByLabelText("Email"), "hamdi@example.com");
    await user.type(screen.getByLabelText("Phone"), "+216 20 123 456");
    await user.type(screen.getByLabelText("Street address"), "12 Rue de Carthage");
    await user.type(screen.getByLabelText("City"), "Tunis");
    await user.type(screen.getByLabelText("Postal code"), "1000");
    await user.click(screen.getByRole("button", { name: "Place order" }));

    expect(await screen.findByRole("heading", { name: "Thank you, Hamdi!" })).toBeInTheDocument();
    expect(store.getState().cart.items).toEqual([]);
    expect(store.getState().order.lastOrder?.number).toMatch(/^EC-\d{6}$/);
  });

  it("asks to shop first when the cart is empty", async () => {
    renderApp("/checkout");
    expect(
      await screen.findByRole("heading", { name: "Nothing to check out" }),
    ).toBeInTheDocument();
  });
});

describe("wishlist", () => {
  it("saves a product from its card and lists it on the wishlist page", async () => {
    const user = userEvent.setup();
    const { store, router } = renderApp("/categories/gaming");

    await user.click(await screen.findByRole("button", { name: "Add Xbox One to wishlist" }));
    expect(store.getState().wishlist.productIds).toEqual(["9"]);
    expect(screen.getByRole("button", { name: "Remove Xbox One from wishlist" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );

    await router.navigate("/wishlist");
    expect(await screen.findByRole("link", { name: "Xbox One" })).toBeInTheDocument();
  });
});

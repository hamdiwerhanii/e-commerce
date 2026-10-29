import { screen } from "@testing-library/react";
import axe from "axe-core";

import { renderApp } from "../helpers";

const audit = async (container: HTMLElement) => {
  const results = await axe.run(container, { rules: { "color-contrast": { enabled: false } } });
  return results.violations.map((violation) => `${violation.id}: ${violation.help}`);
};

describe("accessibility", () => {
  it.each([
    ["shop", "/shop", "All products"],
    ["category", "/categories/laptops", "Laptops"],
    ["product", "/products/2", "iPhone 14 Pro"],
    ["checkout", "/checkout", "Checkout"],
    ["not found", "/nope", "We couldn't find that page"],
  ])("the %s page has no axe violations", async (_label, path, heading) => {
    const { container } = renderApp(path, { cart: { items: [{ productId: "2", quantity: 1 }] } });
    await screen.findByRole("heading", { level: 1, name: heading }, { timeout: 5000 });
    expect(await audit(container)).toEqual([]);
  });
});

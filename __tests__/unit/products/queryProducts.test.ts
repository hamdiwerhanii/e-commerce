import { PRODUCTS } from "@/modules/products/consts/products.data";
import { discountPercent, queryProducts } from "@/modules/products/utils/products.utils";

const names = (query: Parameters<typeof queryProducts>[1]) =>
  queryProducts(PRODUCTS, { pageSize: 50, ...query }).items.map((product) => product.name);

describe("queryProducts", () => {
  it("searches names, categories and tags, ignoring case", () => {
    expect(names({ search: "LAPTOP" })).toEqual(["Silver Laptop", "White Laptop Pro"]);
    expect(names({ search: "purple" })).toEqual(["iPhone 14 Pro"]);
    expect(names({ search: "smart phones" })).toEqual(["Android Phone", "iPhone 14 Pro"]);
    expect(names({ search: "nothing like this" })).toEqual([]);
  });

  it("filters by category and by deals", () => {
    expect(names({ category: "gaming" })).toEqual([
      "PlayStation 5",
      "Xbox One",
      "Wireless Controller",
    ]);
    expect(names({ onSale: true })).toEqual([
      "iPhone 14 Pro",
      "Black Sports Watch",
      "White Laptop Pro",
      "PlayStation 5",
      "Xbox One",
    ]);
  });

  it("sorts by price and name", () => {
    const ascending = queryProducts(PRODUCTS, { sort: "price-asc", pageSize: 50 }).items.map(
      (p) => p.price,
    );
    expect(ascending).toEqual([...ascending].sort((a, b) => a - b));
    expect(names({ sort: "name" })[0]).toBe("Android Phone");
  });

  it("paginates and clamps out-of-range pages", () => {
    expect(queryProducts(PRODUCTS, { pageSize: 8 })).toMatchObject({
      total: 12,
      pageCount: 2,
      page: 1,
    });
    expect(queryProducts(PRODUCTS, { pageSize: 8, page: 2 }).items).toHaveLength(4);
    expect(queryProducts(PRODUCTS, { pageSize: 8, page: 99 }).page).toBe(2);
  });

  it("computes discounts from the old price", () => {
    const iphone = PRODUCTS.find((product) => product.id === "2");
    const android = PRODUCTS.find((product) => product.id === "1");
    expect(iphone && discountPercent(iphone)).toBe(6);
    expect(android && discountPercent(android)).toBe(0);
  });
});

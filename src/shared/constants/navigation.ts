export const MAIN_NAV = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "Categories", to: "/categories" },
  { label: "Deals", to: "/shop?deals=1" },
] as const;

export const FOOTER_LINKS = [
  {
    title: "Shop",
    links: [
      { label: "All products", to: "/shop" },
      { label: "Deals", to: "/shop?deals=1" },
      { label: "Categories", to: "/categories" },
    ],
  },
  {
    title: "Popular",
    links: [
      { label: "Smart Phones", to: "/categories/smart-phones" },
      { label: "Laptops", to: "/categories/laptops" },
      { label: "Gaming", to: "/categories/gaming" },
    ],
  },
  {
    title: "My account",
    links: [
      { label: "Cart", to: "/cart" },
      { label: "Wishlist", to: "/wishlist" },
      { label: "Checkout", to: "/checkout" },
    ],
  },
] as const;

import type { ComponentType } from "react";
import { Navigate, type RouteObject } from "react-router";

import { LegacyCategoryRedirect, LegacyProductRedirect } from "@/app/LegacyRedirect";
import HomePage from "@/app/pages/HomePage";
import { RootLayout } from "@/app/RootLayout";

const page = (load: () => Promise<{ default: ComponentType }>) => async () => ({
  Component: (await load()).default,
});

export const routes: RouteObject[] = [
  {
    path: "/",
    Component: RootLayout,
    HydrateFallback: () => <p className="py-24 text-center text-slate-500">Loading…</p>,
    children: [
      { index: true, Component: HomePage },
      { path: "shop", lazy: page(() => import("@/app/pages/ShopPage")) },
      { path: "categories", lazy: page(() => import("@/app/pages/CategoriesPage")) },
      { path: "categories/:slug", lazy: page(() => import("@/app/pages/CategoryPage")) },
      { path: "products/:id", lazy: page(() => import("@/app/pages/ProductPage")) },
      { path: "cart", lazy: page(() => import("@/app/pages/CartPage")) },
      { path: "checkout", lazy: page(() => import("@/app/pages/CheckoutPage")) },
      { path: "order-confirmation", lazy: page(() => import("@/app/pages/OrderConfirmationPage")) },
      { path: "wishlist", lazy: page(() => import("@/app/pages/WishlistPage")) },
      { path: "gadgets/shop", element: <Navigate to="/shop" replace /> },
      { path: "gadgets/categories", element: <Navigate to="/categories" replace /> },
      { path: "gadgets/quick/:category", Component: LegacyCategoryRedirect },
      { path: "gadgets/:id", Component: LegacyProductRedirect },
      { path: "*", lazy: page(() => import("@/app/pages/NotFoundPage")) },
    ],
  },
];

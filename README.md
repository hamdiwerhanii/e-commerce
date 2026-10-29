# E-Commerce

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2-764ABC?logo=redux&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-4-6E9F18?logo=vitest&logoColor=white)

A gadget store front: browse phones, laptops, watches, headphones and consoles, search the catalog, save favorites, fill a cart and place a (demo) order. Everything runs in the browser, with no backend.

## Features

- **Home page** with an auto-playing hero slider, category shortcuts, promo banners, featured products and a news carousel.
- **Shop** with search, sorting, a "deals only" filter and pagination, all kept in the URL so results can be bookmarked and shared.
- **Categories** page and one page per category.
- **Product page** with price and discount, rating, quantity picker, tabs (description, information, shipping) and related products.
- **Cart** in the header and on its own page: change quantities, remove items, free shipping from $100.
- **Wishlist** with a heart on every product.
- **Checkout** with a validated form (react-hook-form + zod) and an order confirmation. No payment is taken.
- **Saved between visits:** the cart and wishlist are stored in `localStorage`, and the data is validated when it is read back.
- **Accessible:** keyboard-friendly cart, tabs and menu, labelled buttons, a skip link, correct heading order, reduced-motion support.
- **Old links keep working:** `/gadgets/...` addresses from the first version redirect to the new pages.

## Tech Stack

| Area          | Tools                                                            |
| ------------- | ---------------------------------------------------------------- |
| UI            | React 19, TypeScript 6, Tailwind CSS 4, lucide-react, Swiper     |
| State         | Redux Toolkit 2 + React Redux                                    |
| Routing       | React Router 7 (data router, lazy-loaded pages)                  |
| Forms         | react-hook-form + zod                                            |
| Notifications | react-toastify                                                   |
| Tooling       | Vite 8, ESLint 10, Prettier, Vitest 4, Testing Library, axe-core |

## Project Structure

The structure follows the same conventions as the ADEyesV2 frontend.

```
src/
├── app/                    routes, root layout, thin pages (each page renders one module root)
│   └── pages/
├── api/                    products.api.ts: the data access layer used by every component
├── assets/images/          brand, hero, products, promos, news
├── lib/                    store, providers, cn()
├── modules/
│   ├── home/               components (HomeRoot, HeroSlider, ...), consts
│   ├── products/           components (ShopRoot, ProductRoot, ProductCard, ...), consts (catalog), hooks, utils
│   ├── cart/               components (CartRoot, CartPopover, ...), hooks, store, utils
│   ├── wishlist/           components, hooks, store
│   └── checkout/           components (CheckoutRoot, CheckoutForm, ...), schemas, store
├── shared/
│   ├── components/         Button, Header, Footer, Breadcrumbs, Pagination, Tabs, EmptyState, ...
│   ├── constants/          site info and navigation
│   ├── hooks/              typed Redux hooks, useDocumentTitle
│   └── utils/              format.utils.ts
└── types/                  cartTypes, orderTypes, productTypes, storeTypes, wishlistTypes
__tests__/unit/             unit, page and accessibility tests
```

Components never read the catalog directly: they go through `src/api/products.api.ts`. Replacing the static catalog with a real API later only means changing that file.

## Getting Started

Requirements: Node.js 20.19+ (or 22.13+) and npm.

```bash
npm install
npm run dev
```

Open http://localhost:5173.

## Scripts

| Command             | What it does                                     |
| ------------------- | ------------------------------------------------ |
| `npm run dev`       | Start the development server                     |
| `npm run build`     | Type check and build for production into `dist/` |
| `npm run preview`   | Serve the production build locally               |
| `npm run lint`      | Run ESLint                                       |
| `npm run typecheck` | Run the TypeScript compiler                      |
| `npm run format`    | Format the code with Prettier                    |
| `npm run test:unit` | Run all tests once                               |

## Testing

`npm run test:unit` runs 28 tests with Vitest, Testing Library and axe-core:

- cart logic: adding, merging, limits, totals and shipping;
- catalog search, filters, sorting and pagination;
- saved cart and wishlist validation;
- full pages: product, shop, checkout and wishlist flows, unknown products, old link redirects;
- accessibility checks on five pages.

GitHub Actions runs lint, type check, tests, the production build and `npm audit` on every push and pull request.

## Deployment

`npm run build` creates a static site in `dist/`. On any static host, rewrite unknown paths to `index.html` so that direct links like `/products/2` work (for example `_redirects` on Netlify or `rewrites` on Vercel).

## License

[MIT](LICENSE) © Hamdi Werhani

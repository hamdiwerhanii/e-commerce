import { render } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";

import { routes } from "@/app/routes";
import { Providers } from "@/lib/providers";
import { createStore, type RootState } from "@/lib/store";

export const renderApp = (path = "/", preloadedState: Partial<RootState> = {}) => {
  const store = createStore(preloadedState);
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  const utils = render(
    <Providers store={store}>
      <RouterProvider router={router} />
    </Providers>,
  );
  return { ...utils, store, router };
};

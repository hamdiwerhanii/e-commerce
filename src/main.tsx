import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";

import { routes } from "@/app/routes";
import { Providers } from "@/lib/providers";
import "@/index.css";

const router = createBrowserRouter(routes);
const root = document.getElementById("root");

if (!root) throw new Error("Root element #root is missing from index.html");

createRoot(root).render(
  <StrictMode>
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  </StrictMode>,
);

import { Suspense } from "react";
import { Outlet, ScrollRestoration } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Footer, Header } from "@/shared/components";

export const RootLayout = () => (
  <>
    <a
      href="#main"
      className="sr-only rounded-full bg-brand px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50"
    >
      Skip to content
    </a>
    <Header />
    <main id="main" tabIndex={-1} className="min-h-[60vh] focus:outline-none">
      <Suspense fallback={<p className="py-24 text-center text-slate-500">Loading…</p>}>
        <Outlet />
      </Suspense>
    </main>
    <Footer />
    <ToastContainer position="bottom-center" theme="dark" autoClose={2500} newestOnTop limit={3} />
    <ScrollRestoration />
  </>
);

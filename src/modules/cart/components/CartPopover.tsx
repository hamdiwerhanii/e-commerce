import { ShoppingBag } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { useLocation } from "react-router";

import { formatPrice } from "@/shared/utils/format.utils";
import { CartLineItem } from "@/modules/cart/components/CartLineItem";
import { useCart } from "@/modules/cart/hooks/useCart";
import { ButtonLink } from "@/shared/components/Button";

export const CartPopover = () => {
  const { lines, totals } = useCart();
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const [lastPath, setLastPath] = useState(location.pathname);

  if (location.pathname !== lastPath) {
    setLastPath(location.pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={`Cart, ${totals.itemCount} ${totals.itemCount === 1 ? "item" : "items"}`}
        className="relative grid size-12 cursor-pointer place-items-center rounded-full bg-slate-100 text-navy hover:bg-slate-200 sm:size-14"
      >
        <ShoppingBag aria-hidden className="size-6" />
        <span
          aria-hidden
          className="absolute -right-1 bottom-0 grid size-5 place-items-center rounded-full bg-pink-600 text-xs font-bold text-white"
        >
          {totals.itemCount}
        </span>
      </button>

      {open && (
        <div
          id={panelId}
          role="dialog"
          aria-label="Shopping cart"
          className="absolute top-[calc(100%+12px)] right-0 z-50 w-[min(24rem,calc(100vw-2rem))] rounded-3xl bg-white p-5 shadow-card"
        >
          {lines.length === 0 ? (
            <p className="py-6 text-center text-slate-500">Your cart is empty.</p>
          ) : (
            <>
              <ul className="max-h-72 overflow-y-auto">
                {lines.map((line) => (
                  <CartLineItem key={line.productId} line={line} compact />
                ))}
              </ul>
              <p className="mt-4 flex justify-between border-t border-slate-100 pt-4 text-lg font-bold text-navy">
                <span>Total</span>
                <span>{formatPrice(totals.subtotal)}</span>
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <ButtonLink to="/cart" variant="soft" size="sm">
                  View cart
                </ButtonLink>
                <ButtonLink to="/checkout" size="sm">
                  Checkout
                </ButtonLink>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

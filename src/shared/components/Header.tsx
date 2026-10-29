import { Heart, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router";

import heroBackground from "@/assets/images/brand/hero-background.jpeg";
import { cn } from "@/lib/utils";
import { CartPopover } from "@/modules/cart/components/CartPopover";
import { useWishlist } from "@/modules/wishlist/hooks/useWishlist";
import { Logo } from "@/shared/components/Logo";
import { SearchForm } from "@/shared/components/SearchForm";
import { MAIN_NAV } from "@/shared/constants/navigation";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    "relative text-lg font-medium transition-colors hover:text-brand",
    isActive ? "text-brand" : "text-slate-700",
  );

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { count } = useWishlist();
  const location = useLocation();
  const [lastPath, setLastPath] = useState(location.pathname);

  if (location.pathname !== lastPath) {
    setLastPath(location.pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className="relative z-40 bg-white shadow-header">
      <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-10 lg:py-6">
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="grid size-11 cursor-pointer place-items-center rounded-full bg-brand-deep text-white lg:hidden"
        >
          {menuOpen ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
        </button>

        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {MAIN_NAV.map((item) => (
              <li key={item.label}>
                <NavLink to={item.to} end={item.to === "/"} className={navLinkClass}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <SearchForm className="hidden w-64 xl:flex" />
          <NavLink
            to="/wishlist"
            aria-label={`Wishlist, ${count} ${count === 1 ? "item" : "items"}`}
            className="relative hidden size-14 place-items-center rounded-full bg-slate-100 text-navy hover:bg-slate-200 sm:grid"
          >
            <Heart aria-hidden className="size-6" />
            {count > 0 && (
              <span aria-hidden className="absolute -right-1 bottom-0 grid size-5 place-items-center rounded-full bg-pink-600 text-xs font-bold text-white">
                {count}
              </span>
            )}
          </NavLink>
          <CartPopover />
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!menuOpen}
        style={{ backgroundImage: `url(${heroBackground})` }}
        className="absolute inset-x-0 top-full bg-navy bg-cover p-5 lg:hidden"
      >
        <SearchForm onSearch={() => setMenuOpen(false)} />
        <nav aria-label="Mobile">
          <ul className="mt-4">
            {[...MAIN_NAV, { label: "Wishlist", to: "/wishlist" }, { label: "Cart", to: "/cart" }].map((item) => (
              <li key={item.label} className="border-b border-white/10">
                <NavLink to={item.to} end={item.to === "/"} className="block py-4 text-white hover:pl-2 hover:text-blue-300">
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

import { ChevronRight, House } from "lucide-react";
import { Link } from "react-router";

type Crumb = { label: string; to?: string };

export const Breadcrumbs = ({ items }: { items: Crumb[] }) => (
  <nav aria-label="Breadcrumb" className="relative mx-4 my-6 border-t border-slate-200 sm:mx-10">
    <ol className="absolute -top-5 left-0 flex max-w-full items-center gap-2 overflow-x-auto rounded-full border border-slate-200 bg-white px-4 py-2 text-xs sm:gap-3 sm:text-sm">
      <li>
        <Link to="/" aria-label="Home" className="text-navy hover:text-brand">
          <House aria-hidden className="size-4" />
        </Link>
      </li>
      {items.map((item, index) => (
        <li key={item.label} className="flex items-center gap-2 whitespace-nowrap sm:gap-3">
          <ChevronRight aria-hidden className="size-4 text-slate-400" />
          {item.to && index < items.length - 1 ? (
            <Link to={item.to} className="hover:text-brand">
              {item.label}
            </Link>
          ) : (
            <span aria-current={index === items.length - 1 ? "page" : undefined}>
              {item.label}
            </span>
          )}
        </li>
      ))}
    </ol>
  </nav>
);

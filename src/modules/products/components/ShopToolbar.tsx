import { X } from "lucide-react";
import { useId } from "react";

import type { ProductSort } from "@/types/productTypes";

const SORT_OPTIONS: { value: ProductSort; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "name", label: "Name: A to Z" },
];

type ShopToolbarProps = {
  total: number;
  search: string;
  sort: ProductSort;
  deals?: boolean;
  onSortChange: (sort: ProductSort) => void;
  onDealsChange?: (deals: boolean) => void;
  onClearSearch: () => void;
};

export const ShopToolbar = ({
  total,
  search,
  sort,
  deals,
  onSortChange,
  onDealsChange,
  onClearSearch,
}: ShopToolbarProps) => {
  const id = useId();

  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <p aria-live="polite" className="text-slate-500">
          {total} {total === 1 ? "product" : "products"}
          {search && (
            <>
              {" "}
              for <strong className="text-navy">&ldquo;{search}&rdquo;</strong>
            </>
          )}
        </p>
        {search && (
          <button
            type="button"
            onClick={onClearSearch}
            className="inline-flex cursor-pointer items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-sm text-navy hover:bg-slate-200"
          >
            <X aria-hidden className="size-3.5" />
            Clear search
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        {onDealsChange && (
          <label className="flex cursor-pointer items-center gap-2 text-sm text-navy">
            <input
              type="checkbox"
              checked={deals}
              onChange={(event) => onDealsChange(event.target.checked)}
              className="size-4 accent-brand"
            />
            Deals only
          </label>
        )}
        <label htmlFor={`${id}-sort`} className="text-sm text-slate-500">
          Sort by
        </label>
        <select
          id={`${id}-sort`}
          value={sort}
          onChange={(event) => onSortChange(event.target.value as ProductSort)}
          className="h-11 rounded-full border border-slate-200 bg-white px-4 text-sm text-navy focus-visible:outline-2 focus-visible:outline-brand"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

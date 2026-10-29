import { cn } from "@/lib/utils";

type PaginationProps = {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
};

export const Pagination = ({ page, pageCount, onPageChange }: PaginationProps) => {
  if (pageCount <= 1) return null;

  return (
    <nav aria-label="Pagination" className="mb-10 flex justify-center">
      <ul className="flex flex-wrap items-center gap-3">
        {Array.from({ length: pageCount }, (_, index) => index + 1).map((value) => (
          <li key={value}>
            <button
              type="button"
              onClick={() => onPageChange(value)}
              aria-current={value === page ? "page" : undefined}
              aria-label={`Page ${value}`}
              className={cn(
                "grid size-12 cursor-pointer place-items-center rounded-full border text-lg transition-colors",
                value === page
                  ? "border-brand bg-brand text-white"
                  : "border-slate-200 text-navy hover:border-brand hover:text-brand",
              )}
            >
              {value}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

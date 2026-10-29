import { Search } from "lucide-react";
import { type FormEvent, useId, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

import { cn } from "@/lib/utils";

export const SearchForm = ({ className, onSearch }: { className?: string; onSearch?: () => void }) => {
  const id = useId();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [value, setValue] = useState(params.get("q") ?? "");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const query = value.trim();
    navigate(query ? `/shop?q=${encodeURIComponent(query)}` : "/shop");
    onSearch?.();
  };

  return (
    <form role="search" onSubmit={submit} className={cn("relative flex items-center", className)}>
      <label htmlFor={id} className="sr-only">
        Search products
      </label>
      <input
        id={id}
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search ..."
        maxLength={60}
        className="h-12 w-full rounded-full bg-white pr-12 pl-6 shadow-card focus-visible:outline-2 focus-visible:outline-brand sm:h-14"
      />
      <button
        type="submit"
        aria-label="Search"
        className="absolute right-2 grid size-10 cursor-pointer place-items-center rounded-full text-slate-400 hover:text-brand"
      >
        <Search aria-hidden className="size-5" />
      </button>
    </form>
  );
};

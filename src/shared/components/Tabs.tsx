import { type KeyboardEvent, type ReactNode, useId, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type Tab = { id: string; label: string; content: ReactNode };

export const Tabs = ({ tabs, label }: { tabs: Tab[]; label: string }) => {
  const baseId = useId();
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (event: KeyboardEvent, index: number) => {
    const moves: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: tabs.length - 1,
    };
    if (!(event.key in moves)) return;
    event.preventDefault();
    const next = ((moves[event.key] ?? 0) + tabs.length) % tabs.length;
    setActive(next);
    refs.current[next]?.focus();
  };

  return (
    <div className="mx-4 my-12 sm:mx-10">
      <div role="tablist" aria-label={label} className="flex flex-wrap justify-center gap-2">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            ref={(element) => {
              refs.current[index] = element;
            }}
            type="button"
            role="tab"
            id={`${baseId}-tab-${tab.id}`}
            aria-selected={active === index}
            aria-controls={`${baseId}-panel-${tab.id}`}
            tabIndex={active === index ? 0 : -1}
            onClick={() => setActive(index)}
            onKeyDown={(event) => onKeyDown(event, index)}
            className={cn(
              "cursor-pointer rounded-t-2xl border border-b-0 px-5 py-3 text-sm tracking-wide transition-colors sm:px-8",
              active === index
                ? "border-slate-200 bg-white font-bold text-navy"
                : "border-transparent bg-slate-100 text-slate-500 hover:text-navy",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab, index) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`${baseId}-panel-${tab.id}`}
          aria-labelledby={`${baseId}-tab-${tab.id}`}
          hidden={active !== index}
          tabIndex={0}
          className="rounded-3xl border border-slate-200 p-6 text-slate-600 sm:p-10"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
};

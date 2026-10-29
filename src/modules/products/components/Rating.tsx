import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

export const Rating = ({ value, className }: { value: number; className?: string }) => (
  <div
    role="img"
    aria-label={`Rated ${value.toFixed(1)} out of 5`}
    className={cn("flex items-center gap-0.5", className)}
  >
    {Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        aria-hidden
        className={cn(
          "size-4",
          value >= index + 0.75
            ? "fill-amber-400 text-amber-400"
            : value >= index + 0.25
              ? "fill-amber-200 text-amber-400"
              : "text-slate-300",
        )}
      />
    ))}
  </div>
);

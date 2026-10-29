import { Minus, Plus } from "lucide-react";

import { MAX_QUANTITY } from "@/modules/cart/store/cartSlice";

type QuantityStepperProps = {
  value: number;
  onChange: (value: number) => void;
  label: string;
};

export const QuantityStepper = ({ value, onChange, label }: QuantityStepperProps) => (
  <div role="group" aria-label={label} className="flex items-center gap-3">
    <button
      type="button"
      onClick={() => onChange(value - 1)}
      disabled={value <= 1}
      aria-label="Decrease quantity"
      className="grid size-10 cursor-pointer place-items-center rounded-full bg-slate-100 text-navy transition-colors hover:bg-brand hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
    >
      <Minus aria-hidden className="size-4" />
    </button>
    <output aria-live="polite" className="grid h-10 w-16 place-items-center rounded-full border border-slate-200 font-semibold">
      {value}
    </output>
    <button
      type="button"
      onClick={() => onChange(value + 1)}
      disabled={value >= MAX_QUANTITY}
      aria-label="Increase quantity"
      className="grid size-10 cursor-pointer place-items-center rounded-full bg-slate-100 text-navy transition-colors hover:bg-brand hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
    >
      <Plus aria-hidden className="size-4" />
    </button>
  </div>
);

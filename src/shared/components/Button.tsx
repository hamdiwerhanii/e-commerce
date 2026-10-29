import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { Link, type LinkProps } from "react-router";

import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-brand text-white hover:bg-brand-dark",
        light: "bg-white text-navy hover:bg-slate-100",
        soft: "bg-slate-100 text-navy hover:bg-slate-200",
        outline: "border border-slate-300 text-navy hover:border-brand hover:text-brand",
        danger: "bg-red-600 text-white hover:bg-red-700",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-12 px-7",
        icon: "size-12 shrink-0",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type Variants = VariantProps<typeof buttonVariants>;

export const Button = ({
  className,
  variant,
  size,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & Variants) => (
  <button type={type} className={cn(buttonVariants({ variant, size }), className)} {...props} />
);

export const ButtonLink = ({ className, variant, size, ...props }: LinkProps & Variants) => (
  <Link className={cn(buttonVariants({ variant, size }), className)} {...props} />
);

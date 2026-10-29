import type { ReactNode } from "react";

import { ButtonLink } from "@/shared/components/Button";

type EmptyStateProps = {
  icon: ReactNode;
  title: string;
  description: string;
  action?: { label: string; to: string };
  titleAs?: "h1" | "h2";
};

export const EmptyState = ({ icon, title, description, action, titleAs: Title = "h2" }: EmptyStateProps) => (
  <div className="mx-auto my-20 flex max-w-md flex-col items-center px-6 text-center">
    <span className="mb-6 grid size-20 place-items-center rounded-full bg-slate-100 text-brand">
      {icon}
    </span>
    <Title className="text-2xl font-bold text-navy">{title}</Title>
    <p className="mt-3 text-slate-500">{description}</p>
    {action && (
      <ButtonLink to={action.to} className="mt-8">
        {action.label}
      </ButtonLink>
    )}
  </div>
);

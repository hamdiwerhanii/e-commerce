import { Compass } from "lucide-react";

import { EmptyState } from "@/shared/components/EmptyState";
import { useDocumentTitle } from "@/shared/hooks";

export const NotFound = () => {
  useDocumentTitle("Page not found");

  return (
    <EmptyState
      titleAs="h1"
      icon={<Compass aria-hidden className="size-9" />}
      title="We couldn't find that page"
      description="The page or product you are looking for doesn't exist or has moved."
      action={{ label: "Back to the shop", to: "/shop" }}
    />
  );
};

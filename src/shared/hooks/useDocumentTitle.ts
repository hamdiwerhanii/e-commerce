import { useEffect } from "react";

import { SITE } from "@/shared/constants/site";

export const useDocumentTitle = (title?: string) => {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE.name}` : `${SITE.name} | ${SITE.tagline}`;
  }, [title]);
};

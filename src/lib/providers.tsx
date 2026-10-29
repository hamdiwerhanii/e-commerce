import { type ReactNode, useState } from "react";
import { Provider } from "react-redux";

import { type AppStore, createStore } from "@/lib/store";

export const Providers = ({ children, store }: { children: ReactNode; store?: AppStore }) => {
  const [appStore] = useState(() => store ?? createStore());
  return <Provider store={appStore}>{children}</Provider>;
};

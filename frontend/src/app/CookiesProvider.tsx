"use client";

import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { createContext, useContext } from "react";

const CookiesContext = createContext<RequestCookie | undefined | null>(null);

function CookieAuthProvider({
  children,
  value,
}: React.PropsWithChildren<{ value: RequestCookie | undefined }>) {
  return (
    <CookiesContext.Provider value={value}>{children}</CookiesContext.Provider>
  );
}

export function useCookie() {
  const context = useContext(CookiesContext);
  if (!context) {
    throw new Error("useSession must be used within a Session Provider");
  }
  return context;
}

export default CookieAuthProvider;

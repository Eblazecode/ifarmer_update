"use client";

import { Toaster } from "sonner";
import StoreProvider from "@/store/provider";
import AuthHydrator from "@/components/auth-hydrator";

export default function Providers({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <AuthHydrator />
      {children}
      <Toaster position="top-right" richColors />
    </StoreProvider>
  );
}

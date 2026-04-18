"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";

export default function AdminGuard({
  children
}: {
  children: React.ReactNode;
}) {
  const { token, hydrated } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (hydrated && !token) {
      router.replace("/admin/login");
    }
  }, [hydrated, router, token]);

  if (!hydrated || !token) {
    return null;
  }

  return <>{children}</>;
}

"use client";

import { useEffect } from "react";
import { hydrateAuth } from "@/store/slices/auth-slice";
import { useAppDispatch } from "@/store/hooks";

export default function AuthHydrator() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("ifarmer_admin_token");
    const user = localStorage.getItem("ifarmer_admin_user");

    dispatch(
      hydrateAuth({
        token,
        user: user ? JSON.parse(user) : null
      })
    );
  }, [dispatch]);

  return null;
}

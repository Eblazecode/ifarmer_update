"use client";

import { useState } from "react";
import AdminGuard from "@/components/admin-guard";
import AdminShell from "@/components/admin-shell";
import { ProductEditor } from "@/components/admin-forms";
import { useAppSelector } from "@/store/hooks";
import { useGetAdminProductsQuery } from "@/store/services/api";
import type { Product } from "@/types";

export default function AdminProductsPage() {
  const { token, hydrated } = useAppSelector((state) => state.auth);
  const { data: products, refetch } = useGetAdminProductsQuery(undefined, {
    skip: !hydrated || !token
  });
  const [selected, setSelected] = useState<Product | null>(null);

  return (
    <AdminGuard>
      <AdminShell
        title="Product Management"
        description="Manage the store content that powers the shop listing, dynamic product pages, and buy request flow."
      >
        <div className="grid gap-8 xl:grid-cols-[0.9fr,1.1fr]">
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h3 className="text-xl font-bold text-[#2D5016]">
              {selected ? "Edit Product" : "Create Product"}
            </h3>
            <div className="mt-6">
              <ProductEditor
                initialProduct={selected}
                onSaved={() => {
                  setSelected(null);
                  refetch();
                }}
              />
            </div>
          </div>
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h3 className="text-xl font-bold text-[#2D5016]">Existing Products</h3>
            <div className="mt-6 space-y-4">
              {products?.map((product) => (
                <button
                  key={product._id ?? product.slug}
                  type="button"
                  onClick={() => setSelected(product)}
                  className="block w-full rounded-2xl border border-slate-100 p-5 text-left transition hover:border-[#7CB342]"
                >
                  <h4 className="font-semibold text-slate-800">{product.name}</h4>
                  <p className="mt-2 text-sm text-slate-500">{product.slug}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </AdminShell>
    </AdminGuard>
  );
}

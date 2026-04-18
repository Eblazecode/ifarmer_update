"use client";

import { useState } from "react";
import AdminGuard from "@/components/admin-guard";
import AdminShell from "@/components/admin-shell";
import { ServiceEditor } from "@/components/admin-forms";
import { useAppSelector } from "@/store/hooks";
import { useGetAdminServicesQuery } from "@/store/services/api";
import type { Service } from "@/types";

export default function AdminServicesPage() {
  const { token, hydrated } = useAppSelector((state) => state.auth);
  const { data: services, refetch } = useGetAdminServicesQuery(undefined, {
    skip: !hydrated || !token
  });
  const [selected, setSelected] = useState<Service | null>(null);

  return (
    <AdminGuard>
      <AdminShell
        title="Service Management"
        description="Update service detail pages, SEO content, highlights, and CTAs from one place."
      >
        <div className="grid gap-8 xl:grid-cols-[0.9fr,1.1fr]">
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h3 className="text-xl font-bold text-[#2D5016]">
              {selected ? "Edit Service" : "Create Service"}
            </h3>
            <div className="mt-6">
              <ServiceEditor
                initialService={selected}
                onSaved={() => {
                  setSelected(null);
                  refetch();
                }}
              />
            </div>
          </div>
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h3 className="text-xl font-bold text-[#2D5016]">Existing Services</h3>
            <div className="mt-6 space-y-4">
              {services?.map((service) => (
                <button
                  key={service._id ?? service.slug}
                  type="button"
                  onClick={() => setSelected(service)}
                  className="block w-full rounded-2xl border border-slate-100 p-5 text-left transition hover:border-[#7CB342]"
                >
                  <h4 className="font-semibold text-slate-800">{service.title}</h4>
                  <p className="mt-2 text-sm text-slate-500">{service.slug}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </AdminShell>
    </AdminGuard>
  );
}

"use client";

import Link from "next/link";
import AdminGuard from "@/components/admin-guard";
import AdminShell from "@/components/admin-shell";
import { useAppSelector } from "@/store/hooks";
import { useGetAdminDashboardQuery } from "@/store/services/api";

export default function AdminDashboardPage() {
  const { token, hydrated } = useAppSelector((state) => state.auth);
  const { data } = useGetAdminDashboardQuery(undefined, {
    skip: !hydrated || !token
  });

  const cards = [
    {
      label: "Contact Submissions",
      value: data?.contacts.length ?? 0,
      href: "/admin/submissions"
    },
    {
      label: "Callback Requests",
      value: data?.callbacks.length ?? 0,
      href: "/admin/submissions"
    },
    {
      label: "Appointments",
      value: data?.appointments.length ?? 0,
      href: "/admin/submissions"
    },
    {
      label: "Buy Requests",
      value: data?.buyRequests.length ?? 0,
      href: "/admin/submissions"
    }
  ];

  return (
    <AdminGuard>
      <AdminShell
        title="Dashboard"
        description="Review lead activity, manage content, and operate the business-facing parts of the website from here."
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <Link
              key={card.label}
              href={card.href}
              className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <p className="text-sm text-slate-500">{card.label}</p>
              <p className="mt-3 text-4xl font-bold text-[#2D5016]">{card.value}</p>
            </Link>
          ))}
        </div>
      </AdminShell>
    </AdminGuard>
  );
}

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, FileText, Package, Settings, Inbox, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { logout } from "@/store/slices/auth-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const adminLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/blogs", label: "Blogs", icon: FileText },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/services", label: "Services", icon: Settings },
  { href: "/admin/submissions", label: "Submissions", icon: Inbox }
];

export default function AdminShell({
  title,
  description,
  children
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div className="min-h-screen bg-[#F8FAF5]">
      <div className="grid min-h-screen lg:grid-cols-[280px,1fr]">
        <aside className="bg-[#1a3009] p-6 text-white">
          <p className="text-xs uppercase tracking-[0.2em] text-white/50">
            Admin Area
          </p>
          <h1 className="mt-4 text-2xl font-bold">iFarmer Admin</h1>
          <p className="mt-2 text-sm text-white/70">{user?.email}</p>

          <nav className="mt-10 space-y-2">
            {adminLinks.map((item) => {
              const Icon = item.icon;
              const active =
                item.href === "/admin"
                  ? pathname === item.href
                  : pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white",
                    active && "bg-white/10 text-white"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            className="mt-10 inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
            onClick={() => {
              localStorage.removeItem("ifarmer_admin_token");
              localStorage.removeItem("ifarmer_admin_user");
              dispatch(logout());
              router.replace("/admin/login");
            }}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </aside>

        <main className="p-6 lg:p-10">
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-[#2D5016]">{title}</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              {description}
            </p>
          </div>
          <div className="mt-8">{children}</div>
        </main>
      </div>
    </div>
  );
}

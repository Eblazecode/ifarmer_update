"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  CalendarCheck,
  Mail,
  Menu,
  Phone,
  Sprout,
  X
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { businessName, contactInfo, navItems } from "@/data/site-content";
import { cn } from "@/lib/utils";

export default function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white/95 shadow-md backdrop-blur">
      <div className="border-b bg-[#2D5016] text-white">
        <div className="container flex items-center justify-between gap-4 py-2 text-xs sm:text-sm">
          <p className="truncate">
            {businessName}
          </p>
          <div className="flex items-center gap-4 text-white/90">
            <a href={`tel:${contactInfo.phoneRaw}`}>{contactInfo.phoneDisplay}</a>
            <a href={`mailto:${contactInfo.email}`} className="hidden sm:inline">
              {contactInfo.email}
            </a>
          </div>
        </div>
      </div>
      <div className="container flex h-20 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/assets/IFARMERSLOGO.png"
            alt={businessName}
            width={160}
            height={60}
            className="h-12 w-auto object-contain"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === item.href
                : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "border-b-2 border-transparent pb-1 text-sm font-medium text-slate-700 transition-colors hover:text-[#2D5016]",
                  isActive && "border-[#7CB342] text-[#7CB342]"
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/book-appointment"
            className="rounded-lg bg-[#2D5016] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#7CB342]"
          >
            Book Appointment
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-white text-[#2D5016] shadow-sm transition hover:border-[#7CB342] hover:bg-[#F4F8EF] md:hidden"
          onClick={() => setIsOpen((value) => !value)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      <div
        className={cn(
          "fixed inset-0 z-50 md:hidden",
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
        aria-hidden={!isOpen}
      >
        <button
          type="button"
          className={cn(
            "absolute inset-0 bg-slate-950/45 backdrop-blur-sm transition-opacity duration-300",
            isOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setIsOpen(false)}
          aria-label="Close menu"
          tabIndex={isOpen ? 0 : -1}
        />

        <aside
          id="mobile-navigation"
          className={cn(
            "absolute right-0 top-0 flex h-dvh w-[min(88vw,24rem)] flex-col overflow-hidden bg-white shadow-2xl transition-transform duration-300 ease-out",
            isOpen ? "translate-x-0" : "translate-x-full"
          )}
          aria-label="Mobile navigation"
        >
          <div className="bg-[#1F3A10] px-5 pb-6 pt-5 text-white">
            <div className="flex items-start justify-between gap-4">
              <Link
                href="/"
                className="flex min-w-0 items-center gap-3"
                onClick={() => setIsOpen(false)}
                tabIndex={isOpen ? 0 : -1}
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white">
                  <Image
                    src="/assets/IFARMERSLOGO.png"
                    alt={businessName}
                    width={80}
                    height={80}
                    className="h-9 w-auto object-contain"
                  />
                </span>
                <span className="min-w-0 text-sm font-semibold leading-5">
                  {businessName}
                </span>
              </Link>

              <button
                type="button"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white transition hover:bg-white/20"
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
                tabIndex={isOpen ? 0 : -1}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-5 rounded-lg border border-white/15 bg-white/10 p-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#CDE8B8]">
                <Sprout className="h-4 w-4" />
                Agricultural services
              </div>
              <p className="mt-2 text-sm leading-6 text-white/85">
                Reliable farm inputs, project support, and export-ready agro
                products.
              </p>
            </div>
          </div>

          <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-5">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === item.href
                  : pathname === item.href ||
                    pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  tabIndex={isOpen ? 0 : -1}
                  className={cn(
                    "group flex items-center justify-between rounded-lg border px-4 py-3 text-sm font-semibold transition",
                    isActive
                      ? "border-[#7CB342] bg-[#F1F7EA] text-[#2D5016]"
                      : "border-transparent text-slate-700 hover:border-slate-200 hover:bg-slate-50 hover:text-[#2D5016]"
                  )}
                >
                  <span>{item.label}</span>
                  <ArrowUpRight
                    className={cn(
                      "h-4 w-4 transition",
                      isActive
                        ? "text-[#7CB342]"
                        : "text-slate-300 group-hover:text-[#7CB342]"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-slate-200 bg-slate-50 px-4 py-5">
            <Link
              href="/book-appointment"
              onClick={() => setIsOpen(false)}
              tabIndex={isOpen ? 0 : -1}
              className="flex items-center justify-center gap-2 rounded-lg bg-[#2D5016] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[#2D5016]/20 transition hover:bg-[#7CB342]"
            >
              <CalendarCheck className="h-4 w-4" />
              Book Appointment
            </Link>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <a
                href={`tel:${contactInfo.phoneRaw}`}
                tabIndex={isOpen ? 0 : -1}
                className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-3 text-xs font-semibold text-slate-700 transition hover:border-[#7CB342] hover:text-[#2D5016]"
              >
                <Phone className="h-4 w-4" />
                Call
              </a>
              <a
                href={`mailto:${contactInfo.email}`}
                tabIndex={isOpen ? 0 : -1}
                className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-3 text-xs font-semibold text-slate-700 transition hover:border-[#7CB342] hover:text-[#2D5016]"
              >
                <Mail className="h-4 w-4" />
                Email
              </a>
            </div>
          </div>
        </aside>
      </div>
    </header>
  );
}

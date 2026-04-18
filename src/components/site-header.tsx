"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { businessName, contactInfo, navItems } from "@/data/site-content";
import { cn } from "@/lib/utils";

export default function SiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

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
          className="rounded-md p-2 md:hidden"
          onClick={() => setIsOpen((value) => !value)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t bg-white md:hidden">
          <nav className="container space-y-2 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block rounded-lg px-4 py-3 text-sm font-medium text-slate-700",
                  pathname === item.href || pathname.startsWith(`${item.href}/`)
                    ? "bg-[#7CB342] text-white"
                    : "hover:bg-slate-100"
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/book-appointment"
              onClick={() => setIsOpen(false)}
              className="mt-2 block rounded-lg bg-[#2D5016] px-4 py-3 text-center font-semibold text-white"
            >
              Book Appointment
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

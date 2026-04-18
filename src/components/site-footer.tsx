import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone, ShoppingBag } from "lucide-react";
import {
  businessName,
  contactInfo,
  navItems,
  services
} from "@/data/site-content";

export default function SiteFooter() {
  const footerLinks = [
    ...navItems,
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Cookie Policy", href: "/cookie-policy" }
  ];

  return (
    <footer className="bg-[#2D5016] text-white">
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src="/assets/IFARMERSLOGO.png"
              alt={businessName}
              width={170}
              height={60}
              className="h-12 w-auto object-contain"
            />
            <p className="mt-4 text-sm leading-7 text-white/75">
              Agricultural services, supply support, product sourcing, and business-ready agribusiness operations for Nigeria and beyond.
            </p>
            <div className="mt-6 space-y-3 text-sm text-white/85">
              <a href={`tel:${contactInfo.phoneRaw}`} className="flex items-center gap-3">
                <Phone className="h-4 w-4" />
                <span>{contactInfo.phoneDisplay}</span>
              </a>
              <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-3">
                <Mail className="h-4 w-4" />
                <span>{contactInfo.email}</span>
              </a>
              <a href="/shop" className="flex items-center gap-3">
                <ShoppingBag className="h-4 w-4" />
                <span>Explore our product store</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="mt-4 space-y-3 text-sm text-white/75">
              {footerLinks.map((item) => (
                <Link key={item.href} href={item.href} className="block hover:text-white">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Our Services</h3>
            <div className="mt-4 space-y-3 text-sm text-white/75">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="block hover:text-white"
                >
                  {service.title}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Office Address</h3>
            <div className="mt-4 flex gap-3 text-sm text-white/75">
              <MapPin className="mt-1 h-4 w-4 flex-none" />
              <div className="space-y-1">
                {contactInfo.addressLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
                <p className="pt-2 font-medium text-white/90">
                  {contactInfo.openingHours}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/15 pt-6 text-sm text-white/65">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p>
              &copy; {new Date().getFullYear()} {businessName}. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/privacy-policy" className="hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/cookie-policy" className="hover:text-white">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

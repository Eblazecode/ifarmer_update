import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/page-hero";
import { SectionHeading, ServiceCard } from "@/components/content-blocks";
import { services, businessName } from "@/data/site-content";

export const metadata: Metadata = {
  title: `Services | ${businessName}`,
  description:
    "Explore fertilizer blending, input supply, agricultural project management, and agri software services from iFarmer Agricultural Products Services Limited."
};

export default function ServicesPage() {
  return (
    <div>
      <PageHero
        title="Our Services"
        description="Each service now has its own dedicated SEO-focused page, while the overall design remains familiar to the existing website experience."
      >
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="rounded-lg bg-[#7CB342] px-6 py-3 font-semibold text-white transition hover:bg-[#689f38]"
          >
            Contact Our Team
          </Link>
          <Link
            href="/book-appointment"
            className="rounded-lg border border-white/25 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            Book Appointment
          </Link>
        </div>
      </PageHero>

      <section className="bg-[#F5F5DC] py-20">
        <div className="container">
          <SectionHeading
            eyebrow="Service Portfolio"
            title="Solutions built for field needs and business outcomes"
            description="The original tab-based service presentation has been improved into fully indexable service pages with richer detail."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service, index) => (
              <ServiceCard
                key={service.slug}
                service={service}
                delay={index * 0.08}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

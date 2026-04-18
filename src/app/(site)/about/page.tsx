import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/page-hero";
import Reveal from "@/components/reveal";
import { SectionHeading } from "@/components/content-blocks";
import {
  businessName,
  certifications,
  partners,
  team
} from "@/data/site-content";

export const metadata: Metadata = {
  title: `About ${businessName}`,
  description:
    "Learn about iFarmer Agricultural Products Services Limited, our mission, values, certifications, and agricultural business focus."
};

export default function AboutPage() {
  return (
    <div>
      <PageHero
        title={`About ${businessName}`}
        description="Transforming agricultural services, product sourcing, and agribusiness support into a stronger, search-ready, and operationally useful business website."
      />

      <section className="bg-white py-20">
        <div className="container grid gap-12 lg:grid-cols-[1.1fr,0.9fr]">
          <Reveal>
            <SectionHeading
              eyebrow="Our Story"
              title="A stronger digital platform for a serious agribusiness"
              description="The original website already communicated agricultural credibility. This rebuilt version preserves that foundation while adding the operational depth the business needs."
            />
            <div className="prose-content mt-8">
              <p>
                {businessName} emerged from a mission to support agricultural productivity, sustainable operations, product sourcing, and programme delivery across Nigeria. The website now reflects that role more clearly by pairing the existing brand presentation with business-ready digital features.
              </p>
              <p>
                The result is not a cosmetic redesign. It is a conversion from a brochure-style frontend into a working business website with individual SEO pages, better enquiry workflows, product-specific buy request capture, and a backend that can support admin operations.
              </p>
            </div>
          </Reveal>

          <Reveal className="rounded-3xl bg-[#F5F5DC] p-8 shadow-soft">
            <h3 className="text-2xl font-bold text-[#2D5016]">Core Focus Areas</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                "Fertilizer blending support",
                "Agricultural input supply",
                "Agricultural project management",
                "Agri software solutions",
                "Commodity sourcing and supply",
                "Operational lead handling"
              ].map((item) => (
                <div key={item} className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="font-medium text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#F5F5DC] py-20">
        <div className="container">
          <SectionHeading
            eyebrow="Certifications"
            title="Certified and connected"
            description="The original site highlighted regulatory and export-aligned credibility. Those recognisable trust signals remain and are now structured more clearly."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {certifications.map((item, index) => (
              <Reveal
                key={item.name}
                delay={index * 0.08}
                className="rounded-3xl bg-white p-8 text-center shadow-lg"
              >
                <div className="relative mx-auto h-24 w-full max-w-[220px]">
                  <Image
                    src={item.logo}
                    alt={item.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-[#2D5016]">
                  {item.name}
                </h3>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container">
          <SectionHeading
            eyebrow="Team Representation"
            title="People behind the work"
            description="This section keeps the people-focused tone of the existing website while fitting it into the new Next.js structure."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {team.map((member, index) => (
              <Reveal
                key={member.name}
                delay={index * 0.08}
                className="overflow-hidden rounded-3xl bg-white shadow-lg"
              >
                <div className="relative h-72">
                  <Image src={member.image} alt={member.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#2D5016]">{member.name}</h3>
                  <p className="mt-2 text-sm text-slate-500">{member.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 rounded-3xl bg-[#2D5016] p-8 text-white">
            <h3 className="text-2xl font-bold">Partnership and programme ecosystem</h3>
            <div className="mt-6 flex flex-wrap gap-3">
              {partners.map((partner) => (
                <span key={partner} className="rounded-full bg-white/10 px-4 py-2 text-sm">
                  {partner}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

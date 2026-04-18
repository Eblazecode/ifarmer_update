import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/page-hero";
import Reveal from "@/components/reveal";
import { SectionHeading, ServiceCard } from "@/components/content-blocks";
import { AppointmentForm } from "@/components/forms";
import { services as fallbackServices } from "@/data/site-content";
import { getServiceBySlug } from "@/lib/server-api";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = await getServiceBySlug(params.slug);

  if (!service) {
    return {};
  }

  return {
    title: service.seoTitle,
    description: service.seoDescription
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const service = await getServiceBySlug(params.slug);

  if (!service) {
    notFound();
  }

  const related = fallbackServices.filter((item) => item.slug !== service.slug).slice(0, 3);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.seoDescription
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PageHero title={service.title} description={service.description} />

      <section className="bg-white py-20">
        <div className="container grid gap-12 lg:grid-cols-[1fr,0.9fr]">
          <Reveal className="space-y-6">
            <div className="relative h-[420px] overflow-hidden rounded-3xl shadow-soft">
              <Image src={service.heroImage} alt={service.title} fill className="object-cover" />
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {service.highlights.map((item) => (
                <div key={item.label} className="rounded-2xl bg-[#F5F5DC] p-5">
                  <p className="text-sm text-slate-500">{item.label}</p>
                  <p className="mt-2 text-2xl font-bold text-[#2D5016]">{item.value}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <SectionHeading
              eyebrow="Service Detail"
              title={`Why choose ${service.title}`}
              description={service.summary}
            />
            <div className="prose-content mt-8">
              {service.longDescription.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 rounded-3xl bg-[#F8FAF5] p-8">
              <h3 className="text-2xl font-bold text-[#2D5016]">Key Features</h3>
              <ul className="mt-5 space-y-3">
                {service.features.map((feature) => (
                  <li key={feature} className="rounded-2xl bg-white px-5 py-4 text-slate-700 shadow-sm">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#F5F5DC] py-20">
        <div className="container grid gap-10 lg:grid-cols-[0.9fr,1.1fr]">
          <div className="rounded-3xl bg-white p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-[#2D5016]">Request an appointment</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              This form now submits to the backend so your admin can review appointments later.
            </p>
            <div className="mt-6">
              <AppointmentForm defaultService={service.title} />
            </div>
          </div>
          <div>
            <SectionHeading
              eyebrow="Related Services"
              title="Explore other service areas"
              description="The service architecture now supports individual SEO pages, making each capability easier to discover and manage."
            />
            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {related.map((item, index) => (
                <ServiceCard key={item.slug} service={item} delay={index * 0.08} />
              ))}
            </div>
            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex rounded-lg bg-[#2D5016] px-6 py-4 font-semibold text-white transition hover:bg-[#7CB342]"
              >
                Talk to our team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

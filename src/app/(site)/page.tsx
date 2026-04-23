import type { Metadata } from "next";
import Link from "next/link";
import HeroSlider from "@/components/hero-slider";
import GalleryGrid from "@/components/gallery-grid";
import Reveal from "@/components/reveal";
import {
  AnimatedTrustStrip,
  BlogCard,
  CTASection,
  ProductCard,
  SectionHeading,
  ServiceCard,
  StatsGrid,
  TestimonialSlider
} from "@/components/content-blocks";
import {
  businessName,
  certifications,
  galleryImages,
  homeReasons,
  partners,
  services,
  stats,
  testimonials
} from "@/data/site-content";
import { getBlogs, getProducts } from "@/lib/server-api";

export const metadata: Metadata = {
  title: `${businessName} | Agricultural Solutions, Products, and Agribusiness Support`,
  description:
    "Explore iFarmer Agricultural Products Services Limited for fertilizer blending, input supply, agricultural project management, agri software, and bulk agricultural products."
};

export default async function HomePage() {
  const [liveProducts, livePosts] = await Promise.all([getProducts(), getBlogs()]);

  return (
    <div>
      <HeroSlider />
      <AnimatedTrustStrip items={certifications} />

      <section className="bg-white py-20">
        <div className="container">
          <SectionHeading
            eyebrow="Welcome"
            title={`Welcome to ${businessName}`}
            description="We provide fertilizer blending, input supply, agricultural project support, agri software solutions, and bulk commodity sourcing for farmers, institutions, and commercial buyers."
          />

          <div className="mt-14 grid gap-8 lg:grid-cols-[1.3fr,0.7fr]">
            <div className="grid gap-8 md:grid-cols-2">
              {services.map((service, index) => (
                <ServiceCard
                  key={service.slug}
                  service={service}
                  delay={index * 0.07}
                />
              ))}
            </div>
            <Reveal className="rounded-3xl bg-[#F5F5DC] p-8 shadow-soft">
              <h3 className="text-2xl font-bold text-[#2D5016]">
                Why businesses work with us
              </h3>
              <div className="mt-6 space-y-5">
                {homeReasons.map((reason) => (
                  <div
                    key={reason.title}
                    className="rounded-2xl bg-white p-5 shadow-sm"
                  >
                    <h4 className="text-lg font-semibold text-[#2D5016]">
                      {reason.title}
                    </h4>
                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      {reason.description}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-8 rounded-2xl bg-[#2D5016] p-6 text-white">
                <p className="text-sm uppercase tracking-[0.2em] text-white/60">
                  Partnership Reach
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {partners.map((partner) => (
                    <span
                      key={partner}
                      className="rounded-full bg-white/10 px-3 py-2 text-sm"
                    >
                      {partner}
                    </span>
                  ))}
                </div>
                <Link
                  href="/about"
                  className="mt-6 inline-flex rounded-lg bg-[#7CB342] px-5 py-3 font-semibold text-white transition hover:bg-[#689f38]"
                >
                  Learn More About Us
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <StatsGrid stats={stats} />

      <section className="bg-[#F5F5DC] py-20">
        <div className="container">
          <SectionHeading
            eyebrow="Featured Products"
            title="Bulk agricultural products for trade and processing"
            description="Source ginger, soy beans, sesame seeds, cashew, tigernut, hibiscus, cocoa, and other commodities backed by responsive sourcing support."
          />
          {liveProducts.length ? (
            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {liveProducts.slice(0, 4).map((product, index) => (
                <ProductCard
                  key={product.slug}
                  product={product}
                  delay={index * 0.08}
                />
              ))}
            </div>
          ) : (
            <div className="mt-12 rounded-3xl bg-white p-10 text-center shadow-soft">
              <h3 className="text-2xl font-bold text-[#2D5016]">
                Product availability is currently being updated
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Contact our team for current availability, bulk volumes, and supply timelines.
              </p>
            </div>
          )}
          <div className="mt-10 text-center">
            <Link
              href="/shop"
              className="inline-flex rounded-lg bg-[#2D5016] px-6 py-4 font-semibold text-white transition hover:bg-[#7CB342]"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      <TestimonialSlider testimonials={testimonials} />

      <section className="bg-white py-20">
        <div className="container">
          <SectionHeading
            eyebrow="Knowledge Center"
            title="Practical agricultural insights for better decisions"
            description="Explore articles on crop nutrition, farm operations, commodity sourcing, and agribusiness best practices."
          />
          {livePosts.length ? (
            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {livePosts.slice(0, 3).map((post, index) => (
                <BlogCard key={post.slug} post={post} delay={index * 0.08} />
              ))}
            </div>
          ) : (
            <div className="mt-12 rounded-3xl bg-[#F8FAF5] p-10 text-center shadow-soft">
              <h3 className="text-2xl font-bold text-[#2D5016]">
                Fresh articles will be published soon
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Check back for updates from our team on field operations, crop management, and agribusiness trends.
              </p>
            </div>
          )}
        </div>
      </section>

      <CTASection />
      <GalleryGrid images={galleryImages} />
    </div>
  );
}

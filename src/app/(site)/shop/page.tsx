import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import { ProductCard, SectionHeading } from "@/components/content-blocks";
import { businessName } from "@/data/site-content";
import { getProducts } from "@/lib/server-api";

export const metadata: Metadata = {
  title: `Shop Agricultural Products | ${businessName}`,
  description:
    "Browse ginger, soy beans, sesame seeds, cashew, tigernut, hibiscus, cocoa, and other agricultural products from iFarmer."
};

export default async function ShopPage() {
  const liveProducts = await getProducts();

  return (
    <div>
      <PageHero
        title="Product Store"
        description="The new shop page introduces discoverable product SEO pages and a structured buy request workflow for serious buyers."
      />
      <section className="bg-[#F5F5DC] py-20">
        <div className="container">
          <SectionHeading
            eyebrow="Available Products"
            title="Products presented like a real commercial website"
            description="Each product now has its own page, commercial summary, and buy request form that saves buyer details for admin review."
          />
          {liveProducts.length ? (
            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {liveProducts.map((product, index) => (
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
                No live products are available right now
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                The shop now reads directly from the backend product API, so published catalog items will appear here automatically.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

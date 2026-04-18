import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import PageHero from "@/components/page-hero";
import Reveal from "@/components/reveal";
import { BuyRequestForm } from "@/components/forms";
import { ProductCard, SectionHeading } from "@/components/content-blocks";
import { getProductBySlug, getProducts } from "@/lib/server-api";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return {};
  }

  return {
    title: product.seoTitle,
    description: product.seoDescription
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const [product, products] = await Promise.all([
    getProductBySlug(params.slug),
    getProducts()
  ]);

  if (!product) {
    notFound();
  }

  const related = products.filter((item) => item.slug !== product.slug).slice(0, 3);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.seoDescription
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PageHero title={product.name} description={product.description} />
      <section className="bg-white py-20">
        <div className="container grid gap-12 lg:grid-cols-[1fr,0.9fr]">
          <Reveal className="space-y-6">
            <div className="relative h-[420px] overflow-hidden rounded-3xl shadow-soft">
              <Image src={product.image} alt={product.name} fill className="object-cover" />
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-[#F5F5DC] p-5">
                <p className="text-sm text-slate-500">Category</p>
                <p className="mt-2 text-xl font-bold text-[#2D5016]">{product.category}</p>
              </div>
              <div className="rounded-2xl bg-[#F5F5DC] p-5">
                <p className="text-sm text-slate-500">Origin</p>
                <p className="mt-2 text-xl font-bold text-[#2D5016]">{product.origin}</p>
              </div>
              <div className="rounded-2xl bg-[#F5F5DC] p-5">
                <p className="text-sm text-slate-500">Availability</p>
                <p className="mt-2 text-xl font-bold text-[#2D5016]">{product.availability}</p>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <SectionHeading
              eyebrow="Product Detail"
              title={`Bulk supply support for ${product.name}`}
              description={product.summary}
            />
            <div className="prose-content mt-8">
              {product.details.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 rounded-3xl bg-[#F8FAF5] p-8">
              <h3 className="text-2xl font-bold text-[#2D5016]">Commercial Notes</h3>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <p className="text-sm text-slate-500">Minimum Order</p>
                  <p className="mt-2 font-semibold text-slate-800">{product.minOrder}</p>
                </div>
                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <p className="text-sm text-slate-500">Use Cases</p>
                  <p className="mt-2 font-semibold text-slate-800">
                    {product.useCases.join(", ")}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#F5F5DC] py-20">
        <div className="container grid gap-10 lg:grid-cols-[0.9fr,1.1fr]">
          <div className="rounded-3xl bg-white p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-[#2D5016]">Submit a buy request</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              This request is saved to the backend so the admin team can review buyer details and respond properly.
            </p>
            <div className="mt-6">
              <BuyRequestForm
                productName={product.name}
                productSlug={product.slug}
              />
            </div>
          </div>
          <div>
            <SectionHeading
              eyebrow="Related Products"
              title="Explore more agricultural products"
              description="The new store structure supports richer product discovery and lead capture without changing the brand feel of the website."
            />
            {related.length ? (
              <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {related.map((item, index) => (
                  <ProductCard key={item.slug} product={item} delay={index * 0.08} />
                ))}
              </div>
            ) : (
              <div className="mt-8 rounded-3xl bg-white p-8 shadow-sm">
                <p className="text-sm leading-7 text-slate-600">
                  Additional live products will appear here as more catalog entries are published from the admin area.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

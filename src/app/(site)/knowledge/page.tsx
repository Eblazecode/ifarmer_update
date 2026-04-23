import type { Metadata } from "next";
import PageHero from "@/components/page-hero";
import { BlogCard, SectionHeading } from "@/components/content-blocks";
import { businessName } from "@/data/site-content";
import { getBlogs } from "@/lib/server-api";

export const metadata: Metadata = {
  title: `Knowledge Center | ${businessName}`,
  description:
    "Browse articles, guides, tutorials, and agricultural insights from iFarmer Agricultural Products Services Limited."
};

export default async function KnowledgePage() {
  const posts = await getBlogs();

  return (
    <div>
      <PageHero
        title="Knowledge Center"
        description="Explore practical articles, field insights, and agribusiness guidance designed to support better decisions across the agricultural value chain."
      />
      <section className="bg-[#F5F5DC] py-20">
        <div className="container">
          <SectionHeading
            eyebrow="Articles"
            title="Practical insights for farms and agribusinesses"
            description="Read guidance on crop nutrition, farm management, project delivery, market opportunities, and agricultural best practices."
          />
          {posts.length ? (
            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {posts.map((post, index) => (
                <BlogCard key={post.slug} post={post} delay={index * 0.08} />
              ))}
            </div>
          ) : (
            <div className="mt-12 rounded-3xl bg-white p-10 text-center shadow-soft">
              <h3 className="text-2xl font-bold text-[#2D5016]">
                No articles are available right now
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Check back soon for updates on crop management, farm operations, and agribusiness trends.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

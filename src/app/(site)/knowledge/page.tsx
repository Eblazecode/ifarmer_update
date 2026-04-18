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
        description="The knowledge center has been upgraded into a proper blog-ready section with individual article pages and metadata support."
      />
      <section className="bg-[#F5F5DC] py-20">
        <div className="container">
          <SectionHeading
            eyebrow="Articles"
            title="Search-focused content, better structured"
            description="Articles are now designed to become individual pages that can rank, be shared, and be managed from the admin area."
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
                No published articles are available yet
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                This page now loads directly from the backend blog API, so newly published posts will appear here automatically.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

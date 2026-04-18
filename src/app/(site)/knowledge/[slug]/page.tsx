import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import PageHero from "@/components/page-hero";
import { BlogCard, SectionHeading } from "@/components/content-blocks";
import { formatDate } from "@/lib/utils";
import { getBlogBySlug, getBlogs } from "@/lib/server-api";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getBlogBySlug(params.slug);

  if (!post) {
    return {};
  }

  return {
    title: post.seoTitle,
    description: post.seoDescription
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const [post, posts] = await Promise.all([getBlogBySlug(params.slug), getBlogs()]);

  if (!post) {
    notFound();
  }

  const related = posts.filter((item) => item.slug !== post.slug).slice(0, 3);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.publishedAt,
    description: post.seoDescription
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <PageHero title={post.title} description={post.excerpt} />
      <section className="bg-white py-20">
        <div className="container grid gap-12 lg:grid-cols-[1fr,0.8fr]">
          <article className="space-y-8">
            <div className="relative h-[420px] overflow-hidden rounded-3xl shadow-soft">
              <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
              <span className="rounded-full bg-[#EAF7E6] px-3 py-1 font-semibold text-[#2D5016]">
                {post.category}
              </span>
              <span>{post.author}</span>
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            <div
              className="prose-content rounded-3xl bg-[#F8FAF5] p-8"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            <div className="flex flex-wrap gap-3">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[#D6E8CB] bg-white px-4 py-2 text-sm font-medium text-[#2D5016]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>

          <aside>
            <SectionHeading
              eyebrow="Related Articles"
              title="Continue reading"
              description="The new knowledge structure supports real article depth instead of card-only content."
            />
            {related.length ? (
              <div className="mt-8 space-y-6">
                {related.map((item, index) => (
                  <BlogCard key={item.slug} post={item} delay={index * 0.08} />
                ))}
              </div>
            ) : (
              <div className="mt-8 rounded-3xl bg-[#F8FAF5] p-8">
                <p className="text-sm leading-7 text-slate-600">
                  More live articles will appear here as new posts are published from the admin dashboard.
                </p>
              </div>
            )}
          </aside>
        </div>
      </section>
    </div>
  );
}

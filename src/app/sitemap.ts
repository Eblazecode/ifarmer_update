import type { MetadataRoute } from "next";
import { services, siteUrl } from "@/data/site-content";
import { getBlogs, getProducts } from "@/lib/server-api";

export const revalidate = 60;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, blogPosts] = await Promise.all([getProducts(), getBlogs()]);

  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/knowledge",
    "/shop",
    "/contact",
    "/book-appointment",
    "/privacy-policy",
    "/cookie-policy"
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" as const : "monthly" as const,
    priority: route === "" ? 1 : route === "/shop" || route === "/knowledge" ? 0.9 : 0.8
  }));

  const serviceRoutes = services.map((service) => ({
    url: `${siteUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8
  }));

  const productRoutes = products.map((product) => ({
    url: `${siteUrl}/shop/${product.slug}`,
    lastModified: product.updatedAt ? new Date(product.updatedAt) : new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85
  }));

  const blogRoutes = blogPosts.map((post) => ({
    url: `${siteUrl}/knowledge/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.8
  }));

  return [...staticRoutes, ...serviceRoutes, ...productRoutes, ...blogRoutes];
}

import {
  apiUrl,
  services
} from "@/data/site-content";
import { normalizeBlogPost, normalizeBlogPosts } from "@/lib/blog-content";
import type { ApiResponse, BlogPost, Product, Service } from "@/types";

type FetchOptions = {
  revalidate?: number;
};

async function safeFetch<T>(
  endpoint: string,
  options?: FetchOptions
): Promise<T | null> {
  try {
    const response = await fetch(`${apiUrl}${endpoint}`, {
      next: { revalidate: options?.revalidate ?? 300 }
    });

    if (!response.ok) {
      return null;
    }

    const json = (await response.json()) as ApiResponse<T>;
    return json.data;
  } catch {
    return null;
  }
}

export async function getServices() {
  return (await safeFetch<Service[]>("/services")) ?? services;
}

export async function getServiceBySlug(slug: string) {
  return (
    (await safeFetch<Service>(`/services/${slug}`)) ??
    services.find((item) => item.slug === slug) ??
    null
  );
}

export async function getProducts() {
  return (await safeFetch<Product[]>("/products", { revalidate: 60 })) ?? [];
}

export async function getProductBySlug(slug: string) {
  return await safeFetch<Product>(`/products/${slug}`, { revalidate: 60 });
}

export async function getBlogs() {
  const posts = await safeFetch<BlogPost[]>("/blogs", { revalidate: 60 });
  return posts ? normalizeBlogPosts(posts) : [];
}

export async function getBlogBySlug(slug: string) {
  const post = await safeFetch<BlogPost>(`/blogs/${slug}`, { revalidate: 60 });

  if (post) {
    return normalizeBlogPost(post);
  }

  return null;
}

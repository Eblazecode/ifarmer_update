"use client";

import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  isRichTextEmpty,
  normalizeBlogContent
} from "@/lib/blog-content";
import RichTextEditor from "@/components/rich-text-editor";
import {
  useCreateBlogMutation,
  useCreateProductMutation,
  useCreateServiceMutation,
  useUpdateBlogMutation,
  useUpdateProductMutation,
  useUpdateServiceMutation
} from "@/store/services/api";
import type { BlogPost, Product, Service } from "@/types";

const inputClassName =
  "w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900";

function toLines(value?: string[]) {
  return value?.join("\n") ?? "";
}

function fromLines(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function highlightLines(value?: { label: string; value: string }[]) {
  return value?.map((item) => `${item.label}:${item.value}`).join("\n") ?? "";
}

function parseHighlights(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((line) => {
      const [label, ...rest] = line.split(":");
      return {
        label: label.trim(),
        value: rest.join(":").trim()
      };
    });
}

type BlogFormValues = Omit<BlogPost, "_id" | "tags"> & {
  tags: string;
};

const defaultBlogValues: BlogFormValues = {
  title: "",
  slug: "",
  excerpt: "",
  category: "Blog",
  author: "Editorial Team",
  publishedAt: new Date().toISOString().slice(0, 10),
  coverImage: "",
  seoTitle: "",
  seoDescription: "",
  content: "",
  tags: ""
};

export function BlogEditor({
  initialBlog,
  onSaved
}: {
  initialBlog?: BlogPost | null;
  onSaved?: () => void;
}) {
  const [createBlog, createState] = useCreateBlogMutation();
  const [updateBlog, updateState] = useUpdateBlogMutation();
  const form = useForm<BlogFormValues>({
    defaultValues: defaultBlogValues
  });

  useEffect(() => {
    if (initialBlog) {
      form.reset({
        ...initialBlog,
        content: normalizeBlogContent(initialBlog.content),
        tags: initialBlog.tags.join(", ")
      });
      return;
    }

    form.reset(defaultBlogValues);
  }, [form, initialBlog]);

  return (
    <form
      className="space-y-4"
      onSubmit={form.handleSubmit(async (values) => {
        const content = normalizeBlogContent(values.content);

        if (isRichTextEmpty(content)) {
          toast.error("Add blog content before saving.");
          return;
        }

        const payload = {
          ...values,
          content,
          tags: values.tags.split(",").map((item) => item.trim()).filter(Boolean)
        };

        if (initialBlog?._id) {
          await updateBlog({ id: initialBlog._id, body: payload }).unwrap();
          toast.success("Blog updated.");
        } else {
          await createBlog(payload).unwrap();
          toast.success("Blog created.");
          form.reset(defaultBlogValues);
        }

        onSaved?.();
      })}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <input placeholder="Title" className={inputClassName} {...form.register("title")} />
        <input placeholder="Slug" className={inputClassName} {...form.register("slug")} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <input
          placeholder="Category"
          className={inputClassName}
          {...form.register("category")}
        />
        <input placeholder="Author" className={inputClassName} {...form.register("author")} />
      </div>
      <input
        placeholder="Cover image URL"
        className={inputClassName}
        {...form.register("coverImage")}
      />
      <textarea
        rows={3}
        placeholder="Excerpt"
        className={inputClassName}
        {...form.register("excerpt")}
      />
      <div className="grid gap-4 md:grid-cols-2">
        <input
          placeholder="SEO title"
          className={inputClassName}
          {...form.register("seoTitle")}
        />
        <input
          placeholder="SEO description"
          className={inputClassName}
          {...form.register("seoDescription")}
        />
      </div>
      <Controller
        control={form.control}
        name="content"
        render={({ field }) => (
          <RichTextEditor
            value={field.value}
            onChange={field.onChange}
            placeholder="Write the full article content with headings, lists, links, and quotes."
          />
        )}
      />
      <input
        placeholder="Tags separated by commas"
        className={inputClassName}
        {...form.register("tags")}
      />
      <button
        type="submit"
        className="rounded-xl bg-[#2D5016] px-5 py-3 font-semibold text-white"
        disabled={createState.isLoading || updateState.isLoading}
      >
        {createState.isLoading || updateState.isLoading
          ? "Saving..."
          : initialBlog
            ? "Update Blog"
            : "Create Blog"}
      </button>
    </form>
  );
}

export function ProductEditor({
  initialProduct,
  onSaved
}: {
  initialProduct?: Product | null;
  onSaved?: () => void;
}) {
  const [createProduct, createState] = useCreateProductMutation();
  const [updateProduct, updateState] = useUpdateProductMutation();
  const form = useForm({
    defaultValues: {
      name: "",
      slug: "",
      summary: "",
      description: "",
      details: "",
      image: "",
      gallery: "",
      category: "",
      origin: "",
      minOrder: "",
      availability: "",
      seoTitle: "",
      seoDescription: "",
      useCases: ""
    }
  });

  useEffect(() => {
    if (initialProduct) {
      form.reset({
        ...initialProduct,
        details: toLines(initialProduct.details),
        gallery: initialProduct.gallery.join("\n"),
        useCases: initialProduct.useCases.join(", ")
      });
    }
  }, [form, initialProduct]);

  return (
    <form
      className="space-y-4"
      onSubmit={form.handleSubmit(async (values) => {
        const payload = {
          ...values,
          details: fromLines(values.details),
          gallery: fromLines(values.gallery),
          useCases: values.useCases.split(",").map((item) => item.trim()).filter(Boolean)
        };

        if (initialProduct?._id) {
          await updateProduct({ id: initialProduct._id, body: payload }).unwrap();
          toast.success("Product updated.");
        } else {
          await createProduct(payload).unwrap();
          toast.success("Product created.");
          form.reset();
        }

        onSaved?.();
      })}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <input placeholder="Product name" className={inputClassName} {...form.register("name")} />
        <input placeholder="Slug" className={inputClassName} {...form.register("slug")} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <input placeholder="Category" className={inputClassName} {...form.register("category")} />
        <input placeholder="Origin" className={inputClassName} {...form.register("origin")} />
      </div>
      <input placeholder="Image URL" className={inputClassName} {...form.register("image")} />
      <div className="grid gap-4 md:grid-cols-2">
        <input placeholder="Availability" className={inputClassName} {...form.register("availability")} />
        <input placeholder="Minimum order" className={inputClassName} {...form.register("minOrder")} />
      </div>
      <textarea rows={3} placeholder="Summary" className={inputClassName} {...form.register("summary")} />
      <textarea rows={3} placeholder="Description" className={inputClassName} {...form.register("description")} />
      <textarea rows={6} placeholder="Details, one paragraph per line" className={inputClassName} {...form.register("details")} />
      <textarea rows={4} placeholder="Gallery image URLs, one per line" className={inputClassName} {...form.register("gallery")} />
      <div className="grid gap-4 md:grid-cols-2">
        <input placeholder="SEO title" className={inputClassName} {...form.register("seoTitle")} />
        <input placeholder="SEO description" className={inputClassName} {...form.register("seoDescription")} />
      </div>
      <input placeholder="Use cases, comma separated" className={inputClassName} {...form.register("useCases")} />
      <button
        type="submit"
        className="rounded-xl bg-[#2D5016] px-5 py-3 font-semibold text-white"
        disabled={createState.isLoading || updateState.isLoading}
      >
        {createState.isLoading || updateState.isLoading
          ? "Saving..."
          : initialProduct
            ? "Update Product"
            : "Create Product"}
      </button>
    </form>
  );
}

export function ServiceEditor({
  initialService,
  onSaved
}: {
  initialService?: Service | null;
  onSaved?: () => void;
}) {
  const [createService, createState] = useCreateServiceMutation();
  const [updateService, updateState] = useUpdateServiceMutation();
  const form = useForm({
    defaultValues: {
      title: "",
      slug: "",
      summary: "",
      description: "",
      longDescription: "",
      image: "",
      heroImage: "",
      features: "",
      highlights: "",
      seoTitle: "",
      seoDescription: "",
      cta: ""
    }
  });

  useEffect(() => {
    if (initialService) {
      form.reset({
        ...initialService,
        longDescription: toLines(initialService.longDescription),
        features: toLines(initialService.features),
        highlights: highlightLines(initialService.highlights)
      });
    }
  }, [form, initialService]);

  return (
    <form
      className="space-y-4"
      onSubmit={form.handleSubmit(async (values) => {
        const payload = {
          ...values,
          longDescription: fromLines(values.longDescription),
          features: fromLines(values.features),
          highlights: parseHighlights(values.highlights)
        };

        if (initialService?._id) {
          await updateService({ id: initialService._id, body: payload }).unwrap();
          toast.success("Service updated.");
        } else {
          await createService(payload).unwrap();
          toast.success("Service created.");
          form.reset();
        }

        onSaved?.();
      })}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <input placeholder="Service title" className={inputClassName} {...form.register("title")} />
        <input placeholder="Slug" className={inputClassName} {...form.register("slug")} />
      </div>
      <input placeholder="Summary" className={inputClassName} {...form.register("summary")} />
      <textarea rows={3} placeholder="Description" className={inputClassName} {...form.register("description")} />
      <textarea rows={6} placeholder="Long description, one paragraph per line" className={inputClassName} {...form.register("longDescription")} />
      <div className="grid gap-4 md:grid-cols-2">
        <input placeholder="Card image URL" className={inputClassName} {...form.register("image")} />
        <input placeholder="Hero image URL" className={inputClassName} {...form.register("heroImage")} />
      </div>
      <textarea rows={5} placeholder="Features, one per line" className={inputClassName} {...form.register("features")} />
      <textarea rows={4} placeholder="Highlights in label:value format, one per line" className={inputClassName} {...form.register("highlights")} />
      <div className="grid gap-4 md:grid-cols-2">
        <input placeholder="SEO title" className={inputClassName} {...form.register("seoTitle")} />
        <input placeholder="SEO description" className={inputClassName} {...form.register("seoDescription")} />
      </div>
      <input placeholder="CTA text" className={inputClassName} {...form.register("cta")} />
      <button
        type="submit"
        className="rounded-xl bg-[#2D5016] px-5 py-3 font-semibold text-white"
        disabled={createState.isLoading || updateState.isLoading}
      >
        {createState.isLoading || updateState.isLoading
          ? "Saving..."
          : initialService
            ? "Update Service"
            : "Create Service"}
      </button>
    </form>
  );
}

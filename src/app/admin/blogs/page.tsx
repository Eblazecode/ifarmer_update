"use client";

import { useState } from "react";
import AdminGuard from "@/components/admin-guard";
import AdminShell from "@/components/admin-shell";
import { BlogEditor } from "@/components/admin-forms";
import { useAppSelector } from "@/store/hooks";
import { useDeleteBlogMutation, useGetAdminBlogsQuery } from "@/store/services/api";
import type { BlogPost } from "@/types";

export default function AdminBlogsPage() {
  const { token, hydrated } = useAppSelector((state) => state.auth);
  const { data: blogs, refetch } = useGetAdminBlogsQuery(undefined, {
    skip: !hydrated || !token
  });
  const [selected, setSelected] = useState<BlogPost | null>(null);
  const [deleteBlog] = useDeleteBlogMutation();

  return (
    <AdminGuard>
      <AdminShell
        title="Blog Management"
        description="Create or update blog posts that will appear in the knowledge center and on dynamic SEO-friendly article pages."
      >
        <div className="grid gap-8 xl:grid-cols-[0.9fr,1.1fr]">
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h3 className="text-xl font-bold text-[#2D5016]">
              {selected ? "Edit Blog" : "Create Blog"}
            </h3>
            <div className="mt-6">
              <BlogEditor
                initialBlog={selected}
                onSaved={() => {
                  setSelected(null);
                  refetch();
                }}
              />
            </div>
          </div>
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h3 className="text-xl font-bold text-[#2D5016]">Existing Blogs</h3>
            <div className="mt-6 space-y-4">
              {blogs?.map((blog) => (
                <div
                  key={blog._id ?? blog.slug}
                  className="rounded-2xl border border-slate-100 p-5"
                >
                  <h4 className="font-semibold text-slate-800">{blog.title}</h4>
                  <p className="mt-2 text-sm text-slate-500">{blog.slug}</p>
                  <div className="mt-4 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setSelected(blog)}
                      className="rounded-lg bg-[#2D5016] px-4 py-2 text-sm font-semibold text-white"
                    >
                      Edit
                    </button>
                    {blog._id ? (
                      <button
                        type="button"
                        onClick={async () => {
                          await deleteBlog(blog._id as string).unwrap();
                          refetch();
                        }}
                        className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white"
                      >
                        Delete
                      </button>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AdminShell>
    </AdminGuard>
  );
}

"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { X } from "lucide-react";
import type { GalleryImage } from "@/types";

export default function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<GalleryImage | null>(null);

  const tags = useMemo(
    () => ["all", ...Array.from(new Set(images.map((image) => image.tag)))],
    [images]
  );

  const filtered =
    filter === "all" ? images : images.filter((image) => image.tag === filter);

  return (
    <section className="bg-white py-20">
      <div className="container">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-[#2D5016] md:text-4xl">Gallery</h2>
            <p className="mt-3 max-w-2xl text-base leading-8 text-slate-600">
              Explore field activities, commodity handling, team presence, and agribusiness support moments from the iFarmer journey.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {tags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setFilter(tag)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  filter === tag
                    ? "bg-[#7CB342] text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {tag === "all" ? "All" : tag}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((image) => (
            <button
              key={`${image.src}-${image.caption}`}
              type="button"
              onClick={() => setSelected(image)}
              className="group relative overflow-hidden rounded-2xl shadow-lg"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent p-4 text-left text-white opacity-0 transition group-hover:opacity-100">
                <div>
                  <p className="text-sm font-semibold">{image.caption}</p>
                  <p className="text-xs text-white/75">{image.alt}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selected ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-6"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative max-w-4xl overflow-hidden rounded-3xl bg-white"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-3 shadow"
              onClick={() => setSelected(null)}
            >
              <X className="h-5 w-5" />
            </button>
            <div className="relative h-[70vh] w-[min(90vw,1000px)]">
              <Image src={selected.src} alt={selected.alt} fill className="object-contain" />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

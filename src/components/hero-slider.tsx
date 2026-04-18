"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { homeSlides } from "@/data/site-content";

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrent((value) => (value + 1) % homeSlides.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, []);

  const slide = homeSlides[current];

  return (
    <section className="overflow-hidden">
      <div className="grid min-h-[640px] lg:grid-cols-2">
        <div className="relative min-h-[360px] lg:min-h-[640px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.image}
              initial={{ opacity: 0.4, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0.4 }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0"
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-[#1a3009]/25" />
            </motion.div>
          </AnimatePresence>

          <div className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-3 lg:bottom-10">
            <button
              type="button"
              onClick={() =>
                setCurrent((value) => (value - 1 + homeSlides.length) % homeSlides.length)
              }
              className="rounded-full bg-white/85 p-3 text-[#2D5016] shadow-lg transition hover:bg-white"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2 rounded-full bg-black/35 px-3 py-2">
              {homeSlides.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setCurrent(index)}
                  className={`h-2.5 w-2.5 rounded-full transition ${
                    current === index ? "bg-[#7CB342]" : "bg-white/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setCurrent((value) => (value + 1) % homeSlides.length)}
              className="rounded-full bg-white/85 p-3 text-[#2D5016] shadow-lg transition hover:bg-white"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="bg-brand-gradient relative flex items-center">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute -left-24 top-10 h-60 w-60 rounded-full bg-[#7CB342]" />
            <div className="absolute -bottom-20 right-0 h-72 w-72 rounded-full bg-[#8B4513]" />
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45 }}
              className="container relative py-20 lg:py-24"
            >
              <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm text-white/80">
                Agribusiness support, supply, and agricultural products
              </span>
              <h1 className="mt-6 max-w-2xl text-4xl font-bold leading-tight text-white md:text-5xl xl:text-6xl">
                {slide.title}
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">
                {slide.subtitle}
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href={slide.href}
                  className="rounded-lg bg-[#7CB342] px-8 py-4 text-center font-semibold text-white transition hover:bg-[#689f38]"
                >
                  {slide.cta}
                </Link>
                <Link
                  href="/shop"
                  className="rounded-lg border border-white/25 px-8 py-4 text-center font-semibold text-white transition hover:bg-white/10"
                >
                  Explore Products
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

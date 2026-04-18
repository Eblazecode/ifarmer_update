"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Check, PhoneCall } from "lucide-react";
import { motion } from "framer-motion";
import Reveal from "@/components/reveal";
import { contactInfo } from "@/data/site-content";
import type { BlogPost, Product, Service, SiteStat, Testimonial } from "@/types";

export function SectionHeading({
  eyebrow,
  title,
  description
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow ? (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#7CB342]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-bold text-[#2D5016] md:text-4xl">{title}</h2>
      {description ? (
        <p className="mt-4 text-base leading-8 text-slate-600">{description}</p>
      ) : null}
    </div>
  );
}

export function ServiceCard({ service, delay = 0 }: { service: Service; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <article className="group overflow-hidden rounded-2xl bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-2xl">
        <div className="relative h-56 overflow-hidden">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover transition duration-700 group-hover:scale-110"
          />
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-bold text-[#2D5016]">{service.title}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-600">{service.summary}</p>
          <ul className="mt-5 space-y-2">
            {service.features.slice(0, 3).map((feature) => (
              <li key={feature} className="flex items-center gap-2 text-sm text-slate-700">
                <Check className="h-4 w-4 text-[#7CB342]" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <Link
            href={`/services/${service.slug}`}
            className="mt-6 inline-flex items-center font-semibold text-[#7CB342] transition hover:text-[#2D5016]"
          >
            View Service <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </article>
    </Reveal>
  );
}

export function ProductCard({ product, delay = 0 }: { product: Product; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <article className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
        <div className="relative h-56">
          <Image src={product.image} alt={product.name} fill className="object-cover" />
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-2xl font-bold text-[#2D5016]">{product.name}</h3>
            <span className="rounded-full bg-[#F5F5DC] px-3 py-1 text-xs font-semibold text-[#8B4513]">
              {product.category}
            </span>
          </div>
          <p className="mt-3 text-sm leading-7 text-slate-600">{product.summary}</p>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-600">
            <div>
              <p className="font-semibold text-slate-800">Origin</p>
              <p>{product.origin}</p>
            </div>
            <div>
              <p className="font-semibold text-slate-800">Availability</p>
              <p>{product.availability}</p>
            </div>
          </div>
          <Link
            href={`/shop/${product.slug}`}
            className="mt-6 inline-flex items-center font-semibold text-[#7CB342] transition hover:text-[#2D5016]"
          >
            View Product <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </article>
    </Reveal>
  );
}

export function BlogCard({ post, delay = 0 }: { post: BlogPost; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <article className="group overflow-hidden rounded-2xl bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-2xl">
        <div className="relative h-52">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition duration-700 group-hover:scale-105"
          />
        </div>
        <div className="p-6">
          <span className="inline-flex rounded-full bg-[#EAF7E6] px-3 py-1 text-xs font-semibold text-[#2D5016]">
            {post.category}
          </span>
          <h3 className="mt-4 text-xl font-bold text-[#2D5016]">{post.title}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-600">{post.excerpt}</p>
          <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
            <Calendar className="h-4 w-4" />
            <span>{new Date(post.publishedAt).toLocaleDateString("en-NG", { dateStyle: "medium" })}</span>
          </div>
          <Link
            href={`/knowledge/${post.slug}`}
            className="mt-6 inline-flex items-center font-semibold text-[#7CB342] transition hover:text-[#2D5016]"
          >
            Read Article <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </article>
    </Reveal>
  );
}

export function StatsGrid({ stats }: { stats: SiteStat[] }) {
  return (
    <section className="bg-[#2D5016] py-16">
      <div className="container grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Reveal key={stat.label} delay={index * 0.05}>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white">
              <p className="text-4xl font-bold">
                {stat.value.toLocaleString()}
                {stat.suffix ?? ""}
              </p>
              <p className="mt-2 text-sm text-white/75">{stat.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function TestimonialSlider({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section className="bg-[#F5F5DC] py-20">
      <div className="container">
        <SectionHeading
          eyebrow="Client Confidence"
          title="What Our Clients Say"
          description="Built to feel like a serious business website, backed by the same agricultural focus that shaped the original iFarmer experience."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {testimonials.map((item, index) => (
            <Reveal key={item.name} delay={index * 0.08}>
              <article className="rounded-2xl bg-white p-8 shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-full border-4 border-[#7CB342]">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#2D5016]">{item.name}</h3>
                    <p className="text-sm text-slate-500">{item.role}</p>
                  </div>
                </div>
                <p className="mt-6 text-base leading-8 text-slate-700">
                  &ldquo;{item.text}&rdquo;
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTASection() {
  return (
    <section className="bg-brand-gradient relative overflow-hidden py-20">
      <div className="absolute inset-0 opacity-15">
        <div className="absolute -left-10 -top-10 h-72 w-72 rounded-full bg-[#7CB342]" />
        <div className="absolute -bottom-20 right-0 h-80 w-80 rounded-full bg-[#8B4513]" />
      </div>
      <div className="container relative text-center text-white">
        <h2 className="mx-auto max-w-3xl text-3xl font-bold md:text-4xl">
          Ready to transform your agricultural operations?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-white/80">
          Partner with iFarmer Agricultural Products Services Limited for supply, services, project support, and stronger agribusiness execution.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="rounded-lg bg-[#7CB342] px-8 py-4 font-semibold text-white transition hover:bg-[#689f38]"
          >
            Get Started Today
          </Link>
          <a
            href={`tel:${contactInfo.phoneRaw}`}
            className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 font-semibold text-[#2D5016] transition hover:bg-slate-100"
          >
            <PhoneCall className="mr-2 h-5 w-5" />
            Call Us Now
          </a>
        </div>
      </div>
    </section>
  );
}

export function AnimatedTrustStrip({ items }: { items: { name: string; logo: string }[] }) {
  return (
    <section className="border-y bg-white py-8">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid items-center gap-6 md:grid-cols-3"
        >
          {items.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-center rounded-2xl border bg-[#F8FAF5] px-6 py-5"
            >
              <div className="relative h-16 w-full">
                <Image src={item.logo} alt={item.name} fill className="object-contain" />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

import type { ReactNode } from "react";

export default function PageHero({
  title,
  description,
  children
}: {
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="bg-brand-gradient relative overflow-hidden py-20 md:py-24">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -left-16 top-0 h-60 w-60 rounded-full bg-[#7CB342]" />
        <div className="absolute -bottom-16 right-0 h-72 w-72 rounded-full bg-[#8B4513]" />
      </div>
      <div className="container relative text-center text-white">
        <h1 className="text-balance text-4xl font-bold md:text-5xl">{title}</h1>
        <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-white/80">
          {description}
        </p>
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  );
}

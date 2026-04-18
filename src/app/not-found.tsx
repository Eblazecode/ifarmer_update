import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="max-w-lg rounded-3xl border bg-white p-10 text-center shadow-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#7CB342]">
          404
        </p>
        <h1 className="mt-4 text-4xl font-bold text-[#2D5016]">Page not found</h1>
        <p className="mt-4 text-base leading-8 text-slate-600">
          The page you are looking for is not available. Use the link below to go back to the website home page.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-lg bg-[#2D5016] px-6 py-3 font-semibold text-white transition hover:bg-[#7CB342]"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}

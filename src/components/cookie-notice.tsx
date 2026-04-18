"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie, ShieldCheck, X } from "lucide-react";

const storageKey = "ifarmer_cookie_notice_choice";

export default function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const savedChoice = window.localStorage.getItem(storageKey);

    if (!savedChoice) {
      setVisible(true);
    }
  }, []);

  const closeNotice = (choice: "accepted" | "dismissed") => {
    window.localStorage.setItem(storageKey, choice);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible ? (
        <motion.aside
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-6 left-6 z-50 w-[min(26rem,calc(100vw-1.5rem))] overflow-hidden rounded-[1.75rem] border border-white/50 bg-white/90 shadow-2xl backdrop-blur"
        >
          <div className="bg-brand-gradient p-5 text-white">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15">
                  <Cookie className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
                    Cookie Notice
                  </p>
                  <h3 className="mt-2 text-xl font-bold">A better, more reliable browsing experience</h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => closeNotice("dismissed")}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
                aria-label="Dismiss cookie notice"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="space-y-5 p-5">
            <div className="rounded-2xl bg-[#F8FAF5] p-4 text-sm leading-7 text-slate-600">
              We use essential cookies to keep the website working smoothly and to improve site performance. You can read the details in our{" "}
              <Link href="/cookie-policy" className="font-semibold text-[#2D5016] underline underline-offset-4">
                Cookie Policy
              </Link>{" "}
              and{" "}
              <Link href="/privacy-policy" className="font-semibold text-[#2D5016] underline underline-offset-4">
                Privacy Policy
              </Link>.
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-[#DCE8D4] bg-white p-4">
              <ShieldCheck className="h-5 w-5 text-[#2D5016]" />
              <p className="text-sm text-slate-600">
                Your preference is saved on this device and can be updated by clearing browser storage.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => closeNotice("accepted")}
                className="inline-flex items-center justify-center rounded-2xl bg-[#2D5016] px-5 py-3 font-semibold text-white transition hover:bg-[#244112]"
              >
                Accept Cookies
              </button>
              <button
                type="button"
                onClick={() => closeNotice("dismissed")}
                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 px-5 py-3 font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                Dismiss
              </button>
            </div>
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}

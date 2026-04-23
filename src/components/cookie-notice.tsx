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
          className="fixed bottom-4 left-4 right-4 z-50 mx-auto w-full max-w-[30rem] overflow-hidden rounded-[1.5rem] border border-[#DCE8D4] bg-white/95 shadow-2xl backdrop-blur"
        >
          <div className="p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#EAF7E6] text-[#2D5016]">
                <Cookie className="h-5 w-5" />
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5E7D46]">
                      Cookie Notice
                    </p>
                    <h3 className="mt-1 text-base font-bold leading-6 text-[#1F3A10]">
                      We use essential cookies
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => closeNotice("dismissed")}
                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                    aria-label="Dismiss cookie notice"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  We use essential cookies to keep the website working smoothly and improve performance. See our{" "}
                  <Link
                    href="/cookie-policy"
                    className="font-semibold text-[#2D5016] underline underline-offset-4"
                  >
                    Cookie Policy
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy-policy"
                    className="font-semibold text-[#2D5016] underline underline-offset-4"
                  >
                    Privacy Policy
                  </Link>.
                </p>

                <div className="mt-3 flex items-start gap-2 rounded-2xl bg-[#F8FAF5] px-3 py-2.5">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#2D5016]" />
                  <p className="text-xs leading-5 text-slate-600">
                    Your preference is saved on this device and can be reset by clearing browser storage.
                  </p>
                </div>

                <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => closeNotice("accepted")}
                    className="inline-flex items-center justify-center rounded-xl bg-[#2D5016] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#244112]"
                  >
                    Accept Cookies
                  </button>
                  <button
                    type="button"
                    onClick={() => closeNotice("dismissed")}
                    className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}

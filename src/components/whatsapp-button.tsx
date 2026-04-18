"use client";
import { useMemo, useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send, X, MessageCircle } from "lucide-react";
import { contactInfo } from "@/data/site-content";

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const whatsappNumber = useMemo(
    () => contactInfo.phoneRaw.replace(/\D/g, ""),
    []
  );

  useEffect(() => {
    if (isOpen && textareaRef.current) {
      setTimeout(() => textareaRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    const composedMessage = [
      "Hello iFarmer team,",
      trimmedMessage,
      typeof window !== "undefined" ? `Page: ${window.location.href}` : "",
    ]
      .filter(Boolean)
      .join("\n\n");

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(composedMessage)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      sendMessage();
    }
  };

  const charCount = message.trim().length;
  const isReady = charCount > 0;

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/10 backdrop-blur-[2px]"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {/* Widget Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: 16, scale: 0.95, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 16, scale: 0.95, filter: "blur(4px)" }}
              transition={{ type: "spring", stiffness: 420, damping: 30 }}
              className="w-[min(22rem,calc(100vw-3rem))] overflow-hidden rounded-[1.75rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.25),0_0_0_1px_rgba(0,0,0,0.06)]"
              style={{ background: "var(--wa-surface)" }}
            >
              {/* Header */}
              <div className="relative overflow-hidden px-5 pb-5 pt-5">
                {/* Gradient background */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(135deg, #128C7E 0%, #075E54 60%, #054d46 100%)",
                  }}
                />
                {/* Decorative circles */}
                <div
                  className="absolute -right-6 -top-6 h-28 w-28 rounded-full opacity-20"
                  style={{ background: "rgba(255,255,255,0.3)" }}
                />
                <div
                  className="absolute -bottom-8 -left-4 h-24 w-24 rounded-full opacity-10"
                  style={{ background: "rgba(255,255,255,0.4)" }}
                />

                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="relative">
                      <div
                        className="flex h-11 w-11 items-center justify-center rounded-full text-white shadow-md"
                        style={{ background: "rgba(255,255,255,0.2)" }}
                      >
                        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.558 4.14 1.535 5.877L.057 23.215a.75.75 0 0 0 .928.928l5.338-1.478A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.947 0-3.77-.5-5.357-1.377l-.384-.217-3.975 1.1 1.1-3.976-.217-.383A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                        </svg>
                      </div>
                      {/* Online dot */}
                      <span
                        className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-[#075E54]"
                        style={{ background: "#4ade80" }}
                      />
                    </div>

                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-widest text-white/60">
                        WhatsApp
                      </p>
                      <h3 className="text-[15px] font-bold leading-tight text-white">
                        iFarmer Support
                      </h3>
                      <p className="text-[11px] text-white/60">
                        Typically replies in minutes
                      </p>
                    </div>
                  </div>

                  {/* Close button */}
                  <motion.button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="flex h-9 w-9 items-center justify-center rounded-full text-white/70 transition hover:bg-white/15 hover:text-white"
                    whileTap={{ scale: 0.9 }}
                    aria-label="Close WhatsApp widget"
                  >
                    <X className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>

              {/* Body */}
              <div className="bg-white p-4">
                {/* Chat bubble prompt */}
                <div className="mb-3 flex items-start gap-2.5">
                  <div
                    className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full"
                    style={{ background: "#e9fef5" }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-3.5 w-3.5"
                      fill="#128C7E"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.558 4.14 1.535 5.877L.057 23.215a.75.75 0 0 0 .928.928l5.338-1.478A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.947 0-3.77-.5-5.357-1.377l-.384-.217-3.975 1.1 1.1-3.976-.217-.383A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                    </svg>
                  </div>
                  <div
                    className="rounded-2xl rounded-tl-none px-3.5 py-2.5 text-[13px] leading-relaxed text-slate-700 shadow-sm"
                    style={{ background: "#f0fdf8", border: "1px solid #d1fae5" }}
                  >
                    👋 Hi there! How can we help you today?
                  </div>
                </div>

                {/* Textarea */}
                <div
                  className="relative overflow-hidden rounded-2xl transition-all duration-200"
                  style={{
                    border: isFocused
                      ? "1.5px solid #128C7E"
                      : "1.5px solid #e2e8f0",
                    boxShadow: isFocused
                      ? "0 0 0 3px rgba(18,140,126,0.12)"
                      : "none",
                    background: "#f8fafc",
                  }}
                >
                  <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message here…"
                    rows={3}
                    className="w-full resize-none bg-transparent px-4 pb-2 pt-3.5 text-[13.5px] leading-relaxed text-slate-800 placeholder:text-slate-400 focus:outline-none"
                  />
                  <div className="flex items-center justify-between px-4 pb-3">
                    <span className="text-[11px] text-slate-400">
                      {isReady ? `${charCount} chars · ⌘↵ to send` : "⌘↵ to send"}
                    </span>
                  </div>
                </div>

                {/* Send button */}
                <motion.button
                  type="button"
                  onClick={sendMessage}
                  disabled={!isReady}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-[14px] py-3.5 text-[14px] font-semibold text-white transition-all duration-200 disabled:cursor-not-allowed"
                  style={{
                    background: isReady
                      ? "linear-gradient(135deg, #128C7E 0%, #075E54 100%)"
                      : "#cbd5e1",
                  }}
                  whileTap={isReady ? { scale: 0.97 } : {}}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 fill-white"
                    style={{ opacity: isReady ? 1 : 0.6 }}
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.558 4.14 1.535 5.877L.057 23.215a.75.75 0 0 0 .928.928l5.338-1.478A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.947 0-3.77-.5-5.357-1.377l-.384-.217-3.975 1.1 1.1-3.976-.217-.383A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                  </svg>
                  Open in WhatsApp
                </motion.button>

                <p className="mt-2.5 text-center text-[11px] text-slate-400">
                  You&apos;ll be redirected to WhatsApp
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trigger FAB */}
        <motion.button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="group relative flex items-center gap-2.5 overflow-hidden rounded-full px-5 py-4 text-[15px] font-semibold text-white shadow-lg"
          style={{
            background: isOpen
              ? "linear-gradient(135deg, #075E54 0%, #054d46 100%)"
              : "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
            boxShadow: "0 8px 32px rgba(18,140,126,0.45)",
          }}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.04, y: -2 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          aria-label={isOpen ? "Close WhatsApp chat" : "Open WhatsApp chat"}
        >
          {/* Ripple glow */}
          {!isOpen && (
            <motion.span
              className="pointer-events-none absolute inset-0 rounded-full"
              style={{ background: "rgba(37,211,102,0.35)" }}
              animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
            />
          )}

          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="flex items-center gap-2.5"
              >
                <X className="h-5 w-5" />
                <span className="hidden sm:inline">Close</span>
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="flex items-center gap-2.5"
              >
                <MessageCircle className="h-5 w-5" />
                <span className="hidden sm:inline">Chat with Us</span>
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  );
}

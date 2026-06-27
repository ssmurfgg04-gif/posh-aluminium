"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { WHATSAPP_LINK, COMPANY } from "@/lib/constants";

export function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    // Show teaser bubble after 6 seconds
    const t = setTimeout(() => setShowBubble(true), 6000);
    const t2 = setTimeout(() => setShowBubble(false), 14000);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, []);

  const handleSend = () => {
    const text = encodeURIComponent(
      message || "Hello Posh Aluminium, I'd like to enquire about your services."
    );
    window.open(`https://wa.me/${COMPANY.whatsapp}?text=${text}`, "_blank");
    setMessage("");
    setOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[55] flex flex-col items-end gap-3">
      <AnimatePresence>
        {showBubble && !open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.6, x: 20 }}
            onClick={() => {
              setOpen(true);
              setShowBubble(false);
            }}
            className="cursor-pointer glass-card rounded-2xl rounded-br-sm shadow-premium p-4 max-w-[260px] text-sm"
          >
            <p className="font-semibold text-navy dark:text-white mb-1">👋 Chat with us</p>
            <p className="text-muted-foreground text-xs leading-relaxed">
              Get a free quote in minutes. Our team typically replies within 5 minutes during business hours.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="w-[340px] max-w-[calc(100vw-3rem)] glass-card rounded-3xl shadow-premium overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-[#25D366] to-[#128C7E] p-4 text-white flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm leading-tight">Posh Aluminium</p>
                <p className="text-[11px] text-white/85 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-300 animate-pulse" />
                  Typically replies in 5 min
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-white/85 hover:text-white"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Chat body */}
            <div className="p-4 bg-mist/60 dark:bg-card/60">
              <div className="bg-white dark:bg-secondary rounded-2xl rounded-tl-sm p-3 text-sm shadow-sm max-w-[85%]">
                <p className="text-navy dark:text-foreground leading-relaxed">
                  Hello! 👋 How can Posh Aluminium help you today?
                </p>
                <p className="text-[10px] text-muted-foreground mt-1">Just now</p>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                {["Get a free quote", "Visit our showroom", "Talk to an engineer", "Project enquiry"].map((q) => (
                  <button
                    key={q}
                    onClick={() => setMessage(q + ": ")}
                    className="text-[11px] text-left px-2.5 py-1.5 rounded-full bg-white dark:bg-secondary border border-border hover:border-royal hover:text-royal transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-3 bg-white dark:bg-card border-t border-border flex items-center gap-2">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type a message..."
                className="flex-1 bg-mist dark:bg-secondary rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-royal/40"
              />
              <button
                onClick={handleSend}
                className="h-9 w-9 rounded-full bg-[#25D366] hover:bg-[#1FB855] text-white flex items-center justify-center transition-colors shadow-sm"
                aria-label="Send WhatsApp message"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => {
          if (open) {
            setOpen(false);
          } else {
            window.open(WHATSAPP_LINK, "_blank");
            setShowBubble(false);
          }
        }}
        onContextMenu={(e) => {
          e.preventDefault();
          setOpen((p) => !p);
          setShowBubble(false);
        }}
        aria-label="Open WhatsApp chat"
        className="relative h-14 w-14 rounded-full bg-[#25D366] hover:bg-[#1FB855] text-white flex items-center justify-center shadow-[0_10px_30px_rgba(37,211,102,0.45)] transition-colors"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
        <MessageCircle className="h-7 w-7 relative z-10" />
        <span
          onClick={(e) => {
            e.stopPropagation();
            setOpen(true);
            setShowBubble(false);
          }}
          className="absolute -top-1 -right-1 h-5 min-w-5 px-1 rounded-full bg-accent-red text-white text-[10px] font-bold flex items-center justify-center border-2 border-background cursor-pointer"
        >
          1
        </span>
      </motion.button>
    </div>
  );
}

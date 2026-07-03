"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Paperclip } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { label: "About", href: "#about", code: "01" },
  { label: "Experience", href: "#experience", code: "02" },
  { label: "Projects", href: "#projects", code: "03" },
  { label: "Skills", href: "#skills", code: "04" },
  { label: "Contact", href: "#contact", code: "05" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("about");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex justify-center",
        "transition-all duration-500",
      )}
    >
      <div
        className={cn(
          "mt-4 flex w-[min(96%,1180px)] items-center justify-between gap-4 rounded-sm border border-line px-3 py-2.5 transition-all duration-500",
          scrolled ? "glass shadow-paper" : "border-transparent bg-transparent",
        )}
      >
        <a
          href="#about"
          className="group flex items-center gap-2.5 pl-2"
          aria-label="Home"
        >
          <span className="relative grid h-7 w-7 place-items-center rounded-sm border border-line-strong bg-paper">
            <Paperclip size={12} className="text-stamp" />
          </span>
          <span className="font-display text-sm tracking-wide text-ink">
            CASE FILE<span className="text-ink-dim"> · J.M.</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={cn(
                "relative inline-flex items-center gap-1.5 rounded-sm px-3 py-1.5 font-mono text-xs uppercase tracking-[0.16em] transition-colors",
                active === l.href.slice(1)
                  ? "text-stamp"
                  : "text-ink-dim hover:text-ink",
              )}
            >
              {active === l.href.slice(1) && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-x-1 bottom-0.5 border-b-2 border-stamp/70"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative">{l.label}</span>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden items-center gap-2 border-2 border-stamp/70 px-3.5 py-1 font-display text-xs uppercase tracking-[0.18em] text-stamp transition-all hover:bg-stamp/10 md:inline-flex"
          >
            Contact
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-sm border border-line text-ink-dim transition-transform hover:text-stamp active:scale-90 active:text-stamp md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="paper torn-edge-b absolute left-1/2 top-[68px] w-[min(96%,1180px)] -translate-x-1/2 rounded-sm border border-line p-2 pb-4 md:hidden"
          >
            <ul className="flex flex-col">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-2 rounded-sm px-3 py-2 font-mono text-xs uppercase tracking-[0.16em] transition-colors active:bg-stamp/10",
                      active === l.href.slice(1)
                        ? "bg-stamp/10 text-stamp"
                        : "text-ink-dim hover:bg-ink/[0.04] hover:text-ink",
                    )}
                  >
                    <span className="text-[10px] text-ink-dimmer">
                      [{l.code}]
                    </span>
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="mt-1 px-1 py-1">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="block border-2 border-stamp/70 px-3 py-2 text-center font-display text-xs uppercase tracking-[0.18em] text-stamp transition-transform active:scale-[0.98]"
                >
                  Contact
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Send,
  Twitter,
} from "lucide-react";
import { useState } from "react";
import BlurReveal from "@/components/ui/BlurReveal";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollFloat from "@/components/ui/ScrollFloat";

const links = [
  {
    label: "Email",
    value: "jamesmanonog@gmail.com",
    href: "mailto:jamesmanonog@gmail.com",
    icon: Mail,
    code: "",
  },
  {
    label: "GitHub",
    value: "JamesManon-og",
    href: "https://github.com/JamesManon-og",
    icon: Github,
    code: "",
  },
  {
    label: "LinkedIn",
    value: "James Manon-og",
    href: "https://www.linkedin.com/in/james-manon-og-0326a7314/",
    icon: Linkedin,
    code: "",
  },
  {
    label: "Instagram",
    value: "mnngjms",
    href: "https://www.instagram.com/mnngjms/",
    icon: Instagram,
    code: "",
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden border-t border-line"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(74,222,128,0.16),transparent_60%)] blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-phosphor/30 to-transparent" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 grid-bg-tight opacity-30 mask-radial"
      />

      <div className="container-mx container-px pb-12 pt-32 md:pb-20 md:pt-44">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-6">
            <h2 className="mt-6 h-display text-5xl font-semibold tracking-tight md:text-7xl">
              <ScrollFloat
                as="span"
                containerClassName="block"
                scrollStart="top bottom"
                scrollEnd="top 40%"
                stagger={0.04}
                animationDuration={1.2}
              >
                {"Let's build"}
              </ScrollFloat>
              <ScrollFloat
                as="span"
                containerClassName="block gradient-text-aurora"
                scrollStart="top bottom+=10%"
                scrollEnd="top 35%"
                stagger={0.025}
                animationDuration={1.2}
              >
                something exceptional.
              </ScrollFloat>
            </h2>
            <BlurReveal
              delay={0.15}
              className="mt-6 max-w-md text-base text-ink-dim"
            >
              I'm currently accepting a small number of new collaborations. Send
              a signal about your project and I'll get back within two business
              days.
            </BlurReveal>

            <BlurReveal
              delay={0.25}
              className="mt-10 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-phosphor-200"
            >
              <MapPin size={14} />
              Davao City, Philippines · UTC+8
            </BlurReveal>

            <ul className="mt-10 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {links.map((l, i) => {
                const Icon = l.icon;
                return (
                  <motion.li
                    key={l.label}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.7, delay: i * 0.06 }}
                  >
                    <a
                      href={l.href}
                      className="group relative flex items-center justify-between rounded border border-line bg-bg-card/40 px-4 py-3 transition-colors hover:border-phosphor/40 hover:bg-phosphor/[0.04] active:border-phosphor/40 active:bg-phosphor/[0.06]"
                    >
                      <span
                        aria-hidden
                        className="absolute left-1.5 top-1.5 h-1.5 w-1.5 border-l border-t border-phosphor/60"
                      />
                      <span
                        aria-hidden
                        className="absolute right-1.5 bottom-1.5 h-1.5 w-1.5 border-r border-b border-phosphor/60"
                      />
                      <span className="flex items-center gap-3">
                        <span className="grid h-8 w-8 place-items-center rounded border border-phosphor/30 bg-phosphor/10 text-phosphor-200">
                          <Icon size={14} />
                        </span>
                        <span className="flex flex-col">
                          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-phosphor/70">
                            {l.code} {l.label}
                          </span>
                          <span className="text-sm text-ink">{l.value}</span>
                        </span>
                      </span>
                      <ArrowUpRight
                        size={16}
                        className="text-phosphor/60 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-phosphor-200"
                      />
                    </a>
                  </motion.li>
                );
              })}
            </ul>
          </div>

          <BlurReveal delay={0.1} className="lg:col-span-6 lg:self-end">
            <ContactForm />
          </BlurReveal>
        </div>

        <Footer />
      </div>
    </section>
  );
}

function ContactForm() {
  const [state, setState] = useState<"idle" | "loading" | "sent">("idle");
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState("loading");

    const form = e.currentTarget;
    const name =
      (form.elements.namedItem("name") as HTMLInputElement)?.value || "";
    const email =
      (form.elements.namedItem("email") as HTMLInputElement)?.value || "";
    const message =
      (form.elements.namedItem("message") as HTMLTextAreaElement)?.value || "";

    const subject = `Project Inquiry from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

    setTimeout(() => {
      window.location.href = `mailto:jamesmanonog@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setState("sent");
    }, 600);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="relative overflow-hidden rounded border border-line bg-bg-card/60 p-6 md:p-8"
    >
      {/* corners */}
      <span
        aria-hidden
        className="absolute left-2 top-2 h-3 w-3 border-l border-t border-phosphor/60"
      />
      <span
        aria-hidden
        className="absolute right-2 top-2 h-3 w-3 border-r border-t border-phosphor/60"
      />
      <span
        aria-hidden
        className="absolute left-2 bottom-2 h-3 w-3 border-l border-b border-phosphor/60"
      />
      <span
        aria-hidden
        className="absolute right-2 bottom-2 h-3 w-3 border-r border-b border-phosphor/60"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute top-32 right-0 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(74,222,128,0.22),transparent_60%)] blur-2xl"
      />
      <div className="relative">
        <div className="flex items-center justify-between border-b border-line pb-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-phosphor-200">
            ▸ /usr/sync.exe
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-phosphor/60" />
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-phosphor/70">
              LINK_ACTIVE
            </span>
          </span>
        </div>

        <div className="mt-6 grid gap-4">
          <Field id="name" label="name" placeholder="James Manon-og" />
          <Field
            id="email"
            type="email"
            label="email"
            placeholder="jamesmanonog@gmail.com"
          />

          <Field
            id="message"
            label="message"
            placeholder="// Encode your project, timeline, and what success looks like."
            as="textarea"
          />
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-phosphor/60">
            will reply ≤ 48h
          </span>
          <motion.button
            type="submit"
            whileTap={{ scale: 0.97 }}
            disabled={state !== "idle"}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded border border-phosphor/50 bg-phosphor/15 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.22em] text-phosphor-200 transition-all hover:bg-phosphor/25 hover:shadow-phosphor disabled:opacity-80"
          >
            <span className="relative z-10 flex items-center gap-2 phosphor-glow">
              {state === "sent" ? (
                <>
                  Synced <Send size={14} />
                </>
              ) : state === "loading" ? (
                <>
                  Syncing
                  <span className="ml-1 flex items-center gap-0.5">
                    {[0, 1, 2].map((d) => (
                      <motion.span
                        key={d}
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: d * 0.15,
                        }}
                        className="h-1 w-1 rounded-full bg-phosphor"
                      />
                    ))}
                  </span>
                </>
              ) : (
                <>
                  Sync <Send size={14} />
                </>
              )}
            </span>
          </motion.button>
        </div>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  placeholder,
  type = "text",
  as = "input",
  optional,
}: {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
  as?: "input" | "textarea";
  optional?: boolean;
}) {
  const Cmp: "input" | "textarea" = as;
  return (
    <label htmlFor={id} className="group block">
      <span className="mb-1.5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-phosphor/70">
        <span>▸ {label}</span>
        {optional && <span className="text-phosphor/40">// optional</span>}
      </span>
      <Cmp
        id={id}
        name={id}
        type={type}
        rows={as === "textarea" ? 5 : undefined}
        placeholder={placeholder}
        className="w-full resize-none rounded border border-line bg-black/40 px-4 py-3 font-mono text-sm text-ink placeholder:text-ink-dimmer outline-none transition-colors focus:border-phosphor/50 focus:bg-phosphor/[0.04] focus:shadow-[0_0_0_4px_rgba(74,222,128,0.08)]"
      />
    </label>
  );
}

function Footer() {
  return (
    <footer className="mt-24 border-t border-line pt-10">
      <div className="flex flex-col gap-10">
        {/* Oversized wordmark — now uses the full row width */}
        <div className="select-none overflow-hidden">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="h-display text-balance text-[clamp(3.5rem,13vw,10rem)] font-semibold leading-[0.85] tracking-tighter text-phosphor/15 phosphor-glow"
          >
            JAMES MANON-OG
          </motion.div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.18em] text-phosphor/60 md:flex-row md:items-center">
          <div className="flex flex-wrap items-center gap-3">
            <span>© 2026 made to last! </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-phosphor-200">
              again!
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

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
} from "lucide-react";
import { useState } from "react";
import BlurReveal from "@/components/ui/BlurReveal";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollFloat from "@/components/ui/ScrollFloat";
import FingerprintMark from "@/components/ui/FingerprintMark";

const links = [
  {
    label: "Email",
    value: "jamesmanonog@gmail.com",
    href: "mailto:jamesmanonog@gmail.com",
    icon: Mail,
  },
  {
    label: "GitHub",
    value: "JamesManon-og",
    href: "https://github.com/JamesManon-og",
    icon: Github,
  },
  {
    label: "LinkedIn",
    value: "James Manon-og",
    href: "https://www.linkedin.com/in/james-manon-og-0326a7314/",
    icon: Linkedin,
  },
  {
    label: "Instagram",
    value: "mnngjms",
    href: "https://www.instagram.com/mnngjms/",
    icon: Instagram,
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden border-t border-line"
    >
      <div className="container-mx container-px pb-12 pt-32 md:pb-20 md:pt-44">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-6">
            <SectionLabel index="005" label="Witness Statement" />
            <h2 className="mt-6 h-display font-display text-[2.5rem] tracking-tight sm:text-5xl md:text-7xl">
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
                containerClassName="block text-stamp"
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
              I'm currently accepting a small number of new collaborations.
              File a statement about your project and I'll get back within two
              business days.
            </BlurReveal>

            <BlurReveal
              delay={0.25}
              className="typed-label mt-10 flex items-center gap-2 !text-xs"
            >
              <MapPin size={14} className="text-stamp" />
              Davao City, Philippines · UTC+8
            </BlurReveal>

            <ul className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
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
                      className="paper group relative flex items-center justify-between rounded-sm px-4 py-3 transition-all hover:shadow-paper-lift"
                    >
                      <span className="flex items-center gap-3">
                        <span className="grid h-8 w-8 place-items-center rounded-sm border border-line-strong bg-paper-aged text-stamp">
                          <Icon size={14} />
                        </span>
                        <span className="flex flex-col">
                          <span className="typed-label !text-[9px]">
                            {l.label}
                          </span>
                          <span className="text-sm text-ink">{l.value}</span>
                        </span>
                      </span>
                      <ArrowUpRight
                        size={16}
                        className="text-ink-dimmer transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-stamp"
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

type FormState = "idle" | "loading" | "sent" | "error";

function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Capture before any await — React nulls currentTarget after the event.
    const form = e.currentTarget;

    const name =
      (form.elements.namedItem("name") as HTMLInputElement)?.value.trim() || "";
    const email =
      (form.elements.namedItem("email") as HTMLInputElement)?.value.trim() ||
      "";
    const message =
      (
        form.elements.namedItem("message") as HTMLTextAreaElement
      )?.value.trim() || "";
    const botcheck =
      (form.elements.namedItem("botcheck") as HTMLInputElement)?.checked ??
      false;

    if (!name || !message) {
      setError("Name and statement are required.");
      setState("error");
      return;
    }
    if (!/.+@.+\..+/.test(email)) {
      setError("A valid contact address is required.");
      setState("error");
      return;
    }

    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    if (!accessKey) {
      setError("Form is not configured yet — use the email link instead.");
      setState("error");
      return;
    }

    setError(null);
    setState("loading");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `Portfolio inquiry from ${name}`,
          name,
          email,
          message,
          botcheck,
        }),
      });
      const json = await res.json();
      if (json.success) {
        form.reset();
        setState("sent");
      } else {
        setError("Filing failed — please try again or use the email link.");
        setState("error");
      }
    } catch {
      setError("Network error — please try again or use the email link.");
      setState("error");
    }
  };

  if (state === "sent") {
    return (
      <div className="torn-shadow relative">
        <span className="pushpin" aria-hidden />
        <div className="paper-aged crease-d2 torn-1 relative p-10 text-center md:p-14">
          <span className="stamp text-2xl">Statement Filed</span>
          <div className="mt-4 flex justify-center">
            <span className="date-stamp text-[10px]">
              RECEIVED ·{" "}
              {new Date()
                .toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })
                .toUpperCase()}
            </span>
          </div>
          <p className="mt-5 text-sm text-ink-dim">
            Your statement has been logged in the case file. I'll get back to
            you within two business days.
          </p>
          <button
            type="button"
            onClick={() => setState("idle")}
            className="typed-label mt-6 inline-block border-b border-dashed border-line-strong pb-0.5 !text-[11px] transition-colors hover:text-stamp"
          >
            File another statement
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="torn-shadow tape-corners relative">
    <form
      onSubmit={onSubmit}
      className="paper ruled-paper torn-4 relative p-6 md:p-8"
    >
      <div className="relative">
        <div className="flex items-center justify-between border-b-2 border-ink/60 pb-3">
          <span className="font-display text-xs uppercase tracking-[0.2em] text-ink">
            Form 27-B · Witness Statement
          </span>
          <span className="stamp !rotate-0 text-[9px]">Confidential</span>
        </div>

        {/* Honeypot — real visitors never see or tick this */}
        <input
          type="checkbox"
          name="botcheck"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute -left-[9999px] h-px w-px"
        />

        <div className="mt-6 grid gap-5">
          <Field id="name" label="Name of witness" placeholder="James Manon-og" />
          <Field
            id="email"
            type="email"
            label="Contact address"
            placeholder="jamesmanonog@gmail.com"
          />
          <Field
            id="message"
            label="Statement"
            placeholder="“Describe your project, timeline, and what success looks like.”"
            as="textarea"
          />
        </div>

        {error && (
          <p
            role="alert"
            className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-stamp"
          >
            ✗ {error}
          </p>
        )}

        {/* Signature line */}
        <div className="mt-6 flex items-end gap-3 border-t border-dashed border-line-strong pt-4">
          <span className="typed-label !text-[9px]">Signed:</span>
          <span className="font-hand text-2xl leading-none text-ink-dim">
            James
          </span>
          <FingerprintMark size={26} rotate={-8} className="text-stamp/25" />
        </div>

        <div className="mt-5 flex items-center justify-between gap-4">
          <span className="typed-label !text-[9px]">will reply ≤ 48h</span>
          <motion.button
            type="submit"
            whileTap={{ scale: 0.97 }}
            disabled={state === "loading"}
            className="inline-flex items-center gap-2 border-[3px] border-double border-stamp px-5 py-2.5 font-display text-xs uppercase tracking-[0.2em] text-stamp transition-all hover:bg-stamp/10 disabled:opacity-60"
          >
            {state === "loading" ? (
              <>
                Filing
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
                      className="h-1 w-1 rounded-full bg-stamp"
                    />
                  ))}
                </span>
              </>
            ) : (
              <>
                File Statement <Send size={14} />
              </>
            )}
          </motion.button>
        </div>
      </div>
    </form>
    </div>
  );
}

function Field({
  id,
  label,
  placeholder,
  type = "text",
  as = "input",
}: {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
  as?: "input" | "textarea";
}) {
  const Cmp: "input" | "textarea" = as;
  return (
    <label htmlFor={id} className="group block">
      <span className="typed-label mb-1.5 block">{label}</span>
      <Cmp
        id={id}
        name={id}
        type={type}
        required
        rows={as === "textarea" ? 5 : undefined}
        placeholder={placeholder}
        className="w-full resize-none border-b border-line-strong bg-transparent px-1 py-2 font-mono text-sm text-ink outline-none transition-colors placeholder:text-ink-dimmer/70 focus:border-stamp"
      />
    </label>
  );
}

function Footer() {
  return (
    <footer className="mt-24 border-t border-line-strong pt-10">
      <div className="flex flex-col gap-10">
        {/* Oversized faded stamp wordmark */}
        <div className="relative select-none overflow-hidden">
          <div className="mb-6 flex justify-center">
            <span className="stamp-box text-center text-xs md:text-sm">
              <span className="block">Archived</span>
              <span className="block text-[0.6em] tracking-[0.3em]">
                Evidence Locked
              </span>
            </span>
          </div>
          <FingerprintMark
            size={64}
            rotate={18}
            className="absolute bottom-0 right-4 text-ink/10"
          />
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="h-display text-balance font-display text-[clamp(3rem,11vw,9rem)] leading-[0.9] text-stamp/20"
          >
            JAMES MANON-OG
          </motion.div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-dim md:flex-row md:items-center">
          <div className="flex flex-wrap items-center gap-3">
            <span>© 2026 made to last!</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="transition-colors hover:text-stamp">
              again!
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

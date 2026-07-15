"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import BlurReveal from "@/components/ui/BlurReveal";
import TypewriterText from "@/components/ui/TypewriterText";
import Polaroid from "@/components/ui/Polaroid";
import RiskLevel from "@/components/ui/RiskLevel";
import FingerprintMark from "@/components/ui/FingerprintMark";
import BinderClip from "@/components/ui/BinderClip";
import EvidenceTag from "@/components/ui/EvidenceTag";
import { useDeviceCapability } from "@/lib/useDeviceCapability";

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const { reducedMotion, tier } = useDeviceCapability();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Parallax only on capable desktops; off for lite tier and reduced-motion.
  const parallaxRange = reducedMotion || tier === "lite" ? 0 : 120;
  const y = useTransform(scrollYProgress, [0, 1], [0, parallaxRange]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="about"
      ref={ref}
      className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden pt-28"
    >
      {/* Warm light pool over the kraft board */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute left-1/2 top-[-15%] h-[55rem] w-[55rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,244,214,0.22),transparent_60%)] blur-2xl" />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="container-mx container-px relative"
      >
        {/* File header row */}
        <BlurReveal>
          <div className="flex flex-wrap items-center gap-4">
            <span className="stamp text-lg md:text-xl">Evidence File</span>
            <span className="typed-label">FILE NO. 001 · OPENED 2022</span>
          </div>
        </BlurReveal>

        <div className="mt-8 grid items-start gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <h1 className="h-display font-display text-[clamp(2.6rem,8vw,6.75rem)] text-ink">
              <TypewriterText
                text="Greetings!"
                speed={55}
                delay={200}
                as="span"
                className="block"
              />
              <TypewriterText
                text="Call me Ox"
                speed={55}
                delay={1200}
                as="span"
                className="block text-stamp"
              />
            </h1>

            <BlurReveal delay={0.65}>
              <div className="tape-corners relative mt-10 max-w-2xl -rotate-1">
                <div className="paper relative rounded-sm p-6 pb-8">
                  <span className="typed-label">SUBJECT PROFILE</span>
                  <p className="mt-3 text-balance text-base leading-relaxed text-ink-dim md:text-lg">
                    My full name is{" "}
                    <span className="bg-stamp/15 px-1 font-mono font-bold text-stamp">
                      James Manon-og
                    </span>{" "}
                    a software engineer specializing in full-stack engineer
                    driven by a passion for building products that are not only
                    functional, but meaningful. Over the past four years, I've
                    dedicated myself to crafting fast, accessible, and
                    thoughtfully engineered digital experiences, working at the
                    intersection of scalable architecture, robust
                    infrastructure, and AI. I'm deeply motivated by the
                    challenge of turning complex ideas into intuitive, elegant
                    solutions that create real impact.
                  </p>

                  {/* Typed dossier fields */}
                  <dl className="mt-5 grid gap-x-8 gap-y-2 border-t border-dashed border-line-strong pt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-dim sm:grid-cols-2">
                    <div className="flex gap-2">
                      <dt className="text-ink-dimmer">Name:</dt>
                      <dd>Manon-og, James</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="text-ink-dimmer">Alias:</dt>
                      <dd className="bg-stamp/15 px-1 font-bold text-stamp">
                        "OX"
                      </dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="text-ink-dimmer">Location:</dt>
                      <dd>Davao City, PH</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="text-ink-dimmer">Status:</dt>
                      <dd>Active — open for work</dd>
                    </div>
                    <div className="flex gap-2 sm:col-span-2">
                      <dt className="text-ink-dimmer">Known affiliates:</dt>
                      <dd
                        className="redacted redacted-hover"
                        title="declassify"
                        tabIndex={0}
                      >
                        coffee shops
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-4 flex items-end justify-between">
                    <RiskLevel label="THREAT LEVEL" level={5} />
                    <FingerprintMark
                      size={44}
                      rotate={12}
                      className="text-ink/15"
                    />
                  </div>
                </div>
              </div>
            </BlurReveal>

            <BlurReveal delay={0.85} className="mt-8 flex items-center gap-3">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 border-[3px] border-double border-stamp px-5 py-3 font-display text-xs uppercase tracking-[0.18em] text-stamp transition-all hover:gap-3 hover:bg-stamp/10 active:scale-[0.98]"
              >
                <span>View Exhibits</span>
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </a>
              <a
                href="/Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="paper inline-flex items-center gap-2 rounded-sm border border-line px-5 py-3 font-mono text-xs uppercase tracking-[0.18em] text-ink transition-all hover:border-stamp/50 hover:text-stamp active:scale-[0.98]"
              >
                View Resume
              </a>
            </BlurReveal>
          </div>

          {/* The subject's photo, taped to the board */}
          <BlurReveal
            delay={0.5}
            className="hidden justify-center md:col-span-5 md:flex md:justify-end"
          >
            <div className="relative">
              <Polaroid
                src="/images/myImage.jpg"
                alt="Portrait of James Manon-og"
                caption="the developer, 2026"
                rotate={3}
                className="w-[min(100%,320px)]"
              />
              <BinderClip
                size={54}
                className="absolute -top-7 left-1/2 z-10 -translate-x-1/2 rotate-2"
              />
              <span className="stamp-box absolute -right-6 top-8 z-10 rotate-[8deg] text-xl md:text-2xl">
                Top Secret
              </span>
              <EvidenceTag
                lines={["EVIDENCE TAG: 001-A", "FILED BY: J.M.", "DATE: 2026"]}
                rotate={-7}
                className="absolute -bottom-32 left-2 z-10 hidden lg:block"
              />
            </div>
          </BlurReveal>
        </div>

        <BlurReveal delay={1.05} className="mt-16">
          <div className="relative grid grid-cols-2 gap-x-8 gap-y-6 border-t border-line-strong pt-8 md:grid-cols-4">
            <span aria-hidden className="typed-label absolute -top-2 left-0">
              ── CASE STATISTICS
            </span>
            {stats.map((s) => (
              <div key={s.label} className="relative">
                <div className="font-display text-3xl tracking-tight text-ink md:text-4xl">
                  {s.value}
                </div>
                <div className="typed-label mt-1">{s.label}</div>
              </div>
            ))}
            <div className="flex items-end md:justify-end">
              <span className="stamp text-[10px]">Keep Confidential</span>
            </div>
          </div>
        </BlurReveal>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-ink-dim md:flex"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.28em]">
          ↓
        </span>
      </motion.div>
    </section>
  );
}

const stats = [
  { value: "04+", label: "Years on learning" },
  { value: "37", label: "Open repos" },
  { value: "∞", label: "Caffeine ml" },
];

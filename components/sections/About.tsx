"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Download, Crosshair } from "lucide-react";
import { useRef } from "react";
import BlurReveal from "@/components/ui/BlurReveal";
import DecryptedText from "@/components/ui/DecryptedText";
import { useDeviceCapability } from "@/lib/useDeviceCapability";

const headline = ["Hello", "I'm", "Ox,", "Greetings!"];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const { reducedMotion, coarsePointer } = useDeviceCapability();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Tone the parallax down on touch and off entirely for reduced-motion.
  const parallaxRange = reducedMotion ? 0 : coarsePointer ? 40 : 120;
  const y = useTransform(scrollYProgress, [0, 1], [0, parallaxRange]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="about"
      ref={ref}
      className="relative isolate flex min-h-[100svh] flex-col justify-center pt-28"
    >
      {/* Phosphor glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute left-1/2 top-[-15%] h-[55rem] w-[55rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(74,222,128,0.18),transparent_60%)] blur-2xl" />
        <div className="absolute left-[10%] top-[30%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(74,222,128,0.10),transparent_60%)] blur-3xl" />
        <div className="absolute right-[8%] top-[20%] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(134,255,161,0.10),transparent_60%)] blur-3xl" />
      </div>

      {/* Grid + dot wireframe */}
      {/* <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 grid-bg opacity-70 mask-radial"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 dot-bg opacity-40 mask-radial"
      /> */}

      {/* <SchematicCorners /> */}
      {/* <FloatingTargets /> */}

      <motion.div
        style={{ y, opacity }}
        className="container-mx container-px relative"
      >
        {/* <BlurReveal>
          <div className="inline-flex items-center gap-3 rounded border border-phosphor/30 bg-phosphor/[0.06] px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-phosphor-200 backdrop-blur">
            <span className="relative grid h-2 w-2 place-items-center">
              <span className="absolute h-full w-full animate-ping rounded-full bg-phosphor/60" />
              <span className="h-1.5 w-1.5 rounded-full bg-phosphor shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
            </span>
            <DecryptedText
              text="Signal acquired · Available Q3 2026"
              animateOn="view"
              sequential
              speed={35}
              encryptedClassName="opacity-40"
            />
            <span className="text-phosphor/60">
              <DecryptedText
                text="// REC"
                animateOn="view"
                sequential
                speed={50}
                encryptedClassName="opacity-30"
              />
            </span>
          </div>
        </BlurReveal> */}

        <h1 className="mt-8 h-display text-[clamp(2.6rem,9vw,7.5rem)] font-semibold tracking-tighter">
          {headline.map((word, i) => (
            <motion.span
              key={word + i}
              initial={{ opacity: 0, y: 40, filter: "blur(16px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 1.1,
                delay: 0.2 + i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mr-[0.25em] inline-block"
            >
              {i === headline.length - 1 ? (
                <span className="gradient-text-aurora">
                  <DecryptedText
                    text={word}
                    animateOn="view"
                    sequential
                    revealDirection="start"
                    speed={55}
                    encryptedClassName="opacity-25"
                  />
                </span>
              ) : (
                <span className="gradient-text">
                  <DecryptedText
                    text={word}
                    animateOn="view"
                    sequential
                    revealDirection="start"
                    speed={55}
                    encryptedClassName="opacity-25"
                  />
                </span>
              )}
            </motion.span>
          ))}
        </h1>

        <div className="mt-10 grid gap-10 md:grid-cols-12">
          <BlurReveal delay={0.65} className="md:col-span-7">
            <div className="relative max-w-2xl">
              {/* <span
                aria-hidden
                className="absolute -left-3 top-1 hidden font-mono text-[10px] uppercase tracking-[0.22em] text-phosphor/60 md:block"
              >
                /// DOSSIER //
              </span> */}
              <p className="text-balance text-base leading-relaxed text-ink-dim md:text-lg">
                My name is{" "}
                <span className="text-phosphor-200 phosphor-glow">
                  <DecryptedText
                    text="James Manon-og"
                    animateOn="hover"
                    speed={50}
                    maxIterations={15}
                    encryptedClassName="opacity-50"
                  />
                </span>{" "}
                Full-stack engineer and designer based in the Philippines. For
                the past four years, I’ve been building fast, accessible, and
                quietly beautiful products at the intersection of design
                systems, infrastructure, and AI.
              </p>
            </div>
          </BlurReveal>

          <BlurReveal
            delay={0.85}
            className="flex items-center gap-3 md:col-span-5 md:justify-end"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded border border-phosphor/50 bg-phosphor/10 px-5 py-3 font-mono text-xs uppercase tracking-[0.18em] text-phosphor-200 transition-all hover:gap-3 hover:bg-phosphor/20 hover:shadow-phosphor active:scale-[0.98]"
            >
              <span className="phosphor-glow">Projects</span>
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </a>
            <a
              href="/Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded border border-line bg-bg-card/60 px-5 py-3 font-mono text-xs uppercase tracking-[0.18em] text-ink transition-all hover:border-phosphor/30 hover:text-phosphor-200 active:scale-[0.98]"
            >
              View Resume
            </a>
          </BlurReveal>
        </div>

        <BlurReveal delay={1.05} className="mt-20">
          <div className="relative grid grid-cols-2 gap-x-8 gap-y-6 border-t border-line pt-8 md:grid-cols-4">
            <span
              aria-hidden
              className="absolute -top-2 left-0 font-mono text-[9px] uppercase tracking-[0.24em] text-phosphor/60"
            >
              ── STATS
            </span>
            {stats.map((s, i) => (
              <div key={s.label} className="relative">
                <div className="font-mono text-3xl font-medium tracking-tight text-ink phosphor-glow md:text-4xl">
                  <DecryptedText
                    text={s.value}
                    animateOn="view"
                    sequential
                    revealDirection="center"
                    speed={60}
                    characters="0123456789+∞ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()"
                    encryptedClassName="opacity-30"
                  />
                </div>
                <div className="mt-1 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-ink-dimmer">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </BlurReveal>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-phosphor/60 md:flex"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.28em]">
          <DecryptedText
            text="↓"
            animateOn="view"
            sequential
            speed={45}
            encryptedClassName="opacity-30"
          />
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

function SchematicCorners() {
  const labels = [
    { pos: "left-6 top-24", text: "ENTITY //01 — ARCHIVE" },
    { pos: "right-6 top-24", text: "OP_STATUS // 1.0.4" },
    { pos: "left-6 bottom-24", text: "CHRONO 26.05.21" },
    { pos: "right-6 bottom-24", text: "FREQ // 8.40Hz" },
  ];
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 hidden md:block"
    >
      {/* {labels.map((l) => (
        <span
          key={l.text}
          className={`absolute font-mono text-[9px] uppercase tracking-[0.26em] text-phosphor/55 ${l.pos}`}
        >
          <DecryptedText
            text={l.text}
            animateOn="view"
            sequential
            speed={30}
            encryptedClassName="opacity-25"
          />
        </span>
      ))} */}
      {/* Tick marks along left edge */}
      <div className="absolute left-3 top-1/2 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
        {Array.from({ length: 9 }).map((_, i) => (
          <span
            key={i}
            className={`block h-px ${i % 3 === 0 ? "w-4 bg-phosphor/70" : "w-2 bg-phosphor/30"}`}
          />
        ))}
      </div>
      <div className="absolute right-3 top-1/2 hidden -translate-y-1/2 flex-col items-end gap-3 lg:flex">
        {Array.from({ length: 9 }).map((_, i) => (
          <span
            key={i}
            className={`block h-px ${i % 3 === 0 ? "w-4 bg-phosphor/70" : "w-2 bg-phosphor/30"}`}
          />
        ))}
      </div>
    </div>
  );
}

function FloatingTargets() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <motion.div
        className="absolute right-[12%] top-32 hidden md:block"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <div className="relative grid h-24 w-24 place-items-center rounded-full border border-phosphor/40">
          <div className="absolute inset-2 rounded-full border border-phosphor/20" />
          <div className="absolute inset-5 rounded-full border border-phosphor/20" />
          <Crosshair size={16} className="text-phosphor/70 phosphor-glow" />
          <span className="absolute top-1 left-1/2 -translate-x-1/2 h-1 w-px bg-phosphor/70" />
          <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-px bg-phosphor/70" />
          <span className="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-px bg-phosphor/70" />
          <span className="absolute right-1 top-1/2 -translate-y-1/2 w-1 h-px bg-phosphor/70" />
        </div>
      </motion.div>

      {/* <motion.div
        className="absolute left-[8%] top-[60%] hidden md:block"
        animate={{ y: [0, -10, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-phosphor/70">
          <div>★ trace_01</div>
          <div className="mt-1 h-px w-16 bg-gradient-to-r from-phosphor/70 to-transparent" />
          <div className="mt-1 text-phosphor/40">lat 52.520 // lng 13.404</div>
        </div>
      </motion.div> */}
    </div>
  );
}

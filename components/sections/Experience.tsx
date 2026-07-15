"use client";

import { motion } from "framer-motion";
import BlurReveal from "@/components/ui/BlurReveal";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollFloat from "@/components/ui/ScrollFloat";
import BinderClip from "@/components/ui/BinderClip";
import { cn } from "@/lib/utils";

// Per-card dressing so no two cards on the board look alike: each gets its
// own paper stock, fold pattern, rip silhouette, fastener and stain.
const dress = [
  {
    fastener: "tape" as const,
    surface: "paper crease-d2",
    torn: "torn-2",
    rotate: "-rotate-1",
    stain: <span className="stain-ring" style={{ top: 18, right: 26 }} aria-hidden />,
  },
  {
    fastener: "clip" as const,
    surface: "paper-grid",
    torn: "torn-3",
    rotate: "rotate-[0.75deg]",
    stain: null,
  },
  {
    fastener: "pin" as const,
    surface: "paper-old crease-h",
    torn: "torn-1",
    rotate: "-rotate-[1.5deg]",
    stain: (
      <span className="stain-blot" style={{ bottom: 8, left: 14 }} aria-hidden />
    ),
  },
];

const items = [
  {
    period: "Jan 2025 — June 2026",
    role: "Full Stack Developer",
    company: "Samahan System Developer",
    location: "Davao City",
    summary:
      "Led university-wide system projects concentrating on backend development and frontend management.",
    stack: [
      "React",
      "NextJS",
      "NestJS",
      "Javascript",
      "Postgres",
      "... and more",
    ],
  },
  {
    period: "May 2025 — June 2025",
    role: "Intern Trainee",
    company: "Orange & Bronze Software Labs, Inc.",
    location: "Makati City",
    summary:
      "Specialized in backend systems within enterprise-grade software development at a leading fintech company in the Philippines.",
    stack: [
      "Springboot",
      "Java",
      "Kubernetes",
      "Postgres",
      "GitLabs CI/CD",
      "... and more",
    ],
  },
  {
    period: "Aug 2025 - Jan 2026",
    role: "Software Developer Intern",
    company: "Symph",
    location: "Cebu City",
    summary:
      "Developed and maintained web application features, improving user experience, integrating key platform capabilities, and implementing Google Cloud solutions to streamline workflows.",
    stack: [
      "NodeJS",
      "ExpressJs",
      "ReactJs",
      "Google Cloud",
      "NestJS",
      "... and more",
    ],
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative isolate overflow-hidden pb-32 pt-16 md:pb-44 md:pt-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-line-strong to-transparent"
      />

      <div className="container-mx container-px">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-12">
          {/* Left — heading + description */}
          <div className="flex flex-col justify-center">
            <SectionLabel index="002" label="Service Record" />
            <h2 className="mt-6 h-display max-w-3xl font-display text-[2.5rem] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
              <ScrollFloat
                as="span"
                containerClassName="block"
                scrollStart="top bottom"
                scrollEnd="top 40%"
                stagger={0.025}
                animationDuration={1.2}
              >
                Built software
              </ScrollFloat>
              <ScrollFloat
                as="span"
                containerClassName="block text-ink-dim text-4xl md:text-5xl"
                scrollStart="top bottom+=10%"
                scrollEnd="top 35%"
                stagger={0.02}
                animationDuration={1.2}
              >
                {"Independently and with teams"}
              </ScrollFloat>
            </h2>
            <BlurReveal
              delay={0.15}
              className="mt-6 max-w-md text-base text-ink-dim"
            >
              From mid-sized studios to large-scale platforms, each role has
              contributed to how I think, design, and build software today,
              shaping a more intentional and practical approach to engineering.
            </BlurReveal>
          </div>

          {/* Right — stacked index cards, pinned crooked to the board */}
          <div className="relative flex flex-col gap-10 py-6">
            <span
              aria-hidden
              className="stamp-diagonal left-1/2 top-1/3 -translate-x-1/2 text-5xl sm:text-6xl md:text-7xl"
            >
              Service Record
            </span>
            {items.map((item, i) => (
              <motion.article
                key={item.company}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={cn(
                  "torn-shadow relative transition-transform duration-300 hover:rotate-0",
                  dress[i].rotate,
                  dress[i].fastener === "tape" && "tape-x"
                )}
              >
                {dress[i].fastener === "pin" && (
                  <span className="pushpin" aria-hidden />
                )}
                {dress[i].fastener === "clip" && (
                  <BinderClip
                    size={44}
                    className="absolute -top-6 left-10 z-10 -rotate-3"
                  />
                )}
                <div
                  className={cn(
                    "relative p-7 md:p-8",
                    dress[i].surface,
                    dress[i].torn
                  )}
                >
                  {dress[i].stain}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="typed-label">CASE NO. 00{i + 1}</span>
                        <span className="date-stamp text-[10px]">
                          RECEIVED · {item.period}
                        </span>
                      </div>
                      <h3 className="mt-3 font-display text-xl tracking-tight text-ink">
                        {item.role}
                      </h3>
                      <p className="mt-1 inline-block bg-stamp/15 px-1 font-mono text-sm font-bold text-stamp">
                        {item.company}
                      </p>
                    </div>
                    <span className="typed-label shrink-0">
                      {item.location}
                    </span>
                  </div>
                  <p className="mt-4 text-base leading-relaxed text-ink-dim">
                    {item.summary}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {item.stack.map((s) => (
                      <li
                        key={s}
                        className="border border-line bg-paper-aged px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-dim"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

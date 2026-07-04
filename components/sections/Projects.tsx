"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollFloat from "@/components/ui/ScrollFloat";
import Polaroid from "@/components/ui/Polaroid";
import RiskLevel from "@/components/ui/RiskLevel";
import EvidenceTag from "@/components/ui/EvidenceTag";
import { cn } from "@/lib/utils";

// Per-card dressing so each exhibit reads as its own artifact: distinct
// paper stock, fold, rip, fastener and stain per card.
const dress = [
  {
    fastener: "tape" as const,
    surface: "paper",
    torn: "torn-4",
    rotate: "-rotate-1",
    stain: false,
    dogEar: false,
  },
  {
    fastener: "pin" as const,
    surface: "paper-aged crease-d1",
    torn: "torn-2",
    rotate: "rotate-[1.75deg]",
    stain: true,
    dogEar: false,
  },
  {
    fastener: "tag" as const,
    surface: "paper-old crease-h",
    torn: "torn-3",
    rotate: "-rotate-[0.5deg]",
    stain: false,
    dogEar: true,
  },
];

type Project = {
  title: string;
  caption: string;
  description: string;
  year: string;
  tags: string[];
  href: string;
  github: string;
  exhibit: string;
  /** 1–5 classification/complexity level */
  risk: number;
  image: string;
};

const projects: Project[] = [
  {
    title: "ADTO",
    caption: "adto, 2026",
    description:
      "It’s a centralized space designed to make finding and joining ADDU events easier than ever before. To ensure the best experience for everyone.",
    year: "2026",
    tags: ["React", "React Query", "Supabase", "Tailwind CSS", "... and more"],
    href: "https://samahan.addu.edu.ph/adto/home",
    github: "https://github.com/SAMAHAN-Systems-Development/adto-client",
    exhibit: "A",
    risk: 4,
    image: "/images/adto.png",
  },
  {
    title: "FoodOrdering Inventory Management System",
    caption: "bakery ops, 2025",
    description:
      "This mobile application is designed to simplify inventory management for bakery businesses, ensuring efficient operations and a seamless user experience for managing product stock, sales, and transactions.",
    year: "2025",
    tags: [
      "React Native",
      "React Query",
      "Tanstactic",
      "Node.js",
      "... and more",
    ],
    href: "#",
    github: "https://github.com/JamesManon-og/FoodOrdering",
    exhibit: "B",
    risk: 3,
    image: "/images/mobile.png",
  },
  {
    title: "Money App",
    caption: "money app, 2026",
    description:
      "Money App is an expense tracker that lets you log and settle shared spending with friends, groups, and yourself in plain English (e.g. 50 grab chowking, +50 gcash james) and pay each other back natively over GCash.",
    year: "2026",
    tags: ["Next.js", "NestJS", "OpenAI API", "Google Auth", "... and more"],
    href: "https://moneyapp.click",
    github: "https://github.com/Valora69/nexus",
    exhibit: "C",
    risk: 5,
    image: "/images/moneyApp.png",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative isolate min-h-screen overflow-hidden border-t border-line py-24 md:py-32"
    >
      <div className="container-mx container-px">
        <div className="mb-16 flex flex-col items-start justify-center gap-6 md:mb-24">
          <SectionLabel index="003" label="Exhibits" />
          <h2 className="mt-2 h-display max-w-3xl font-display text-6xl tracking-tight md:text-7xl lg:text-8xl">
            <ScrollFloat
              as="span"
              containerClassName="block"
              scrollStart="top bottom"
              scrollEnd="top 40%"
              stagger={0.03}
              animationDuration={1.2}
            >
              Selected work
            </ScrollFloat>
            <ScrollFloat
              as="span"
              containerClassName="block text-ink-dim"
              scrollStart="top bottom+=10%"
              scrollEnd="top 35%"
              stagger={0.025}
              animationDuration={1.2}
            >
              {"that I'm proud of."}
            </ScrollFloat>
          </h2>
        </div>

        {/* Evidence board — one file card per exhibit */}
        <div className="grid gap-14 md:grid-cols-3 md:gap-8 lg:gap-10">
          {projects.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.7,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={cn(
                "torn-shadow relative flex transition-all duration-300 hover:rotate-0",
                dress[i].rotate,
                dress[i].fastener === "tape" && "tape-corners"
              )}
            >
              {dress[i].fastener === "pin" && (
                <span className="pushpin" aria-hidden />
              )}
              {dress[i].fastener === "tag" && (
                <EvidenceTag
                  lines={[`EXHIBIT ${p.exhibit}`, `FILED ${p.year}`]}
                  rotate={8}
                  className="absolute -top-2 right-4 z-10 hidden xl:block"
                />
              )}
              <div
                className={cn(
                  "relative flex flex-1 flex-col p-6",
                  dress[i].surface,
                  dress[i].torn,
                  dress[i].dogEar && "dog-ear"
                )}
              >
                {dress[i].stain && (
                  <span
                    className="stain-ring"
                    style={{ bottom: 90, right: 18 }}
                    aria-hidden
                  />
                )}
              <div className="flex items-start justify-between gap-3">
                <span className="stamp text-sm">Exhibit {p.exhibit}</span>
                <span className="typed-label mt-1">FILED {p.year}</span>
              </div>

              <Polaroid
                src={p.image}
                alt={`Screenshot of ${p.title}`}
                caption={p.caption}
                rotate={i % 2 === 0 ? 1.5 : -1.5}
                className="mx-auto mt-6 w-full max-w-[300px]"
                imgClassName="aspect-[4/3] object-cover object-top"
              />

              <h3 className="mt-6 font-display text-lg leading-snug tracking-tight text-ink">
                {p.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-dim">
                {p.description}
              </p>

              <RiskLevel
                label="CLASSIFICATION LEVEL"
                level={p.risk}
                className="mt-5"
              />

              <ul className="mt-5 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <li
                    key={t}
                    className="border border-line bg-paper-aged px-2 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-dim"
                  >
                    {t}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-dashed border-line-strong pt-4">
                <div className="flex items-center gap-3">
                  {p.href !== "#" && (
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-stamp transition-colors hover:text-stamp-dark"
                    >
                      [ View Exhibit <ArrowUpRight size={12} /> ]
                    </a>
                  )}
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-dim transition-colors hover:text-ink"
                  >
                    [ Source <Github size={12} /> ]
                  </a>
                </div>
                <span className="stamp-box !rotate-2 text-[9px]">
                  {p.href !== "#" ? "Approved for release" : "Sealed"}
                </span>
              </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

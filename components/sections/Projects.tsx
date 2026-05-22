"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, X } from "lucide-react";
import { useState } from "react";
import BlurReveal from "@/components/ui/BlurReveal";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollFloat from "@/components/ui/ScrollFloat";
import Folder from "@/components/ui/Folder";

type Project = {
  title: string;
  description: string;
  year: string;
  tags: string[];
  href: string;
  github: string;
  size: "lg" | "md";
  visual: "grid" | "wave" | "orbit" | "spectrum" | "matrix" | "halo";
  designation: string;
  image?: string;
};

const projects: Project[] = [
  {
    title: "ADTO",
    description:
      "It’s a centralized space designed to make finding and joining ADDU events easier than ever before. To ensure the best experience for everyone.",
    year: "2026",
    tags: ["React", "React Query", "Supabase", "Tailwind CSS", "... and more"],
    href: "https://samahan.addu.edu.ph/adto/home",
    github: "https://github.com/SAMAHAN-Systems-Development/adto-client",
    size: "lg",
    visual: "grid",
    designation: "",
    image: "/images/adto.png",
  },
  {
    title: "FoodOrdering Inventory Management System",
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
    size: "md",
    visual: "wave",
    designation: "",
    image: "/images/mobile.png",
  },
  {
    title: "Money App",
    description:
      "Money App is an expense tracker that lets you log and settle shared spending with friends, groups, and yourself in plain English (e.g. 50 grab chowking, +50 gcash james) and pay each other back natively over GCash.",
    year: "2026",
    tags: ["Next.js", "NestJS", "OpenAI API", "Google Auth", "... and more"],
    href: "https://moneyapp.click",
    github: "https://github.com/Valora69/nexus",
    size: "md",
    visual: "matrix",
    designation: "",
    image: "/images/moneyApp.png",
  },
];

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);

  const currentProjects = projects.slice(0, 3);

  const paperItems = currentProjects.map((p) => (
    <button
      key={p.title}
      onClick={(e) => {
        e.stopPropagation();
        setSelected(p);
      }}
      className="group w-full h-full relative overflow-hidden rounded-lg cursor-pointer bg-black"
    >
      <ProjectVisual visual={p.visual} image={p.image} />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg" />
    </button>
  ));

  return (
    <section
      id="projects"
      className="relative isolate overflow-hidden border-t border-line min-h-screen py-24 md:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 grid-bg-tight opacity-30 mask-radial"
      />
      <div className="container-mx container-px">
        <div className="flex flex-col items-start justify-center gap-6 md:flex-row md:items-end mb-20">
          <div>
            <h2 className="mt-6 h-display max-w-3xl text-5xl font-semibold tracking-tight md:text-8xl">
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
        </div>
      </div>

      {/* Central folder with project visuals inside */}
      <div className="flex flex-col items-center justify-center mt-72">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Folder
            color="#4ade80"
            size={3}
            items={paperItems}
            className="cursor-pointer hover:drop-shadow-2xl transition-all"
          />
        </motion.div>
      </div>

      {/* Detail modal */}
      {selected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelected(null)}
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/40 pointer-events-auto"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto rounded-lg border border-line bg-bg-card/95 p-8 shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={() => setSelected(null)}
              className="absolute right-4 top-4 p-2 hover:bg-phosphor/10 rounded transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            {/* Project visual */}
            <div className="relative mb-6 aspect-[16/10] overflow-hidden rounded border border-phosphor/30 bg-black">
              <ProjectVisual visual={selected.visual} image={selected.image} />
            </div>

            {/* Content */}
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-phosphor/70">
                    // {selected.year} · {selected.designation}
                  </span>
                  <h3 className="mt-2 text-2xl font-medium tracking-tight md:text-3xl">
                    {selected.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-ink-dimmer">
                  <a
                    href={selected.github}
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`${selected.title} on GitHub`}
                    className="rounded border border-line p-2 hover:border-phosphor/40 hover:bg-phosphor/10 hover:text-phosphor-200 transition-colors"
                  >
                    <Github size={16} />
                  </a>
                  <a
                    href={selected.href}
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`Open ${selected.title}`}
                    className="rounded border border-phosphor/40 bg-phosphor/10 p-2 text-phosphor-200 hover:bg-phosphor hover:text-black transition-colors"
                  >
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>

              <p className="text-base text-ink-dim leading-relaxed">
                {selected.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-4">
                {selected.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded border border-line bg-phosphor/[0.04] px-3 py-1.5 font-mono text-xs text-phosphor-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}

function ProjectVisual({
  visual,
  image,
}: {
  visual: Project["visual"];
  image?: string;
}) {
  if (image) {
    return (
      <img
        src={image}
        alt="Project visual"
        className="absolute inset-0 w-full h-full object-cover"
      />
    );
  }

  switch (visual) {
    case "grid":
      return (
        <div className="absolute inset-0">
          <div className="absolute inset-0 grid-bg-tight opacity-90 mask-fade-b" />
          {/* Wireframe pyramid */}
          <svg viewBox="0 0 400 250" className="absolute inset-0 h-full w-full">
            <g stroke="rgba(74,222,128,0.8)" strokeWidth="0.8" fill="none">
              <path d="M200,40 L80,200 L320,200 Z" />
              <path d="M200,40 L200,200" />
              <path d="M80,200 L320,200" />
              <ellipse cx="200" cy="200" rx="120" ry="22" opacity="0.5" />
              <ellipse cx="200" cy="200" rx="80" ry="14" opacity="0.35" />
            </g>
          </svg>
          <motion.div
            initial={{ opacity: 0.4 }}
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-phosphor/20 blur-3xl"
          />
        </div>
      );
    case "wave":
      return (
        <div className="absolute inset-0">
          <svg viewBox="0 0 400 200" className="absolute inset-0 h-full w-full">
            {[...Array(10)].map((_, i) => (
              <motion.path
                key={i}
                d={`M0,${100 + i * 6} Q100,${60 + i * 4} 200,${100 + i * 6} T400,${100 + i * 6}`}
                stroke={`rgba(74,222,128,${0.8 - i * 0.06})`}
                strokeWidth="0.8"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: i * 0.1 }}
              />
            ))}
            <g
              stroke="rgba(74,222,128,0.4)"
              strokeWidth="0.4"
              strokeDasharray="2 4"
            >
              <line x1="0" y1="100" x2="400" y2="100" />
              <line x1="200" y1="0" x2="200" y2="200" />
            </g>
          </svg>
        </div>
      );
    case "orbit":
      return (
        <div className="absolute inset-0">
          <div className="absolute inset-0 grid place-items-center">
            {[1, 2, 3].map((r) => (
              <motion.div
                key={r}
                className="absolute rounded-full border border-phosphor/40"
                style={{ width: r * 90, height: r * 90 }}
                animate={{ rotate: r % 2 === 0 ? 360 : -360 }}
                transition={{
                  duration: 16 + r * 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <span
                  className="absolute h-2 w-2 rounded-full bg-phosphor shadow-[0_0_10px_rgba(74,222,128,0.9)]"
                  style={{ top: -4, left: "50%" }}
                />
              </motion.div>
            ))}
            <div className="h-3 w-3 rounded-full bg-phosphor shadow-[0_0_28px_rgba(74,222,128,0.95)]" />
            {/* crosshair */}
            <span className="absolute h-full w-px bg-phosphor/15" />
            <span className="absolute h-px w-full bg-phosphor/15" />
          </div>
        </div>
      );
    case "spectrum":
      return (
        <div className="absolute inset-0">
          <div className="absolute inset-0 flex items-end justify-center gap-1 p-6">
            {[...Array(28)].map((_, i) => (
              <motion.span
                key={i}
                className="w-1.5 rounded-t-sm bg-phosphor/70 shadow-[0_0_8px_rgba(74,222,128,0.5)]"
                initial={{ height: 4 }}
                animate={{
                  height: [
                    8 + Math.random() * 60,
                    8 + Math.random() * 100,
                    8 + Math.random() * 40,
                  ],
                }}
                transition={{
                  duration: 1.6 + Math.random(),
                  repeat: Infinity,
                  delay: i * 0.04,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
          <span className="absolute left-3 top-3 font-mono text-[9px] uppercase tracking-[0.2em] text-phosphor/70">
            ƒ 440Hz
          </span>
        </div>
      );
    case "matrix":
      return (
        <div className="absolute inset-0">
          <div className="absolute inset-0 grid grid-cols-12 grid-rows-7 gap-[2px] p-3">
            {[...Array(84)].map((_, i) => (
              <motion.span
                key={i}
                className="rounded-sm bg-phosphor/30"
                animate={{ opacity: [0.1, 0.9, 0.1] }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        </div>
      );
    case "halo":
      return (
        <div className="absolute inset-0">
          <motion.div
            initial={{ scale: 0.9, opacity: 0.4 }}
            animate={{ scale: [0.9, 1.05, 0.9], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-phosphor/40"
          />
          <motion.div
            initial={{ scale: 0.6, opacity: 0.6 }}
            animate={{ scale: [0.6, 0.8, 0.6], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-phosphor/70"
          />
          <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-phosphor shadow-[0_0_28px_rgba(74,222,128,1)]" />
          {/* radial sweep */}
          <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full">
            <defs>
              <linearGradient id="sweep" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="rgba(74,222,128,0.8)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <motion.line
              x1="100"
              y1="100"
              x2="200"
              y2="100"
              stroke="url(#sweep)"
              strokeWidth="1"
              style={{ transformOrigin: "100px 100px" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
          </svg>
        </div>
      );
    default:
      return null;
  }
}

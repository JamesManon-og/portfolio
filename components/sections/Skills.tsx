"use client";

import { motion } from "framer-motion";
import {
  Atom,
  Database,
  Server,
  Cloud,
  Sparkles,
  Cpu,
  Layers,
  Boxes,
  Wand2,
  Globe2,
  Container,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import BlurReveal from "@/components/ui/BlurReveal";
import ScrollVelocity from "@/components/ui/ScrollVelocity";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollFloat from "@/components/ui/ScrollFloat";

const categories = [
  {
    title: "Frontend",
    icon: Atom,
    designation: "client side",
    skills: [
      "TypeScript",
      "React / Next.js",
      "Tailwind CSS",
      "Framer Motion",
      "Three.js",
      "Vite",
    ],
  },
  {
    title: "Backend",
    icon: Server,
    designation: "server side",
    skills: [
      "Node.js",
      "Nest.js",
      "python / FastAPI",
      "tRPC / GraphQL",
      "Bun",
      "Java / Spring Boot",
    ],
  },
  {
    title: "Database",
    icon: Database,
    designation: "data layer",
    skills: [
      "Postgres",
      "Supabase / Firebase",
      "Prisma / TypeORM",
      "MySQL",
      "AWS EC2",
      "Google Cloud Platform",
    ],
  },
  {
    title: "DevOps",
    icon: Cloud,
    designation: "infrastructure",
    skills: [
      "Kubernetes",
      "Docker",
      "GitHub Actions",
      "Vercel",
      "AWS",
      "Render",
    ],
  },
] as const;

const techMarquee = [
  // Frontend
  { name: "TypeScript", icon: Atom },
  { name: "React", icon: Atom },
  { name: "Next.js", icon: Layers },
  { name: "Tailwind CSS", icon: Wand2 },
  { name: "Framer Motion", icon: Sparkles },
  { name: "Three.js", icon: Cpu },
  { name: "Vite", icon: Layers },
  // Backend
  { name: "Node.js", icon: Server },
  { name: "Nest.js", icon: Server },
  { name: "Python", icon: Cpu },
  { name: "FastAPI", icon: Server },
  { name: "tRPC", icon: Sparkles },
  { name: "GraphQL", icon: Sparkles },
  { name: "Bun", icon: Server },
  { name: "Java", icon: Cpu },
  { name: "Spring Boot", icon: Server },
  // Database
  { name: "Postgres", icon: Database },
  { name: "Supabase", icon: Database },
  { name: "Firebase", icon: Database },
  { name: "Prisma", icon: Database },
  { name: "TypeORM", icon: Database },
  { name: "MySQL", icon: Database },
  { name: "Redis", icon: Boxes },
  // Infrastructure
  { name: "Kubernetes", icon: Container },
  { name: "Docker", icon: Container },
  { name: "GitHub Actions", icon: Workflow },
  { name: "AWS", icon: Cloud },
  { name: "AWS EC2", icon: Cloud },
  { name: "Google Cloud", icon: Cloud },
  { name: "Vercel", icon: Globe2 },
  { name: "Render", icon: Globe2 },
  // Others
  { name: "Rust", icon: Cpu },
  { name: "Go", icon: Workflow },
  { name: "ClickHouse", icon: Server },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative isolate overflow-hidden border-t border-line py-32 md:py-44"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[35rem] w-[35rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(74,222,128,0.10),transparent_60%)] blur-3xl" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 dot-bg opacity-25 mask-radial"
      />

      <div className="container-mx container-px">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="mt-6 h-display max-w-3xl text-5xl font-semibold tracking-tight md:text-6xl">
              <ScrollFloat
                as="span"
                containerClassName="block"
                scrollStart="top bottom"
                scrollEnd="top 40%"
                stagger={0.03}
                animationDuration={1.2}
              >
                The tools and technologies
              </ScrollFloat>
              <ScrollFloat
                as="span"
                containerClassName="block text-ink-dim"
                scrollStart="top bottom+=10%"
                scrollEnd="top 35%"
                stagger={0.025}
                animationDuration={1.2}
              >
                {" I use to build and ship."}
              </ScrollFloat>
            </h2>
          </div>
          {/* <BlurReveal delay={0.15} className="max-w-md text-base text-ink-dim">
            A pragmatic stack honed across startups and platform teams. I pick
            tools that respect users, teammates, and future-me.
          </BlurReveal> */}
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat, i) => (
            <SkillCard key={cat.title} category={cat} index={i} />
          ))}
        </div>

        <ScrollVelocity
          velocity={60}
          numCopies={4}
          texts={[
            techMarquee.map((t, i) => (
              <TechChip key={i} name={t.name} Icon={t.icon} />
            )),
            [...techMarquee]
              .reverse()
              .map((t, i) => (
                <TechChip key={i} name={t.name} Icon={t.icon} muted />
              )),
          ]}
          scrollerStyle={{ gap: "10px", padding: "6px 0" }}
        />
      </div>
    </section>
  );
}

function SkillCard({
  category,
  index,
}: {
  category: (typeof categories)[number];
  index: number;
}) {
  const Icon = category.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.08,
      }}
      whileHover={{ y: -4 }}
      className="group relative isolate overflow-hidden rounded border border-line bg-bg-card/60 p-6 transition-colors hover:border-phosphor/40 hover:shadow-phosphor"
    >
      {/* corners */}
      <span
        aria-hidden
        className="absolute left-2 top-2 h-2 w-2 border-l border-t border-phosphor/60"
      />
      <span
        aria-hidden
        className="absolute right-2 top-2 h-2 w-2 border-r border-t border-phosphor/60"
      />
      <span
        aria-hidden
        className="absolute left-2 bottom-2 h-2 w-2 border-l border-b border-phosphor/60"
      />
      <span
        aria-hidden
        className="absolute right-2 bottom-2 h-2 w-2 border-r border-b border-phosphor/60"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-phosphor/20 opacity-30 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
      />

      <div className="flex items-center justify-between">
        <div className="grid h-11 w-11 place-items-center rounded border border-phosphor/40 bg-phosphor/10">
          <Icon className="text-phosphor-200" size={20} strokeWidth={1.6} />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-phosphor/70">
          ▸ {category.designation}
        </span>
      </div>

      <h3 className="mt-6 text-xl font-medium tracking-tight phosphor-glow">
        {category.title}
      </h3>
      <ul className="mt-4 space-y-1.5">
        {category.skills.map((s) => (
          <li key={s} className="flex items-center gap-2 text-sm text-ink-dim">
            <span className="h-1 w-1 rounded-full bg-phosphor/70 shadow-[0_0_6px_rgba(74,222,128,0.6)]" />
            {s}
          </li>
        ))}
      </ul>
      <div className="mt-5 callout-line opacity-70" />
      <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.22em] text-phosphor/50">
        // module_loaded
      </div>
    </motion.div>
  );
}

function TechChip({
  name,
  Icon,
  muted,
}: {
  name: string;
  Icon: LucideIcon;
  muted?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded border px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] ${
        muted
          ? "border-line bg-transparent text-ink-dim"
          : "border-phosphor/30 bg-phosphor/[0.06] text-phosphor-200"
      }`}
    >
      <Icon size={13} className="text-phosphor/80" />
      {name}
    </span>
  );
}

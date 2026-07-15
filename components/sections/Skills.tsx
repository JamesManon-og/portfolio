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
import ScrollVelocity from "@/components/ui/ScrollVelocity";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollFloat from "@/components/ui/ScrollFloat";
import { useDeviceCapability } from "@/lib/useDeviceCapability";

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
      <div className="container-mx container-px">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-4">
              <SectionLabel index="004" label="Evidence Inventory" />
              <span className="stamp-box text-[9px]">Authorized equipment</span>
            </div>
            <h2 className="mt-6 h-display max-w-4xl font-display text-[2.5rem] tracking-tight sm:text-5xl md:text-7xl">
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
                {"I use to build and ship."}
              </ScrollFloat>
            </h2>
          </div>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
          {categories.map((cat, i) => (
            <SkillCard key={cat.title} category={cat} index={i} />
          ))}
        </div>

        <div className="relative">
          <span
            aria-hidden
            className="stamp-diagonal left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl sm:text-7xl md:text-8xl"
          >
            Classified
          </span>
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
      </div>
    </section>
  );
}

// One distinct sheet per card: different paper stock, fold pattern, rip,
// fastener and shelf offset — like four unrelated pages pinned to the board.
const skillDress = [
  {
    outer: "tape-x -rotate-1",
    pin: false,
    surface: "paper crease-d1",
    torn: "torn-3",
    stain: false,
    dogEar: false,
  },
  {
    outer: "rotate-[1.25deg] md:mt-6",
    pin: true,
    surface: "paper-grid crease-h",
    torn: "torn-1",
    stain: true,
    dogEar: false,
  },
  {
    outer: "tape-corners -rotate-[0.5deg]",
    pin: false,
    surface: "paper-aged ruled-paper",
    torn: "torn-4",
    stain: false,
    dogEar: false,
  },
  {
    outer: "rotate-[0.75deg] md:mt-6",
    pin: false,
    surface: "paper-old crease-x",
    torn: "torn-2",
    stain: false,
    dogEar: true,
  },
];

function SkillCard({
  category,
  index,
}: {
  category: (typeof categories)[number];
  index: number;
}) {
  const Icon = category.icon;
  const { tier } = useDeviceCapability();
  // Skip the blur keyframes on lite — animating filter is too heavy there.
  const withBlur = tier === "full";
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, ...(withBlur && { filter: "blur(10px)" }) }}
      whileInView={{ opacity: 1, y: 0, ...(withBlur && { filter: "blur(0px)" }) }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.08,
      }}
      whileHover={{ y: -4, rotate: 0 }}
      className={`torn-shadow group relative ${skillDress[index].outer}`}
    >
      {skillDress[index].pin && <span className="pushpin" aria-hidden />}
      <div
        className={`relative isolate p-6 ${skillDress[index].surface} ${
          skillDress[index].torn
        } ${skillDress[index].dogEar ? "dog-ear" : ""}`}
      >
        {skillDress[index].stain && (
          <span
            className="stain-blot"
            style={{ top: 40, right: -20 }}
            aria-hidden
          />
        )}
        <div className="flex items-center justify-between">
          <div className="grid h-11 w-11 place-items-center rounded-sm border border-line-strong bg-paper">
            <Icon className="text-stamp" size={20} strokeWidth={1.6} />
          </div>
          <span className="typed-label">▸ {category.designation}</span>
        </div>

        <h3 className="mt-6 font-display text-xl tracking-tight text-ink">
          {category.title}
        </h3>
        <ul className="mt-4 space-y-1.5">
          {category.skills.map((s) => (
            <li
              key={s}
              className="flex items-center gap-2 text-sm text-ink-dim"
            >
              <span className="font-mono text-[11px] leading-none text-stamp">
                ×
              </span>
              {s}
            </li>
          ))}
        </ul>
        <div className="mt-5 border-t border-dashed border-line-strong" />
        <div className="typed-label mt-2 !text-[9px]">
          LOGGED — ITEM {index + 1}/4
        </div>
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
      className={`inline-flex items-center gap-2 border px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] ${
        muted
          ? "border-line bg-transparent text-ink-dim"
          : "-rotate-1 border-stamp/40 bg-paper/50 text-stamp"
      }`}
    >
      <Icon size={13} className={muted ? "text-ink-dimmer" : "text-stamp/80"} />
      {name}
    </span>
  );
}

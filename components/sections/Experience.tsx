"use client";

import BlurReveal from "@/components/ui/BlurReveal";
import CardSwap, { Card } from "@/components/ui/CardSwap";
import SectionLabel from "@/components/ui/SectionLabel";
import ScrollFloat from "@/components/ui/ScrollFloat";

const items = [
  {
    period: "Jan 2025 — June 2026",
    role: "Full Stack Developer",
    company: " Samahan System Developer",
    location: "Davao City",
    summary:
      " Led university-wide system projects concentrating on backend development and frotend management.",
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
      "Specialized in backend systems within enterprise-grade software development at a reading tintech company in the Philippines.",
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
      className="relative isolate overflow-hidden pt-16 pb-32 md:pt-20 md:pb-44"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 dot-bg opacity-30 mask-radial"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-phosphor/30 to-transparent"
      />

      <div className="container-mx container-px">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-8">
          {/* Left — heading + description */}
          <div className="flex flex-col justify-center">
            <h2 className="mt-6 h-display max-w-3xl text-5xl font-semibold tracking-tight md:text-7xl">
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
                containerClassName="block text-ink-dim text-4xl md:text-4xl"
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

          {/* Right — CardSwap stack */}
          <div className="relative h-[460px] sm:h-[600px] md:h-[780px]">
            <CardSwap
              width={520}
              height={360}
              cardDistance={65}
              verticalDistance={70}
              delay={3500}
              pauseOnHover
              skewAmount={4}
              easing="elastic"
            >
              {items.map((item) => (
                <Card
                  key={item.company}
                  className="!bg-bg-card/90 !border-line p-9"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.2em] text-phosphor/70">
                        {item.period}
                      </p>
                      <h3 className="mt-3 text-xl font-medium tracking-tight text-white">
                        {item.role}
                      </h3>
                      <p className="mt-1 text-base text-phosphor-200">
                        ◇ {item.company}
                      </p>
                    </div>
                    <span className="shrink-0 font-mono text-xs text-ink-dimmer">
                      {item.location}
                    </span>
                  </div>
                  <p className="mt-5 text-base leading-relaxed text-ink-dim line-clamp-3">
                    {item.summary}
                  </p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {item.stack.map((s) => (
                      <li
                        key={s}
                        className="rounded border border-line bg-phosphor/[0.04] px-3 py-1.5 font-mono text-xs text-phosphor-200"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </CardSwap>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Lock, Radio, ShieldCheck, Fingerprint, Cpu, Waves } from "lucide-react";
import { GrainOverlay } from "./components/grain-overlay";
import { Countdown } from "./components/countdown";
import { Reveal } from "./components/reveal";
import { AccessForm } from "./components/access-form";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";

// Launch target: fixed point in the near future.
const LAUNCH = Date.now() + 1000 * 60 * 60 * 24 * 47 + 1000 * 60 * 60 * 8;

const HERO_IMG =
  "https://images.unsplash.com/photo-1770486036751-e55247238964?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920";
const REVEAL_IMG =
  "https://images.unsplash.com/photo-1647546505441-8dd417cf5114?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600";
const OBJECT_IMG =
  "https://images.unsplash.com/photo-1612022630455-ad6e37084907?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1600";

const SPECS = [
  { icon: Cpu, label: "CORE", value: "Neural silicon, 3nm", note: "Fabrication classified" },
  { icon: Waves, label: "SENSING", value: "Ambient field array", note: "Range undisclosed" },
  { icon: Fingerprint, label: "IDENTITY", value: "Biometric handshake", note: "Zero-knowledge" },
  { icon: ShieldCheck, label: "SECURITY", value: "On-device only", note: "No cloud. Ever." },
];

function Ticker() {
  const items = [
    "OPERATION NIGHTFALL",
    "CLEARANCE LEVEL — OMEGA",
    "DO NOT DISTRIBUTE",
    "PROTOTYPE 07",
    "EMBARGO ACTIVE",
    "SIGNAL ENCRYPTED",
  ];
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-border bg-secondary/40 py-3">
      <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
        {row.map((t, i) => (
          <span
            key={i}
            className="flex items-center gap-10 font-mono text-xs tracking-[0.3em] text-muted-foreground"
          >
            {t}
            <span className="text-primary">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.3]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-background">
      <GrainOverlay />

      
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 sm:px-10 mix-blend-difference">
        <div className="flex items-center gap-2.5">
          <span className="size-2 rounded-full bg-primary animate-pulse-dot" />
          <span className="font-mono text-sm tracking-[0.35em] text-foreground">
            HALCYON
          </span>
        </div>
        <nav className="hidden items-center gap-8 font-mono text-xs tracking-[0.2em] text-foreground/70 sm:flex">
          <span>EST. 20XX</span>
          <span>—</span>
          <span>DECLASSIFYING SOON</span>
        </nav>
        <div className="flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-foreground">
          <Lock className="size-3.5" />
          SEALED
        </div>
      </header>

      
      <section
        ref={heroRef}
        className="relative flex min-h-screen items-end overflow-hidden"
      >
        <motion.div
          style={{ y: imgY, scale: imgScale }}
          className="absolute inset-0 bg-[#050506]"
        >
          <ImageWithFallback
            src={HERO_IMG}
            alt="Unidentified glowing lights in darkness"
            className="size-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/70" />
        </motion.div>

        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="relative z-10 w-full px-6 pb-16 sm:px-10 sm:pb-24"
        >
          <div className="mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6 inline-flex items-center gap-3 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5"
            >
              <Radio className="size-3.5 text-primary" />
              <span className="font-mono text-xs tracking-[0.3em] text-primary">
                INCOMING TRANSMISSION
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif leading-[0.92] tracking-tight text-foreground"
              style={{ fontSize: "clamp(3rem, 11vw, 9rem)" }}
            >
              Something is
              <br />
              <span className="italic text-primary">about to change.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mt-8 max-w-md font-sans text-base leading-relaxed text-muted-foreground"
            >
              We've been building it in the dark for three years. On the date
              below, the lights come on. Until then — you know only its name.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="mt-12"
            >
              <Countdown target={LAUNCH} />
            </motion.div>
          </div>
        </motion.div>

        <div className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 font-mono text-[10px] tracking-[0.4em] text-muted-foreground">
          SCROLL TO DECRYPT
        </div>
      </section>

      <Ticker />

      
      <section className="relative px-6 py-28 sm:px-10 sm:py-40">
        <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <Reveal>
              <span className="font-mono text-xs tracking-[0.35em] text-primary">
                01 — THE PREMISE
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2
                className="mt-6 font-serif leading-[1.02] tracking-tight text-foreground"
                style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)" }}
              >
                A device that disappears the moment you stop needing it.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-lg font-sans leading-relaxed text-muted-foreground">
                No screen to stare at. No app to open. Halcyon reads the room,
                anticipates the moment, and vanishes into the background of your
                life. What we can't tell you yet is how. What we can tell you is
                when.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15} y={60}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-secondary">
              <ImageWithFallback
                src={REVEAL_IMG}
                alt="Abstract red and blue light through a dark window"
                className="size-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
              <div className="absolute bottom-4 left-4 font-mono text-[10px] tracking-[0.3em] text-foreground/70">
                FIG. 01 — REDACTED IMAGERY
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      
      <section className="relative border-t border-border px-6 py-28 sm:px-10 sm:py-40">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-xs tracking-[0.35em] text-primary">
                02 — THE DOSSIER
              </span>
              <span className="font-mono text-xs tracking-[0.3em] text-muted-foreground">
                PARTIALLY REDACTED
              </span>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {SPECS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div className="group h-full bg-card p-8 transition-colors hover:bg-secondary">
                  <s.icon className="size-6 text-primary" strokeWidth={1.5} />
                  <div className="mt-16 font-mono text-xs tracking-[0.3em] text-muted-foreground">
                    {s.label}
                  </div>
                  <div className="mt-2 font-serif text-2xl leading-tight text-foreground">
                    {s.value}
                  </div>
                  <div className="mt-3 font-mono text-xs tracking-wide text-muted-foreground/70">
                    {s.note}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      
      <section className="relative overflow-hidden">
        <div className="relative aspect-[16/9] max-h-[80vh] w-full bg-secondary sm:aspect-[21/9]">
          <ImageWithFallback
            src={OBJECT_IMG}
            alt="A dark object resting on a black surface, mostly in shadow"
            className="size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
          <div className="absolute inset-0 flex items-center px-6 sm:px-10">
            <Reveal className="max-w-md">
              <span className="font-mono text-xs tracking-[0.35em] text-primary">
                03 — FIRST SIGHTING
              </span>
              <h2
                className="mt-5 font-serif leading-[1.05] tracking-tight text-foreground"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
              >
                You're looking at 4% of it.
              </h2>
              <p className="mt-6 font-sans leading-relaxed text-muted-foreground">
                The rest stays in shadow until launch. Request access below and
                you'll be first through the door.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      
      <section className="relative px-6 py-32 text-center sm:px-10 sm:py-48">
        <div className="mx-auto flex max-w-3xl flex-col items-center">
          <Reveal>
            <span className="font-mono text-xs tracking-[0.35em] text-primary">
              04 — CLEARANCE
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2
              className="mt-6 font-serif leading-[1] tracking-tight text-foreground"
              style={{ fontSize: "clamp(2.75rem, 8vw, 6rem)" }}
            >
              Be in the room
              <br />
              <span className="italic text-primary">when it opens.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-md font-sans leading-relaxed text-muted-foreground">
              Access is limited to the first 500 operatives. No spam, no leaks —
              a single transmission when the embargo lifts.
            </p>
          </Reveal>
          <Reveal delay={0.3} className="mt-12 flex w-full justify-center">
            <AccessForm />
          </Reveal>
        </div>
      </section>

      
      <footer className="border-t border-border px-6 py-10 sm:px-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 font-mono text-xs tracking-[0.25em] text-muted-foreground sm:flex-row">
          <span className="text-foreground">HALCYON</span>
          <span>© 2026 IIXII™ & Aakarsh Singhal. All rights reserved. (This is just a template, not a real service)</span>
          <span className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-primary animate-pulse-dot" />
            SIGNAL LIVE
          </span>
        </div>
      </footer>
    </div>
  );
}

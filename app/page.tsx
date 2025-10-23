"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Github,
  Linkedin,
  Sparkles,
  X,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

type Project = {
  id: string;
  title: string;
  tag: string;
  blurb: string;
  tech?: string[];
  heroImage: string;
  links?: { label: string; href: string }[];
};

type Hub = {
  id: string;
  title: string;
  subtitle?: string;
  tint: string;
  type?: "hero" | "about" | "contact";
  filter?: (p: Project) => boolean;
};

// ───────────────────────────────────────────────────────────────────────────────
// JAY NATAL — Reality ✦ Dream (Cosmic Multi-Hub Portfolio)
// ───────────────────────────────────────────────────────────────────────────────

const ALL_PROJECTS: Project[] = [
  // FEATURED / UTILITIES
  {
    id: "prompt-splitter",
    title: "Prompt Splitter",
    tag: "Utility",
    blurb: "Smart text divider for AI prompt limits with sentence-aware splitting.",
    tech: ["HTML", "Tailwind", "JS"],
    heroImage: "/projects/prompt-splitter.gif",
    links: [{ label: "Live", href: "https://josienatal.com/prompt-splitter.html" }],
  },
  {
    id: "seacoast-calculators",
    title: "Seacoast Bank – Calculator Suite",
    tag: "Enterprise",
    blurb:
      "Compound Interest, Budget, Savings Goal, Debt Payoff, Mortgage Selector, Account Selector.",
    tech: ["Accessibility", "Responsive", "Analytics"],
    heroImage: "/projects/sb-calc.gif",
    links: [
      { label: "Compound Interest", href: "https://www.seacoastbank.com/compound-interest-calculator" },
      { label: "Budget", href: "https://www.seacoastbank.com/budget-calculator" },
      { label: "Savings Goal", href: "https://www.seacoastbank.com/savings-goal-calculator" },
      { label: "Debt Payoff", href: "https://www.seacoastbank.com/debt-payoff-calculator" },
      { label: "Mortgage Selector", href: "https://www.seacoastbank.com/mortgage-selector" },
      { label: "Account Selector", href: "https://www.seacoastbank.com/personal/banking/checking/account-selector" },
    ],
  },

  // WEBSITES / BRANDS
  {
    id: "medium-colin",
    title: "MediumColinBates.com",
    tag: "Portfolio",
    blurb: "Minimal writer’s site with long-form readability and dark mode.",
    tech: ["SEO", "Design", "CMS"],
    heroImage: "/projects/mcb.png",
    links: [{ label: "Live", href: "https://mediumcolinbates.com/" }],
  },
  {
    id: "kelly-jo",
    title: "Kelly Jo Designs by Wine",
    tag: "E-commerce", // note: en-dash
    blurb: "Event-driven storefront with booking flows and custom styling.",
    tech: ["WordPress", "HubSpot", "Events"],
    heroImage: "/projects/kjdbw.png",
    links: [{ label: "Live", href: "https://kellyjodesignsbywine.com/" }],
  },
  {
    id: "kari-denton",
    title: "KariDenton.com",
    tag: "Portfolio",
    blurb: "Artist/creative portfolio with crisp imagery and simple hierarchy.",
    tech: ["WordPress", "UX", "Performance"],
    heroImage: "/projects/kd.png",
    links: [{ label: "Live", href: "https://karidenton.com/" }],
  },
  {
    id: "jean-cocteau",
    title: "Jean Cocteau Cinema",
    tag: "Brand Site",
    blurb: "Art-house cinema presence with curated showtimes and events.",
    tech: ["Design", "CMS", "Performance"],
    heroImage: "/projects/jcc.png",
    links: [{ label: "Live", href: "https://www.jeancocteaucinema.com/" }],
  },
  {
    id: "brainsync",
    title: "BrainSync",
    tag: "E-commerce",
    blurb: "Audio products storefront with conversion-focused layout.",
    tech: ["Shop", "A/B", "SEO"],
    heroImage: "/projects/brainsync.png",
    links: [{ label: "Live", href: "https://www.brainsync.com/" }],
  },
  {
    id: "larosas",
    title: "La Rosa’s Pastry Shop",
    tag: "E-commerce",
    blurb: "Bakery brand site with menu highlights and order CTAs.",
    tech: ["Shop", "UX", "Performance"],
    heroImage: "/projects/larosa.png",
    links: [{ label: "Live", href: "https://larosaspastryshop.com/" }],
  },

  // TOOLS / APPS
  {
    id: "schema-tool",
    title: "Schema-Tool",
    tag: "Tool",
    blurb: "Structured-data generator with live preview and copy JSON-LD.",
    tech: ["React", "TypeScript", "SEO"],
    heroImage: "/projects/schema-tools.gif",
    links: [{ label: "Live", href: "https://schema-tool.com/" }],
  },
  {
    id: "ai-article-script",
    title: "AI Article → Video Script",
    tag: "Tool",
    blurb: "Turns any article into a short video script + storyboard JSON.",
    tech: ["Flask", "Tailwind", "OpenAI"],
    heroImage: "/projects/ai-article-script.gif",
    links: [{ label: "Live", href: "https://ai-article-video-script.onrender.com/" }],
  },
  {
    id: "astro-dice",
    title: "Astro Deck",
    tag: "Creative Tool",
    blurb: "Interactive 3D astrology dice experience that blends divination and design.",
    tech: ["Netlify", "React", "Astrology"],
    heroImage: "/projects/astro-deck.gif",
    links: [
      { label: "Live", href: "https://astrodeck.netlify.app/app.html" },
    ],
  },
  {
    id: "twilight-portal",
    title: "Tarot & Twilight Portal",
    tag: "Creative Tool",
    blurb: "Mystical utility hub with cards, rituals, and interactive flows — blending astrology, numerology, and tarot.",
    tech: ["HTML", "JS", "Design"],
    heroImage: "/projects/tarot-twilight.gif",
    links: [
      { label: "Portal Home", href: "https://tarotandtwilight.com/portal/index.html" },
      { label: "Life Path", href: "https://tarotandtwilight.com/portal/life-path.html" },
      { label: "Zodiac", href: "https://tarotandtwilight.com/portal/zodiac.html" },
      { label: "Moon Phases", href: "https://tarotandtwilight.com/portal/moon.html" },
      { label: "Soul Urge", href: "https://tarotandtwilight.com/portal/soul-urge.html" },
      { label: "Personal Year", href: "https://tarotandtwilight.com/portal/personal-year.html" },
      { label: "Horoscope", href: "https://tarotandtwilight.com/portal/horoscope.html" },
      { label: "Love Compatibility", href: "https://tarotandtwilight.com/portal/love-compatibility.html" },
    ],
  },
];

const HUBS: Hub[] = [
  {
    id: "hero",
    title: "Where Code Meets Magic",
    tint:
      "bg-[radial-gradient(circle_at_30%_20%,rgba(122,86,255,0.25),transparent_60%),radial-gradient(circle_at_80%_70%,rgba(255,107,232,0.2),transparent_60%)]",
    type: "hero",
  },
  {
    id: "utilities",
    title: "Featured Utilities",
    subtitle: "Interactive tools that make complex tasks simple.",
    tint:
      "bg-[radial-gradient(800px_500px_at_20%_30%,rgba(59,130,246,0.18),transparent),radial-gradient(900px_500px_at_90%_70%,rgba(56,189,248,0.15),transparent)]",
    filter: (p: Project) => ["Utility", "Enterprise"].includes(p.tag),
  },
  {
    id: "tools",
    title: "Tools & Apps",
    subtitle: "Creative utilities and experimental interfaces.",
    tint:
      "bg-[radial-gradient(900px_600px_at_70%_30%,rgba(14,165,233,0.18),transparent),radial-gradient(800px_500px_at_20%_70%,rgba(147,51,234,0.15),transparent)]",
    filter: (p: Project) => ["Tool", "Creative Tool"].includes(p.tag),
  },
  {
    id: "websites",
    title: "Websites & Brands",
    subtitle: "Clean, accessible sites with soul.",
    tint:
      "bg-[radial-gradient(900px_600px_at_15%_80%,rgba(168,85,247,0.18),transparent),radial-gradient(800px_500px_at_85%_20%,rgba(236,72,153,0.15),transparent)]",
    // Accept both ASCII and en-dash, so nothing disappears
    filter: (p: Project) => ["Brand Site", "Portfolio", "E-commerce", "E-commerce"].includes(p.tag),
  },
  {
    id: "about",
    title: "About",
    subtitle:
      "I merge function and feeling — developing accessible, elegant tools that make technology more human.",
    tint: "bg-[#0b263c]",
    type: "about",
  },
  {
    id: "contact",
    title: "Let’s build something beautiful.",
    subtitle: "I’m quick to reply.",
    tint: "bg-[#0d3559]",
    type: "contact",
  },
];

function Constellation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const stars = Array.from({ length: 100 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.5 + 0.5,
      dx: (Math.random() - 0.5) * 0.25,
      dy: (Math.random() - 0.5) * 0.25,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(255,255,255,0.85)";

      stars.forEach((s) => {
        s.x += s.dx;
        s.y += s.dy;
        if (s.x < 0 || s.x > width) s.dx *= -1;
        if (s.y < 0 || s.y > height) s.dy *= -1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // subtle links (optional; comment out if you prefer dots only)
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < 120) {
            ctx.strokeStyle = `rgba(255,255,255,${1 - dist / 120})`;
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    };

    animate();
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-full bg-white/10 text-white/90 backdrop-blur px-2.5 py-0.5 text-[11px] sm:px-3 sm:py-1 sm:text-xs tracking-wide">
    {children}
  </span>
);

function ProjectCard({ p, onOpen }: { p: Project; onOpen: (p: Project) => void }) {
  return (
    <button
      onClick={() => onOpen(p)}
      className="group relative text-left rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur focus:outline-none focus:ring-2 focus:ring-sky-300"
      aria-label={`Open project ${p.title}`}
    >
      <img
        src={p.heroImage}
        alt={p.title}
        className="h-36 sm:h-40 lg:h-44 w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition" />
      <div className="relative p-2.5 sm:p-3">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1">
          <Pill>{p.tag}</Pill>
          {p.tech?.slice(0, 2).map((t) => <Pill key={t}>{t}</Pill>)}
        </div>
        <h3 className="text-white text-sm sm:text-base font-semibold drop-shadow leading-tight">
          {p.title}
        </h3>
        <p className="text-white/80 text-[12px] sm:text-[13px] leading-snug line-clamp-2 mt-1">
          {p.blurb}
        </p>
      </div>
    </button>
  );
}

function ProjectModal({
  open,
  onClose,
  project,
  theme = "dark",
}: {
  open: boolean;
  onClose: () => void;
  project: Project | null;
  theme?: "dark" | "light";
}) {
  if (!open || !project) return null;
  return (
    <div className="fixed inset-0 z-[999] grid place-items-center p-4" role="dialog" aria-modal>
      <div className="absolute inset-0 bg-black/60 backdrop-blur" onClick={onClose} />
      <div
        className={`relative max-w-3xl w-full ${
          theme === "dark"
            ? "bg-[#1c2541]/80 text-[#e0eaff]"
            : "bg-white/80 text-slate-800"
        } border border-white/10 rounded-2xl overflow-hidden shadow-2xl`}
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        <img src={project.heroImage} alt={project.title} className="h-64 w-full object-cover" />
        <div className="p-6">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Pill>{project.tag}</Pill>
            {project.tech?.map((t) => <Pill key={t}>{t}</Pill>)}
          </div>
          <h3 className="text-2xl font-semibold">{project.title}</h3>
          <p className="text-white/80 mt-2 leading-relaxed">{project.blurb}</p>
          {project.links?.length ? (
            <div className="mt-4 flex flex-wrap gap-3">
              {project.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>{l.label}</span>
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function Typewriter() {
  const [text, setText] = useState("");
  const fullText = "{Code}";
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(interval);
    }, 120);
    return () => clearInterval(interval);
  }, []);
  return <span>{text}</span>;
}

export default function JayPortfolioCosmic() {
  // keep a simple fixed theme to satisfy references
  const theme: "dark" | "light" = "dark";

  const [modal, setModal] = useState<Project | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Build hub data with filters
  const hubs = useMemo(() => {
    return HUBS.map((h) => {
      let tint = h.tint;

      // (If you later re-introduce a light theme, adjust these)
      if (h.id === "about" || h.id === "contact") {
        tint = "bg-gradient-to-b from-[#0b132b] via-[#1c2541] to-[#0b132b]";
      }

      if (h.type === "hero" || h.type === "about" || h.type === "contact")
        return { ...h, tint, items: [] as Project[] };

      const items = ALL_PROJECTS.filter((p) => h.filter?.(p));
      return { ...h, items, tint };
    });
  }, []);

  // Track active section by scrollLeft
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => {
      const idx = Math.round(el.scrollLeft / el.clientWidth);
      setActiveIndex(Math.max(0, Math.min(hubs.length - 1, idx)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [hubs.length]);

  const scrollToIndex = (i: number) => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTo({ left: i * window.innerWidth, behavior: "smooth" });
  };

  const next = () => scrollToIndex(Math.min(activeIndex + 1, hubs.length - 1));
  const prev = () => scrollToIndex(Math.max(activeIndex - 1, 0));

  return (
    <div className="bg-gradient-to-b from-[#0b132b] via-[#1c2541] to-[#0b132b] text-[#e0eaff]">
      {/* CONSTELLATION BACKGROUND */}
      <div className="fixed inset-0 -z-10">
        <Constellation />
      </div>

      {/* HEADER */}
      <header className="fixed top-0 z-50 w-full flex justify-between items-center px-6 py-4 backdrop-blur bg-black/30">
        <button
          onClick={() => scrollToIndex(0)}
          className="font-semibold tracking-wide hover:text-sky-300 transition"
          aria-label="Go to home"
        >
          Jay Natal
        </button>

        <div className="flex gap-3 items-center">
          <button onClick={prev} className="hidden md:inline-flex p-2 rounded-full bg-white/10 hover:bg-white/20" aria-label="Prev slide">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button onClick={next} className="hidden md:inline-flex p-2 rounded-full bg-white/10 hover:bg-white/20" aria-label="Next slide">
            <ChevronRight className="h-5 w-5" />
          </button>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToIndex(hubs.findIndex((h) => h.id === "contact"));
            }}
            className="inline-flex items-center gap-2 rounded-lg bg-sky-500/90 hover:bg-sky-400 px-3 py-1.5 text-sm"
          >
            <Sparkles className="h-4 w-4" /> Reality ✦ Dream
          </a>
        </div>
      </header>

      {/* HORIZONTAL SLIDES */}
      <main
        ref={containerRef}
        className="snap-x snap-mandatory overflow-x-auto overflow-y-hidden h-screen flex flex-nowrap touch-pan-x scroll-smooth"
      >
        {hubs.map((hub, i) => (
          <section
            key={hub.id}
            className={`snap-center shrink-0 w-full min-h-[100dvh] relative flex flex-col items-center justify-center px-4 text-center ${hub.tint}`}
            >
            {/* HERO */}
{hub.type === "hero" && (
  <div className="max-w-4xl px-6 text-center space-y-3 sm:space-y-4">
    <motion.h1
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="text-5xl sm:text-6xl font-bold tracking-tight"
    >
      Where{" "}
      <motion.span
        className="inline-block font-mono text-sky-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Typewriter />
      </motion.span>{" "}
      Meets{" "}
      <motion.span
        initial={{ backgroundPosition: "100% 50%" }}
        animate={{ backgroundPosition: "0% 50%" }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "mirror" }}
        className="bg-gradient-to-r from-fuchsia-400 via-pink-300 to-fuchsia-400 bg-clip-text text-transparent"
      >
        Magic
      </motion.span>
    </motion.h1>

    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="text-white/90 text-lg sm:text-xl"
    >
      Hi, I’m <span className="text-sky-300 font-medium">Jay</span>
    </motion.p>

    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      className="text-white/80 text-base sm:text-lg"
    >
      Developer • Designer • Dreamer
    </motion.p>

    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2 }}
      className="max-w-2xl mx-auto text-white/85 text-[15px] sm:text-base leading-relaxed"
    >
      I craft intuitive, aesthetic, and intelligent experiences — <br></br>blending
      fintech precision with creative and mystical design.
    </motion.p>

    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5 }}
      className="flex justify-center pt-2"
    >
      <button
        onClick={() =>
          scrollToIndex(hubs.findIndex((h) => h.id === "utilities"))
        }
        className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition"
      >
        Explore Work
      </button>
    </motion.div>
  </div>
)}


           {/* ABOUT */}
{hub.type === "about" && (
  <div className="max-w-5xl px-6 text-center space-y-6">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-4xl sm:text-5xl font-bold mb-2 bg-gradient-to-r from-sky-300 via-fuchsia-300 to-pink-400 bg-clip-text text-transparent"
    >
      About
    </motion.h2>

    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="text-white/85 leading-relaxed text-lg max-w-3xl mx-auto"
    >
      I merge <span className="text-sky-300">function</span> and{" "}
      <span className="text-fuchsia-300">feeling</span> — developing accessible,
      elegant tools that make technology more human. My work spans fintech,
      creative commerce, and mystical design — blending precision, emotion, and
      AI innovation into every project.
    </motion.p>

    {/* Dual Skill Cards */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="grid md:grid-cols-2 gap-8 mt-10 text-left text-white/90"
    >
      {/* LEFT: Core Development & AI */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(147,197,253,0.2)] transition">
        <h3 className="text-xl font-semibold text-sky-300 mb-3">
          Core Development ✦ AI
        </h3>
        <ul className="space-y-1.5 text-sm leading-relaxed">
          <li>
            <strong className="text-white/95">Languages & Frameworks:</strong>{" "}
            HTML5, CSS3, JavaScript, PHP, React, Next.js, Python, Flask
          </li>
          <li>
            <strong className="text-white/95">Web & CMS Tools:</strong>{" "}
            WordPress, Elementor, HubSpot CMS, WooCommerce
          </li>
          <li>
            <strong className="text-white/95">AI Tools & Engineering:</strong>{" "}
            OpenAI, Gemini, Leonardo.ai, AWS Polly, Fal.ai, Prompt Design, LangChain, LLM API Integration
          </li>
          <li>
            <strong className="text-white/95">APIs & Automation:</strong>{" "}
            REST, Webhooks, JSON, Zapier, FastAPI, Flask, Cloudflare Workers
          </li>
        </ul>
      </div>

      {/* RIGHT: Design, Deployment & Optimization */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(249,168,212,0.2)] transition">
        <h3 className="text-xl font-semibold text-fuchsia-300 mb-3">
          Design ✦ Deployment
        </h3>
        <ul className="space-y-1.5 text-sm leading-relaxed">
          <li>
            <strong className="text-white/95">Design & Branding:</strong> Adobe
            Creative Suite (Photoshop, Illustrator, InDesign), Canva
          </li>
          <li>
            <strong className="text-white/95">Accessibility:</strong> ADA
            Compliance, WCAG 2.1, UserWay Remediation, ARIA Labels, Site Audits
          </li>
          <li>
            <strong className="text-white/95">Deployment & Infra:</strong>{" "}
            Netlify, Render, Vercel, GitHub, Cloudflare R2
          </li>
          <li>
            <strong className="text-white/95">Optimization:</strong> QA Testing,
            Debugging, Core Web Vitals, SEO (Google Console, SEMrush)
          </li>
        </ul>
      </div>
    </motion.div>

    {/* Tech Stack Chips */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      className="flex flex-wrap justify-center gap-2 pt-8"
    >
      {[
        "React",
        "Next.js",
        "Tailwind",
        "Framer Motion",
        "Python",
        "Flask",
        "FastAPI",
        "OpenAI API",
        "HubSpot",
        "WordPress",
        "Render",
        "Vercel",
        "Cloudflare",
      ].map((s) => (
        <span
          key={s}
          className="px-3 py-1 rounded-full text-sm bg-white/10 hover:bg-white/20 text-white/90 transition"
        >
          {s}
        </span>
      ))}
    </motion.div>
  </div>
)}


            {/* CONTACT */}
            {hub.type === "contact" && (
              <div className="max-w-xl w-full px-6 text-center">
                <h2 className="text-3xl font-semibold mb-4">Let’s build something beautiful.</h2>
                <form
                  action="https://formspree.io/f/mzzzkayp"
                  method="POST"
                  className="w-full flex flex-col gap-3"
                >
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                    className="p-3 rounded bg-white/10 text-white placeholder-white/70 focus:bg-white/20 outline-none"
                  />
                  <input
                    type="email"
                    name="email"
                    value="email@gmail.com"
                    readOnly
                    className="p-3 rounded bg-white/10 text-white/80 outline-none"
                  />
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    rows={4}
                    required
                    className="p-3 rounded bg-white/10 text-white placeholder-white/70 focus:bg-white/20 outline-none"
                  />
                  <button
                    type="submit"
                    className="mt-2 py-2 rounded-xl font-medium bg-sky-500/90 hover:bg-sky-400 text-white"
                  >
                    Send
                  </button>
                </form>

                <div className="mt-6 flex gap-4 justify-center">
                  <a href="mailto:josie@duck.com" className="hover:text-sky-300">
                    <Mail className="h-5 w-5" />
                  </a>
                  <a href="https://github.com/josienatal" target="_blank" rel="noreferrer" className="hover:text-sky-300">
                    <Github className="h-5 w-5" />
                  </a>
                  <a href="https://linkedin.com/in/josienatal" target="_blank" rel="noreferrer" className="hover:text-sky-300">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
                <p className="mt-6 text-sm text-white/70">
                  © {new Date().getFullYear()} Made with <span className="text-rose-300">♥</span> by Jay Natal
                </p>
              </div>
            )}

            {/* HUB (cards) */}
            {!hub.type && (
              <div className="w-full max-w-6xl px-4 sm:px-6">
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-semibold">{hub.title}</h2>
                  {hub.subtitle && <p className="text-white/85 mt-2">{hub.subtitle}</p>}
                </div>

                <div className="grid gap-4 sm:gap-5 lg:gap-6 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))] sm:[grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
                  {(hub as any).items.map((p: Project) => (
                    <ProjectCard key={p.id} p={p} onOpen={setModal} />
                  ))}
                </div>
              </div>
            )}
          </section>
        ))}
      </main>

      {/* GLOWING NAV ORBS */}
      <div className="nav-orbs fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-4">
        {hubs.map((h, i) => (
          <div key={h.id} className="relative group">
            <button
              onClick={() => scrollToIndex(i)}
              className={`h-3.5 w-3.5 rounded-full ${
                i === activeIndex ? "bg-fuchsia-300 animate-pulse" : "bg-white/70 hover:bg-white"
              } shadow-[0_0_15px_rgba(255,255,255,0.35)]`}
              aria-label={`Go to ${h.title}`}
            />
            <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-8 opacity-0 group-hover:opacity-100 transition text-xs whitespace-nowrap bg-black/60 text-white px-2 py-1 rounded">
              {h.title}
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      <ProjectModal open={!!modal} onClose={() => setModal(null)} project={modal} theme={theme} />

      {/* STYLES */} 
      <style>{`
        main { scroll-padding-top: 6rem; }
        section { padding-top: 6rem; }
        html { scroll-behavior: smooth; }
        .snap-x { scroll-snap-type: x mandatory; }
        section { scroll-snap-align: center; }
        main::-webkit-scrollbar { display: none; }
        main { -ms-overflow-style: none; scrollbar-width: none; }
        @media (max-width: 768px) {
          .nav-orbs { display: none; }
          main {
            scroll-snap-type: y mandatory;
            overflow-x: hidden;
            overflow-y: auto;
            flex-direction: column;
          }
          section { min-height: 100vh; width: 100%; }
        }
      `}</style>
    </div>
  );
}

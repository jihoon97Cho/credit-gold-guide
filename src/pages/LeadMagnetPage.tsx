import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { COMPANY } from "@/lib/constants";
import { useIsMobile } from "@/hooks/use-mobile";
import logo from "@/assets/logo.png";
import checklistMockup from "@/assets/checklist-mockup.png";
import {
  ShieldX,
  HelpCircle,
  Frown,
  FileSearch,
  Search,
  MessageSquareWarning,
  Zap,
  ShieldCheck,
  Star,
  CheckCircle2,
  ArrowDown,
  Users,
  TrendingUp,
  ClipboardCheck,
  ChevronUp,
  Phone,
} from "lucide-react";
import { Link } from "react-router-dom";

/* ─── Motion presets ─── */
const ease = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};
const cardHover = { y: -6, boxShadow: "0 12px 32px hsla(42,52%,53%,0.18)" };

/* ─── Scroll progress bar ─── */
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left bg-primary"
      style={{ scaleX }}
    />
  );
};

/* ─── Sticky nav ─── */
const Nav = () => {
  const [show, setShow] = useState(true);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setShow(y < 50 || y < lastY.current);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToForm = () =>
    document.getElementById("form-section")?.scrollIntoView({ behavior: "smooth" });

  return (
    <AnimatePresence>
      {show && (
        <motion.nav
          initial={{ y: -80 }}
          animate={{ y: 0 }}
          exit={{ y: -80 }}
          transition={{ duration: 0.3, ease }}
          className="fixed top-[3px] left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-md"
        >
          <div className="container mx-auto flex items-center justify-between px-4 py-3">
            <Link to="/">
              <img src={logo} alt={COMPANY.name} className="h-8 w-auto" />
            </Link>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button onClick={scrollToForm} className="rounded-full font-bold">
                Get the Free Checklist
              </Button>
            </motion.div>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

/* ─── Section reveal wrapper ─── */
const Reveal = ({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={stagger}
    >
      {children}
    </motion.section>
  );
};

/* ─── Counter animation ─── */
const CountUp = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    let frame: number;
    const dur = 1500;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      setVal(Math.round(p * target));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, target]);
  return (
    <span ref={ref}>
      {val.toLocaleString()}
      {suffix}
    </span>
  );
};

/* ─── Steps data ─── */
const steps = [
  {
    icon: FileSearch,
    title: "Pull the Right Reports",
    teaser: "Most people start with the wrong reports and never see the full picture.",
  },
  {
    icon: Search,
    title: "Find What Shouldn't Be There",
    teaser: "Many files contain inaccurate, outdated, or questionable items that deserve a closer look.",
  },
  {
    icon: MessageSquareWarning,
    title: "Dispute Smarter",
    teaser: "The way you challenge information matters. Doing it wrong can waste time and delay results.",
  },
  {
    icon: Zap,
    title: "Use the Hidden Score Boosters",
    teaser: "There are overlooked moves that can improve your score faster when used correctly.",
  },
  {
    icon: ShieldCheck,
    title: "Protect the Progress",
    teaser: "Raising your score is one thing. Keeping it stable is what creates long term results.",
  },
];

/* ─── Sticky steps (desktop) ─── */
const StickySteps = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  return (
    <div ref={containerRef} className="relative hidden lg:grid lg:grid-cols-2 lg:gap-16">
      {/* Left sticky visual */}
      <div className="sticky top-32 self-start">
        <motion.div
          className="rounded-2xl border border-border bg-card p-8 gold-glow"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
            Step {active + 1} of 5
          </p>
          <h3 className="mb-3 text-2xl font-extrabold text-foreground">{steps[active].title}</h3>
          <p className="text-muted-foreground">{steps[active].teaser}</p>
          <div className="mt-6 flex gap-2">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                  i <= active ? "bg-primary" : "bg-border"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right scrolling steps */}
      <div className="space-y-8">
        {steps.map((step, i) => (
          <StepCard key={i} step={step} index={i} onVisible={() => setActive(i)} />
        ))}
      </div>
    </div>
  );
};

const StepCard = ({
  step,
  index,
  onVisible,
}: {
  step: (typeof steps)[0];
  index: number;
  onVisible: () => void;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" });
  useEffect(() => {
    if (isInView) onVisible();
  }, [isInView]);
  const Icon = step.icon;
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`rounded-xl border p-6 transition-colors duration-300 ${
        isInView ? "border-primary bg-card gold-glow" : "border-border bg-card/50"
      }`}
    >
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <span className="text-sm font-bold text-primary">Step {index + 1}</span>
      </div>
      <h4 className="mb-2 text-lg font-bold text-foreground">{step.title}</h4>
      <p className="text-muted-foreground">{step.teaser}</p>
    </motion.div>
  );
};

/* ─── Mobile steps ─── */
const MobileSteps = () => (
  <div className="space-y-4 lg:hidden">
    {steps.map((step, i) => {
      const Icon = step.icon;
      return (
        <motion.div
          key={i}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="rounded-xl border border-border bg-card p-5"
        >
          <div className="mb-2 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Icon className="h-4 w-4" />
            </div>
            <span className="text-xs font-bold text-primary">Step {i + 1}</span>
          </div>
          <h4 className="mb-1 text-base font-bold text-foreground">{step.title}</h4>
          <p className="text-sm text-muted-foreground">{step.teaser}</p>
        </motion.div>
      );
    })}
  </div>
);

/* ─── Testimonials ─── */
const testimonials = [
  {
    name: "Marcus T.",
    text: "I had no idea where to start. This checklist gave me a clear path and I finally felt in control of my credit situation.",
    stars: 5,
  },
  {
    name: "Jennifer L.",
    text: "Simple, straightforward, and actually helpful. I wish I had found this years ago instead of wasting time on random advice.",
    stars: 5,
  },
  {
    name: "David R.",
    text: "The step-by-step approach made everything feel manageable. I went from overwhelmed to motivated in one afternoon.",
    stars: 5,
  },
];

/* ═══════════════════════ MAIN PAGE ═══════════════════════ */

const LeadMagnetPage = () => {
  const isMobile = useIsMobile();

  const scrollToForm = () =>
    document.getElementById("form-section")?.scrollIntoView({ behavior: "smooth" });

  /* Load GHL form script */
  useEffect(() => {
    if (!document.querySelector('script[src="https://link.msgsndr.com/js/form_embed.js"]')) {
      const s = document.createElement("script");
      s.src = "https://link.msgsndr.com/js/form_embed.js";
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollProgress />
      <Nav />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Copy */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
            >
              <motion.p variants={fadeUp} className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
                Free Credit Repair Checklist
              </motion.p>
              <motion.h1 variants={fadeUp} className="mb-5 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                Your Credit Score Can Be Fixed.{" "}
                <span className="text-primary text-glow">Here's the Exact Checklist Most People Never See.</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="mb-4 text-lg text-muted-foreground">
                Whether you've been denied a loan, rejected for an apartment, or feel stuck because of your credit, this free checklist shows you the next steps clearly.
              </motion.p>
              <motion.p variants={fadeUp} className="mb-8 text-muted-foreground">
                This checklist breaks down the 5 key steps people need to understand if they want to start improving their credit the right way.
              </motion.p>
              <motion.div variants={fadeUp}>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button onClick={scrollToForm} size="lg" className="rounded-full px-10 py-6 text-lg font-bold gap-2">
                    Unlock the Free Checklist
                    <ArrowDown className="h-5 w-5" />
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Checklist mockup */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease }}
              className="flex justify-center"
            >
              <motion.img
                src={checklistMockup}
                alt="The 5 Step Credit Comeback Checklist"
                className="w-full max-w-md drop-shadow-2xl"
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              />
            </motion.div>
          </div>

          {/* Scroll cue */}
          <motion.div
            className="mt-12 flex justify-center"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ArrowDown className="h-6 w-6 text-muted-foreground/50" />
          </motion.div>
        </div>
      </section>

      {/* ── PAIN POINTS ── */}
      <Reveal className="bg-secondary py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.h2 variants={fadeUp} className="mb-12 text-center text-3xl font-extrabold sm:text-4xl">
            Sound <span className="text-primary text-glow">Familiar?</span>
          </motion.h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                icon: ShieldX,
                title: "Denied Again?",
                text: "Bad credit can affect approvals for loans, apartments, and more. Most people are never shown exactly what is hurting them.",
              },
              {
                icon: HelpCircle,
                title: "Not Sure Where to Start?",
                text: "The credit system is confusing on purpose. Most people waste time following the wrong advice.",
              },
              {
                icon: Frown,
                title: "Tired of Feeling Stuck?",
                text: "Your score is not permanent. With the right steps in the right order, real progress is possible.",
              },
            ].map((card, i) => (
              <motion.div key={i} variants={fadeUp}>
                <motion.div whileHover={cardHover} transition={{ duration: 0.25 }}>
                  <Card className="h-full p-6 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <card.icon className="h-7 w-7" />
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-foreground">{card.title}</h3>
                    <p className="text-sm text-muted-foreground">{card.text}</p>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ── WHAT'S INSIDE ── */}
      <Reveal className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.h2 variants={fadeUp} className="mb-4 text-center text-3xl font-extrabold sm:text-4xl">
            What's Inside the <span className="text-primary text-glow">Free Checklist</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
            Five clear steps that walk you through what to check, what to fix, and how to keep your score moving in the right direction.
          </motion.p>
          <StickySteps />
          <MobileSteps />
        </div>
      </Reveal>

      {/* ── WHY THIS MATTERS ── */}
      <Reveal className="bg-secondary py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.h2 variants={fadeUp} className="mb-4 text-center text-3xl font-extrabold sm:text-4xl">
            Most People Either <span className="text-primary text-glow">Ignore Their Credit</span> or Pay Too Much for Basic Information
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
            This checklist helps simplify the process and gives you a clearer understanding of how to begin improving your credit profile.
          </motion.p>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { icon: ClipboardCheck, title: "Clear Action Steps", text: "No guesswork. Each step tells you exactly what to do and why it matters." },
              { icon: TrendingUp, title: "Built for Results", text: "Focused on the moves that actually impact your score, not filler content." },
              { icon: Users, title: "Used by Real People", text: "Designed based on patterns from helping real clients improve their credit profiles." },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp}>
                <motion.div whileHover={cardHover} transition={{ duration: 0.25 }}>
                  <Card className="h-full p-6 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.text}</p>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ── SOCIAL PROOF ── */}
      <Reveal className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.h2 variants={fadeUp} className="mb-12 text-center text-3xl font-extrabold sm:text-4xl">
            What People Are <span className="text-primary text-glow">Saying</span>
          </motion.h2>

          <div className="grid gap-6 sm:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div key={i} variants={fadeUp}>
                <motion.div whileHover={cardHover} transition={{ duration: 0.25 }}>
                  <Card className="h-full p-6">
                    <div className="mb-3 flex gap-1">
                      {Array.from({ length: t.stars }).map((_, j) => (
                        <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="mb-4 text-sm text-muted-foreground italic">"{t.text}"</p>
                    <p className="text-sm font-bold text-foreground">— {t.name}</p>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-6 text-center">
            {[
              { value: 500, suffix: "+", label: "Clients Helped" },
              { value: 120, suffix: "+", label: "Avg. Score Increase" },
              { value: 5, suffix: "", label: "Step Action Plan" },
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeUp}>
                <p className="text-3xl font-extrabold text-primary lg:text-4xl">
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ── ABOUT / CREDIBILITY ── */}
      <Reveal className="bg-secondary py-16 lg:py-24">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <motion.div variants={fadeUp} className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <img src={logo} alt={COMPANY.name} className="h-12 w-auto" />
          </motion.div>
          <motion.h2 variants={fadeUp} className="mb-4 text-2xl font-extrabold sm:text-3xl">
            About <span className="text-primary">{COMPANY.name}</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mb-8 text-muted-foreground">
            We help people understand their credit, identify what may be hurting their profile, and create a clearer path toward improvement. This checklist is designed to give people a simple starting point before they take the next step.
          </motion.p>
          <motion.div variants={fadeUp}>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button onClick={scrollToForm} className="rounded-full px-8 font-bold gap-2">
                Get the Checklist
                <ArrowDown className="h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </Reveal>

      {/* ── FORM GATE ── */}
      <Reveal id="form-section" className="py-16 lg:py-24">
        <div className="container mx-auto max-w-2xl px-4">
          <motion.h2 variants={fadeUp} className="mb-3 text-center text-3xl font-extrabold sm:text-4xl">
            Enter Your Information to <span className="text-primary text-glow">Access the Free Checklist</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mb-8 max-w-lg text-center text-muted-foreground">
            Complete the short form below to unlock the checklist and get the next steps sent to you.
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="rounded-2xl border border-border bg-card p-4 gold-glow sm:p-6"
          >
            <iframe
              src="https://api.leadconnectorhq.com/widget/form/b2UZRHqrhGW9OKOyc3Tg"
              style={{ width: "100%", height: "560px", border: "none", borderRadius: "12px" }}
              id="popup-b2UZRHqrhGW9OKOyc3Tg"
              data-layout='{"id":"POPUP"}'
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="Lead Magnet 1"
              data-height="560"
              data-layout-iframe-id="popup-b2UZRHqrhGW9OKOyc3Tg"
              data-form-id="b2UZRHqrhGW9OKOyc3Tg"
              title="Lead Magnet 1"
            />
          </motion.div>
        </div>
      </Reveal>

      {/* ── NEXT STEP ── */}
      <Reveal className="bg-secondary py-16 lg:py-24">
        <div className="container mx-auto max-w-2xl px-4 text-center">
          <motion.div variants={fadeUp} className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <CheckCircle2 className="h-7 w-7" />
          </motion.div>
          <motion.h2 variants={fadeUp} className="mb-4 text-2xl font-extrabold sm:text-3xl">
            Once You Submit, You'll Get Access to the Checklist
          </motion.h2>
          <motion.p variants={fadeUp} className="mb-10 text-muted-foreground">
            After completing the form, you'll be able to review the checklist and take the next step toward improving your credit.
          </motion.p>
          <motion.div variants={fadeUp} className="rounded-2xl border border-border bg-card p-8">
            <h3 className="mb-3 text-xl font-bold text-foreground">
              Want Help Applying These Steps to Your Situation?
            </h3>
            <p className="mb-6 text-muted-foreground">
              Book a free consultation and get personalized guidance on your credit journey.
            </p>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button asChild className="rounded-full px-8 py-6 text-lg font-bold gap-2">
                <Link to="/book">
                  <Phone className="h-5 w-5" />
                  Book a Free Consultation
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </Reveal>

      {/* ── FOOTER ── */}
      <footer className="border-t border-border bg-foreground py-10 text-background">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <img src={logo} alt={COMPANY.name} className="mb-3 h-10 w-auto brightness-200" />
              <p className="text-sm opacity-70">{COMPANY.name}</p>
            </div>
            <div>
              <h4 className="mb-3 font-bold">Contact</h4>
              <p className="text-sm opacity-70">
                <a href={`mailto:${COMPANY.email}`} className="hover:text-primary">{COMPANY.email}</a>
              </p>
            </div>
            <div>
              <h4 className="mb-3 font-bold">Service Area</h4>
              <p className="text-sm opacity-70">{COMPANY.serviceArea}</p>
            </div>
            <div>
              <h4 className="mb-3 font-bold">Legal</h4>
              <p className="text-sm opacity-70 hover:text-primary"><a href="#privacy">Privacy Policy</a></p>
              <p className="text-sm opacity-70 hover:text-primary"><a href="#terms">Terms of Service</a></p>
            </div>
          </div>
          <div className="mt-10 border-t border-background/20 pt-6">
            <p className="text-xs opacity-60">
              © 2025 {COMPANY.name}. All rights reserved. Credit repair services are provided in accordance with the Credit Repair Organizations Act (CROA). Results may vary.
            </p>
          </div>
        </div>
      </footer>

      {/* Back to top */}
      <BackToTop />
    </div>
  );
};

const BackToTop = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg"
        >
          <ChevronUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default LeadMagnetPage;

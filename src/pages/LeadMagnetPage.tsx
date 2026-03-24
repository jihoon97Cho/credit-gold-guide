import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
  Shield,
  Star,
  CheckCircle2,
  ArrowDown,
  Users,
  TrendingUp,
  ClipboardCheck,
  ChevronUp,
  Phone,
  FileText,
  BarChart3,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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

  const scrollToHeroForm = () =>
    document.getElementById("hero-form")?.scrollIntoView({ behavior: "smooth", block: "center" });

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
              <Button onClick={scrollToHeroForm} className="rounded-full font-bold">
                Get the Free Blueprint
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

/* ─── Steps data (6 steps) ─── */
const steps = [
  {
    icon: FileSearch,
    title: "Understand Your Credit Report",
    teaser: "Learn how your score is calculated, what the 3 bureaus track, and which negative items are hurting you the most.",
  },
  {
    icon: Shield,
    title: "Set Up Credit Monitoring",
    teaser: "Get full visibility into all 3 bureau reports so you know exactly what to dispute and can track every change in real time.",
  },
  {
    icon: Search,
    title: "The Inquiry Removal Playbook",
    teaser: "4 proven methods to remove unauthorized hard inquiries — including direct bureau disputes, creditor contact, and the opt-out strategy.",
  },
  {
    icon: MessageSquareWarning,
    title: "Dispute Negative Items Like a Pro",
    teaser: "The exact step-by-step dispute process: when to send letters, how to escalate, and how to use the Method of Verification to force removals.",
  },
  {
    icon: FileText,
    title: "6 Ready-to-Use Dispute Letter Templates",
    teaser: "Copy, customize, and send. Includes bureau dispute letters, inquiry removal letters, goodwill deletion requests, and pay-for-delete negotiation letters.",
  },
  {
    icon: Zap,
    title: "Advanced Hacks + 90-Day Action Plan",
    teaser: "The authorized user strategy, the utilization trick, rapid rescoring, CFPB escalation — plus a week-by-week action plan to keep you on track.",
  },
];

/* ─── Sticky steps (desktop) ─── */
const StickySteps = () => {
  const [active, setActive] = useState(0);

  return (
    <div className="relative hidden lg:grid lg:grid-cols-2 lg:gap-16">
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
            Step {active + 1} of 6
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

/* ─── Opt-in Form Component ─── */
const OptInForm = ({ id, onSuccess }: { id?: string; onSuccess?: () => void }) => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !email.trim()) {
      toast.error("Please enter your name and email.");
      return;
    }
    setSubmitting(true);
    try {
      // Save lead to database
      await supabase.from("leads").insert({
        name: firstName.trim(),
        email: email.trim(),
        phone: phone.trim() || null,
        source: "lead-magnet-blueprint",
      });

      // Send to GHL webhook
      try {
        await fetch(
          "https://services.leadconnectorhq.com/hooks/bnmo2H6CkK9L4cUOXrpa/webhook-trigger/709947a3-1476-4c2c-8f10-d4d57aeac5b2",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: firstName.trim(),
              email: email.trim(),
              phone: phone.trim() || undefined,
              source: "lead-magnet-blueprint",
            }),
            mode: "no-cors",
          }
        );
      } catch {
        // Webhook failure is non-blocking
      }

      if (onSuccess) {
        onSuccess();
      } else {
        navigate("/checklist/thank-you");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form id={id} onSubmit={handleSubmit} className="space-y-3">
      <Input
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className="h-12 rounded-lg border-border bg-background"
        required
      />
      <Input
        type="email"
        placeholder="Your Best Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="h-12 rounded-lg border-border bg-background"
        required
      />
      <Input
        type="tel"
        placeholder="Phone Number (optional)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="h-12 rounded-lg border-border bg-background"
      />
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
        <Button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full py-6 text-lg font-bold"
          size="lg"
        >
          {submitting ? "Sending..." : "Send Me the Blueprint"}
        </Button>
      </motion.div>
      <p className="text-center text-xs text-muted-foreground">
        100% Free. No spam. Unsubscribe anytime.
      </p>
    </form>
  );
};

/* ═══════════════════════ MAIN PAGE ═══════════════════════ */

const LeadMagnetPage = () => {
  const isMobile = useIsMobile();

  const scrollToHeroForm = () =>
    document.getElementById("hero-form")?.scrollIntoView({ behavior: "smooth", block: "center" });

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
                Free Credit Repair Guide
              </motion.p>
              <motion.h1 variants={fadeUp} className="mb-5 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                Your Credit Score Can Be Fixed. Here's the{" "}
                <span className="text-primary text-glow">Free Blueprint</span> to Do It Yourself.
              </motion.h1>
              <motion.p variants={fadeUp} className="mb-6 text-lg text-muted-foreground">
                Whether you've been denied for a loan, rejected for an apartment, or feel stuck — this free guide gives you the exact dispute letters, inquiry removal methods, and step-by-step strategies to start removing negative items and raising your score.
              </motion.p>

              {/* Badges */}
              <motion.div variants={fadeUp} className="mb-6 flex flex-wrap gap-2">
                {["6 Dispute Letter Templates", "Inquiry Removal Playbook", "90-Day Action Plan"].map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    {badge}
                  </span>
                ))}
              </motion.div>

              <motion.div variants={fadeUp}>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button onClick={scrollToHeroForm} size="lg" className="rounded-full px-10 py-6 text-lg font-bold gap-2">
                    Get the Free Blueprint
                    <ArrowDown className="h-5 w-5" />
                  </Button>
                </motion.div>
              </motion.div>

              {/* Hero opt-in form */}
              <motion.div variants={fadeUp} className="mt-8 max-w-md">
                <OptInForm id="hero-form" />
              </motion.div>
            </motion.div>

            {/* Mockup image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease }}
              className="flex justify-center"
            >
              <motion.img
                src={checklistMockup}
                alt="The Credit Repair Blueprint"
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
                text: "Collections, late payments, and inquiries you didn't even know about could be tanking your score right now. Most people are never shown what's actually hurting them.",
              },
              {
                icon: HelpCircle,
                title: "Not Sure Where to Start?",
                text: "There are 3 credit bureaus, dozens of negative item types, and confusing dispute processes. Without a clear system, most people give up before they see results.",
              },
              {
                icon: Frown,
                title: "Tired of Feeling Stuck?",
                text: "Your score is not permanent. With the right dispute letters and a proven step-by-step process, real progress is possible — often within 30-60 days.",
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

      {/* ── SOCIAL PROOF (moved up) ── */}
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

          {/* Stats — larger/bolder */}
          <div className="mt-14 grid grid-cols-3 gap-6 text-center">
            {[
              { value: 500, suffix: "+", label: "Clients Helped" },
              { value: 120, suffix: "+", label: "Avg. Score Increase" },
              { value: 90, suffix: "", label: "Day Action Plan" },
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeUp}>
                <p className="text-4xl font-extrabold text-primary lg:text-5xl">
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-sm text-muted-foreground sm:text-base font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ── WHAT'S INSIDE ── */}
      <Reveal className="bg-secondary py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.h2 variants={fadeUp} className="mb-4 text-center text-3xl font-extrabold sm:text-4xl">
            What's Inside the <span className="text-primary text-glow">Free Blueprint</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
            Everything you need to start repairing your credit on your own — tools, templates, and a proven 90-day plan.
          </motion.p>
          <StickySteps />
          <MobileSteps />
        </div>
      </Reveal>

      {/* ── VALUE PROPOSITION ── */}
      <Reveal className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.h2 variants={fadeUp} className="mb-4 text-center text-3xl font-extrabold sm:text-4xl">
            Take Control of Your Credit — <span className="text-primary text-glow">Starting Today</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
            This isn't generic advice you can Google. It's the exact system and tools our team uses with real clients — packaged into a free guide so you can start on your own.
          </motion.p>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { icon: CheckCircle2, title: "Based on 500+ Client Cases", text: "Every strategy in this guide has been tested and refined through hundreds of real credit repair cases." },
              { icon: BarChart3, title: "Covers All 3 Bureaus", text: "Equifax, Experian, and TransUnion — the guide walks you through disputing with each one." },
              { icon: FileText, title: "Includes Ready-to-Send Letters", text: "6 professionally written dispute letter templates you can customize and mail today." },
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

      {/* ── ABOUT / CREDIBILITY ── */}
      <Reveal className="bg-secondary py-16 lg:py-24">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <motion.div variants={fadeUp} className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <img src={logo} alt={COMPANY.name} className="h-12 w-auto" />
          </motion.div>
          <motion.h2 variants={fadeUp} className="mb-4 text-2xl font-extrabold sm:text-3xl">
            About <span className="text-primary">Ascending Solutions</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mb-8 text-muted-foreground">
            We've helped over 500 people take control of their credit — removing collections, late payments, inquiries, and other negative items that hold scores back. This free guide is designed to give you a head start, whether you decide to work with us or go it alone.
          </motion.p>
          <motion.div variants={fadeUp}>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button onClick={scrollToHeroForm} className="rounded-full px-8 font-bold gap-2">
                Get the Free Blueprint
                <ArrowDown className="h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </Reveal>

      {/* ── FORM SECTION (secondary bottom form) ── */}
      <Reveal id="form-section" className="py-16 lg:py-24">
        <div className="container mx-auto max-w-md px-4">
          <motion.h2 variants={fadeUp} className="mb-3 text-center text-3xl font-extrabold sm:text-4xl">
            Get Your Free <span className="text-primary text-glow">Credit Repair Blueprint</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mx-auto mb-8 max-w-lg text-center text-muted-foreground">
            Enter your info below and we'll send the full guide straight to your inbox — including all 6 dispute letter templates.
          </motion.p>
          <motion.div
            variants={fadeUp}
            className="rounded-2xl border border-border bg-card p-6 gold-glow sm:p-8"
          >
            <OptInForm />
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
            Your Blueprint Is On the Way!
          </motion.h2>
          <motion.p variants={fadeUp} className="mb-10 text-muted-foreground">
            Check your inbox (and spam folder) for the guide. While you wait...
          </motion.p>
          <motion.div variants={fadeUp} className="rounded-2xl border border-border bg-card p-8">
            <h3 className="mb-3 text-xl font-bold text-foreground">
              Want a Professional to Review Your Credit Report?
            </h3>
            <p className="mb-6 text-muted-foreground">
              Book a free credit analysis with our team. We'll pull up your report, identify the fastest path to your goal score, and build a custom strategy — no obligation.
            </p>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button asChild className="rounded-full px-8 py-6 text-lg font-bold gap-2">
                <Link to="/book">
                  <Phone className="h-5 w-5" />
                  Book Your Free Credit Analysis
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </Reveal>

      {/* ── FOOTER ── */}
      <footer className="border-t border-border bg-navy py-10 text-white">
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
          <div className="mt-10 border-t border-white/20 pt-6">
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

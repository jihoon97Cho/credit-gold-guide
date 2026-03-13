import { Star } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { COMPANY, SPOTS_REMAINING, SPOTS_MONTH } from "@/lib/constants";
import { useIsMobile } from "@/hooks/use-mobile";
import { useRef } from "react";

const Hero = () => {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Subtle parallax on hero — only desktop
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", isMobile ? "0%" : "8%"]);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const ease = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];
  const dur = isMobile ? 0.5 : 0.7;

  return (
    <section ref={sectionRef} id="home" className="bg-background py-20 lg:py-32 overflow-hidden">
      <motion.div
        className="container mx-auto px-4 text-center"
        style={{ y: bgY }}
      >
        <motion.span
          initial={{ opacity: 0, y: 16, filter: "blur(3px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: dur, ease, delay: 0.1 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary"
        >
          Credit Repair Specialists
        </motion.span>

        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(3px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: dur, ease, delay: 0.2 }}
          className="mb-6 flex items-center justify-center gap-1"
        >
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-primary text-primary" />
          ))}
          <span className="ml-2 text-sm text-muted-foreground">
            Rated <strong className="text-foreground">4.8</strong> · 500+ Clients Helped
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: isMobile ? 0.6 : 0.8, ease, delay: 0.3 }}
          className="mx-auto mb-6 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl"
        >
          Take Control of Your Credit.{" "}
          <span className="text-primary text-glow">Build the Future You Deserve.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(3px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: dur, ease, delay: 0.45 }}
          className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl"
        >
          We help remove negative items, improve your credit profile, and unlock real funding opportunities — backed by a money-back guarantee.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(3px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: dur, ease, delay: 0.6 }}
          className="mb-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
        >
          <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.97 }}>
            <Button asChild size="lg" className="rounded-full px-10 py-6 text-lg font-bold shadow-lg hover:shadow-xl transition-shadow">
              <Link to="/book">Book a Call Now</Link>
            </Button>
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur, ease, delay: 0.7 }}
          className="mb-6 text-sm font-semibold text-primary"
        >
          ⚠️ We only accept 10 new clients per month — <span className="font-extrabold">{SPOTS_REMAINING} spots remaining</span> for {SPOTS_MONTH}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: dur, ease, delay: 0.85 }}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground"
        >
          <span>✓ No obligation</span>
          <span>✓ Free consultation</span>
          <span>✓ Money-back guarantee</span>
          <span>✓ We never share your info</span>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;

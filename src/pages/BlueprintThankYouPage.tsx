import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Phone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { COMPANY } from "@/lib/constants";
import logo from "@/assets/logo.png";

const ease = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const BlueprintThankYouPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Simple nav */}
      <nav className="border-b border-border bg-background/90 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-center px-4 py-4">
          <Link to="/">
            <img src={logo} alt={COMPANY.name} className="h-8 w-auto" />
          </Link>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center py-16 lg:py-24">
        <div className="container mx-auto max-w-2xl px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="text-center"
          >
            <motion.div variants={fadeUp} className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CheckCircle2 className="h-8 w-8" />
            </motion.div>

            <motion.h1 variants={fadeUp} className="mb-4 text-3xl font-extrabold sm:text-4xl">
              Your Blueprint Is On the Way!
            </motion.h1>

            <motion.p variants={fadeUp} className="mb-10 text-lg text-muted-foreground">
              Check your inbox (and spam folder) for the guide. While you wait...
            </motion.p>

            <motion.div variants={fadeUp}>
              <Card className="p-8 text-left gold-glow">
                <h3 className="mb-3 text-xl font-bold text-foreground">
                  Want a Professional to Review Your Credit Report?
                </h3>
                <p className="mb-6 text-muted-foreground">
                  Book a free credit analysis with our team. We'll pull up your report, identify the fastest path to your goal score, and build a custom strategy — no obligation.
                </p>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Button asChild size="lg" className="w-full rounded-full py-6 text-lg font-bold gap-2">
                    <Link to="/book">
                      <Phone className="h-5 w-5" />
                      Book Your Free Credit Analysis
                    </Link>
                  </Button>
                </motion.div>
              </Card>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-6">
              <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                Back to Homepage <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Minimal footer */}
      <footer className="border-t border-border bg-navy py-6 text-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs opacity-60">
            © 2025 {COMPANY.name}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default BlueprintThankYouPage;

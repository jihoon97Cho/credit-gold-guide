import { Zap, DollarSign, MessageCircle, CheckCircle, ClipboardList, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal, RevealItem } from "@/components/ScrollReveal";

const items = [
  { icon: Zap, title: "Fast Action Plan", desc: "Get a clear plan within 24 to 48 hours." },
  { icon: DollarSign, title: "Money Back Guarantee", desc: "If we cannot remove at least one negative item in the first 30 to 60 days, our guarantee protects you." },
  { icon: MessageCircle, title: "Direct Communication", desc: "Talk to real people who care about helping you improve your credit." },
  { icon: CheckCircle, title: "Proven Process", desc: "A simple step by step process trusted by hundreds of clients." },
  { icon: ClipboardList, title: "Transparent Pricing", desc: "No hidden fees. No surprise charges. Ever." },
  { icon: Globe, title: "Nationwide Service", desc: "We help clients in all 50 states from anywhere." },
];

const WhyChooseUs = () => (
  <ScrollReveal as="section" className="bg-background py-16 lg:py-24">
    <div className="container mx-auto px-4">
      <div className="mb-12 text-center">
        <RevealItem>
          <h2 className="mb-4 text-3xl font-extrabold text-foreground sm:text-4xl">
            Why Clients <span className="text-primary text-glow">Choose Us</span>
          </h2>
        </RevealItem>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <RevealItem key={item.title}>
            <motion.div
              whileHover={{ scale: 1.04, y: -10, boxShadow: "0 20px 50px -12px hsla(42, 52%, 53%, 0.2)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex items-start gap-4 rounded-xl border border-border bg-card p-6 shadow-sm"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="mb-1 font-bold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </motion.div>
          </RevealItem>
        ))}
      </div>
    </div>
  </ScrollReveal>
);

export default WhyChooseUs;

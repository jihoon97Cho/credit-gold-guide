import { motion } from "framer-motion";
import { ScrollReveal, RevealItem } from "@/components/ScrollReveal";

const steps = [
  { num: "01", title: "Free Credit Review", desc: "We look at your credit, find what is hurting it, and show you the best next steps." },
  { num: "02", title: "Dispute Negative Items", desc: "We work to remove inaccurate negative items from your credit report." },
  { num: "03", title: "Build Better Credit Habits", desc: "We help you improve the things that can make your credit stronger over time." },
  { num: "04", title: "Move Forward With Confidence", desc: "With better credit, you can have a better chance of getting approved and more options in front of you." },
];

const Services = () => (
  <ScrollReveal as="section" id="services" className="bg-secondary py-16 lg:py-24">
    <div className="container mx-auto px-4">
      <div className="mb-12 text-center">
        <RevealItem>
          <h2 className="mb-4 text-3xl font-extrabold text-foreground sm:text-4xl">
            How It <span className="text-primary text-glow">Works</span>
          </h2>
        </RevealItem>
        <RevealItem>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            A simple, proven process to repair your credit and unlock new opportunities.
          </p>
        </RevealItem>
      </div>

      <div className="mx-auto max-w-3xl space-y-6">
        {steps.map((s) => (
          <RevealItem key={s.num}>
            <motion.div
              whileHover={{ scale: 1.04, y: -10, boxShadow: "0 20px 50px -12px hsla(42, 52%, 53%, 0.2)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex gap-5 rounded-xl border border-border bg-card p-6 shadow-sm"
            >
              <span className="shrink-0 text-3xl font-extrabold text-primary">{s.num}</span>
              <div>
                <h3 className="mb-1 text-lg font-bold text-foreground">{s.title}</h3>
                <p className="text-muted-foreground">{s.desc}</p>
              </div>
            </motion.div>
          </RevealItem>
        ))}
      </div>
    </div>
  </ScrollReveal>
);

export default Services;

import { Check, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal, RevealItem } from "@/components/ScrollReveal";
import { COMPANY } from "@/lib/constants";

const features = [
  "Full service credit repair",
  "Disputes across all 3 bureaus",
  "Multiple dispute rounds as needed",
  "Help with collections, charge offs, and late payments",
  "Inquiry audit and targeting",
  "Identity theft and inaccurate account review",
  "Utilization and profile optimization",
  "Ongoing progress updates",
  "Negative item audit",
  "Direct access to our team",
  "Money back guarantee if we can't get a single negative removed in 30–120 days",
];

const plans = [
  { name: "One-Time Payment", price: "$799", period: "one-time", desc: "Pay once — we handle everything.", popular: false, link: "https://www.fanbasis.com/agency-checkout/ascend-solutions/l2Yo1", type: "payment" },
  { name: "Monthly Plan", price: "$125", period: "/month", desc: "Flexible monthly payments while we work on your credit.", popular: true, link: "https://www.fanbasis.com/agency-checkout/ascend-solutions/5RyER", type: "payment" },
  { name: "Bankruptcy Rebuilding", price: "Custom", period: "pricing", desc: "Personalized strategy and pricing for active or discharged bankruptcies.", popular: false, link: `tel:${COMPANY.phone}`, type: "call" },
];

const Pricing = () => {
  return (
    <ScrollReveal as="section" id="pricing" className="bg-background py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <RevealItem>
            <h2 className="mb-4 text-3xl font-extrabold text-foreground sm:text-4xl">
              Simple, Transparent <span className="text-primary text-glow">Pricing</span>
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              No hidden fees. No surprise charges. Choose the plan that works for you.
            </p>
          </RevealItem>
        </div>

        <RevealItem>
          <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan) => (
              <motion.div
                key={plan.name}
                whileHover={{ scale: 1.04, y: -10, boxShadow: "0 20px 50px -12px hsla(42, 52%, 53%, 0.25)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`relative rounded-2xl border p-8 shadow-sm ${
                  plan.popular ? "border-primary gold-glow" : "border-border"
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most Popular</Badge>
                )}
                <h3 className="mb-1 text-xl font-bold text-foreground">{plan.name}</h3>
                <p className="mb-4 text-sm text-muted-foreground">{plan.desc}</p>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-foreground">{plan.price}</span>
                  <span className="ml-1 text-muted-foreground">{plan.period}</span>
                </div>
                <ul className="mb-8 space-y-3">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" /> {f}
                    </li>
                  ))}
                </ul>
                {plan.popular && (
                  <p className="mb-4 text-center text-xs text-muted-foreground italic">
                    First month is $150 ($25 one-time setup fee)
                  </p>
                )}
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <a href={plan.link} target={plan.type === "payment" ? "_blank" : undefined} rel={plan.type === "payment" ? "noopener noreferrer" : undefined}>
                    <Button className="w-full rounded-full py-6 text-lg font-bold gap-2">
                      {plan.type === "call" ? (
                        <>
                          <Phone className="h-5 w-5" />
                          Book a Call
                        </>
                      ) : (
                        "Fix My Credit"
                      )}
                    </Button>
                  </a>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </RevealItem>

        <RevealItem>
          <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-muted-foreground">
            Credit monitoring is required for enrollment and is billed separately at $29.99/month.
          </p>
        </RevealItem>
      </div>
    </ScrollReveal>
  );
};

export default Pricing;

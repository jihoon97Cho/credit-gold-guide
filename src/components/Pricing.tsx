import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const features = [
  "Full credit repair service",
  "All 3 credit bureaus (Equifax, Experian, TransUnion)",
  "Multiple rounds of disputes",
  "Collections, charge-offs & late payments",
  "Bankruptcy assistance included",
  "Credit building strategy",
  "Business funding guidance",
  "Direct communication with your team",
  "Money-back guarantee",
];

const plans = [
  { name: "One-Time Payment", price: "$799", period: "one-time", desc: "Pay once — we handle everything.", popular: false },
  { name: "Monthly Plan", price: "$125", period: "/month", desc: "Flexible monthly payments while we work on your credit.", popular: true },
];

const Pricing = () => {

  return (
    <section id="pricing" className="bg-background py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-extrabold text-foreground sm:text-4xl">
            Simple, Transparent <span className="text-primary text-glow">Pricing</span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            No hidden fees. No surprise charges. Choose the plan that works for you.
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
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
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button className="w-full rounded-full py-6 text-lg font-bold">
                  Get Started
                </Button>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-muted-foreground">
          Credit monitoring is required for enrollment and is billed separately at $29.99/month.
        </p>
      </div>
    </section>
  );
};

export default Pricing;

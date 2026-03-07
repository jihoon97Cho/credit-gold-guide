import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ScrollReveal, RevealItem } from "@/components/ScrollReveal";
import { ShieldAlert, Phone } from "lucide-react";
import { COMPANY } from "@/lib/constants";

const BankruptcySection = () => (
  <ScrollReveal as="section" id="bankruptcy" className="bg-secondary py-16 lg:py-24">
    <div className="container mx-auto px-4">
      <div className="mx-auto max-w-3xl text-center">
        <RevealItem>
          <div className="mb-6 inline-flex items-center justify-center rounded-full border border-primary/20 bg-primary/10 p-4">
            <ShieldAlert className="h-8 w-8 text-primary" />
          </div>
        </RevealItem>
        <RevealItem>
          <h2 className="mb-4 text-3xl font-extrabold text-foreground sm:text-4xl">
            Dealing With a <span className="text-primary text-glow">Bankruptcy?</span>
          </h2>
        </RevealItem>
        <RevealItem>
          <p className="mx-auto mb-4 max-w-2xl text-muted-foreground">
            Whether your bankruptcy is active or discharged, we specialize in helping you rebuild.
            Every situation is different — so we create a custom plan and pricing tailored to your needs.
          </p>
        </RevealItem>
        <RevealItem>
          <p className="mb-8 text-sm text-muted-foreground">
            Book a free call so we can review your credit and put together a personalized strategy.
          </p>
        </RevealItem>
        <RevealItem>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-block">
            <a href={`tel:${COMPANY.phone}`}>
              <Button size="lg" className="rounded-full px-8 py-6 text-lg font-bold gap-2">
                <Phone className="h-5 w-5" />
                Book a Free Call
              </Button>
            </a>
          </motion.div>
        </RevealItem>
      </div>
    </div>
  </ScrollReveal>
);

export default BankruptcySection;

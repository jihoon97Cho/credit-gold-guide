import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollReveal, RevealItem } from "@/components/ScrollReveal";

import clientAdeyinka from "@/assets/client-adeyinka.png";
import clientJackie from "@/assets/client-jackie.png";
import clientStacy from "@/assets/client-stacy.png";
import clientConnie from "@/assets/client-connie.png";
import clientTrevin from "@/assets/client-trevin.png";

const testimonials = [
  { name: "Adeyinka R.", text: "I never thought my credit could recover this fast. The team was professional and kept me updated every step of the way.", image: clientAdeyinka },
  { name: "Jackie R.", text: "They helped me go from being denied to getting approved for my dream home. Truly life-changing results.", image: clientJackie },
  { name: "Stacy W.", text: "Over 80 points gained across all three bureaus. I'm so grateful I trusted them with my credit journey.", image: clientStacy },
  { name: "Connie S.", text: "Fast, transparent, and effective. They removed multiple negatives and my score jumped significantly.", image: clientConnie },
  { name: "Trevin C.", text: "I was skeptical at first, but the results speak for themselves. Best investment I've made in my financial future.", image: clientTrevin },
];

const Testimonials = () => (
  <ScrollReveal as="section" id="testimonials" className="bg-secondary py-16 lg:py-24">
    <div className="container mx-auto px-4">
      <div className="mb-12 text-center">
        <RevealItem>
          <h2 className="mb-4 text-3xl font-extrabold text-foreground sm:text-4xl">
            Hear From Our <span className="text-primary text-glow">Clients</span>
          </h2>
        </RevealItem>
        <RevealItem>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Real results from real clients who trusted us with their credit journey.
          </p>
        </RevealItem>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 max-w-7xl mx-auto">
        {testimonials.map((t) => (
          <RevealItem key={t.name}>
            <motion.div
              whileHover={{ scale: 1.04, y: -10, boxShadow: "0 20px 50px -12px hsla(42, 52%, 53%, 0.2)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Card className="border-border bg-card shadow-sm h-full">
                <CardContent className="p-5">
                  <img
                    src={t.image}
                    alt={`${t.name} credit score results`}
                    className="mb-4 w-full rounded-lg"
                    loading="lazy"
                  />
                  <p className="mb-3 text-sm text-foreground">"{t.text}"</p>
                  <p className="font-bold text-foreground">{t.name}</p>
                </CardContent>
              </Card>
            </motion.div>
          </RevealItem>
        ))}
      </div>
    </div>
  </ScrollReveal>
);

export default Testimonials;

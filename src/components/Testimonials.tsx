import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollReveal, RevealItem } from "@/components/ScrollReveal";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  const prev = useCallback(() => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1)), []);
  const next = useCallback(() => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1)), []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const t = testimonials[current];

  return (
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

        <RevealItem>
          <div className="mx-auto max-w-lg">
            <div className="relative">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <Card className="border-border bg-card shadow-sm">
                  <CardContent className="p-6">
                    <img
                      src={t.image}
                      alt={`${t.name} credit score results`}
                      className="mb-5 w-full rounded-xl"
                    />
                    <p className="mb-3 text-base text-foreground">"{t.text}"</p>
                    <p className="font-bold text-foreground">{t.name}</p>
                  </CardContent>
                </Card>
              </motion.div>

              <Button
                variant="outline"
                size="icon"
                className="absolute -left-4 top-1/2 -translate-y-1/2 rounded-full border-border bg-card shadow-md sm:-left-14"
                onClick={prev}
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute -right-4 top-1/2 -translate-y-1/2 rounded-full border-border bg-card shadow-md sm:-right-14"
                onClick={next}
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            <div className="mt-6 flex justify-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === current ? "w-8 bg-primary" : "w-2.5 bg-muted-foreground/30"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </RevealItem>
      </div>
    </ScrollReveal>
  );
};

export default Testimonials;

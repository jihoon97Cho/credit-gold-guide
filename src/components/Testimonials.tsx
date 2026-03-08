import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
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

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = testimonials.length;

  const go = useCallback(
    (dir: 1 | -1) => setCurrent((c) => (c + dir + total) % total),
    [total]
  );

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => go(1), 5000);
    return () => clearInterval(id);
  }, [paused, go]);

  const getOffset = (index: number) => {
    let diff = index - current;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  return (
    <ScrollReveal as="section" id="testimonials" className="bg-secondary py-16 lg:py-24 overflow-hidden">
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
          <div
            className="relative mx-auto flex items-center justify-center"
            style={{ height: "620px", maxWidth: "1100px" }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="carousel-3d relative w-full h-full flex items-center justify-center">
              {testimonials.map((t, i) => {
                const offset = getOffset(i);
                const absOffset = Math.abs(offset);
                const isActive = offset === 0;
                const visible = absOffset <= 2;

                if (!visible) return null;

                const x = offset * 300;
                const z = -absOffset * 220;
                const rotateY = offset * -15;
                const scale = 1 - absOffset * 0.15;
                const opacity = 1 - absOffset * 0.35;
                const blur = absOffset * 3;

                return (
                  <motion.div
                    key={i}
                    className="absolute cursor-pointer"
                    style={{
                      width: "480px",
                      zIndex: 10 - absOffset,
                    }}
                    animate={{
                      x,
                      z,
                      rotateY,
                      scale,
                      opacity,
                      filter: `blur(${blur}px)`,
                    }}
                    transition={{
                      duration: 0.8,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    whileHover={
                      isActive
                        ? {
                            scale: scale * 1.05,
                            y: -8,
                            boxShadow: "0 25px 60px -12px hsla(42, 52%, 53%, 0.35)",
                          }
                        : undefined
                    }
                    onClick={() => !isActive && setCurrent(i)}
                  >
                    <div
                      className={`overflow-hidden rounded-2xl border bg-card shadow-xl ${
                        isActive ? "border-primary/30 carousel-float" : "border-border"
                      }`}
                      style={
                        isActive
                          ? {
                              boxShadow: "0 20px 50px -12px hsla(42, 52%, 53%, 0.25), 0 0 40px hsla(42, 52%, 53%, 0.08)",
                            }
                          : {
                              boxShadow: "0 10px 30px -10px hsla(0, 0%, 0%, 0.15)",
                            }
                      }
                    >
                      <img
                        src={t.image}
                        alt={`${t.name} credit score results`}
                        className="h-auto w-full object-cover"
                        loading="lazy"
                      />
                      <div className="p-5">
                        <p className="mb-2 text-sm text-foreground">"{t.text}"</p>
                        <p className="font-bold text-foreground">{t.name}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <button
              onClick={() => go(-1)}
              className="absolute left-2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/80 text-foreground shadow-md backdrop-blur transition-colors hover:bg-primary hover:text-primary-foreground"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => go(1)}
              className="absolute right-2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/80 text-foreground shadow-md backdrop-blur transition-colors hover:bg-primary hover:text-primary-foreground"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  i === current
                    ? "w-8 bg-primary"
                    : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </RevealItem>
      </div>
    </ScrollReveal>
  );
};

export default Testimonials;

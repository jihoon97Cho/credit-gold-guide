import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import proof1 from "@/assets/proof-1.png";
import proof2 from "@/assets/proof-2.png";
import proof3 from "@/assets/proof-3.png";
import proof4 from "@/assets/proof-4.png";
import results from "@/assets/results.png";
import deletions from "@/assets/deletions.png";

const images = [
  { src: proof1, alt: "Client proof 1" },
  { src: proof2, alt: "Client proof 2" },
  { src: proof3, alt: "Client proof 3" },
  { src: proof4, alt: "Client proof 4" },
  { src: results, alt: "Client results" },
  { src: deletions, alt: "Deleted items" },
];

const Results = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = images.length;

  const go = useCallback(
    (dir: 1 | -1) => setCurrent((c) => (c + dir + total) % total),
    [total]
  );

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => go(1), 4500);
    return () => clearInterval(id);
  }, [paused, go]);

  const getOffset = (index: number) => {
    let diff = index - current;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  return (
    <section className="bg-secondary py-16 lg:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-extrabold text-foreground sm:text-4xl">
            Real Clients.{" "}
            <span className="text-primary text-glow">Real Results.</span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            See real improvements from real clients. Negative items removed,
            scores improved, funding unlocked.
          </p>
        </div>

        {/* 3D Carousel */}
        <div
          className="relative mx-auto flex items-center justify-center"
          style={{ height: "580px", maxWidth: "1100px" }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="carousel-3d relative w-full h-full flex items-center justify-center">
            {images.map((img, i) => {
              const offset = getOffset(i);
              const absOffset = Math.abs(offset);
              const isActive = offset === 0;
              const visible = absOffset <= 2;

              if (!visible) return null;

              const x = offset * 220;
              const z = -absOffset * 180;
              const rotateY = offset * -15;
              const scale = 1 - absOffset * 0.15;
              const opacity = 1 - absOffset * 0.35;
              const blur = absOffset * 3;

              return (
                <motion.div
                  key={i}
                  className="absolute cursor-pointer"
                  style={{
                    width: "450px",
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
                          boxShadow:
                            "0 25px 60px -12px hsla(42, 52%, 53%, 0.35)",
                        }
                      : undefined
                  }
                  onClick={() => !isActive && setCurrent(i)}
                >
                  <div
                    className={`overflow-hidden rounded-2xl border bg-card shadow-xl ${
                      isActive
                        ? "border-primary/30 carousel-float"
                        : "border-border"
                    }`}
                    style={
                      isActive
                        ? {
                            boxShadow:
                              "0 20px 50px -12px hsla(42, 52%, 53%, 0.25), 0 0 40px hsla(42, 52%, 53%, 0.08)",
                          }
                        : {
                            boxShadow: "0 10px 30px -10px hsla(0, 0%, 0%, 0.15)",
                          }
                    }
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="h-auto w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Nav buttons */}
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

        {/* Dots */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-500 ${
                i === current
                  ? "w-8 bg-primary"
                  : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Results;

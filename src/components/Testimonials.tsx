import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollReveal, RevealItem } from "@/components/ScrollReveal";

const testimonials = [
  { name: "Marcus T.", location: "Atlanta, GA", before: 512, after: 695, text: "They removed 19 negatives in under 90 days. I was able to qualify for a mortgage!" },
  { name: "Jasmine W.", location: "Houston, TX", before: 478, after: 641, text: "Went from getting denied everywhere to getting approved for business funding. Life-changing." },
  { name: "Derek S.", location: "Chicago, IL", before: 530, after: 710, text: "Even with a bankruptcy on my file, they got my score up significantly. Incredible team." },
  { name: "Nicole R.", location: "Miami, FL", before: 498, after: 672, text: "Professional, honest, and they actually deliver. Best decision I made for my credit." },
  { name: "Carlos M.", location: "Los Angeles, CA", before: 545, after: 738, text: "I was skeptical, but the results speak for themselves. Multiple items removed and a major score jump." },
];

const Stars = () => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
    ))}
  </div>
);

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

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <RevealItem key={t.name}>
            <motion.div
              whileHover={{ scale: 1.04, y: -10, boxShadow: "0 20px 50px -12px hsla(42, 52%, 53%, 0.2)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Card className="border-border bg-card shadow-sm h-full">
                <CardContent className="p-6">
                  <Stars />
                  <p className="my-4 text-foreground">"{t.text}"</p>
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <p className="font-bold text-foreground">{t.name}</p>
                      <p className="text-muted-foreground">{t.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-muted-foreground">
                        <span className="text-destructive">{t.before}</span> → <span className="font-bold text-primary">{t.after}</span>
                      </p>
                    </div>
                  </div>
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

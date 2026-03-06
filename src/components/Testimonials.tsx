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
          <div className="mx-auto flex flex-col items-center gap-2">
            <div className="flex items-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-6 w-6 ${i < 5 ? (i === 4 ? "fill-primary/60 text-primary/60" : "fill-primary text-primary") : "text-muted-foreground"}`} />
              ))}
              <span className="ml-1 text-xl font-bold text-foreground">4.8</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Rated <span className="font-semibold text-foreground">4.8 out of 5</span> on Google · <span className="font-semibold text-foreground">500+ Reviews</span>
            </p>
            <div className="mt-1 flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs text-muted-foreground">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google Reviews
            </div>
          </div>
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

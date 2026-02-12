import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  { name: "Marcus T.", location: "Atlanta, GA", before: 512, after: 695, text: "They removed 19 negatives in under 90 days. I was able to qualify for a mortgage!" },
  { name: "Jasmine W.", location: "Houston, TX", before: 478, after: 641, text: "Went from getting denied everywhere to getting approved for business funding. Life-changing." },
  { name: "Derek S.", location: "Chicago, IL", before: 530, after: 710, text: "Even with a bankruptcy on my file, they got my score up 180 points. Incredible team." },
  { name: "Nicole R.", location: "Miami, FL", before: 498, after: 672, text: "Professional, honest, and they actually deliver. Best decision I made for my credit." },
  { name: "Carlos M.", location: "Los Angeles, CA", before: 545, after: 738, text: "I was skeptical, but the results speak for themselves. 23 items removed and a 193-point jump." },
];

const Stars = () => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
    ))}
  </div>
);

const Testimonials = () => (
  <section id="testimonials" className="py-16 lg:py-24">
    <div className="container mx-auto px-4">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-extrabold text-foreground sm:text-4xl">
          Hear From Our <span className="text-primary">Clients</span>
        </h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <Card key={t.name} className="border-border bg-card">
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
                    <span className="text-destructive">{t.before}</span> → <span className="text-primary font-bold">{t.after}</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;

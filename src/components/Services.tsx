import { ShieldCheck, Landmark, TrendingUp, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    icon: ShieldCheck,
    title: "Credit Repair",
    bullets: ["Collections removal", "Charge-offs", "Late payments", "Inaccurate reporting", "Bankruptcies"],
  },
  {
    icon: Landmark,
    title: "Bankruptcy Assistance",
    bullets: ["Active & discharged bankruptcies", "Strategic rebuilding plan", "Score recovery roadmap"],
  },
  {
    icon: TrendingUp,
    title: "Credit Building Strategy",
    bullets: ["Personalized roadmap", "Utilization optimization", "Profile strengthening"],
  },
  {
    icon: DollarSign,
    title: "Business Funding",
    bullets: ["Access capital with strong credit", "0% interest options when qualified", "Structured funding strategy"],
  },
];

const Services = () => (
  <section id="services" className="py-16 lg:py-24">
    <div className="container mx-auto px-4">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-extrabold text-foreground sm:text-4xl">
          How We <span className="text-primary">Help You Win</span>
        </h2>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Comprehensive credit repair and funding solutions designed for real results.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s) => (
          <Card key={s.title} className="border-border bg-card transition-shadow hover:shadow-lg hover:shadow-primary/5">
            <CardHeader>
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <s.icon className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-lg text-foreground">{s.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span className="mt-1 text-primary">✓</span> {b}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

export default Services;

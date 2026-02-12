import { Zap, DollarSign, MessageCircle, CheckCircle, ClipboardList, Globe } from "lucide-react";

const items = [
  { icon: Zap, title: "Fast Action Plan", desc: "Your personalized strategy within 24–48 hours." },
  { icon: DollarSign, title: "Money Back Guarantee", desc: "If we can't remove at least one negative item in the first 30–60 days." },
  { icon: MessageCircle, title: "Direct Communication", desc: "Talk to real people who care about your results." },
  { icon: CheckCircle, title: "Proven Process", desc: "A step-by-step system trusted by hundreds of clients." },
  { icon: ClipboardList, title: "Transparent Pricing", desc: "No hidden fees. No surprise charges. Ever." },
  { icon: Globe, title: "Nationwide Service", desc: "Serving clients in all 50 states remotely." },
];

const WhyChooseUs = () => (
  <section className="bg-secondary py-16 lg:py-24">
    <div className="container mx-auto px-4">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-extrabold text-foreground sm:text-4xl">
          Why Clients <span className="text-primary">Choose Us</span>
        </h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <div key={item.title} className="flex items-start gap-4 rounded-xl border border-border bg-card p-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <item.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="mb-1 font-bold text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;

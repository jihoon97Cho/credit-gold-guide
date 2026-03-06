const steps = [
  {
    num: "01",
    title: "Free Strategy Call",
    desc: "We review your credit reports, identify negative items, and build a personalized game plan — all at no cost.",
  },
  {
    num: "02",
    title: "Dispute & Remove",
    desc: "We aggressively dispute inaccurate, unfair, and unverifiable items across all 3 bureaus using proven legal strategies.",
  },
  {
    num: "03",
    title: "Build & Optimize",
    desc: "We help you add positive tradelines, optimize utilization, and strengthen your overall credit profile.",
  },
  {
    num: "04",
    title: "Unlock Funding",
    desc: "With improved credit, we connect you to business funding opportunities — including 0% interest options when qualified.",
  },
];

const Services = () => (
  <section id="services" className="bg-secondary py-16 lg:py-24">
    <div className="container mx-auto px-4">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-extrabold text-foreground sm:text-4xl">
          How It <span className="text-primary">Works</span>
        </h2>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          A simple, proven process to repair your credit and unlock new opportunities.
        </p>
      </div>

      <div className="mx-auto max-w-3xl space-y-6">
        {steps.map((s) => (
          <div key={s.num} className="flex gap-5 rounded-xl border border-border bg-card p-6 shadow-sm">
            <span className="shrink-0 text-3xl font-extrabold text-primary">{s.num}</span>
            <div>
              <h3 className="mb-1 text-lg font-bold text-foreground">{s.title}</h3>
              <p className="text-muted-foreground">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Services;

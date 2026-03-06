import LeadForm from "./LeadForm";

const FinalCTA = () => (
  <section id="contact" className="bg-secondary py-16 lg:py-24">
    <div className="container mx-auto max-w-2xl px-4">
      <div className="mb-10 text-center">
        <h2 className="mb-4 text-3xl font-extrabold text-foreground sm:text-4xl">
          Ready to <span className="text-primary">Fix Your Credit?</span>
        </h2>
        <p className="text-lg text-muted-foreground">
          Don't let bad credit hold you back. Schedule your free strategy call today and start your journey to financial freedom.
        </p>
      </div>
      <LeadForm id="contact-form" />
    </div>
  </section>
);

export default FinalCTA;

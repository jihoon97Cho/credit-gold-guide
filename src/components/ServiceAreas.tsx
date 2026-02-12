import usaMap from "@/assets/usa-map.png";

const ServiceAreas = () => (
  <section className="relative bg-secondary py-16 lg:py-24 overflow-hidden">
    {/* USA Map Background */}
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <img
        src={usaMap}
        alt=""
        className="w-[90%] max-w-[800px] opacity-[0.08]"
        aria-hidden="true"
      />
    </div>

    <div className="container relative z-10 mx-auto px-4 text-center">
      <h2 className="mb-4 text-3xl font-extrabold text-foreground sm:text-4xl">
        Serving Clients <span className="text-primary">Nationwide</span>
      </h2>
      <p className="mx-auto mb-6 max-w-2xl text-muted-foreground">
        We work with clients in all 50 states. Everything is handled remotely — from consultation to results — so you can get started no matter where you live.
      </p>
      <div className="mx-auto flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
        <span className="rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 font-semibold text-primary">All 50 States</span>
        <span className="rounded-full border border-border bg-card/50 px-4 py-1.5">100% Remote</span>
        <span className="rounded-full border border-border bg-card/50 px-4 py-1.5">Phone & Video Consultations</span>
      </div>
    </div>
  </section>
);

export default ServiceAreas;

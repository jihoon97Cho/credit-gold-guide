const ServiceAreas = () => (
  <section className="bg-secondary py-16 lg:py-24">
    <div className="container mx-auto px-4 text-center">
      <h2 className="mb-4 text-3xl font-extrabold text-foreground sm:text-4xl">
        Serving Clients <span className="text-primary">Nationwide</span>
      </h2>
      <p className="mx-auto mb-10 max-w-2xl text-muted-foreground">
        We work with clients in all 50 states. Everything is handled remotely — from consultation to results — so you can get started no matter where you live.
      </p>

      {/* Simplified US map */}
      <div className="mx-auto max-w-3xl">
        <svg viewBox="0 0 960 600" className="w-full" aria-label="United States map showing nationwide coverage">
          <path
            d="M833 532l-1-2-3-1h-3l-1-2-2-2-3-2-4-1-4-2-5 0-3 1-4 0-4 1-3 2-3 1-3 1-3-1-2-3 1-3 3-4 4-5 1-5-2-3-3-2-4-1-4 0-3-1h-5l-4 0-6 1-4 2-2 3 1 5 2 4 0 3-2 3-3 2h-3l-3-1-3-2-2-1-3 0-3 1-3 2-3 3-2 4 0 5 0 3-1 3-2 2-3 1-2-1-2-2-2-3-4-2-4 1-3 2-2 2-1 3 0 3 1 3 1 3 2 2 2 2 2 1 2-1 1-2 0-3 1-4 3-3 3-1 4 0 4 1 3 2 2 3 0 3 1 4 2 3 3 2 4 1 4 0 4-1 3-2 3-3 2-4 0-4-1-3-2-3-3-2-4 0-4 0-3-1-3-2-3-2h-3l-3 1-3 2-3 3-2 4 0 4 0 3-1 3-2 2-3 1-3 0-3-1-4-2-3-2-2-3-1-4 0-4 1-3 2-3 3-2 3-1h4l3 1 3 2 3 2 3 1 3 1 4-1 3-2 2-3 1-4"
            className="fill-primary/20 stroke-primary/40"
            strokeWidth="1"
          />
          <text x="480" y="350" textAnchor="middle" className="fill-primary text-xl font-bold" fontSize="32">
            All 50 States
          </text>
        </svg>
      </div>
    </div>
  </section>
);

export default ServiceAreas;

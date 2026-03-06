import { Phone, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/constants";

const Hero = () => {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="bg-background py-20 lg:py-32">
      <div className="container mx-auto px-4 text-center">
        {/* Pill badge */}
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
          Credit Repair Specialists
        </span>

        {/* Star rating */}
        <div className="mb-6 flex items-center justify-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-primary text-primary" />
          ))}
          <span className="ml-2 text-sm text-muted-foreground">
            Rated <strong className="text-foreground">4.8</strong> · 500+ Clients Helped
          </span>
        </div>

        <h1 className="mx-auto mb-6 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Take Control of Your Credit.{" "}
          <span className="text-primary">Build the Future You Deserve.</span>
        </h1>

        <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          We help remove negative items, improve your credit profile, and unlock real funding opportunities — backed by a money-back guarantee.
        </p>

        {/* CTAs */}
        <div className="mb-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button onClick={() => scrollTo("#contact")} size="lg" className="rounded-full px-10 py-6 text-lg font-bold">
            Get Your Free Strategy Call
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full border-border px-8 py-6 text-lg text-foreground hover:bg-secondary">
            <a href={`tel:${COMPANY.phone}`}>
              <Phone className="mr-2 h-5 w-5" /> Call Now
            </a>
          </Button>
        </div>

        {/* Trust bullets */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <span>✓ No obligation</span>
          <span>✓ Free consultation</span>
          <span>✓ Money-back guarantee</span>
          <span>✓ We never share your info</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;

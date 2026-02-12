import { Phone, ShieldCheck, Globe, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/constants";
import LeadForm from "./LeadForm";

const badges = [
  { icon: ShieldCheck, text: "Money Back Guarantee" },
  { icon: Award, text: "We Work With Bankruptcies" },
  { icon: Globe, text: "Nationwide Service" },
];

const Hero = () => {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="hero-gradient relative overflow-hidden">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left */}
          <div className="text-center lg:text-left">
            <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Take Control of Your Credit.{" "}
              <span className="text-primary">Unlock Real Funding.</span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground sm:text-xl">
              Fast results. Proven process. Money-back guarantee. We help clients nationwide repair their credit and access business funding — even with bankruptcies on file.
            </p>

            {/* Trust badges */}
            <div className="mb-8 flex flex-wrap justify-center gap-4 lg:justify-start">
              {badges.map((b) => (
                <span key={b.text} className="flex items-center gap-2 rounded-full border border-primary/20 bg-secondary px-4 py-2 text-sm font-medium text-foreground">
                  <b.icon className="h-4 w-4 text-primary" />
                  {b.text}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Button onClick={() => scrollTo("#contact")} size="lg" className="rounded-full bg-primary px-8 py-6 text-lg font-bold text-primary-foreground hover:bg-primary/90">
                Get Your Free Strategy Call
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full border-primary/40 px-8 py-6 text-lg text-primary hover:bg-primary/10">
                <a href={`tel:${COMPANY.phone}`}>
                  <Phone className="mr-2 h-5 w-5" /> Call Now
                </a>
              </Button>
            </div>
          </div>

          {/* Right — Form */}
          <div>
            <LeadForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

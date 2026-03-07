import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle, ChevronDown, ExternalLink, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal, RevealItem } from "@/components/ScrollReveal";

const ThankYouPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto max-w-2xl px-4 space-y-16">

          {/* 1. Confirmation */}
          <ScrollReveal className="space-y-4 text-center pt-8">
            <RevealItem>
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/15">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
            </RevealItem>
            <RevealItem>
              <h1 className="text-3xl font-bold text-foreground sm:text-4xl">
                Your Call Is Confirmed
              </h1>
            </RevealItem>
            <RevealItem>
              <p className="mx-auto max-w-md text-base text-muted-foreground leading-relaxed">
                We're looking forward to speaking with you. Please review the quick steps below before your appointment.
              </p>
            </RevealItem>
            <RevealItem>
              <ChevronDown className="mx-auto mt-4 h-5 w-5 text-muted-foreground/50 animate-bounce" />
            </RevealItem>
          </ScrollReveal>

          {/* 2. Loom Video — What To Expect */}
          <ScrollReveal className="space-y-4">
            <RevealItem>
              <div className="rounded-2xl border border-border bg-card p-5 sm:p-8 shadow-sm">
                <h2 className="mb-1 text-xl font-semibold text-foreground sm:text-2xl">
                  What To Expect On Your Call
                </h2>
                <p className="mb-5 text-sm text-muted-foreground leading-relaxed">
                  Watch this quick video so you know what we'll cover and how to prepare.
                </p>
                <div className="aspect-video w-full overflow-hidden rounded-xl bg-muted flex items-center justify-center">
                  <p className="text-muted-foreground text-sm">Loom video coming soon</p>
                </div>
              </div>
            </RevealItem>
          </ScrollReveal>

          {/* 3. Testimonial Video */}
          <ScrollReveal className="space-y-4">
            <RevealItem>
              <div className="rounded-2xl border border-border bg-card p-5 sm:p-8 shadow-sm">
                <h2 className="mb-1 text-xl font-semibold text-foreground sm:text-2xl">
                  Hear From One Of Our Clients
                </h2>
                <p className="mb-5 text-sm text-muted-foreground leading-relaxed">
                  See how one of our clients improved their credit and why they were glad they took the next step.
                </p>
                <div className="overflow-hidden rounded-xl">
                  <video controls preload="metadata" className="w-full rounded-xl">
                    <source src="/videos/testimonial-1.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </RevealItem>
          </ScrollReveal>

          {/* 4. Final Step — Credit Monitoring */}
          <ScrollReveal className="space-y-4 pb-4">
            <RevealItem>
              <div className="rounded-2xl border border-border bg-card p-5 sm:p-8 shadow-sm">
                <h2 className="mb-1 text-xl font-semibold text-foreground sm:text-2xl">
                  Final Step Before Your Call
                </h2>
                <p className="mb-4 text-sm text-muted-foreground leading-relaxed">
                  Please complete this step before your appointment so we can make your initial credit review more productive.
                </p>
                <p className="mb-6 text-sm text-foreground/80 leading-relaxed">
                  Please sign up using the link below so we can complete your initial credit review and identify the negative items impacting your report. This is only needed for the initial review. Once that review is complete, you can cancel it directly with the provider, since we offer a lower cost credit monitoring option for ongoing use during the process.
                </p>
                <div className="text-center">
                  <a
                    href="https://affiliate.upsellnation.com/scripts/x7y3nqcm?a_aid=69a07e1077c61&a_bid=baba7135"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="lg" className="text-sm font-semibold gap-2 px-6">
                      Complete Credit Monitoring Step <ExternalLink className="h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </div>
            </RevealItem>
          </ScrollReveal>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ThankYouPage;

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const ThankYouPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto max-w-3xl px-4 space-y-12">

          {/* 1. Confirmation */}
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
              <CheckCircle className="h-10 w-10 text-primary" />
            </div>
            <h1 className="mb-2 text-3xl font-extrabold text-foreground sm:text-4xl">
              Thanks for Booking a Call!
            </h1>
            <p className="text-lg text-muted-foreground">
              Your call is confirmed. We're excited to help you start your credit repair journey.
            </p>
          </div>

          {/* 2. What Happens Next */}
          <div className="gold-glow rounded-2xl border border-border bg-card p-6 sm:p-8">
            <h2 className="mb-2 text-center text-xl font-bold text-foreground sm:text-2xl">
              What Happens Next
            </h2>
            <p className="mb-6 text-center text-muted-foreground">
              Here's what to expect on the call
            </p>
            {/* Loom video placeholder — replace src with your Loom embed URL */}
            <div className="aspect-video w-full overflow-hidden rounded-xl bg-muted flex items-center justify-center">
              <p className="text-muted-foreground text-sm">Loom video coming soon</p>
            </div>
          </div>

          {/* 3. Trust Builder — Client Testimonial Video */}
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <h2 className="mb-2 text-center text-xl font-bold text-foreground sm:text-2xl">
              Hear From Our Clients
            </h2>
            <p className="mb-6 text-center text-muted-foreground">
              Real results from real people we've helped
            </p>
            <div className="overflow-hidden rounded-xl">
              <video controls preload="metadata" className="w-full">
                <source src="/videos/testimonial-1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* 4. Credit Monitoring Sign-Up */}
          <div className="gold-glow rounded-2xl border border-border bg-card p-6 sm:p-8 text-center">
            <h2 className="mb-3 text-xl font-bold text-foreground sm:text-2xl">
              One Last Step — Set Up Credit Monitoring
            </h2>
            <p className="mx-auto mb-6 max-w-xl text-muted-foreground">
              Use the link below to sign up for credit monitoring so we can complete your initial credit review. This is only needed for the first review. After that, you can cancel it, since we have a more affordable monitoring option to use moving forward.
            </p>
            <a
              href="https://affiliate.upsellnation.com/scripts/x7y3nqcm?a_aid=69a07e1077c61&a_bid=baba7135"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="text-base font-bold gap-2">
                Sign Up for Credit Monitoring <ExternalLink className="h-4 w-4" />
              </Button>
            </a>
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ThankYouPage;

import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import { SPOTS_REMAINING, SPOTS_MONTH } from "@/lib/constants";

const ScrollIndicator = () => (
  <motion.button
    onClick={() => document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" })}
    animate={{ y: [0, 8, 0] }}
    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 rounded-full border border-primary/20 bg-background/80 px-3 py-5 shadow-lg backdrop-blur-sm lg:flex hover:border-primary/40 transition-colors"
    aria-label="Scroll to booking"
  >
    <span className="text-xs font-semibold text-primary uppercase tracking-[0.2em] [writing-mode:vertical-lr]">
      Book Now
    </span>
    <ArrowDown className="h-5 w-5 text-primary" strokeWidth={2.5} />
  </motion.button>
);

const BookingPage = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    script.type = "text/javascript";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background pb-16 lg:pb-0">
      <Header />
      <main className="container mx-auto px-4 py-16 lg:py-24">
        <div className="relative mx-auto max-w-3xl text-center">
          <ScrollIndicator />

          <h1 className="mb-4 text-3xl font-extrabold text-foreground sm:text-4xl lg:text-5xl">
            Book Your Call to Start{" "}
            <span className="text-primary text-glow">Improving Your Credit Now</span>
          </h1>

          <div className="mt-12 mb-12">
            <h2 className="mb-4 text-xl font-bold text-foreground sm:text-2xl">
              From the Low 400s to the 700s. Hear One Client's Story
            </h2>
            <div className="mx-auto max-w-2xl overflow-hidden rounded-2xl border border-border shadow-lg">
              <video
                controls
                preload="metadata"
                className="w-full"
                poster=""
              >
                <source src="/videos/testimonial-2-v2.mp4" type="video/mp4" />
                <source src="/videos/testimonial-2.3gp" type="video/3gpp" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          <p className="mx-auto mb-4 max-w-2xl text-center text-lg font-semibold text-primary">
            You're one step away — only <span className="font-extrabold">{SPOTS_REMAINING} spots left</span> for {SPOTS_MONTH}. Secure yours now.
          </p>

          <div id="booking" className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-4 shadow-lg">
            <iframe
              src="https://api.leadconnectorhq.com/widget/booking/9VZH788lmQEMSxUnaJYq"
              style={{ width: "100%", border: "none", minHeight: "1200px" }}
              scrolling="yes"
              title="Book a Call"
            />
          </div>
        </div>
      </main>
      <Footer />
      <MobileCTA />
    </div>
  );
};

export default BookingPage;

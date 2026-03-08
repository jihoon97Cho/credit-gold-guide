import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

const ScrollIndicator = () => (
  <motion.div
    animate={{ y: [0, 10, 0] }}
    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-2 lg:flex"
  >
    <span className="text-sm font-bold text-destructive [writing-mode:vertical-lr] tracking-widest uppercase">
      Book Below
    </span>
    <ArrowDown className="h-7 w-7 text-destructive" strokeWidth={3} />
  </motion.div>
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

          <div id="booking" className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-4 shadow-lg">
            <iframe
              src="https://api.leadconnectorhq.com/widget/booking/9VZH788lmQEMSxUnaJYq"
              style={{ width: "100%", border: "none", overflow: "hidden", minHeight: "1000px" }}
              scrolling="no"
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

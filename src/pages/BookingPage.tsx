import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";
import { motion } from "framer-motion";

const CurvedArrow = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.8, duration: 0.6 }}
    className="pointer-events-none absolute right-[-5rem] top-[1rem] hidden lg:block"
    style={{ width: 100, height: 720 }}
  >
    <svg
      viewBox="0 0 100 720"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full overflow-visible"
    >
      {/* Stays on the far right side, swoops out and back, ends angled inward */}
      <motion.path
        d="M 50 10 C 90 80, 95 200, 70 320 C 45 440, 80 560, 60 650 L 30 700"
        stroke="hsl(0, 84%, 60%)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1, duration: 1.8, ease: "easeInOut" }}
      />
      {/* Arrowhead attached at end, angled inward-left */}
      <motion.path
        d="M 42,686 L 28,704 L 46,706"
        stroke="hsl(0, 84%, 60%)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.7, duration: 0.3 }}
      />
    </svg>
  </motion.div>
);

const CurvedArrowMobile = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.8, duration: 0.6 }}
    className="pointer-events-none absolute right-[-1rem] top-[0.5rem] block lg:hidden"
    style={{ width: 40, height: 360 }}
  >
    <svg
      viewBox="0 0 40 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full overflow-visible"
    >
      <motion.path
        d="M 20 5 C 38 40, 38 110, 30 170 C 22 230, 35 290, 25 330 L 12 350"
        stroke="hsl(0, 84%, 60%)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1, duration: 1.8, ease: "easeInOut" }}
      />
      <motion.path
        d="M 18,340 L 11,353 L 22,352"
        stroke="hsl(0, 84%, 60%)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.7, duration: 0.3 }}
      />
    </svg>
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
          {/* Curved red arrows */}
          <CurvedArrow />
          <CurvedArrowMobile />

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

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
    className="pointer-events-none absolute right-[-3.5rem] top-[2rem] hidden lg:block"
    style={{ width: 160, height: 720 }}
  >
    <svg
      viewBox="0 0 160 720"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
    >
      <motion.path
        d="M 40 10 C 140 60, 140 180, 60 300 C -20 420, 20 540, 100 600 C 130 620, 110 680, 80 700"
        stroke="hsl(0, 84%, 60%)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1, duration: 1.8, ease: "easeInOut" }}
      />
      {/* Arrowhead pointing inward toward calendar */}
      <motion.path
        d="M 68,694 L 80,714 L 92,694"
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
    className="pointer-events-none absolute right-[-0.25rem] top-[0.5rem] block lg:hidden"
    style={{ width: 45, height: 360 }}
  >
    <svg
      viewBox="0 0 45 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
    >
      <motion.path
        d="M 12 5 C 42 30, 42 100, 15 155 C -10 210, 10 270, 30 305 C 35 315, 30 340, 22 350"
        stroke="hsl(0, 84%, 60%)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1, duration: 1.8, ease: "easeInOut" }}
      />
      <motion.path
        d="M 16,345 L 22,358 L 28,345"
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

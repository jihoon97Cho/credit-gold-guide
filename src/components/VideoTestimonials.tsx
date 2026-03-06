import { motion } from "framer-motion";

const VideoTestimonials = () => (
  <section className="bg-background py-16 lg:py-24">
    <div className="container mx-auto px-4">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-extrabold text-foreground sm:text-4xl">
          Hear It From <span className="text-primary text-glow">Our Clients</span>
        </h2>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Watch real client stories and see how we've helped transform their credit.
        </p>
      </div>

      <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
        {/* Video 1 — real testimonial */}
        <motion.div
          whileHover={{ scale: 1.04, y: -10, boxShadow: "0 20px 50px -12px hsla(42, 52%, 53%, 0.25)" }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="overflow-hidden rounded-xl border border-border bg-secondary shadow-sm"
        >
          <video
            controls
            preload="auto"
            className="aspect-video w-full bg-muted object-cover"
          >
            <source src="/videos/testimonial-1.mp4" type="video/mp4" />
            Your browser does not support this video format.
          </video>
          <div className="p-4">
            <p className="font-semibold text-foreground">Cory's Testimonial</p>
            <p className="text-sm text-muted-foreground">Helping veterans like Cory means a lot to us. We were honored to help repair his credit and put him in a stronger position financially.</p>
          </div>
        </motion.div>

        {/* Video 2 — placeholder */}
        <motion.div
          whileHover={{ scale: 1.04, y: -10, boxShadow: "0 20px 50px -12px hsla(42, 52%, 53%, 0.25)" }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="group overflow-hidden rounded-xl border border-border bg-secondary shadow-sm"
        >
          <div className="relative flex aspect-video items-center justify-center bg-muted">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-lg transition-transform group-hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 ml-1"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            </div>
            <span className="absolute bottom-3 left-3 rounded-md bg-foreground/70 px-2 py-1 text-xs text-background">
              Video 2
            </span>
          </div>
          <div className="p-4">
            <p className="font-semibold text-foreground">Client Testimonial 2</p>
            <p className="text-sm text-muted-foreground">Video coming soon</p>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default VideoTestimonials;

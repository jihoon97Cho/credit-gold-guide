import { motion } from "framer-motion";
import { ScrollReveal, RevealItem } from "@/components/ScrollReveal";

type VideoSource = {
  src: string;
  type: string;
};

const VideoCard = ({
  sources,
  title,
  description,
}: {
  sources: VideoSource[];
  title: string;
  description: string;
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.04, y: -10, boxShadow: "0 20px 50px -12px hsla(42, 52%, 53%, 0.25)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="overflow-hidden rounded-xl border border-border bg-secondary shadow-sm"
    >
      <video controls loop playsInline preload="auto" className="aspect-video w-full bg-muted object-cover">
        {sources.map((source) => (
          <source key={`${source.src}-${source.type}`} src={source.src} type={source.type} />
        ))}
        Your browser does not support this video format.
      </video>
      <div className="p-4">
        <p className="font-semibold text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  );
};

const VideoTestimonials = () => (
  <ScrollReveal as="section" className="bg-background py-16 lg:py-24">
    <div className="container mx-auto px-4">
      <div className="mb-12 text-center">
        <RevealItem>
           <h2 className="mb-4 text-3xl font-extrabold text-foreground sm:text-4xl">
             See What Our <span className="text-primary text-glow">Clients Say</span>
          </h2>
        </RevealItem>
        <RevealItem>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Watch real client stories and see how we've helped transform their credit.
          </p>
        </RevealItem>
      </div>

      <RevealItem>
        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
          <VideoCard
            sources={[{ src: "/videos/testimonial-1.mp4", type: "video/mp4" }]}
            title="Cory's Testimonial"
            description="Helping veterans like Cory means a lot to us. We were honored to help repair his credit and put him in a stronger position financially."
          />
          <VideoCard
            sources={[{ src: "/videos/testimonial-2-v2.mp4", type: "video/mp4" }]}
            title="Anthony's Testimonial"
            description="Anthony came to us with credit scores in the low 400s. After working with our team, he was able to improve his profile into the 700s and get approved for 2 credit cards."
          />
        </div>
      </RevealItem>
    </div>
  </ScrollReveal>
);

export default VideoTestimonials;

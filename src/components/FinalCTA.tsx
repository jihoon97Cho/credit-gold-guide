import { Phone } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ScrollReveal, RevealItem } from "@/components/ScrollReveal";

const FinalCTA = () => {
  const navigate = useNavigate();

  return (
    <ScrollReveal as="section" id="contact" className="bg-secondary py-16 lg:py-24">
      <div className="container mx-auto max-w-2xl px-4 text-center">
        <RevealItem>
          <h2 className="mb-4 text-3xl font-extrabold text-foreground sm:text-4xl">
            Ready to <span className="text-primary text-glow">Fix Your Credit?</span>
          </h2>
        </RevealItem>
        <RevealItem>
          <p className="text-lg text-muted-foreground">
            Don't let bad credit hold you back. Schedule your free strategy call today and start your journey to financial freedom.
          </p>
        </RevealItem>
        <RevealItem>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="mt-8">
            <Button onClick={() => navigate("/book")} className="rounded-full py-6 px-10 text-lg font-bold gap-2">
              <Phone className="h-5 w-5" />
              Book a Call Now
            </Button>
          </motion.div>
        </RevealItem>
      </div>
    </ScrollReveal>
  );
};

export default FinalCTA;

import { Phone } from "lucide-react";
import { useSiteSettings } from "@/hooks/use-site-settings";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ScrollReveal, RevealItem } from "@/components/ScrollReveal";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const navigate = useNavigate();
  const { spotsRemaining, spotsMonth } = useSiteSettings();

  return (
    <ScrollReveal as="section" id="pricing" className="bg-background py-16 lg:py-24">
      <div className="container mx-auto px-4 text-center">
        <RevealItem>
          <h2 className="mb-4 text-3xl font-extrabold text-foreground sm:text-4xl">
            Let's Build Your <span className="text-primary text-glow">Credit Repair Plan</span>
          </h2>
        </RevealItem>
        <RevealItem>
           <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
             Every credit situation is different. Book a free 15 minute call and we'll show you the best next steps.
          </p>
        </RevealItem>
        <RevealItem>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="mt-8">
             <Button onClick={() => navigate("/book")} className="rounded-full py-6 px-10 text-lg font-bold gap-2">
               <Phone className="h-5 w-5" />
               Book Your Free Credit Review
            </Button>
          </motion.div>
          <p className="mt-4 text-sm font-semibold text-primary">
            ⚠️ We only accept 10 new clients per month — <span className="font-extrabold">{spotsRemaining} spots remaining</span> for {spotsMonth}
          </p>
        </RevealItem>
      </div>
    </ScrollReveal>
  );
};

export default Pricing;

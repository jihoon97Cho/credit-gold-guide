import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY } from "@/lib/constants";

const MobileCTA = () => {
  const scrollTo = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 p-3 backdrop-blur lg:hidden">
      <div className="flex gap-2">
        <Button asChild variant="outline" className="flex-1 rounded-full border-primary/40 text-primary">
          <a href={`tel:${COMPANY.phone}`}>
            <Phone className="mr-1 h-4 w-4" /> Call Now
          </a>
        </Button>
        <Button onClick={scrollTo} className="flex-1 rounded-full bg-primary text-primary-foreground font-bold hover:bg-primary/90">
          Free Strategy Call
        </Button>
      </div>
    </div>
  );
};

export default MobileCTA;

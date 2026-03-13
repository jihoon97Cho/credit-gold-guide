import { useState } from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { useSiteSettings } from "@/hooks/use-site-settings";

const AnnouncementBanner = () => {
  const [dismissed, setDismissed] = useState(false);
  const { spotsRemaining, spotsMonth } = useSiteSettings();

  if (dismissed) return null;

  return (
    <div className="relative z-[60] bg-primary/10 border-b border-primary/20">
      <div className="container mx-auto flex items-center justify-center px-4 py-2 text-sm">
        <p className="text-center font-medium text-foreground">
          <span className="text-primary font-bold">{spotsMonth} spots are filling up — {spotsRemaining} remaining</span>
          {" "}|{" "}
          <Link to="/book" className="underline underline-offset-2 text-primary hover:text-primary/80 transition-colors font-semibold">
            Book your free call today
          </Link>
        </p>
        <button
          onClick={() => setDismissed(true)}
          className="absolute right-3 rounded-full p-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label="Dismiss banner"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default AnnouncementBanner;

import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { trackEvent } from "@/lib/tracking";

// Generate a unique session ID per browser tab
const SESSION_ID = crypto.randomUUID();

const PageViewTracker = () => {
  const location = useLocation();
  const prevPath = useRef<string | null>(null);

  useEffect(() => {
    const isAdmin = location.pathname.startsWith("/admin");

    // Disable Meta Pixel on admin pages
    if (typeof window !== "undefined" && (window as any).fbq) {
      if (isAdmin) {
        // Don't fire PageView on admin
      } else {
        (window as any).fbq('track', 'PageView');
      }
    }

    // Don't track admin pages
    if (isAdmin) return;
    // Avoid duplicate fires
    if (prevPath.current === location.pathname) return;
    prevPath.current = location.pathname;

    trackEvent("page_view", location.pathname, {
      session_id: SESSION_ID,
      referrer: document.referrer || null,
    });
  }, [location.pathname]);

  return null;
};

export default PageViewTracker;

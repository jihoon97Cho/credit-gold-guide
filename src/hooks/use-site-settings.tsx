import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SPOTS_REMAINING, SPOTS_MONTH } from "@/lib/constants";

interface SiteSettings {
  spotsRemaining: number;
  spotsMonth: string;
}

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>({
    spotsRemaining: SPOTS_REMAINING,
    spotsMonth: SPOTS_MONTH,
  });

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("site_settings")
        .select("key, value")
        .in("key", ["spots_remaining", "spots_month"]);
      if (data) {
        const map = Object.fromEntries(data.map((r: any) => [r.key, r.value]));
        setSettings({
          spotsRemaining: parseInt(map.spots_remaining) || SPOTS_REMAINING,
          spotsMonth: map.spots_month || SPOTS_MONTH,
        });
      }
    };
    fetch();
  }, []);

  return settings;
}

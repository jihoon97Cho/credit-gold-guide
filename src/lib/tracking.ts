import { supabase } from "@/integrations/supabase/client";

export async function trackEvent(eventType: string, page?: string, metadata?: Record<string, unknown>) {
  try {
    await supabase.from("site_events").insert({
      event_type: eventType,
      page: page || window.location.pathname,
      metadata: metadata || {},
    });
  } catch {
    // Silent fail — don't break UX for analytics
  }
}

export async function saveLead(data: {
  name: string;
  phone?: string;
  email?: string;
  credit_range?: string;
  has_negatives?: string;
  wants_funding?: string;
  credit_goal?: string;
  message?: string;
  source?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}) {
  try {
    await supabase.from("leads").insert(data);
  } catch {
    // Silent fail
  }
}

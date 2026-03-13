
-- Table for storing monthly manual metrics (showed up, became client, revenue, ad spend)
CREATE TABLE public.dashboard_metrics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  month_key TEXT NOT NULL, -- format: YYYY-MM
  showed_up INTEGER NOT NULL DEFAULT 0,
  became_client INTEGER NOT NULL DEFAULT 0,
  revenue_collected NUMERIC(12,2) NOT NULL DEFAULT 0,
  ad_spend NUMERIC(12,2) NOT NULL DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(month_key)
);

-- Table for client pipeline
CREATE TABLE public.client_pipeline (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  stage TEXT NOT NULL DEFAULT 'New Lead',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.dashboard_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_pipeline ENABLE ROW LEVEL SECURITY;

-- RLS policies for dashboard_metrics (admin only)
CREATE POLICY "Admins can view metrics" ON public.dashboard_metrics FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can insert metrics" ON public.dashboard_metrics FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update metrics" ON public.dashboard_metrics FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- RLS policies for client_pipeline (admin only)
CREATE POLICY "Admins can view pipeline" ON public.client_pipeline FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can insert pipeline" ON public.client_pipeline FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update pipeline" ON public.client_pipeline FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role)) WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete pipeline" ON public.client_pipeline FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

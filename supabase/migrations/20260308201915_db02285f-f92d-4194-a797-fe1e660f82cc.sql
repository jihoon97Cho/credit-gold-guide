CREATE POLICY "Admins can delete leads" ON public.leads FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete events" ON public.site_events FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));
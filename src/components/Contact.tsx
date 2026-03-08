import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollReveal, RevealItem } from "@/components/ScrollReveal";
import { GHL_WEBHOOK_URL } from "@/lib/constants";
import { getUtmParams } from "@/lib/utm";
import { useToast } from "@/hooks/use-toast";
import { saveLead } from "@/lib/tracking";

const Contact = () => {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const set = (key: string, val: string) =>
    setForm((p) => ({ ...p, [key]: val }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const utm = getUtmParams();
      await Promise.all([
        fetch(GHL_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, ...utm }),
        }),
        saveLead({
          name: form.name,
          phone: form.phone,
          email: form.email,
          message: form.message,
          source: "contact_form",
          ...utm,
        }),
      ]);
      setSubmitted(true);
    } catch {
      toast({
        title: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "h-12 rounded-lg border-border bg-secondary text-foreground placeholder:text-muted-foreground";

  return (
    <ScrollReveal as="section" id="contact" className="bg-background py-16 lg:py-24">
      <div className="container mx-auto max-w-xl px-4">
        <RevealItem>
          <h2 className="mb-2 text-center text-3xl font-extrabold text-foreground sm:text-4xl">
            Get In <span className="text-primary text-glow">Touch</span>
          </h2>
        </RevealItem>
        <RevealItem>
          <p className="mb-8 text-center text-lg text-muted-foreground">
            Have a question? Fill out the form below and we'll get back to you shortly.
          </p>
        </RevealItem>

        {submitted ? (
          <RevealItem>
            <div className="gold-glow rounded-2xl border border-border bg-card p-8 text-center">
              <div className="mb-4 text-5xl">🎉</div>
              <h3 className="mb-2 text-2xl font-bold text-foreground">
                Message Sent!
              </h3>
              <p className="text-muted-foreground">
                We'll get back to you within 24 hours.
              </p>
            </div>
          </RevealItem>
        ) : (
          <RevealItem>
            <form
              onSubmit={submit}
              className="gold-glow space-y-4 rounded-2xl border border-border bg-card p-6 sm:p-8"
            >
              <Input
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                required
                maxLength={100}
                className={inputClass}
              />
              <Input
                placeholder="Phone Number"
                type="tel"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                required
                maxLength={20}
                className={inputClass}
              />
              <Input
                placeholder="Email Address"
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                required
                maxLength={255}
                className={inputClass}
              />
              <Textarea
                placeholder="What questions do you have?"
                value={form.message}
                onChange={(e) => set("message", e.target.value)}
                required
                maxLength={1000}
                className="min-h-[120px] rounded-lg border-border bg-secondary text-foreground placeholder:text-muted-foreground"
              />
              <Button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full py-6 text-lg font-bold"
              >
                {submitting ? "Sending…" : "Send Message"}
              </Button>
            </form>
          </RevealItem>
        )}
      </div>
    </ScrollReveal>
  );
};

export default Contact;

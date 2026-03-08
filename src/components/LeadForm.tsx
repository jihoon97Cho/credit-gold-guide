import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { getUtmParams } from "@/lib/utm";
import { GHL_WEBHOOK_URL } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";
import { saveLead } from "@/lib/tracking";
import { useToast } from "@/hooks/use-toast";

const LeadForm = ({ id }: { id?: string }) => {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const [form, setForm] = useState({
    name: "", phone: "", email: "", creditRange: "", hasNegatives: "", wantsFunding: "", creditGoal: "", consent: false,
  });

  const set = (key: string, val: string | boolean) => setForm((p) => ({ ...p, [key]: val }));
  const next = () => setStep((s) => Math.min(s + 1, 3));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.consent) {
      toast({ title: "Please agree to be contacted", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      const utm = getUtmParams();
      await fetch(GHL_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, ...utm }),
      });
      setSubmitted(true);
    } catch {
      toast({ title: "Something went wrong. Please call us directly.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div id={id} className="gold-glow rounded-2xl border border-border bg-card p-8 text-center">
        <div className="mb-4 text-5xl">🎉</div>
        <h3 className="mb-2 text-2xl font-bold text-foreground">You're All Set!</h3>
        <p className="text-muted-foreground">We'll reach out within 24 hours to schedule your free strategy call.</p>
      </div>
    );
  }

  const inputClass = "h-12 rounded-lg border-border bg-secondary text-foreground placeholder:text-muted-foreground";

  return (
    <div id={id} className="gold-glow rounded-2xl border border-border bg-card p-6 sm:p-8">
      <h3 className="mb-1 text-center text-xl font-bold text-foreground">Get Your Free Credit Strategy Call</h3>
      <p className="mb-4 text-center text-sm text-muted-foreground">Step {step} of 3</p>
      <Progress value={(step / 3) * 100} className="mb-6 h-2" />

      <form onSubmit={submit} className="space-y-4">
        {step === 1 && (
          <>
            <Input placeholder="Full Name" value={form.name} onChange={(e) => set("name", e.target.value)} required className={inputClass} />
            <Input placeholder="Phone Number" type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} required className={inputClass} />
            <Input placeholder="Email Address" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} required className={inputClass} />
            <Button type="button" onClick={next} className="w-full rounded-full py-6 text-lg font-bold">
              Continue →
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <Select value={form.creditRange} onValueChange={(v) => set("creditRange", v)}>
              <SelectTrigger className="h-12 rounded-lg border-border bg-secondary text-foreground">
                <SelectValue placeholder="Current Credit Score Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="below-500">Below 500</SelectItem>
                <SelectItem value="500-579">500 – 579</SelectItem>
                <SelectItem value="580-619">580 – 619</SelectItem>
                <SelectItem value="620-679">620 – 679</SelectItem>
                <SelectItem value="680-719">680 – 719</SelectItem>
                <SelectItem value="720+">720+</SelectItem>
                <SelectItem value="not-sure">Not Sure</SelectItem>
              </SelectContent>
            </Select>

            <Select value={form.hasNegatives} onValueChange={(v) => set("hasNegatives", v)}>
              <SelectTrigger className="h-12 rounded-lg border-border bg-secondary text-foreground">
                <SelectValue placeholder="Collections, Charge-offs, or Bankruptcies?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
                <SelectItem value="not-sure">Not Sure</SelectItem>
              </SelectContent>
            </Select>

            <Select value={form.wantsFunding} onValueChange={(v) => set("wantsFunding", v)}>
              <SelectTrigger className="h-12 rounded-lg border-border bg-secondary text-foreground">
                <SelectValue placeholder="Interested in Business Funding?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
                <SelectItem value="maybe">Maybe Later</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={back} className="flex-1 rounded-full py-6">← Back</Button>
              <Button type="button" onClick={next} className="flex-1 rounded-full py-6 text-lg font-bold">Continue →</Button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <Textarea placeholder="What is your biggest credit goal?" value={form.creditGoal} onChange={(e) => set("creditGoal", e.target.value)} className="min-h-[100px] rounded-lg border-border bg-secondary text-foreground placeholder:text-muted-foreground" />

            <div className="flex items-start gap-2">
              <Checkbox id="consent" checked={form.consent} onCheckedChange={(v) => set("consent", !!v)} className="mt-1 border-border data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground" />
              <label htmlFor="consent" className="text-xs leading-relaxed text-muted-foreground">
                I agree to be contacted by Ascend Solutions LLC regarding my credit repair inquiry. I understand this is not a guarantee of results.
              </label>
            </div>

            <div className="flex gap-3">
              <Button type="button" variant="outline" onClick={back} className="flex-1 rounded-full py-6">← Back</Button>
              <Button type="submit" disabled={submitting} className="flex-1 rounded-full py-6 text-lg font-bold">
                {submitting ? "Submitting…" : "Schedule My Free Strategy Call"}
              </Button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default LeadForm;

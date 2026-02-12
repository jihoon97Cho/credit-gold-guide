import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "How fast will I see results?",
    a: "Most clients begin seeing changes within 30–45 days. Some negative items can be removed in as little as 2 weeks. We provide a personalized timeline based on your unique situation.",
  },
  {
    q: "What if nothing gets removed?",
    a: "We offer a money-back guarantee. If we cannot remove at least one negative item within the first 30–60 days, you get your money back. No questions asked.",
  },
  {
    q: "Do you work with bankruptcies?",
    a: "Yes! We specialize in helping clients with active and discharged bankruptcies. We create strategic rebuilding plans to help you recover your credit as fast as possible.",
  },
  {
    q: "Is this legal?",
    a: "Absolutely. Credit repair is 100% legal and protected under the Credit Repair Organizations Act (CROA) and the Fair Credit Reporting Act (FCRA). You have the legal right to dispute any inaccurate, unfair, or unverifiable information on your credit report.",
  },
  {
    q: "How much does it cost?",
    a: "We offer transparent, competitive pricing with no hidden fees. During your free strategy call, we'll provide a clear breakdown based on your specific needs.",
  },
  {
    q: "Can you help me get business funding?",
    a: "Yes! Once your credit is in a strong position, we help you access business funding — including 0% interest options when qualified. Many of our clients use improved credit to launch or grow their businesses.",
  },
];

const FAQ = () => (
  <section id="faq" className="py-16 lg:py-24">
    <div className="container mx-auto max-w-3xl px-4">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-extrabold text-foreground sm:text-4xl">
          Frequently Asked <span className="text-primary">Questions</span>
        </h2>
      </div>

      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="rounded-xl border border-border bg-card px-6">
            <AccordionTrigger className="text-left text-foreground hover:no-underline">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FAQ;

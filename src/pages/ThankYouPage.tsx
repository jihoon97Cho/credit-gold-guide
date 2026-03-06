import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ThankYouPage = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="mb-8 text-center">
            <div className="mb-4 text-5xl">🎉</div>
            <h1 className="mb-3 text-3xl font-extrabold text-foreground sm:text-4xl">
              Payment <span className="text-primary text-glow">Confirmed!</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Thank you for your purchase. Please complete the form below so we can get started on your credit repair journey.
            </p>
          </div>

          <div className="gold-glow rounded-2xl border border-border bg-card p-6 sm:p-8">
            <h2 className="mb-4 text-center text-xl font-bold text-foreground">
              Next Steps — Complete Your Enrollment
            </h2>
            <iframe
              src="https://api.leadconnectorhq.com/widget/form/6TlGSb6OXHzERfD2E4J8"
              style={{ width: "100%", height: "1835px", border: "none", borderRadius: "3px" }}
              id="inline-6TlGSb6OXHzERfD2E4J8"
              data-layout='{"id":"INLINE"}'
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="Credit Repair Form"
              data-height="1835"
              data-layout-iframe-id="inline-6TlGSb6OXHzERfD2E4J8"
              data-form-id="6TlGSb6OXHzERfD2E4J8"
              title="Credit Repair Form"
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ThankYouPage;

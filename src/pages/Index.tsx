import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Results from "@/components/Results";
import VideoTestimonials from "@/components/VideoTestimonials";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import BankruptcySection from "@/components/BankruptcySection";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import ServiceAreas from "@/components/ServiceAreas";
import FAQ from "@/components/FAQ";

import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";

const Index = () => (
  <div className="min-h-screen bg-background pb-16 lg:pb-0">
    <Header />
    <main>
      <Hero />
      <Results />
      <VideoTestimonials />
      <Services />
      <Pricing />
      <BankruptcySection />
      <WhyChooseUs />
      <Testimonials />
      <ServiceAreas />
      <FAQ />
      
    </main>
    <Footer />
    <MobileCTA />
  </div>
);

export default Index;

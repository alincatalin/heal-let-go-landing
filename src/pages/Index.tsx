import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Features } from "@/components/Features";
import { Testimonials } from "@/components/Testimonials";
import { HowItWorks } from "@/components/HowItWorks";
import { WhyNow } from "@/components/WhyNow";
import { Pricing } from "@/components/Pricing";
import { FeaturedGuide } from "@/components/FeaturedGuide";
import { Blog } from "@/components/Blog";
import { FAQ } from "@/components/FAQ";
import { Support } from "@/components/Support";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Hero />
      <Problem />
      <Features />
      <Testimonials />
      <HowItWorks />
      <WhyNow />
      <Pricing />
      <FeaturedGuide />
      <Blog />
      <FAQ />
      <Support />
      <FinalCTA />
      <Footer />
    </div>
  );
};

export default Index;

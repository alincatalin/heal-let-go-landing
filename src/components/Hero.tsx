import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { PhoneMockup } from "@/components/PhoneMockup";

export const Hero = () => {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background glow */}
      <div className="absolute inset-0 bg-gradient-glow animate-glow-pulse" />
      
      <div 
        ref={ref}
        className={`container mx-auto px-4 py-20 relative z-10 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8 animate-float">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Stop texting your ex.{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Start choosing yourself.
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground">
                AI-powered breakup recovery for when it's 2am and you're about to make a mistake.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="group">
                Join the Beta
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground">
              iOS & Android • Free Beta Access • No Credit Card Required
            </p>
          </div>
          
          {/* Right mockup */}
          <div className="relative flex items-center justify-center">
            <PhoneMockup />
          </div>
        </div>
      </div>
    </section>
  );
};

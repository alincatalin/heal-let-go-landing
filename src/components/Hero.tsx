import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background glow */}
      <div className="absolute inset-0 bg-gradient-glow animate-glow-pulse" />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
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
          
          {/* Right image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl" />
            <img 
              src={heroImage} 
              alt="Person contemplating their phone in emotional lighting"
              className="relative rounded-2xl shadow-glow-strong w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

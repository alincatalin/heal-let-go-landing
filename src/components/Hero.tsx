import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { PhoneMockup } from "@/components/PhoneMockup";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { BetaSignupDialog } from "@/components/BetaSignupDialog";
import appScreen1 from "@/assets/app-screen-1.png";
import appScreen2 from "@/assets/app-screen-2.png";
import appScreen3 from "@/assets/app-screen-3.png";

const screenshots = [
  { src: appScreen3, alt: "Daily check-in and home screen" },
  { src: appScreen1, alt: "App onboarding - They left" },
  { src: appScreen2, alt: "Healing path progress tracker" }
];

export const Hero = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [signupOpen, setSignupOpen] = useState(false);

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [api]);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

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
              <Button 
                variant="hero" 
                size="lg" 
                className="group"
                onClick={() => setSignupOpen(true)}
              >
                Join the Beta
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
            
            <BetaSignupDialog open={signupOpen} onOpenChange={setSignupOpen} />
            
            <p className="text-sm text-muted-foreground">
              iOS & Android • Free Access with Limited Features • 50% Off for Beta Testers
            </p>
          </div>
          
          {/* Right mockup carousel */}
          <div className="relative flex flex-col items-center justify-center gap-6">
            <Carousel 
              setApi={setApi}
              opts={{
                align: "start",
                loop: true,
              }}
            >
              <CarouselContent>
                {screenshots.map((screen, index) => (
                  <CarouselItem key={index}>
                    <PhoneMockup screenshot={screen.src} alt={screen.alt} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            
            {/* Carousel indicators */}
            <div className="flex gap-2">
              {screenshots.map((_, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === current 
                      ? "w-8 bg-primary" 
                      : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { Button } from "@/components/ui/button";
import { Heart, TrendingUp, Shield, Sparkles } from "lucide-react";
import { PhoneMockup } from "@/components/PhoneMockup";
import { StoreButtons } from "@/components/StoreButtons";

export const AppPromotion = () => {
  const { ref, isVisible } = useScrollAnimation();

  const features = [
    {
      icon: Heart,
      title: "AI Healing Coach",
      description: "Get personalized support 24/7"
    },
    {
      icon: TrendingUp,
      title: "Track Your Progress",
      description: "See how far you've come"
    },
    {
      icon: Shield,
      title: "No Contact Support",
      description: "Stay strong when it matters most"
    },
    {
      icon: Sparkles,
      title: "Daily Check-ins",
      description: "Build healthy healing habits"
    }
  ];

  return (
    <>
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div
            ref={ref}
            className={`transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
              {/* Left side - Content */}
              <div className="space-y-6">
                <div className="inline-block px-4 py-2 bg-primary/10 rounded-full text-primary font-medium">
                  📱 Now on the App Store & Google Play
                </div>
                
                <h2 className="text-4xl md:text-5xl font-bold">
                  Ready to Start Your Healing Journey?
                </h2>
                
                <p className="text-xl text-muted-foreground">
                  Download Heal: Let Them Go for guided support, progress tracking, and daily check-ins that keep you moving forward.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 py-6">
                  {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <div key={index} className="flex gap-3">
                        <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">{feature.title}</h3>
                          <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <StoreButtons className="sm:items-stretch" />

                <Button 
                  size="lg" 
                  variant="outline"
                  className="text-lg px-8 w-full sm:w-auto"
                  onClick={() => {
                    const pricingSection = document.getElementById('pricing');
                    pricingSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  See Pricing
                </Button>

                <p className="text-sm text-muted-foreground">
                  Start free, then upgrade anytime inside the app.
                </p>
              </div>

              {/* Right side - Phone Mockup */}
              <div className="relative lg:ml-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary-glow/20 blur-3xl" />
                <PhoneMockup />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
